#!/usr/bin/env node
/**
 * Montagem do video de avaliacao dos chatbots a partir das cenas Playwright.
 *
 * Entrada:  e2e-chatbots/out/manifest/*.json + e2e-chatbots/out/scenes/*.webm
 *           e2e-chatbots/out/report.ndjson (veredito estruturado por bot)
 * Saida:    e2e-chatbots/out/avaliacao-chatbots.mp4  (H.264, yuv420p, faststart)
 *           e2e-chatbots/out/avaliacao-chatbots.vtt  (capitulos p/ <track kind="chapters">)
 *           e2e-chatbots/out/avaliacao-chatbots.jpg  (poster)
 *
 * Mesma arquitetura do templates/demo-video/files/e2e-demo/render/assemble.mjs
 * do gwan-infra (normaliza -> concat por demuxer -> encode unico) — aqui sem
 * trilha sonora por padrao (video de QA, nao institucional) e com um resumo
 * impresso no fim, lido direto do report.ndjson.
 *
 * Roda dentro do container de render (node + ffmpeg) — o host nao precisa ter
 * ffmpeg instalado:
 *   docker compose -f e2e-chatbots/render/docker-compose.render.yml run --rm render
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import path from 'node:path';

const OUT = process.env.CHATBOTS_OUT ?? 'e2e-chatbots/out';
const NAME = process.env.CHATBOTS_NAME ?? 'avaliacao-chatbots';
const W = 1920;
const H = 1080;
const FPS = 30;
const CRF = process.env.CHATBOTS_CRF ?? '20';

const NORM = path.join(OUT, 'norm');

const sh = (bin, args) => execFileSync(bin, args, { stdio: ['ignore', 'pipe', 'inherit'] }).toString();

function duration(file) {
  const out = sh('ffprobe', [
    '-v', 'error',
    '-show_entries', 'format=duration',
    '-of', 'default=noprint_wrappers=1:nokey=1',
    file,
  ]);
  const d = Number(out.trim());
  if (!Number.isFinite(d) || d <= 0) throw new Error(`Duração inválida em ${file}: ${out}`);
  return d;
}

function timestamp(seconds) {
  const ms = Math.round(seconds * 1000);
  const h = String(Math.floor(ms / 3_600_000)).padStart(2, '0');
  const m = String(Math.floor((ms % 3_600_000) / 60_000)).padStart(2, '0');
  const s = String(Math.floor((ms % 60_000) / 1000)).padStart(2, '0');
  const f = String(ms % 1000).padStart(3, '0');
  return `${h}:${m}:${s}.${f}`;
}

// ---------------------------------------------------------------- 1. manifesto
const manifestDir = path.join(OUT, 'manifest');
if (!existsSync(manifestDir)) {
  console.error(`Nada para montar: ${manifestDir} não existe. Rode a suite Playwright primeiro.`);
  process.exit(1);
}

const scenes = readdirSync(manifestDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(path.join(manifestDir, f), 'utf8')))
  .sort((a, b) => a.order - b.order);

if (scenes.length === 0) {
  console.error('Nenhuma cena no manifesto.');
  process.exit(1);
}

console.log(`==> ${scenes.length} bot(s) avaliado(s):`);
for (const s of scenes) {
  const icon = s.outcome === 'pass' ? '✓' : s.outcome === 'blocked' ? '⏸' : '✗';
  console.log(`    ${icon} ${s.botName} — ${s.outcome} (${s.reason})`);
}

// ------------------------------------------------------------- 2. normalização
rmSync(NORM, { recursive: true, force: true });
mkdirSync(NORM, { recursive: true });

const parts = [];
scenes.forEach((scene, i) => {
  const src = path.join(OUT, scene.video);
  if (!existsSync(src)) throw new Error(`Cena sem vídeo gravado: ${src}`);

  const srcDur = duration(src);
  const filters = [
    `scale=${W}:${H}:force_original_aspect_ratio=decrease`,
    `pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2:color=black`,
    `fps=${FPS}`,
    'format=yuv420p',
  ];
  if (i === 0) filters.push('fade=t=in:st=0:d=0.6');
  if (i === scenes.length - 1) filters.push(`fade=t=out:st=${Math.max(0, srcDur - 0.9).toFixed(3)}:d=0.9`);

  const dest = path.join(NORM, `${String(scene.order).padStart(3, '0')}-${scene.slug}.mp4`);
  console.log(`--> normalizando ${scene.slug} (${srcDur.toFixed(1)}s)`);
  sh('ffmpeg', [
    '-y', '-hide_banner', '-loglevel', 'error',
    '-i', src,
    '-vf', filters.join(','),
    '-c:v', 'libx264', '-preset', 'medium', '-crf', String(CRF),
    '-profile:v', 'high', '-level', '4.1',
    '-an',
    dest,
  ]);

  parts.push({ scene, file: dest, duration: duration(dest) });
});

// ------------------------------------------------------------------ 3. concat
const listFile = path.join(OUT, 'concat.txt');
writeFileSync(listFile, parts.map((p) => `file '${path.resolve(p.file)}'`).join('\n') + '\n', 'utf8');

const finalFile = path.join(OUT, `${NAME}.mp4`);
console.log('--> concatenando (sem trilha — video de QA, nao institucional)');
sh('ffmpeg', [
  '-y', '-hide_banner', '-loglevel', 'error',
  '-f', 'concat', '-safe', '0', '-i', listFile,
  '-c', 'copy', '-movflags', '+faststart',
  finalFile,
]);

const total = parts.reduce((acc, p) => acc + p.duration, 0);

// --------------------------------------------------------------- 4. capítulos
let cursor = 0;
const vtt = ['WEBVTT', ''];
parts.forEach((p, i) => {
  const start = cursor;
  cursor += p.duration;
  const tag = p.scene.outcome === 'pass' ? '[OK]' : p.scene.outcome === 'blocked' ? '[BLOQUEADO]' : '[FALHOU]';
  vtt.push(String(i + 1), `${timestamp(start)} --> ${timestamp(cursor)}`, `${tag} ${p.scene.botName}`, '');
});
const vttFile = path.join(OUT, `${NAME}.vtt`);
writeFileSync(vttFile, vtt.join('\n'), 'utf8');

// ------------------------------------------------------------------ 5. poster
const posterAt = total / 2;
const posterFile = path.join(OUT, `${NAME}.jpg`);
sh('ffmpeg', [
  '-y', '-hide_banner', '-loglevel', 'error',
  '-ss', posterAt.toFixed(3), '-i', finalFile,
  '-frames:v', '1', '-q:v', '3',
  posterFile,
]);

rmSync(listFile, { force: true });

// ------------------------------------------------------------- 6. resumo final
const reportPath = path.join(OUT, 'report.ndjson');
const counts = { pass: 0, blocked: 0, fail: 0 };
if (existsSync(reportPath)) {
  for (const line of readFileSync(reportPath, 'utf8').trim().split('\n').filter(Boolean)) {
    const r = JSON.parse(line);
    counts[r.outcome] = (counts[r.outcome] ?? 0) + 1;
  }
}

console.log('');
console.log(`Pronto — ${total.toFixed(1)}s, ${scenes.length} bot(s)`);
console.log(`  vídeo:     ${finalFile}`);
console.log(`  capítulos: ${vttFile}`);
console.log(`  poster:    ${posterFile}`);
console.log('');
console.log(`Resumo: ${counts.pass ?? 0} funcionando · ${counts.blocked ?? 0} bloqueado(s) · ${counts.fail ?? 0} falhou(aram)`);
