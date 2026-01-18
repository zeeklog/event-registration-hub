import { useState } from 'react';
import { Search, MapPin, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { colors, gradients } from '@/lib/design-system';

interface HeaderProps {
  showSearch?: boolean;
  unreadCount?: number;
}

export const Header = ({ showSearch = true, unreadCount = 2 }: HeaderProps) => {
  const [location, setLocation] = useState('深圳');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const navigate = useNavigate();

  const cities = ['杭州', '上海', '北京', '广州', '深圳', '成都', '南京', '苏州'];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header 
      className="sticky top-0 z-40 glass border-b border-border"
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {/* 定位 */}
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 px-2 hover:bg-muted text-foreground"
          onClick={() => setShowLocationDialog(true)}
        >
          <MapPin className="w-4 h-4 text-action" />
          <span className="text-sm font-medium">{location}</span>
        </Button>

        {/* 搜索框 */}
        {showSearch && (
          <div className="flex-1 relative">
            <Search 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" 
            />
            <Input
              placeholder="搜索活动、基地、赛事..."
              className="pl-10 border-0 bg-muted text-foreground placeholder:text-muted-foreground rounded-md focus-visible:ring-action"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
        )}

        {/* 消息通知 */}
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-muted text-foreground"
          onClick={() => navigate('/notifications')}
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[10px] font-bold border-0 bg-red-500 text-white"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* 城市选择弹窗 */}
      <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
        <DialogContent className="bg-card border-border text-foreground">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              选择城市
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-2 pt-4">
            {cities.map((city) => (
              <Button
                key={city}
                variant={city === location ? 'default' : 'outline'}
                size="sm"
                className={`font-medium rounded-sm ${
                  city === location 
                    ? 'bg-action text-white border-0' 
                    : 'border-border text-muted-foreground hover:bg-muted'
                }`}
                onClick={() => {
                  setLocation(city);
                  setShowLocationDialog(false);
                }}
              >
                {city}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};
