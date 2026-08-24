# Container de montagem: node (para o assemble.mjs) + ffmpeg/ffprobe.
# Existe para o host não precisar de ffmpeg instalado — regra de runtimes ad-hoc
# do gwan-infra (ver CLAUDE.md raiz).
FROM node:20-alpine

RUN apk add --no-cache ffmpeg

WORKDIR /work

ENTRYPOINT ["node"]
CMD ["e2e-demo/render/assemble.mjs"]
