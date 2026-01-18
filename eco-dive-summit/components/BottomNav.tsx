import React from 'react';
import { Page } from '../types';
import { Icon } from './Icon';

interface BottomNavProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activePage, onNavigate }) => {
  // If we are in registration, we usually show a different bar (Pay bar), so we might hide this one.
  // But for the main navigation flow:
  
  const navItemClass = (isActive: boolean) => 
    `flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-slate-400'}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-6 pb-6 pt-3 flex justify-between items-center z-50">
      <button onClick={() => onNavigate(Page.HOME)} className={navItemClass(activePage === Page.HOME)}>
        <Icon name="home" fill={activePage === Page.HOME} />
        <span className="text-[10px] font-bold">Home</span>
      </button>

      <button onClick={() => onNavigate(Page.EVENTS)} className={navItemClass(activePage === Page.EVENTS)}>
        <Icon name="explore" fill={activePage === Page.EVENTS} />
        <span className="text-[10px] font-bold">Events</span>
      </button>

      {/* Floating Action Button for Points/Scan */}
      <button 
        onClick={() => onNavigate(Page.POINTS_CENTER)}
        className="relative -top-6 flex items-center justify-center size-14 bg-primary text-white rounded-full shadow-lg shadow-primary/40 border-4 border-background-light dark:border-background-dark active:scale-95 transition-transform"
      >
        <Icon name="add" className="!text-3xl" />
      </button>

      <button onClick={() => onNavigate(Page.POINTS_MALL)} className={navItemClass(activePage === Page.POINTS_MALL)}>
        <Icon name="shopping_bag" fill={activePage === Page.POINTS_MALL} />
        <span className="text-[10px] font-bold">Mall</span>
      </button>

      <button onClick={() => onNavigate(Page.PROFILE)} className={navItemClass(activePage === Page.PROFILE)}>
        <Icon name="person" fill={activePage === Page.PROFILE} />
        <span className="text-[10px] font-bold">Profile</span>
      </button>
    </div>
  );
};