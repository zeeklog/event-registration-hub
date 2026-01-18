import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout/Layout';
import { activities, orders } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Calendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  const getActivitiesForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return activities.filter(a => {
      if (a.date.includes('每周')) {
        const dayOfWeek = date.getDay();
        return (a.date.includes('周六') && dayOfWeek === 6) || 
               (a.date.includes('周日') && dayOfWeek === 0);
      }
      return a.date === dateStr || a.date.startsWith(dateStr);
    });
  };
  
  const getOrdersForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return orders.filter(o => {
      const orderDate = o.activity.date;
      if (orderDate.includes('每周')) {
        const dayOfWeek = date.getDay();
        return (orderDate.includes('周六') && dayOfWeek === 6) || 
               (orderDate.includes('周日') && dayOfWeek === 0);
      }
      return orderDate === dateStr || orderDate.startsWith(dateStr);
    });
  };
  
  const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  
  const today = new Date();
  const isToday = (day: number) => {
    return year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
  };
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const selectedActivities = selectedDate ? getActivitiesForDate(selectedDate) : [];
  const selectedOrders = selectedDate ? getOrdersForDate(selectedDate) : [];
  
  return (
    <Layout showHeader={false}>
      <div className="min-h-screen bg-navy pb-20">
        {/* 顶部导航 */}
        <header className="sticky top-0 z-40 glass border-b border-white/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/5"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold text-white flex-1">活动日历</h1>
          </div>

          <div className="flex items-center justify-between px-4 py-2 bg-white/5">
            <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-2 text-gray-400 hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <h2 className="text-base font-black text-white uppercase tracking-widest">
                {monthNames[month]} {year}
              </h2>
              <button 
                onClick={() => { setCurrentDate(new Date()); setSelectedDate(new Date()); }}
                className="px-2 py-0.5 rounded-sm bg-action/20 text-action text-[10px] font-black border border-action/30"
              >
                TODAY
              </button>
            </div>
            <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-2 text-gray-400 hover:text-white transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 px-2 pb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-[10px] font-black text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>
        </header>
        
        <div className="px-2 py-4">
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startingDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const date = new Date(year, month, day);
              const dayActivities = getActivitiesForDate(date);
              const dayOrders = getOrdersForDate(date);
              const hasActivities = dayActivities.length > 0;
              const hasOrders = dayOrders.length > 0;
              const isActive = selectedDate && date.toDateString() === selectedDate.toDateString();
              
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(date)}
                  className={cn(
                    "aspect-square p-1 rounded-sm border transition-all relative flex flex-col items-center justify-center",
                    isActive ? "bg-action border-action shadow-lg shadow-action/20 scale-110 z-10" : "bg-navy-light border-white/5",
                    isToday(day) && !isActive && "border-eco/50 text-eco"
                  )}
                >
                  <div className={cn("text-xs font-bold", isActive ? "text-white" : "text-gray-400")}>{day}</div>
                  <div className="flex gap-0.5 mt-1">
                    {hasOrders && <div className={cn("w-1 h-1 rounded-full", isActive ? "bg-white" : "bg-eco")} />}
                    {hasActivities && !hasOrders && <div className={cn("w-1 h-1 rounded-full", isActive ? "bg-white" : "bg-action")} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        {selectedDate && (
          <div className="px-4 py-6 space-y-6 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <div className="w-1 h-4 bg-action rounded-full" />
                {selectedDate.getMonth() + 1}月{selectedDate.getDate()}日行程
              </h3>
              <Badge className="bg-white/5 text-gray-500 border-0 text-[10px] font-bold">
                {selectedActivities.length + selectedOrders.length} 个项
              </Badge>
            </div>
            
            <div className="space-y-4">
              {selectedOrders.map(order => (
                <Card 
                  key={order.id}
                  className="bg-navy-light border-white/5 cursor-pointer active:scale-[0.98] transition-all"
                  onClick={() => navigate(`/activity/${order.activityId}`)}
                >
                  <CardContent className="p-3">
                    <div className="flex gap-4">
                      <img src={order.activity.image} className="w-16 h-16 object-cover rounded-sm border border-white/10" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-bold text-sm text-white truncate">{order.activity.title}</h5>
                          <Badge className="bg-eco text-navy text-[8px] h-4 font-black">已预约</Badge>
                        </div>
                        <div className="flex flex-col gap-1 mt-2">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                            <Clock className="w-3 h-3 text-eco" />
                            <span>{order.activity.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                            <MapPin className="w-3 h-3 text-action" />
                            <span className="truncate">{order.activity.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {selectedActivities
                .filter(a => !selectedOrders.some(o => o.activityId === a.id))
                .map(activity => (
                  <Card 
                    key={activity.id}
                    className="bg-navy-light border-white/5 opacity-80 cursor-pointer active:scale-[0.98] transition-all"
                    onClick={() => navigate(`/activity/${activity.id}`)}
                  >
                    <CardContent className="p-3">
                      <div className="flex gap-4">
                        <img src={activity.image} className="w-16 h-16 object-cover rounded-sm grayscale-[0.5]" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-bold text-sm text-gray-300 truncate">{activity.title}</h5>
                            <Badge className="bg-action/20 text-action border border-action/30 text-[8px] h-4 font-black text-[8px]">可预约</Badge>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {activity.time}
                            </div>
                            <span className="text-xs font-black text-action">¥{activity.price}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              
              {selectedActivities.length === 0 && selectedOrders.length === 0 && (
                <div className="text-center py-12">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-10 text-white" />
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">No activities scheduled</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Calendar;
