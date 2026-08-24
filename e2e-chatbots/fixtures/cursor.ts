/// <reference lib="dom" />
import type { Page } from '@playwright/test';

/**
 * Cursor sintético.
 *
 * O Playwright NÃO desenha o ponteiro do mouse no vídeo que grava. Sem isto o
 * institucional vira "um fantasma clicando sozinho": campos preenchem, menus
 * abrem, e o espectador não entende o que causou o quê.
 *
 * A solução é injetar um cursor em SVG que segue os eventos de mouse REAIS
 * disparados por page.mouse.* — o mesmo evento que o app recebe move o desenho,
 * então nunca dessincroniza.
 */
export async function installCursor(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const state = { x: -200, y: -200 };

    const CSS = `
      #__demo_cursor{position:fixed;left:0;top:0;width:26px;height:26px;z-index:2147483647;
        pointer-events:none;will-change:transform;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))}
      #__demo_click{position:fixed;left:0;top:0;width:16px;height:16px;margin:-8px 0 0 -8px;
        border-radius:50%;z-index:2147483646;pointer-events:none;opacity:0;
        background:rgba(56,189,248,.45);border:2px solid rgba(56,189,248,.95)}
      #__demo_click.on{animation:__demo_ping 520ms ease-out}
      @keyframes __demo_ping{0%{opacity:.95;transform:scale(.35)}100%{opacity:0;transform:scale(3.4)}}
    `;

    const ARROW =
      '<svg viewBox="0 0 24 24" width="26" height="26" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M5 2.2 18.6 10.6l-6.1 1.1 3.3 6.7-2.7 1.3-3.3-6.7-4.8 4.3z" ' +
      'fill="#ffffff" stroke="#0f172a" stroke-width="1.5" stroke-linejoin="round"/></svg>';

    const mount = () => {
      const root = document.body || document.documentElement;
      if (!root || document.getElementById('__demo_cursor')) return;

      const style = document.createElement('style');
      style.textContent = CSS;
      (document.head || root).appendChild(style);

      const cursor = document.createElement('div');
      cursor.id = '__demo_cursor';
      cursor.innerHTML = ARROW;
      cursor.style.transform = `translate3d(${state.x}px,${state.y}px,0)`;

      const ripple = document.createElement('div');
      ripple.id = '__demo_click';

      root.appendChild(cursor);
      root.appendChild(ripple);
    };

    addEventListener(
      'mousemove',
      e => {
        state.x = e.clientX;
        state.y = e.clientY;
        const c = document.getElementById('__demo_cursor');
        if (c) c.style.transform = `translate3d(${state.x}px,${state.y}px,0)`;
      },
      true
    );

    addEventListener(
      'mousedown',
      e => {
        const d = document.getElementById('__demo_click');
        if (!d) return;
        d.style.left = `${e.clientX}px`;
        d.style.top = `${e.clientY}px`;
        d.classList.remove('on');
        void d.offsetWidth; // reinicia a animação
        d.classList.add('on');
      },
      true
    );

    if (document.readyState === 'loading')
      addEventListener('DOMContentLoaded', mount);
    else mount();
  });
}
