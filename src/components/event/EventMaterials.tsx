import { useState } from 'react';
import { Image as ImageIcon, Video, Upload, Play, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { EventMaterial } from '@/types';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface EventMaterialsProps {
  eventId: string;
  materials: EventMaterial[];
  videos: EventMaterial[];
  onUpload?: (file: File, type: 'image' | 'video') => void;
  onDelete?: (materialId: string) => void;
}

const EventMaterials = ({ materials, videos, onUpload, onDelete }: EventMaterialsProps) => {
  const [previewMaterial, setPreviewMaterial] = useState<EventMaterial | null>(null);
  const [deleteMaterial, setDeleteMaterial] = useState<EventMaterial | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const allMaterials = [...materials, ...videos].sort(
    (a, b) => new Date(b.uploadTime).getTime() - new Date(a.uploadTime).getTime()
  );

  const handleUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const type = file.type.startsWith('image/') ? 'image' : 'video';
      if (onUpload) {
        setIsUploading(true);
        setTimeout(() => {
          setIsUploading(false);
          toast.success(`${type === 'image' ? '图片' : '视频'}上传成功`);
          onUpload(file, type);
        }, 1000);
      }
    };
    input.click();
  };

  const handleConfirmDelete = () => {
    if (deleteMaterial && onDelete) {
      onDelete(deleteMaterial.id);
      toast.success('已申请删除，等待审核');
      setDeleteMaterial(null);
    }
  };

  return (
    <>
      <Card className="bg-navy-light border-white/5 overflow-hidden">
        <CardHeader className="pb-4 border-b border-white/5">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base text-white">
              <ImageIcon className="w-5 h-5 text-action" />
              赛事素材
            </CardTitle>
            <Button
              size="sm"
              variant="outline"
              onClick={handleUploadClick}
              disabled={isUploading}
              className="h-8 text-[10px] font-bold bg-white/5 border-white/10 text-white"
            >
              <Upload className="w-3.5 h-3.5 mr-1" />
              {isUploading ? '正在上传...' : '上传素材'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {allMaterials.length === 0 ? (
            <div className="text-center py-10">
              <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-20 text-white" />
              <p className="text-xs text-gray-500 font-bold">暂无现场素材，欢迎上传分享</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {allMaterials.map((material) => (
                <div
                  key={material.id}
                  className={cn(
                    "relative aspect-square rounded-sm overflow-hidden group cursor-pointer shadow-lg",
                    material.isPendingDelete && "opacity-40 grayscale"
                  )}
                  onClick={() => setPreviewMaterial(material)}
                >
                  {material.type === 'image' ? (
                    <img
                      src={material.url}
                      alt="素材"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="relative w-full h-full bg-navy-lighter">
                      {material.thumbnail ? (
                        <img
                          src={material.thumbnail}
                          alt="视频封面"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Video className="w-8 h-8 text-white/20" />
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                        <Play className="w-8 h-8 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  )}
                  
                  {/* 删除按钮 */}
                  {!material.isPendingDelete && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteMaterial(material);
                      }}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}

                  {/* 标识 */}
                  <div className="absolute bottom-1 left-1">
                    {material.isPendingDelete ? (
                      <Badge className="bg-red-500 text-white border-0 text-[8px] h-4">待审核</Badge>
                    ) : material.type === 'video' ? (
                      <Badge className="bg-black/60 text-white border-0 text-[8px] h-4">视频</Badge>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 统计 */}
          {allMaterials.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-bold text-gray-500">
              <span>{materials.length} 图 / {videos.length} 视</span>
              {allMaterials.filter(m => m.isPendingDelete).length > 0 && (
                <span className="text-red-500">{allMaterials.filter(m => m.isPendingDelete).length} 项申请删除中</span>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 预览对话框 */}
      <Dialog open={!!previewMaterial} onOpenChange={() => setPreviewMaterial(null)}>
        <DialogContent className="bg-navy-light border-white/10 p-0 overflow-hidden max-w-[95%] rounded-lg">
          {previewMaterial && (
            <div className="flex flex-col">
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold text-white">素材预览</h3>
                  <span className="text-[10px] text-gray-500 font-bold">{new Date(previewMaterial.uploadTime).toLocaleString()}</span>
                </div>
                <Badge className="bg-white/10 text-gray-400 border-0 h-5 text-[10px]">
                  {previewMaterial.uploader || '匿名'}
                </Badge>
              </div>
              <div className="bg-black flex items-center justify-center min-h-[300px]">
                {previewMaterial.type === 'image' ? (
                  <img src={previewMaterial.url} alt="预览" className="max-w-full max-h-[70vh] object-contain" />
                ) : (
                  <video src={previewMaterial.url} controls className="max-w-full max-h-[70vh]" autoPlay />
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 删除确认 */}
      <AlertDialog open={!!deleteMaterial} onOpenChange={() => setDeleteMaterial(null)}>
        <AlertDialogContent className="bg-navy-light border-white/10 text-white rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">申请删除素材</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400 font-medium">
              确定要申请删除此素材吗？申请提交后将进入人工审核。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="pt-4">
            <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-500 hover:bg-red-600 border-0">确认申请</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EventMaterials;
