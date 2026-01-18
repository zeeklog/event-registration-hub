import React from 'react';
import { Page } from '../types';
import { Icon } from '../components/Icon';

interface PointsCenterProps {
  onBack: () => void;
}

const PointsCenter: React.FC<PointsCenterProps> = ({ onBack }) => {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden pb-24">
      {/* TopAppBar */}
      <div className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between">
        <button onClick={onBack} className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full justify-center transition-colors">
          <Icon name="arrow_back_ios_new" className="text-xl" />
        </button>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Points & Rewards</h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex cursor-pointer items-center justify-center rounded-xl h-12 bg-transparent text-slate-900 dark:text-white gap-2">
            <Icon name="info" />
          </button>
        </div>
      </div>

      {/* Charts / Dashboard Section */}
      <div className="flex flex-col gap-6 px-4 py-6">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Multi-colored Ring Chart Simulation */}
          <div className="relative flex items-center justify-center size-56">
            <div 
              className="size-full rounded-full flex items-center justify-center p-6"
              style={{
                background: 'conic-gradient(#137fec 0% 45%, #a855f7 45% 65%, #f59e0b 65% 85%, #10b981 85% 100%)'
              }}
            >
              <div className="bg-background-light dark:bg-background-dark size-full rounded-full flex flex-col items-center justify-center shadow-inner">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-widest">Total</p>
                <p className="text-slate-900 dark:text-white tracking-tight text-[40px] font-bold leading-tight">12,450</p>
                <div className="flex items-center gap-1">
                  <Icon name="trending_up" className="text-carbon text-sm" />
                  <p className="text-carbon text-sm font-medium leading-normal">+12%</p>
                </div>
              </div>
            </div>
          </div>
          {/* Legend */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="size-3 rounded-full bg-sports"></div>
              <div className="flex flex-col">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Sports</p>
                <p className="text-sm font-bold">5,600</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="size-3 rounded-full bg-arts"></div>
              <div className="flex flex-col">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Arts</p>
                <p className="text-sm font-bold">2,490</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="size-3 rounded-full bg-events"></div>
              <div className="flex flex-col">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Events</p>
                <p className="text-sm font-bold">2,490</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="size-3 rounded-full bg-carbon"></div>
              <div className="flex flex-col">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Carbon</p>
                <p className="text-sm font-bold">1,870</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SingleButton: Main CTA */}
      <div className="px-4 py-3">
        <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-primary text-white gap-3 text-lg font-bold shadow-lg shadow-primary/30 transition-transform active:scale-95">
          <Icon name="qr_code_scanner" className="!text-[28px]" />
          <span className="truncate">Scan to Earn Points</span>
        </button>
      </div>

      {/* SectionHeader: Community Leaders */}
      <div className="flex items-center justify-between px-4 pb-2 pt-6">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Community Leaders</h3>
        <span className="text-primary text-sm font-medium cursor-pointer">View All</span>
      </div>

      {/* StoryCarousel: Rankings */}
      <div className="flex w-full overflow-x-auto no-scrollbar px-4 py-3">
        <div className="flex min-h-min flex-row items-start justify-start gap-6">
          <div className="flex flex-col items-center gap-2 w-20 shrink-0">
            <div className="relative">
              <div className="size-16 bg-center bg-no-repeat aspect-square bg-cover rounded-full border-2 border-primary p-0.5" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCtYA6yMCGehYet-J-5ls15YPhFuFMIE1axz1cMk5Nh4H5myhoPWP9v1H-Sw00V1n8gKYRNKjCGlfEU0HdxGdcQqsGWu4ZiT8wl8RFjE9dKnJe8PjyWSFKik4gxOVC-mCXmRnUdlShhBk_jZiOK-6jq0lo56ONF_4nwvqp7r8L6YSVFCXeZYFf_soohSqXoGXvKq-k-uymVCeVzvf5VRkHCzrslEBXtVwZxg3xmPPoUxir2ifma340BmDiW-E6tuSiDZ9AdBwEmu6Va")' }}></div>
              <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-background-dark">#1</div>
            </div>
            <p className="text-slate-900 dark:text-white text-[13px] font-semibold leading-normal truncate w-full text-center">Alex</p>
          </div>
          <div className="flex flex-col items-center gap-2 w-20 shrink-0">
            <div className="relative">
              <div className="size-16 bg-center bg-no-repeat aspect-square bg-cover rounded-full border-2 border-slate-700 p-0.5 opacity-80" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCC672S6ktClIiRInS_rGSZjVAoGSkNlvJu6snQG394M_Ed8jNVBSvZpKS2OHvYfaTtuB4b2M4oTY1G-kNAFuGrm5tKxPpRnQASm2TqXlUeIlisTgzOJRX7FehImCriUsQpgKiydnNQb4ndGx8TsuOHRJy-lyfRkYFvCs24M76sUF4jGR3D4WIPSAONcPKrEEVm9UzvEErz7R7s99EPu-KAFQ9vOzBcVs8B0yujGQB7l7F3N5D_uOVOvVehDGgpqX2F7Mr-TKUdW99G")' }}></div>
              <div className="absolute -bottom-1 -right-1 bg-slate-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-background-dark">#2</div>
            </div>
            <p className="text-slate-900 dark:text-white text-[13px] font-medium leading-normal truncate w-full text-center">Sam</p>
          </div>
          <div className="flex flex-col items-center gap-2 w-20 shrink-0">
            <div className="relative">
              <div className="size-16 bg-center bg-no-repeat aspect-square bg-cover rounded-full border-2 border-slate-700 p-0.5 opacity-80" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBAyyq0qxasdO0PuBdpIVA10y9Z5A1QdDciZp5kplg6DTxadcbGuOoxNlSix9f0lonvZWXqHK7iAyZfTXCNVztrHqtYglZG3XvdXbFD-RvgH6FMMTrLqIjNKkjYHnHQE5hhQccx6nKNCsxp319zkeLmKwBoAFoDJ9s_FsJXOvW8RZVbkSm9GpHE9pygfF4fGl0Y466jT0h1SlIBemEVh8zeGwKzNED23nd0juAthkwpNXZxATZlfBMSG5_21BTIP_p0af-4djfOyKrB")' }}></div>
              <div className="absolute -bottom-1 -right-1 bg-orange-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-background-dark">#3</div>
            </div>
            <p className="text-slate-900 dark:text-white text-[13px] font-medium leading-normal truncate w-full text-center">Jordan</p>
          </div>
          <div className="flex flex-col items-center gap-2 w-20 shrink-0">
            <div className="size-16 bg-center bg-no-repeat aspect-square bg-cover rounded-full border-2 border-transparent opacity-60" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBPfIaMbE_TAxiOkZ3Wa_JHGuItJRxY4MXB61MYg2XefYrzteYaGnIs6l9eHyreIxngPnDf-N1ZmxrGNBj4_CxJWC4tSt02NCIRHXY855aGftQCy48CO6Kmr1S6ZRscSpB_LK6GEd81jELihq6WaXuxG-JJHeKZddUnR9NR9Q5Ic6Uag5zDk7OG9o-l3Lp9MJU6dCqsk-NwnJr-1uS7XSSjdAJodkpIJikG0_lHbb8PYztI07qy0XvU96pv-u9ypOxvfyEwqjsi11A_")' }}></div>
            <p className="text-slate-900 dark:text-white text-[13px] font-medium leading-normal truncate w-full text-center">Taylor</p>
          </div>
        </div>
      </div>

      {/* SectionHeader: Recent Activity */}
      <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-6">Recent Points Logs</h3>

      {/* Activity Logs List */}
      <div className="flex flex-col gap-3 px-4 pb-12">
        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-sports/20 flex items-center justify-center text-sports">
              <Icon name="surfing" />
            </div>
            <div>
              <p className="text-slate-900 dark:text-white font-bold text-sm">Morning Surf Session</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs">Coastal Region • Today</p>
            </div>
          </div>
          <p className="text-carbon font-bold">+150</p>
        </div>

        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-carbon/20 flex items-center justify-center text-carbon">
              <Icon name="eco" />
            </div>
            <div>
              <p className="text-slate-900 dark:text-white font-bold text-sm">Beach Cleanup Drive</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs">Environment • Yesterday</p>
            </div>
          </div>
          <p className="text-carbon font-bold">+300</p>
        </div>

        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-events/20 flex items-center justify-center text-events">
              <Icon name="event" />
            </div>
            <div>
              <p className="text-slate-900 dark:text-white font-bold text-sm">Outdoor Photo Expo</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs">Arts & Culture • 2 days ago</p>
            </div>
          </div>
          <p className="text-carbon font-bold">+50</p>
        </div>

        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-sports/20 flex items-center justify-center text-sports">
              <Icon name="hiking" />
            </div>
            <div>
              <p className="text-slate-900 dark:text-white font-bold text-sm">Summit Registration</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs">Peak Challenge • Oct 24</p>
            </div>
          </div>
          <p className="text-carbon font-bold">+200</p>
        </div>
      </div>
    </div>
  );
};

export default PointsCenter;