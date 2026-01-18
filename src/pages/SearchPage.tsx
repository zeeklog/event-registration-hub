import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search, X, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ActivityCard } from '@/components/activity/ActivityCard';
import { activities } from '@/data/mockData';
import { Layout } from '@/components/layout/Layout';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [searchHistory, setSearchHistory] = useState(['赛艇比赛', '周末露营', '自行车租赁']);
  const [isSearching, setIsSearching] = useState(!!initialQuery);

  const hotSearches = ['城市赛艇赛', '亲子露营', '山地骑行', '水上运动', '团建活动'];

  const searchResults = query.trim() 
    ? activities.filter(a => 
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.location.toLowerCase().includes(query.toLowerCase()) ||
        a.tags?.some(t => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setQuery(searchQuery);
    setIsSearching(true);
    if (!searchHistory.includes(searchQuery)) {
      setSearchHistory(prev => [searchQuery, ...prev.slice(0, 9)]);
    }
  };

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen bg-navy">
        {/* 搜索头部 */}
        <header className="sticky top-0 z-40 glass border-b border-white/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/5 h-10 w-10"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="搜索感兴趣的活动..."
                className="pl-10 pr-10 bg-white/5 border-0 text-white placeholder:text-gray-500 rounded-md h-10 focus-visible:ring-1 focus-visible:ring-action"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                autoFocus
              />
              {query && (
                <button
                  onClick={() => { setQuery(''); setIsSearching(false); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Button size="sm" className="h-10 px-4 font-bold" onClick={() => handleSearch(query)}>
              搜索
            </Button>
          </div>
        </header>

        <div className="px-4 py-6">
          {!isSearching ? (
            <div className="space-y-8">
              {/* 搜索历史 */}
              {searchHistory.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      Search History
                    </h3>
                    <Button variant="ghost" size="sm" className="h-6 text-[10px] font-bold text-gray-600" onClick={() => setSearchHistory([])}>
                      Clear
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {searchHistory.map((item, i) => (
                      <Badge
                        key={i}
                        className="bg-white/5 text-gray-300 border border-white/5 hover:bg-white/10 hover:text-white cursor-pointer px-3 py-1.5 rounded-sm font-bold text-[10px]"
                        onClick={() => handleSearch(item)}
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* 热门搜索 */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-action" />
                  Trending Now
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hotSearches.map((item, i) => (
                    <Badge
                      key={i}
                      className="bg-navy-light text-white border border-action/20 hover:bg-action hover:border-action cursor-pointer px-3 py-1.5 rounded-sm font-bold text-[10px] transition-all"
                      onClick={() => handleSearch(item)}
                    >
                      {i < 3 && <span className="text-action mr-1 group-hover:text-white">🔥</span>}
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {searchResults.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-gray-600">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <Search className="w-10 h-10 opacity-20" />
                  </div>
                  <p className="text-sm font-bold text-gray-500">未找到相关结果</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest mt-2">Try different keywords</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6 px-1">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                      Results Found ({searchResults.length})
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {searchResults.map(activity => (
                      <ActivityCard key={activity.id} activity={activity as any} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
