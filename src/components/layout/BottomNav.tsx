import { Link, useLocation } from 'react-router-dom';
import { Home, Grid3X3, User, MessageCircle, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/category', label: '分类', icon: Grid3X3 },
  { path: '/points-mall', label: '积分商城', icon: ShoppingBag },
  { path: '/service', label: '客服', icon: MessageCircle },
  { path: '/profile', label: '我的', icon: User },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border"
    >
      <div className="flex items-center justify-around py-2 px-4 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200",
                isActive ? "text-action" : "text-muted-foreground"
              )}
            >
              <Icon 
                className={cn("w-6 h-6", isActive && "animate-pulse")}
                style={{
                  filter: isActive ? `drop-shadow(0 0 8px rgba(37, 137, 245, 0.4))` : 'none'
                }}
              />
              <span 
                className={cn(
                  "text-[10px] font-medium",
                  isActive ? "font-bold" : "font-medium"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
