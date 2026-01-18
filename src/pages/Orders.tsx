import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, QrCode, MapPin, Clock, Copy, Phone, FileText, Share2, Shield, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { orders } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Layout } from '@/components/layout/Layout';
import { Label } from '@/components/ui/label';

const Orders = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialStatus = searchParams.get('status') || 'all';
  const [activeTab, setActiveTab] = useState(initialStatus);
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return '待付款';
      case 'confirmed': return '待参与';
      case 'completed': return '已完成';
      case 'cancelled': return '已取消';
      case 'reviewing': return '审核中';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-500 text-white';
      case 'confirmed': return 'bg-action text-white';
      case 'completed': return 'bg-eco text-navy';
      case 'cancelled': return 'bg-white/10 text-gray-400';
      case 'reviewing': return 'bg-points-sports text-white';
      default: return 'bg-white/10 text-gray-400';
    }
  };

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(o => o.status === activeTab);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('核销码已复制');
  };

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen bg-navy">
        {/* 顶部导航 */}
        <header className="sticky top-0 z-40 glass border-b border-white/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/5"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold text-white flex-1">我的订单</h1>
          </div>

          {/* 状态筛选 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full h-12 bg-transparent p-0 rounded-none border-b border-white/5">
              {['all', 'confirmed', 'completed', 'cancelled', 'reviewing'].map(status => (
                <TabsTrigger 
                  key={status}
                  value={status}
                  className="flex-1 h-full rounded-none bg-transparent text-[10px] font-bold text-gray-500 data-[state=active]:text-action data-[state=active]:border-b-2 data-[state=active]:border-action"
                >
                  {status === 'all' ? '全部' : getStatusLabel(status)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </header>

        {/* 订单列表 */}
        <div className="px-4 py-6 space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-10 h-10 text-gray-600" />
              </div>
              <p className="text-sm font-bold">暂无相关订单</p>
            </div>
          ) : (
            filteredOrders.map(order => (
              <Card key={order.id} className="bg-navy-light border-white/5 overflow-hidden shadow-xl">
                <CardContent className="p-0">
                  {/* 订单头部 */}
                  <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">ID: {order.id}</span>
                    <Badge className={cn("text-[10px] font-bold border-0 h-5", getStatusColor(order.status))}>
                      {getStatusLabel(order.status)}
                    </Badge>
                  </div>

                  {/* 活动信息 */}
                  <div 
                    className="p-4 flex gap-4 cursor-pointer active:bg-white/5 transition-colors"
                    onClick={() => navigate(`/activity/${order.activityId}`)}
                  >
                    <img 
                      src={order.activity.image} 
                      alt={order.activity.title}
                      className="w-20 h-20 object-cover rounded-sm border border-white/10"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <h3 className="font-bold text-sm text-white line-clamp-1 leading-tight">{order.activity.title}</h3>
                      <div className="space-y-1 mt-2">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                          <MapPin className="w-3 h-3 text-action" />
                          <span className="truncate">{order.activity.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                          <Clock className="w-3 h-3 text-eco" />
                          <span>{order.activity.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 订单底部 */}
                  <div className="px-4 py-4 border-t border-white/5 bg-white/[0.02]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-gray-500">
                        {order.participants}人报名 | {order.createTime}
                      </span>
                      <span className="text-lg font-bold text-action">¥{order.price}</span>
                    </div>

                    <div className="flex gap-2 justify-end">
                      {order.status === 'confirmed' && (
                        <Button 
                          size="sm"
                          className="h-8 px-4 text-[10px] font-bold rounded-sm"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowQRDialog(true);
                          }}
                        >
                          <QrCode className="w-3.5 h-3.5 mr-1.5" />
                          出示凭证
                        </Button>
                      )}
                      {order.status === 'pending' && (
                        <Button size="sm" className="h-8 px-4 text-[10px] font-bold rounded-sm">立即支付</Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-8 px-4 text-[10px] font-bold rounded-sm border-white/10 text-gray-400 hover:bg-white/5"
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowOrderDetail(true);
                        }}
                      >
                        订单详情
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* 核销码弹窗 */}
      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent className="bg-navy-light border-white/10 text-white max-w-[300px] rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-white">入场核销码</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="flex flex-col items-center py-6">
              <div className="w-48 h-48 bg-white p-4 rounded-sm mb-6">
                <QrCode className="w-full h-full text-navy" />
              </div>
              <p className="text-3xl font-mono font-black tracking-widest text-action">
                {selectedOrder.verificationCode}
              </p>
              <p className="text-xs text-gray-500 font-bold mt-4">
                请出示给现场工作人员扫描
              </p>
              <Button 
                variant="ghost" 
                className="mt-6 h-8 text-[10px] font-bold text-gray-400"
                onClick={() => copyCode(selectedOrder.verificationCode!)}
              >
                <Copy className="w-3 h-3 mr-1.5" />
                复制数字码
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 订单详情弹窗 */}
      <Dialog open={showOrderDetail} onOpenChange={setShowOrderDetail}>
        <DialogContent className="bg-navy-light border-white/10 text-white max-w-[90%] rounded-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">订单详情</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6 py-4">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">活动信息</h4>
                <div className="bg-white/5 rounded-md p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs text-gray-400">项目名称</span>
                    <span className="text-xs font-bold text-white text-right ml-4">{selectedOrder.activity.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">活动时间</span>
                    <span className="text-xs font-bold text-white">{selectedOrder.activity.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">参与人数</span>
                    <span className="text-xs font-bold text-white">{selectedOrder.participants}人</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">支付详情</h4>
                <div className="bg-white/5 rounded-md p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">订单总额</span>
                    <span className="text-xs font-bold text-white">¥{selectedOrder.price}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-3">
                    <span className="text-sm font-bold text-white">实付金额</span>
                    <span className="text-lg font-bold text-action">¥{selectedOrder.price}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button className="w-full" onClick={() => setShowOrderDetail(false)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Orders;
