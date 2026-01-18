import React, { useState } from 'react';
import { Page } from './types';
import Home from './pages/Home';
import EventRegister from './pages/EventRegister';
import PointsCenter from './pages/PointsCenter';
import PointsMall from './pages/PointsMall';
import Profile from './pages/Profile';
import { BottomNav } from './components/BottomNav';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.HOME);
  const [history, setHistory] = useState<Page[]>([]);

  const handleNavigate = (page: Page) => {
    // Basic history management for back buttons
    if (page !== activePage) {
      setHistory(prev => [...prev, activePage]);
      setActivePage(page);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    const prevPage = history[history.length - 1];
    if (prevPage) {
      setHistory(prev => prev.slice(0, -1));
      setActivePage(prevPage);
    } else {
      setActivePage(Page.HOME);
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case Page.HOME:
        return <Home onNavigate={handleNavigate} />;
      case Page.EVENT_REGISTER:
        return <EventRegister onBack={handleBack} />;
      case Page.POINTS_CENTER:
        return <PointsCenter onBack={handleBack} />;
      case Page.POINTS_MALL:
        return <PointsMall onNavigate={handleNavigate} />;
      case Page.PROFILE:
        return <Profile />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  const showBottomNav = activePage !== Page.EVENT_REGISTER && activePage !== Page.POINTS_CENTER;

  return (
    <div className="max-w-[480px] mx-auto bg-background-light dark:bg-background-dark min-h-screen shadow-2xl relative">
      {renderPage()}
      {showBottomNav && (
        <BottomNav activePage={activePage} onNavigate={handleNavigate} />
      )}
    </div>
  );
};

export default App;