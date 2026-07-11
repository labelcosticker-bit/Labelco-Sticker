import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MaterialType, ShapeType, SizeType } from '../types';
import { Sparkles, Printer, Smile, Coffee, Heart, Star, ShoppingBag, Gift, Scissors } from 'lucide-react';

interface StickerPreviewProps {
  material: MaterialType;
  shape: ShapeType;
  size: string;
  customLength?: number;
  customWidth?: number;
  onUploadLogo?: (url: string) => void;
}

// Icon options for custom preview artwork
const ARTWORK_ICONS = [
  { id: 'coffee', icon: Coffee, label: 'قهوة' },
  { id: 'heart', icon: Heart, label: 'حب' },
  { id: 'star', icon: Star, label: 'نجم' },
  { id: 'gift', icon: Gift, label: 'هدية' },
  { id: 'smile', icon: Smile, label: 'ابتسامة' },
  { id: 'bag', icon: ShoppingBag, label: 'حقيبة' },
];

export function StickerPreview({ material, shape, size, customLength, customWidth }: StickerPreviewProps) {
  const [customText, setCustomText] = useState('شعارك هنا');
  const [selectedIconId, setSelectedIconId] = useState('star');
  const [showReference, setShowReference] = useState(true);

  const SelectedIcon = ARTWORK_ICONS.find(i => i.id === selectedIconId)?.icon || Star;

  // Convert size to approximate display pixels
  // Let's assume 1cm = 28px in our reference grid
  const stickerWidth = customWidth ? customWidth * 28 : (parseInt(size.replace('cm', ''), 10) || 4) * 28;
  const stickerHeight = customLength ? customLength * 28 : (parseInt(size.replace('cm', ''), 10) || 4) * 28;
  const minDimension = Math.min(stickerWidth, stickerHeight);

  return (
    <div className="bg-sleek-card border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-between h-full min-h-[420px] shadow-lg">
      <div className="w-full flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sleek-accent-text font-semibold text-sm">
          <Sparkles className="w-4 h-4 text-sleek-accent-text animate-pulse" />
          <span>معاينة حية وتفاعلية للملصق</span>
        </div>
        <button
          onClick={() => setShowReference(!showReference)}
          className="text-xs bg-emerald-950/40 text-sleek-accent-text hover:bg-emerald-900/40 px-3 py-1.5 rounded-lg transition-all font-medium flex items-center gap-1 cursor-pointer"
        >
          {showReference ? 'إخفاء مقارنة الحجم' : 'إظهار مقارنة الحجم (بطاقة)'}
        </button>
      </div>

      {/* Main Preview Container */}
      <div className="relative flex-1 w-full min-h-[220px] flex items-center justify-center bg-radial from-[#1e293b]/20 to-[#0B0E14] rounded-xl overflow-hidden p-6 border border-slate-800">
        
        {/* Scale/Reference Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:20px_20px] opacity-45"></div>

        <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 z-10 w-full">
          
          {/* Reference Card representing credit card (8.5cm x 5.4cm => approx 238px x 151px) */}
          <AnimatePresence>
            {showReference && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                transition={{ duration: 0.3 }}
                className="w-[180px] h-[110px] bg-gradient-to-tr from-slate-900 to-slate-950 rounded-lg p-3 text-white flex flex-col justify-between shadow-lg border border-slate-800 relative overflow-hidden"
              >
                {/* Decorative elements of credit card */}
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                <div className="flex justify-between items-start">
                  <div className="w-6 h-5 bg-amber-400/80 rounded-sm opacity-80"></div>
                  <span className="text-[9px] font-mono opacity-50 tracking-widest">JORDAN CARD</span>
                </div>
                <div className="text-[10px] font-mono tracking-widest opacity-80 mt-2">•••• •••• •••• 1234</div>
                <div className="flex justify-between items-end">
                  <span className="text-[7px] opacity-40">مقارنة حجم تقريبية</span>
                  <div className="flex -space-x-1.5 space-x-reverse">
                    <div className="w-4 h-4 rounded-full bg-red-500/80"></div>
                    <div className="w-4 h-4 rounded-full bg-amber-500/80"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actual Sticker Render */}
          <motion.div
            layout
            style={{
              width: stickerWidth,
              height: stickerHeight,
              maxWidth: '100%',
              maxHeight: '320px',
            }}
            className={`
              relative flex flex-col items-center justify-center text-center p-3 transition-all duration-300 shadow-md
              ${shape === 'دائري' ? 'rounded-full' : 'rounded-xl'}
              ${material === 'بلاستيكي' 
                ? 'bg-white border-2 border-sleek-accent/40 text-slate-800 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,1)_0%,rgba(240,240,240,1)_100%)]' 
                : 'bg-amber-50/90 border border-amber-900/10 text-amber-950'}
            `}
          >
            {/* Plastic glossy sheen effect */}
            {material === 'بلاستيكي' && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-inherit">
                <div className="absolute -left-1/2 -top-1/2 w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/40 to-transparent rotate-12 transform translate-x-1/4 translate-y-1/4 animate-pulse"></div>
              </div>
            )}

            {/* Paper subtle texture */}
            {material === 'ورقي' && (
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:3px_3px] pointer-events-none rounded-inherit"></div>
            )}

            {/* Sticker Contents container to handle scaling font/icon sizes */}
            <div className="flex flex-col items-center justify-center w-full h-full relative z-10">
              <SelectedIcon 
                style={{
                  width: Math.max(16, minDimension * 0.32),
                  height: Math.max(16, minDimension * 0.32)
                }}
                className={`
                  mb-1 shrink-0 transition-all
                  ${material === 'ورقي' ? 'text-amber-800/80' : 'text-sleek-accent'}
                `} 
              />
              <span 
                style={{ 
                  fontSize: Math.max(8, minDimension * 0.10),
                  lineHeight: 1.1
                }} 
                className={`
                  font-bold select-none px-1 break-all tracking-wide truncate max-w-full
                  ${material === 'ورقي' ? 'text-amber-950' : 'text-slate-800'}
                `}
              >
                {customText || 'شعارك'}
              </span>
              <span 
                style={{ fontSize: Math.max(6, minDimension * 0.06) }} 
                className={`
                  mt-0.5 opacity-60 font-medium shrink-0
                  ${material === 'ورقي' ? 'text-amber-900' : 'text-slate-500'}
                `}
              >
                {size} - {material}
              </span>
            </div>

            {/* Dotted cutting outline representation */}
            <div className={`absolute inset-0.5 border border-dashed pointer-events-none opacity-30 ${shape === 'دائري' ? 'rounded-full' : 'rounded-lg'} ${material === 'ورقي' ? 'border-amber-900' : 'border-sleek-accent'}`}></div>
          </motion.div>

        </div>

        {/* Dimension overlays in preview */}
        <div className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-300 bg-slate-950/90 px-1.5 py-0.5 rounded border border-slate-800">
          القطر الفعلي: {size}
        </div>
      </div>

      {/* Interactive controls */}
      <div className="w-full bg-sleek-panel border border-slate-800 rounded-xl p-4 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">اكتب اسم متجرك أو النص للمعاينة:</label>
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            maxLength={22}
            placeholder="مثال: مخبز البركة"
            className="w-full text-sm border border-slate-800 bg-slate-950 text-slate-100 focus:border-sleek-accent focus:ring-1 focus:ring-sleek-accent rounded-lg p-2 outline-hidden font-medium transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">اختر أيقونة توضيحية للملصق:</label>
          <div className="grid grid-cols-6 gap-1 bg-slate-950 rounded-lg p-1 border border-slate-800">
            {ARTWORK_ICONS.map((art) => {
              const ArtIcon = art.icon;
              const isSelected = selectedIconId === art.id;
              return (
                <button
                  key={art.id}
                  onClick={() => setSelectedIconId(art.id)}
                  title={art.label}
                  className={`
                    flex items-center justify-center p-1.5 rounded-md transition-all cursor-pointer
                    ${isSelected ? 'bg-sleek-accent text-slate-950 shadow-md shadow-sleek-accent/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}
                  `}
                >
                  <ArtIcon className="w-4 h-4" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
