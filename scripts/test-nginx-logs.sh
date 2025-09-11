#!/bin/bash

echo "=== Testando Logs do Nginx ==="

# Verificar se o container está rodando
if ! docker ps | grep -q gwan-site-local; then
    echo "❌ Container não está rodando. Inicie com: docker-compose up -d"
    exit 1
fi

echo "✅ Container está rodando"

# Mostrar logs em tempo real
echo "📋 Mostrando logs do nginx (Ctrl+C para sair):"
echo "💡 Acesse http://localhost:8080 em outro terminal para ver os logs de acesso"
echo ""

docker logs gwan-site-local --follow
