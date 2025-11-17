import { Mail, MapPin, Phone } from 'lucide-react';
import { formatVersion, getAppVersion } from '@/utils/version';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Gwan
            </h3>
            <p className="text-muted-foreground">
              Integração de sistemas com inteligência artificial para
              transformar o seu negócio.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#produtos"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Produtos
                </a>
              </li>
              <li>
                <a
                  href="#chatbots"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Chatbots
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>contato@gwan.com.br</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+55 (11) 98722-1050</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>São Paulo, Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Gwan. Todos os direitos
            reservados.
          </p>
          <p className="text-sm text-muted-foreground/80 mt-2">
            {formatVersion(getAppVersion())}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
