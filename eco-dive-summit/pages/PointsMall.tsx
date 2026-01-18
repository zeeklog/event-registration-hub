import React from 'react';
import { Page } from '../types';
import { Icon } from '../components/Icon';

interface PointsMallProps {
  onNavigate: (page: Page) => void;
}

const PointsMall: React.FC<PointsMallProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen pb-24">
      {/* Top Nav Bar */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 pt-12 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate(Page.HOME)} className="flex items-center justify-center size-10 rounded-full bg-slate-200 dark:bg-slate-800">
              <Icon name="arrow_back_ios_new" className="text-xl" />
            </button>
            <h1 className="text-xl font-bold tracking-tight">积分商城</h1>
          </div>
          <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
            <Icon name="token" className="text-primary text-sm font-bold" />
            <span className="text-primary text-sm font-bold">2,450 pts</span>
          </div>
        </div>
      </header>

      <main className="px-4">
        {/* Search Bar */}
        <div className="py-4">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
              <div className="text-slate-400 flex border-none bg-white dark:bg-slate-800 items-center justify-center pl-4 rounded-l-xl border-r-0">
                <Icon name="search" />
              </div>
              <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-white dark:bg-slate-800 focus:border-none h-full placeholder:text-slate-400 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" placeholder="搜索装备、服饰、纪念品" defaultValue="" />
            </div>
          </label>
        </div>

        {/* Filter Tabs */}
        <div className="pb-6 sticky top-[92px] z-40 bg-background-light dark:bg-background-dark -mx-4 px-4">
          <div className="flex overflow-x-auto no-scrollbar gap-6 border-b border-slate-200 dark:border-slate-800">
            <button className="flex flex-col items-center justify-center border-b-[3px] border-primary text-primary pb-3 pt-2 shrink-0">
              <p className="text-sm font-bold tracking-wide">全部</p>
            </button>
            <button className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-2 shrink-0">
              <p className="text-sm font-bold tracking-wide">装备</p>
            </button>
            <button className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-2 shrink-0">
              <p className="text-sm font-bold tracking-wide">生活</p>
            </button>
            <button className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-2 shrink-0">
              <p className="text-sm font-bold tracking-wide">限量版</p>
            </button>
          </div>
        </div>

        {/* Featured Highlight */}
        <div className="mb-6">
          <div className="relative overflow-hidden rounded-xl aspect-[16/9] shadow-lg bg-cover bg-center" style={{ backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCRcp-5BWmnGQ4cQ7W9yJ4ZkgVQ43hz_otomfY-R1yeHksgytiy0leXgpm_XcLPh9rolMsswvbz7kKTaEArozQpJi9agzUw52rKRTvBAYrpherIsT5OKm7riuq_ZbpgAyJyU4us6Zkic4Q2rQA7aG7UtGcHvMLs2l8BnYG6pg2CwhInSXu4lDDOTSEM2TofDP2aGKhiDYv9lkCg4TrvxgK-BaBHuTwU5ifYCFtK1RaPD32cZoUKNJ7GWVLwwlHLwsSs152wkdwiDPIq')" }}>
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded w-fit mb-2">精选</span>
              <h3 className="text-white text-xl font-bold mb-1">钛合金专业调节器</h3>
              <p className="text-slate-300 text-sm font-medium">1,200 积分 + ¥129.00</p>
            </div>
          </div>
        </div>

        {/* Waterfall Masonry Layout */}
        <div className="masonry-grid">
          {/* Item 1 */}
          <div className="masonry-item">
            <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="relative aspect-[3/4] bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCfIEzInqGcLfsfGxOM3CO8VXgKnnu713YBR-m1d3c-a7Z7VYZUFl9igd6DbPpjfciQ3tKbbXXzpBiIV4h9-bpbdpa8n2hAzgBlBPCxdSxrf_yh3topMfgCueNc8jNacq6CtTsCPDgviywjTRZuqz7jTUK4O0eHpC7lVh81Kb1u4bhC-l27Q5DzqCJjdP0RgeUmL-ziJ2cJ2f1Lx6NjDLS0rJzy9iyyE8G_eQi1qI8UdyI3WH55EBgUscgy5u35HYTcpwPF38fr7NVb')" }}>
                <div className="absolute top-2 right-2 bg-primary/90 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">兑换</div>
              </div>
              <div className="p-3">
                <h4 className="text-sm font-bold line-clamp-2 mb-2 leading-snug">专业潜水面罩</h4>
                <p className="text-primary text-xs font-bold">500 积分 <span className="text-slate-400 dark:text-slate-500 font-normal">或 ¥29.00</span></p>
              </div>
            </div>
          </div>
          {/* Item 2 */}
          <div className="masonry-item">
            <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="relative aspect-[1/1] bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDo6cKqrUE1C0YfX88pC1W6k4PTiu12BXnDcV39PBmXKeoYvGPsDxHrCvJubQj6e2k0ry4SKh6FAEBNPy0dkLVZQ4nhH4vKh9DQBYFeEaHT81oUHx5e-oxRctS6HTT5OAhz3xc2UrJBiSmFVSSti9RWPBHAl2IL9_BMTCSN3e0mXrT2otO-fN3sR3HYKv2UaYMjkJbFg3D57rGtYyPKLrouPXISTx6HxAVWsgaNkc3LCrqJ0ReVSGdOBvsY4hiTiO7VnAYxZXYinBrW')" }}>
                <div className="absolute top-2 right-2 bg-primary/90 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">兑换</div>
              </div>
              <div className="p-3">
                <h4 className="text-sm font-bold line-clamp-2 mb-2 leading-snug">碳中和科技T恤</h4>
                <p className="text-primary text-xs font-bold">350 积分 <span className="text-slate-400 dark:text-slate-500 font-normal">或 ¥15.00</span></p>
              </div>
            </div>
          </div>
          {/* Item 3 */}
          <div className="masonry-item">
            <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="relative aspect-[3/5] bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDaZAmeXeTAwjqVb0LZzM3IVPANrr3IXH4HkgJzlymMh8XR9RSpyJRklvi-xIsWFZ6C2a5pIumTvhSMdiRGQXFXVVXcIGvrV3FYrSSzPtMD2le5KeRV84jddTgRiqFME2s0Js_Q1O0RT21new_X-zXPRPrWDkQhheIRkKBp9eJF-GL58vNX4OtTbOsksPmcoPrEjkeJXzpdJXZQtQVQVO5ucBose1IUESt9zjd8k7HO_gI3oMZMw5sBFi82zXYK23e9aKJ32jgmtTg2')" }}>
                <div className="absolute top-2 right-2 bg-primary/90 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">兑换</div>
              </div>
              <div className="p-3">
                <h4 className="text-sm font-bold line-clamp-2 mb-2 leading-snug">海洋推进脚蹼</h4>
                <p className="text-primary text-xs font-bold">800 积分 <span className="text-slate-400 dark:text-slate-500 font-normal">或 ¥59.00</span></p>
              </div>
            </div>
          </div>
          {/* Item 4 */}
          <div className="masonry-item">
            <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="relative aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDBJ8ezsAc27Yb4SXOb6b7NggBp37b6BP9fBohoGJIFWkHLYcgnq0gDHtc6NoEiJOg76jWs-lYC-1BiFRvEJmJV01wxbZ-Ddve_mchgKDTKwIBdRGBiO6MgytYz3wU4xuz5xfBvYBpJ8bHd-ZJLALtCgdCNFy2KVb--JhXzpnSMdVKvCRp99Mtw3Jn_jm6SwG7OnNf3B48snrA4dvmH0wwE50pkMe8utvAuiYw6_PyA52mwNNOL8FjZuTPzq_KZwAQcNXoGSin_eY0S')" }}>
                <div className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">限量</div>
              </div>
              <div className="p-3">
                <h4 className="text-sm font-bold line-clamp-2 mb-2 leading-snug">深海纪念币</h4>
                <p className="text-primary text-xs font-bold">200 积分 <span className="text-slate-400 dark:text-slate-500 font-normal">或 ¥9.00</span></p>
              </div>
            </div>
          </div>
          {/* Item 5 */}
          <div className="masonry-item">
            <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="relative aspect-[1/1] bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDA3KDY42SYb5bW9-etWxEOfYcdMa-Gnf5a6fCoQKB_vUL-2mxW2tMjEfYiuYxUkgCQaLONYTL0lY7as92vAhUhr_YaFz_nBTMo9qYejorEEO7OWoQVv1BMSvQc-WbPvXk-JMcofPxyVeFeDNNG2I78lZ2iox51Kj3ERgZETZUAnF05v_p8S5PV35ddRhHWPKF67TbRaiys1M1BRANHEfV-UqSiqH04GBa9BIvFuSW1Qcw2m5_G6A0dasiFbN0KBlLuZrHu58yVdSYs')" }}>
                <div className="absolute top-2 right-2 bg-primary/90 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">兑换</div>
              </div>
              <div className="p-3">
                <h4 className="text-sm font-bold line-clamp-2 mb-2 leading-snug">峰顶专业智能手表</h4>
                <p className="text-primary text-xs font-bold">2000 积分 <span className="text-slate-400 dark:text-slate-500 font-normal">或 ¥299.00</span></p>
              </div>
            </div>
          </div>
          {/* Item 6 */}
          <div className="masonry-item">
            <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="relative aspect-[3/4] bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBKh9NHBz6XSt46rqWxz1XIH-fH2IQyn4vrpVpyAsLVJz4yClZVRoWg5tTMkOfDh2-n39Bek3YniRraVF5qCXEmOFDaM_cB5R-ZyTMs2mFpthrLGhcY5r-OTqN1hZgh_NTvWakgo2ETrOuOog056MwqGGlYcvhJ7oyrVeMq3vsZZMzAvbxE0wT7ftMrj75bu1k9FsuoMeuGyLxcmNsv-AVhmMmyrZpt7d1BHREoJ1lozfn3e3KCo5tpzn7L6eluETn7ah-n9JW0d8-e')" }}>
                <div className="absolute top-2 right-2 bg-primary/90 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">兑换</div>
              </div>
              <div className="p-3">
                <h4 className="text-sm font-bold line-clamp-2 mb-2 leading-snug">生态不锈钢保温瓶</h4>
                <p className="text-primary text-xs font-bold">150 积分 <span className="text-slate-400 dark:text-slate-500 font-normal">或 ¥10.00</span></p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PointsMall;