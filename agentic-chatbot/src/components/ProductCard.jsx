import React from 'react';
import { ShoppingCart, Star, Info, ArrowRight } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-black/40 hover:border-purple-500/30 transition-all duration-300 group">
      <div className="flex items-start space-x-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-shadow"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-sm mb-1 truncate">{product.name}</h4>
          <p className="text-gray-300 text-xs mb-2 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-400 font-bold text-sm">{product.price}</span>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={`${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                />
              ))}
              <span className="text-gray-400 text-xs ml-1">(4.8)</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mb-3">
            {product.features.slice(0, 2).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-lg border border-purple-500/20"
              >
                {feature}
              </span>
            ))}
            {product.features.length > 2 && (
              <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-lg">
                +{product.features.length - 2} more
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            <button className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded-xl transition-all duration-300 flex items-center justify-center space-x-1 group-hover:scale-105">
              <ShoppingCart size={12} />
              <span>Add to Cart</span>
            </button>
            <button className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs rounded-xl transition-all duration-300 flex items-center justify-center">
              <Info size={12} />
            </button>
            <button className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs rounded-xl transition-all duration-300 flex items-center justify-center">
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
