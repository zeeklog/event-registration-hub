import React from 'react';
import { Page } from '../types';
import { Icon } from '../components/Icon';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="pb-24">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div 
            className="size-10 rounded-full bg-cover bg-center border-2 border-primary" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCuhjs5pZnkjsS4ITVd2ciAjj20NwLFsixNBR0FqoMx6m2jWzRa5FzoWCVH6O8GvXtLZoEDDVESdSTkmHkaYrY2BpGG7wbT6pPIA9eGiL8-7TJFLf0Sxjh9da93ICvuonubXsgbOwauaIjTvuswDJQm0oBczlRE98bOCDg_4GRXf-jUZahyTwYqy50LkAHtVX3jdsrc6DcwYIVW9fFbIgQ2vXor46l3yac8UrCOGFx6LBUvk25WGhuMjcW_xOYTiGAFVXtK_WKqSbyH")' }}
          ></div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">早上好</p>
            <h1 className="text-base font-bold leading-none">Alex Rivera</h1>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="size-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-surface-dark text-slate-700 dark:text-white">
            <Icon name="notifications" />
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="px-4 py-4">
        <div className="relative group overflow-hidden rounded-xl h-64 w-full">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
            style={{ backgroundImage: 'linear-gradient(0deg, rgba(16, 25, 34, 0.8) 0%, rgba(16, 25, 34, 0) 50%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBjqEYCD64Eyel5RLzq9ufxFkrV0VE6-fzxTTlx4VTtKMBTQyLoOCcNbMcXMvNmN_n6NKpmZzU096lObLRgNfXpzjG4kbCtlXvyGCkmPM1MZADosri94ehLo-QRCglLJUY6UC1C_b4JczIdFlYeIzGRal_3qSQBQdjPaE-k4TqUZp19Tu9s5pW4HiEzykQspotyLKbsrNiJRaDmFC3ZHN2Ka0qa5ob6ChBYfDBR16H82GGBJEiCZVM3nFBRHyzQ7QKh6NbHjWwp063h")' }}
          >
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">
            <h2 className="text-white text-2xl font-bold leading-tight max-w-[70%]">山海共生</h2>
            <div className="flex items-center justify-between">
              <p className="text-white/80 text-sm font-medium">加入 2026 生态深潜峰会</p>
              <button 
                onClick={() => onNavigate(Page.EVENT_REGISTER)}
                className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20"
              >
                立即加入
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="px-4 py-2">
        <div className="grid grid-cols-4 gap-3">
          <div className="flex flex-col items-center gap-2" onClick={() => onNavigate(Page.POINTS_CENTER)}>
            <div className="w-full aspect-square flex items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
              <Icon name="qr_code_scanner" className="!text-3xl" />
            </div>
            <span className="text-[10px] font-bold text-center uppercase tracking-tight opacity-80">扫码</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-full aspect-square flex items-center justify-center rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700">
              <Icon name="calendar_month" className="!text-3xl" />
            </div>
            <span className="text-[10px] font-bold text-center uppercase tracking-tight opacity-80">日历</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-full aspect-square flex items-center justify-center rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700">
              <Icon name="menu_book" className="!text-3xl" />
            </div>
            <span className="text-[10px] font-bold text-center uppercase tracking-tight opacity-80">课程</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-full aspect-square flex items-center justify-center rounded-2xl bg-eco-green/10 text-eco-green border border-eco-green/20">
              <Icon name="eco" className="!text-3xl" />
            </div>
            <span className="text-[10px] font-bold text-center uppercase tracking-tight opacity-80">减碳</span>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="flex items-center justify-between px-4 pt-8 pb-3">
        <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">进行中的活动</h2>
        <button className="text-primary text-sm font-semibold">查看全部</button>
      </div>

      {/* Event List */}
      <div className="px-4 space-y-4">
        {/* Event Card 1 */}
        <div className="bg-white dark:bg-surface-dark rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
          <div 
            className="h-40 bg-cover bg-center relative" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCQfZbYkB_StCF1mY10pNizWg5BuH3J4Q3Uvt3iIWQPufS_mW3vI4-etnSJ4jE0pNdaHHnzx1ONKi9jEAZn1QoVZPJ1C8pV9EusLmwRpgLbRUjdLvoGOV_SDVoR9KbtsZL9DikEKkHn3Lc4loSZ9X8s-2pQdrP4lzNFhkcs2CSQekLBE9nvtbUTZIC_9YB8TDkCONqmGGw4Gdq2orrq2vDa38uLd_eTdTY0M13HdN_r5b43y60abXCQ50YdaZnIOYlL-X85dHy1WewF")' }}
          >
            <div className="absolute top-3 left-3 bg-eco-green text-black text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Icon name="bolt" className="!text-xs" />
              +50 减碳积分
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold leading-tight">珊瑚修复计划</h3>
              <span className="text-primary bg-primary/10 px-2 py-0.5 rounded text-[10px] font-bold">报名中</span>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Icon name="event" className="!text-sm" />
                <span className="text-xs font-medium">2026年10月24日 • 08:00</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Icon name="location_on" className="!text-sm" />
                <span className="text-xs font-medium">蓝洞国家公园</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => onNavigate(Page.EVENT_REGISTER)}
                className="flex-1 bg-primary text-white py-2.5 rounded-lg text-sm font-bold active:scale-95 transition-transform"
              >
                参加活动
              </button>
              <button className="px-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
                <Icon name="share" />
              </button>
            </div>
          </div>
        </div>

        {/* Event Card 2 */}
        <div className="bg-white dark:bg-surface-dark rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
          <div 
            className="h-40 bg-cover bg-center relative" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCBQgl4hJl0Sy7bNdrCBuZZ37lQ7pp_x8XHc7S86PbPepRoVvO0goYsoc_xqaP-omqFghFVLVgVXiE2cLvSZvSl4mmNQuH28Ankh0moBZ1rhEfpqsD2KNXTqSsBmiJn35bDIsCx1uz1vMrPnoMig25rJAgHj1C0XFgaITQ6mnhK82W7qsy60ba-bgLu7z3mEg9WPMdeUiyIJDylWNqL8WrI8ZaO-jnOftStaQe2nUCQOqAgPYV-KZUeZTvd6LHKKoibEoEvFmFXrz63")' }}
          >
            <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Icon name="star" className="!text-xs" />
              精选
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold leading-tight">山湖皮划艇</h3>
              <span className="text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase">限量</span>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Icon name="event" className="!text-sm" />
                <span className="text-xs font-medium">2026年11月12日 • 10:00</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Icon name="location_on" className="!text-sm" />
                <span className="text-xs font-medium">翡翠湾，太浩湖</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => onNavigate(Page.EVENT_REGISTER)}
                className="flex-1 bg-primary text-white py-2.5 rounded-lg text-sm font-bold active:scale-95 transition-transform"
              >
                参加活动
              </button>
              <button className="px-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
                <Icon name="share" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;