import React from 'react';
import { Page } from '../types';
import { Icon } from '../components/Icon';

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen pb-24">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-slate-200 dark:border-slate-800">
        <div className="flex size-10 shrink-0 items-center justify-center">
          <Icon name="settings" className="text-2xl" />
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">个人中心</h2>
        <div className="flex w-10 items-center justify-end">
          <button className="relative flex items-center justify-center h-10 w-10">
            <Icon name="notifications" className="text-2xl" />
            <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500"></span>
          </button>
        </div>
      </nav>

      {/* Main Content Container */}
      <main className="max-w-md mx-auto">
        {/* Profile Header */}
        <div className="flex p-6 items-center gap-4">
          <div className="relative">
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-20 w-20 border-2 border-primary" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuByPRD1DoZZZAbh0AQrZ_45shqoY0VD-DDxqX2BEOR1cLh3PWdJbcx8tCmekaO9qvKNAFZa2GoQZ9Jcv-SwJnp0Emti0PA61utTDjbFY3gbDC0s88QH4P0qY2DC16ZX3XoNrTYeyrnVdr6X3qwtsY7CM5wV-TGBtfRZtnvl9NYk_SzpgYhsgNJPIjVt7iWm8RBqSCbvZj-upFPjVndXPgYenRjWObmSaX9jiv6lENc7MEiUEtGZCmRUWmH9aBHnffWri2MC6SPbzbzQ")' }}
            >
            </div>
            <div className="absolute -bottom-1 -right-1 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">PRO</div>
          </div>
          <div className="flex flex-col">
            <p className="text-xl font-bold leading-tight">Alex Rivers</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1">
              <Icon name="eco" className="text-sm" />
              减碳英雄：已减少 24.5kg
            </p>
          </div>
        </div>

        {/* Premium Member Card */}
        <div className="px-4 mb-6">
          <div className="relative overflow-hidden bg-gradient-to-br from-primary via-blue-600 to-indigo-800 rounded-xl p-6 shadow-xl">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Icon name="water_drop" className="text-6xl" />
            </div>
            <div className="flex flex-col h-full justify-between gap-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-100/80 text-xs font-medium uppercase tracking-[0.2em] mb-1">高级会员卡</p>
                  <p className="text-white text-3xl font-bold">精英潜水员</p>
                </div>
                <Icon name="contactless" className="text-white/50 text-4xl" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-blue-100/80 text-xs mb-1">总奖励积分</p>
                  <p className="text-white text-2xl font-bold">3,450</p>
                </div>
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                  5 张优惠券
                  <Icon name="arrow_forward_ios" className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Wall */}
        <section className="mb-6">
          <div className="flex items-center justify-between px-4 pb-2 pt-2">
            <h3 className="text-lg font-bold">成就墙</h3>
            <button className="text-primary text-sm font-semibold">查看全部</button>
          </div>
          <div className="grid grid-cols-4 gap-3 p-4">
            <div className="flex flex-col items-center gap-2">
              <div className="aspect-square w-full rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary border border-primary/20 shadow-lg shadow-primary/10">
                <Icon name="scuba_diving" className="text-3xl" />
              </div>
              <span className="text-[10px] font-medium text-center truncate w-full">深海</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="aspect-square w-full rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-amber-500 border border-amber-500/20 shadow-lg shadow-amber-500/10">
                <Icon name="emoji_events" className="text-3xl" />
              </div>
              <span className="text-[10px] font-medium text-center truncate w-full">马拉松</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="aspect-square w-full rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                <Icon name="eco" className="text-3xl" />
              </div>
              <span className="text-[10px] font-medium text-center truncate w-full">环保卫士</span>
            </div>
            <div className="flex flex-col items-center gap-2 opacity-40 grayscale">
              <div className="aspect-square w-full rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700">
                <Icon name="workspace_premium" className="text-3xl" />
              </div>
              <span className="text-[10px] font-medium text-center truncate w-full">专业潜水员</span>
            </div>
          </div>
        </section>

        {/* Lighting Progress Section */}
        <section className="px-4 mb-8">
          <h3 className="text-lg font-bold mb-4">活动点亮进度</h3>
          <div className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="relative flex justify-between items-center mb-2">
              {/* Progress Line Background */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 rounded-full"></div>
              {/* Active Progress Line */}
              <div className="absolute top-1/2 left-0 w-2/3 h-1 bg-primary -translate-y-1/2 rounded-full shadow-[0_0_15px_rgba(19,127,236,0.4)]"></div>
              {/* Steps */}
              <div className="relative flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center z-10 shadow-[0_0_15px_rgba(19,127,236,0.4)]">
                  <Icon name="check" className="text-lg" />
                </div>
                <span className="text-[10px] font-bold text-primary">已报名</span>
              </div>
              <div className="relative flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center z-10 shadow-[0_0_15px_rgba(19,127,236,0.4)]">
                  <Icon name="pool" className="text-lg" />
                </div>
                <span className="text-[10px] font-bold text-primary">已参与</span>
              </div>
              <div className="relative flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 flex items-center justify-center z-10">
                  <Icon name="energy_savings_leaf" className="text-lg" />
                </div>
                <span className="text-[10px] font-medium text-slate-500">已到账</span>
              </div>
            </div>
          </div>
        </section>

        {/* Functional List */}
        <section className="px-4 space-y-2">
          <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Icon name="confirmation_number" />
              </div>
              <span className="font-medium">我的报名</span>
            </div>
            <Icon name="chevron_right" className="text-slate-400" />
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Icon name="forum" />
              </div>
              <span className="font-medium">我的帖子</span>
            </div>
            <Icon name="chevron_right" className="text-slate-400" />
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                <Icon name="support_agent" />
              </div>
              <span className="font-medium">客服中心</span>
            </div>
            <Icon name="chevron_right" className="text-slate-400" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;