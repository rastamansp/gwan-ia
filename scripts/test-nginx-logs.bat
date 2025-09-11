@echo off
echo === Testando Logs do Nginx ===

REM Verificar se o container está rodando
docker ps | findstr gwan-site-local >nul
if %errorlevel% neq 0 (
    echo ❌ Container não está rodando. Inicie com: docker-compose up -d
    pause
    exit /b 1
)

echo ✅ Container está rodando
echo 📋 Mostrando logs do nginx (Ctrl+C para sair):
echo 💡 Acesse http://localhost:8080 em outro terminal para ver os logs de acesso
echo.

docker logs gwan-site-local --follow
