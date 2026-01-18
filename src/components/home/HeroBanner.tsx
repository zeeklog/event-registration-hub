import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Banner } from '@/types';

interface HeroBannerProps {
  banners: Banner[];
}

export const HeroBanner = ({ banners }: HeroBannerProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="px-4 pt-4">
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg group shadow-2xl hover:shadow-action/10 transition-all duration-300">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={cn(
              "absolute inset-0 transition-all duration-500 ease-in-out",
              index === current ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
            )}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            {/* 渐变遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent dark:from-white/10 dark:via-transparent dark:to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-xl font-bold text-white leading-tight drop-shadow-md">
                {banner.title}
              </h3>
              {banner.subtitle && (
                <p className="text-sm text-gray-200 mt-1 font-medium">
                  {banner.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* Navigation buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-sm bg-white/10 hover:bg-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200"
          onClick={handlePrev}
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-sm bg-white/10 hover:bg-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200"
          onClick={handleNext}
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </Button>

        {/* Indicators */}
        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {banners.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === current ? "w-6 bg-action" : "w-1.5 bg-white/30"
              )}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
