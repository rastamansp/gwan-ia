import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { legacyMartPathToStore } from '../../utils/martStore';

/**
 * Fallback da SPA para os caminhos legados da loja (`/gwan-mart/catalog`,
 * `/gwan-mart/product/:code` e qualquer outro sob `/gwan-mart/`).
 *
 * Em produção o nginx já responde 302 para catálogo e produto antes de a SPA
 * carregar; este componente cobre a navegação interna, o dev e os caminhos que
 * o nginx não mapeia. `replace` para o caminho legado não ficar no histórico:
 * o botão "voltar" não pode cair de novo no redirecionamento.
 */
const MartStoreRedirect = () => {
  const { pathname, search, hash } = useLocation();
  const target = legacyMartPathToStore(pathname, search, hash);

  useEffect(() => {
    window.location.replace(target);
  }, [target]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <p className="text-center text-muted-foreground">
        A loja do Gwan Mart mudou de endereço.{' '}
        <a href={target} className="font-medium text-primary hover:underline">
          Ir para a loja
        </a>
      </p>
    </div>
  );
};

export default MartStoreRedirect;
