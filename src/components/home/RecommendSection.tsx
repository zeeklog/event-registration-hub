import { Activity } from '@/types';
import { ActivityCard } from '@/components/activity/ActivityCard';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface RecommendSectionProps {
  title: string;
  icon?: ReactNode;
  activities: Activity[];
  viewAllLink?: string;
}

export const RecommendSection = ({ title, icon, activities, viewAllLink }: RecommendSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon && <div className="text-action">{icon}</div>}
          <h2 className="text-xl font-bold text-white">
            {title}
          </h2>
        </div>
        {viewAllLink && (
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray-400 hover:text-action hover:bg-transparent transition-colors duration-200"
            onClick={() => navigate(viewAllLink)}
          >
            <span className="text-sm font-medium">查看全部</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {activities.slice(0, 4).map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </section>
  );
};
