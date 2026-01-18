import React from 'react';
import { Page } from '../types';
import { Icon } from '../components/Icon';

interface EventRegisterProps {
  onBack: () => void;
}

const EventRegister: React.FC<EventRegisterProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="hover:bg-slate-200 dark:hover:bg-slate-800 p-2 rounded-full transition-colors">
                <Icon name="arrow_back_ios_new" className="text-lg" />
            </button>
            <div>
              <h2 className="text-lg font-bold leading-tight tracking-tight">大堡礁深潜</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                <span>9月20-22日</span>
                <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                <span className="text-green-500 flex items-center gap-0.5">
                  <Icon name="eco" className="!text-[14px]" />
                  -5.2kg CO₂
                </span>
              </p>
            </div>
          </div>
          <button className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <Icon name="share" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-32">
        {/* Event Banner Mini */}
        <div className="px-4 py-4">
          <div className="relative h-32 w-full rounded-xl overflow-hidden shadow-lg">
            <img 
              alt="Scuba diving" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY22WcFVN4VIwXhokjvuog0zi8X0PSJuxpsKw4W8IQ-Ar1RdqF-Hv_kpfsmF2413fC7Cez8onBGqW9z3Wu3_miz-SwO-mfQVn7TTZMFzwPXJ2G94kbWGEeZQ72nWvPUOco18-4KzJZvELwn1Um6rGcO8uriz5XyY4rYUYUzL9sjsHuR9kU1j0r6oIKbgwXqNNBFyGMEbWQ0a2OIDbehT92pOOkv_hgd9x_5LtTMlcde6mLNNp3zIXqXbVl6ubRBZNl1NsNmGgY0y_M"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">高级</span>
            </div>
          </div>
        </div>

        {/* Form Section: Personal Information */}
        <div className="space-y-1">
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider px-6 pb-2 pt-4">个人信息</h3>
          <div className="px-4 space-y-3">
            {/* Full Name */}
            <div className="flex flex-col w-full">
              <label className="bg-white dark:bg-[#1c2127] border border-slate-200 dark:border-[#3b4754] rounded-xl px-4 py-3 focus-within:border-primary transition-colors">
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium pb-1">姓名</p>
                <input className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#9dabb9] text-base" placeholder="请输入真实姓名" type="text" />
              </label>
            </div>
            {/* Phone Number */}
            <div className="flex flex-col w-full">
              <label className="bg-white dark:bg-[#1c2127] border border-slate-200 dark:border-[#3b4754] rounded-xl px-4 py-3 focus-within:border-primary transition-colors">
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium pb-1">手机号码</p>
                <div className="flex items-center">
                  <span className="text-slate-500 dark:text-slate-400 pr-2 border-r border-slate-200 dark:border-slate-700 mr-2 text-sm">+86</span>
                  <input className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#9dabb9] text-base" placeholder="请输入手机号码" type="tel" />
                </div>
              </label>
            </div>
            {/* ID Number */}
            <div className="flex flex-col w-full">
              <label className="bg-white dark:bg-[#1c2127] border border-slate-200 dark:border-[#3b4754] rounded-xl px-4 py-3 focus-within:border-primary transition-colors relative">
                <div className="flex justify-between items-center">
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium pb-1">身份证或护照号</p>
                  <Icon name="info" className="text-[18px] text-slate-400 cursor-help" />
                </div>
                <input className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#9dabb9] text-base uppercase" placeholder="仅用于保险目的" type="text" />
              </label>
            </div>
          </div>
        </div>

        {/* Form Section: Emergency Contact */}
        <div className="space-y-1 mt-6">
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider px-6 pb-2 pt-4">紧急联系人</h3>
          <div className="px-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <label className="bg-white dark:bg-[#1c2127] border border-slate-200 dark:border-[#3b4754] rounded-xl px-4 py-3 focus-within:border-primary transition-colors">
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium pb-1">联系人姓名</p>
                <input className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 dark:text-white text-base" placeholder="姓名" type="text" />
              </label>
              <label className="bg-white dark:bg-[#1c2127] border border-slate-200 dark:border-[#3b4754] rounded-xl px-4 py-3 focus-within:border-primary transition-colors">
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium pb-1">关系</p>
                <select className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 dark:text-white text-base appearance-none">
                  <option>配偶</option>
                  <option>父母</option>
                  <option>朋友</option>
                  <option>其他</option>
                </select>
              </label>
            </div>
            <label className="bg-white dark:bg-[#1c2127] border border-slate-200 dark:border-[#3b4754] rounded-xl px-4 py-3 focus-within:border-primary transition-colors">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium pb-1">紧急联系电话</p>
              <input className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 dark:text-white text-base" placeholder="联系电话" type="tel" />
            </label>
          </div>
        </div>

        {/* Reward Preview Card */}
        <div className="px-4 mt-8">
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-white p-2 rounded-lg">
                <Icon name="workspace_premium" className="text-[24px]" />
              </div>
              <div>
                <h4 className="font-bold text-sm">奖励积分</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">完成后可获得 1,200 积分</p>
              </div>
            </div>
            <span className="text-primary font-bold">+1200</span>
          </div>
        </div>

        {/* Privacy Policy Checkbox */}
        <div className="px-6 mt-6 flex gap-3 items-start">
          <input className="mt-1 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1c2127] text-primary focus:ring-primary h-4 w-4" type="checkbox" />
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            我已阅读并同意 <span className="text-primary font-medium">服务条款</span>，并确认我的个人信息将用于保险和活动报名。
          </p>
        </div>
      </main>

      {/* Bottom Action Bar (Sticky) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-background-dark/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 pb-[env(safe-area-inset-bottom,24px)] shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
        <div className="p-4 flex items-center justify-between gap-4 max-w-[480px] mx-auto">
          <div className="flex flex-col">
            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest">总金额</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-primary">¥</span>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">1,599</span>
            </div>
          </div>
          <button className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-xl flex items-center justify-center gap-3 transition-transform active:scale-[0.98] shadow-lg shadow-primary/30">
            <Icon name="payments" />
            <span>确认并支付</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventRegister;