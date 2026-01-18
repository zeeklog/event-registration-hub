import { MapPin, Clock, Users, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Activity } from '@/types';

interface ActivityCardProps {
  activity: Activity;
  variant?: 'default' | 'horizontal';
}

export const ActivityCard = ({ activity, variant = 'default' }: ActivityCardProps) => {
  const navigate = useNavigate();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'rowing': return 'bg-action';
      case 'cycling': return 'bg-points-sports';
      case 'camping': return 'bg-eco text-navy';
      default: return 'bg-action';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'rowing': return '赛艇';
      case 'cycling': return '骑行';
      case 'camping': return '露营';
      default: return type;
    }
  };

  const spotsLeft = activity.capacity - activity.enrolled;
  const spotsPercentage = (activity.enrolled / activity.capacity) * 100;

  if (variant === 'horizontal') {
    return (
      <Card 
        className="overflow-hidden border border-white/5 bg-navy-light rounded-md shadow-xl hover:shadow-action/10 transition-all duration-200 cursor-pointer"
        onClick={() => navigate(`/activity/${activity.id}`)}
      >
        <CardContent className="p-0">
          <div className="flex">
            <div className="relative w-32 h-32 flex-shrink-0">
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full h-full object-cover"
              />
              <Badge 
                className={`absolute top-2 left-2 text-[10px] font-bold border-0 ${getTypeColor(activity.type)}`}
              >
                {getTypeLabel(activity.type)}
              </Badge>
            </div>
            <div className="flex-1 p-3 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-white line-clamp-2 leading-tight">
                  {activity.title}
                </h3>
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-400 font-medium">
                  <MapPin className="w-3 h-3 text-action" />
                  <span className="line-clamp-1">{activity.location}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-action">
                    ¥{activity.price}
                  </span>
                  {activity.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">
                      ¥{activity.originalPrice}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-bold ${spotsLeft < 10 ? 'text-red-500' : 'text-eco'}`}>
                  剩{spotsLeft}位
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="overflow-hidden bg-navy-light border border-white/5 rounded-md shadow-xl hover:shadow-action/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer active:scale-95"
      onClick={() => navigate(`/activity/${activity.id}`)}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[4/3]">
          <img
            src={activity.image}
            alt={activity.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 flex gap-1">
            <Badge 
              className={`text-[10px] font-bold border-0 ${getTypeColor(activity.type)} shadow-lg`}
            >
              {getTypeLabel(activity.type)}
            </Badge>
            {activity.isHot && (
              <Badge className="text-[10px] font-bold border-0 bg-red-500 text-white shadow-lg">
                热门
              </Badge>
            )}
          </div>
          {activity.deadline && (
            <Badge className="absolute top-2 right-2 text-[10px] font-bold border-0 bg-orange-500 text-white shadow-lg">
              截止: {activity.deadline}
            </Badge>
          )}
        </div>

        <div className="p-3 space-y-2">
          <h3 className="text-sm font-bold text-white line-clamp-2 leading-tight">
            {activity.title}
          </h3>
          
          <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-action" />
              <span className="line-clamp-1">{activity.location}</span>
            </div>
            {activity.distance && (
              <span className="text-action">
                {activity.distance}km
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-eco" />
              <span>{activity.date}</span>
            </div>
          </div>

          {/* 报名进度 */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] font-bold">
              <div className="flex items-center gap-1 text-gray-400">
                <Users className="w-3 h-3" />
                <span>{activity.enrolled}/{activity.capacity}人</span>
              </div>
              <span className={spotsLeft < 10 ? 'text-red-500' : 'text-eco'}>
                剩{spotsLeft}位
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  spotsPercentage > 80 
                    ? 'bg-red-500' 
                    : 'bg-eco'
                }`}
                style={{ width: `${spotsPercentage}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-baseline gap-1">
              <span className="text-base font-bold text-action">
                ¥{activity.price}
              </span>
            </div>
            <Button 
              size="sm" 
              className="h-7 px-3 text-[10px] font-bold rounded-sm bg-action text-white shadow-lg shadow-action/20"
            >
              立即预约
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
