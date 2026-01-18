import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Bell, 
  Moon, 
  Sun,
  Globe, 
  Lock, 
  HelpCircle, 
  FileText, 
  LogOut,
  ChevronRight,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';

const Settings = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);

  const settingsGroups = [
    {
      title: '通知设置',
      items: [
        { 
          icon: Bell, 
          label: '消息通知', 
          type: 'switch',
          value: notifications,
          onChange: () => setNotifications(!notifications)
        },
      ]
    },
    {
      title: '显示设置',
      items: [
        { 
          icon: theme === 'dark' ? Moon : Sun, 
          label: '深色模式', 
          type: 'switch',
          value: theme === 'dark',
          onChange: toggleTheme
        },
        { icon: Globe, label: '语言设置', type: 'link', value: '简体中文' },
      ]
    },
    // ...

    {
      title: '账号与安全',
      items: [
        { icon: Lock, label: '隐私设置', type: 'link' },
        { icon: Smartphone, label: '登录设备管理', type: 'link' },
      ]
    },
    {
      title: '其他',
      items: [
        { icon: HelpCircle, label: '帮助与反馈', type: 'link', path: '/service' },
        { icon: FileText, label: '用户协议', type: 'link' },
        { icon: FileText, label: '隐私政策', type: 'link' },
      ]
    },
  ];

  const handleLogout = () => {
    toast.success('已退出登录');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto pb-20">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold flex-1">设置</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {settingsGroups.map((group) => (
          <Card key={group.title}>
            <CardContent className="p-0">
              <h3 className="text-sm font-medium text-muted-foreground px-4 pt-3 pb-2">
                {group.title}
              </h3>
              {group.items.map((item, index) => (
                <button
                  key={item.label}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors",
                    index < group.items.length - 1 && "border-b border-border"
                  )}
                  onClick={() => {
                    if (item.type === 'link' && item.path) {
                      navigate(item.path);
                    } else if (item.type === 'link') {
                      toast.info('功能即将上线');
                    }
                  }}
                >
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="flex-1 text-left text-foreground">{item.label}</span>
                  {item.type === 'switch' ? (
                    <Switch 
                      checked={item.value as boolean} 
                      onCheckedChange={item.onChange}
                    />
                  ) : (
                    <>
                      {item.value && (
                        <span className="text-sm text-muted-foreground">{item.value}</span>
                      )}
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </>
                  )}
                </button>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* 退出登录 */}
        <Button 
          variant="outline" 
          className="w-full text-destructive hover:text-destructive hover:bg-destructive/5"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          退出登录
        </Button>

        {/* 版本信息 */}
        <p className="text-center text-xs text-muted-foreground pt-4">
          版本 1.0.0
        </p>
      </div>
    </div>
  );
};

export default Settings;
