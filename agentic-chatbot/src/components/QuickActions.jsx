import React from 'react';
import { Zap, Package, Headphones, CreditCard, Truck, Shield, MessageSquare } from 'lucide-react';

const QuickActions = ({ onActionClick }) => {
  const quickActions = [
    {
      icon: Package,
      label: 'Products',
      action: 'Show me your latest products and pricing'
    },
    {
      icon: CreditCard,
      label: 'Billing',
      action: 'I have a question about my billing and payment'
    },
    {
      icon: Truck,
      label: 'Shipping',
      action: 'Track my order and shipping status'
    },
    {
      icon: Shield,
      label: 'Security',
      action: 'I need help with account security and privacy'
    },
    {
      icon: Headphones,
      label: 'Technical',
      action: 'I need technical support for a bug or error'
    },
    {
      icon: MessageSquare,
      label: 'Human Agent',
      action: 'Connect me with a human support agent'
    }
  ];

  return (
    <div className="mb-6 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Zap className="text-purple-400" size={20} />
        <h3 className="text-white font-semibold">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {quickActions.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => onActionClick(item.action)}
              className="p-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 rounded-xl transition-all duration-300 group flex flex-col items-center space-y-2 hover:scale-105"
            >
              <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                <IconComponent className="text-purple-300 group-hover:text-purple-200" size={20} />
              </div>
              <span className="text-white text-xs text-center font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
