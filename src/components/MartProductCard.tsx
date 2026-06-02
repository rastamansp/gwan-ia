import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type Numeric = number | string | null;

export interface MartProductCardData {
  code: string;
  name?: string | null;
  description?: string | null;
  thumbnail?: string | null;
  averageRating?: Numeric;
  totalReviews?: Numeric;
  originalPrice?: Numeric;
  promotionalPrice?: Numeric;
  discountPercentage?: Numeric;
  similarity?: number | null;
}

interface MartProductCardProps {
  product: MartProductCardData;
  /** Exibe o selo de similaridade (busca com IA). */
  showSimilarity?: boolean;
}

const placeholderSvg = `
  <div class="placeholder-svg w-full h-48 bg-muted flex items-center justify-center">
    <svg class="w-16 h-16 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
    </svg>
  </div>`;

const MartProductCard = ({ product, showSimilarity }: MartProductCardProps) => {
  const title =
    product.name || product.description || `Produto ${product.code}`;
  const rating = Number(product.averageRating) || 0;
  const reviews = Number(product.totalReviews) || 0;
  const discount = Number(product.discountPercentage) || 0;
  const original = Number(product.originalPrice) || 0;
  const current =
    Number(product.promotionalPrice || product.originalPrice) || 0;

  return (
    <Link to={`/gwan-mart/product/${product.code}`} className="group block">
      <Card className="relative h-full overflow-hidden border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-hover">
        {/* Image */}
        <div className="relative">
          <img
            src={product.thumbnail ?? undefined}
            alt={title}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={e => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent && !parent.querySelector('.placeholder-svg')) {
                parent.innerHTML = placeholderSvg;
              }
            }}
          />

          <button
            className="absolute right-2 top-2 rounded-full bg-background/80 p-2 shadow-sm backdrop-blur-sm transition-colors hover:bg-background"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              // TODO: Implementar favoritos
            }}
            aria-label="Adicionar aos favoritos"
          >
            <Heart className="h-5 w-5 text-muted-foreground transition-colors hover:text-destructive" />
          </button>
        </div>

        {/* Info */}
        <CardContent className="space-y-3 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block rounded bg-primary px-2 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
              Mais Vendido
            </span>
            {showSimilarity && product.similarity != null && (
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                {`${(product.similarity * 100).toFixed(1)}% similar`}
              </span>
            )}
          </div>

          <h3 className="line-clamp-2 text-sm font-semibold text-card-foreground transition-colors group-hover:text-primary">
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-card-foreground">
              {rating.toFixed(1)}
            </span>
            <div className="flex text-primary">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({reviews})</span>
          </div>

          {/* Price */}
          <div className="space-y-1">
            {discount > 0 && (
              <div className="text-sm text-muted-foreground line-through">
                R$ {original.toLocaleString('pt-BR')}
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-card-foreground">
                R$ {current.toLocaleString('pt-BR')}
              </span>
              {discount > 0 && (
                <span className="text-sm font-semibold text-green-600 dark:text-green-500">
                  {discount}% OFF
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MartProductCard;
