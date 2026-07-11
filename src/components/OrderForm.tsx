import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MaterialType, ShapeType, SizeType, QtyType } from '../types';
import { calculatePrice } from '../data';
import { Layers, Circle, Square, Ruler, Hash, Plus, Sparkles } from 'lucide-react';

interface OrderFormProps {
  onAddItem: (item: {
    material: MaterialType;
    shape: ShapeType;
    size: string;
    qty: QtyType;
    price: number;
    length?: number;
    width?: number;
    isCustomSize?: boolean;
  }) => void;
  cartCount: number;
  onSpecsChange: (specs: {
    material: MaterialType;
    shape: ShapeType;
    size: string;
    customLength?: number;
    customWidth?: number;
  }) => void;
}

export function OrderForm({ onAddItem, cartCount, onSpecsChange }: OrderFormProps) {
  const [material, setMaterial] = useState<MaterialType>('ورقي');
  const [shape, setShape] = useState<ShapeType>('دائري');
  const [size, setSize] = useState<SizeType>('4cm');
  const [qty, setQty] = useState<QtyType>('500');
  const [price, setPrice] = useState<number>(0);

  const [sizeMode, setSizeMode] = useState<'standard' | 'custom'>('standard');
  const [customLength, setCustomLength] = useState<number>(4);
  const [customWidth, setCustomWidth] = useState<number>(4);

  // Recalculate price whenever specifications change
  useEffect(() => {
    const activeSizeStr = sizeMode === 'standard' ? size : `${customLength}×${customWidth} سم`;
    const currentPrice = sizeMode === 'standard'
      ? calculatePrice(material, size, qty)
      : calculatePrice(material, activeSizeStr, qty, customLength, customWidth);
      
    setPrice(currentPrice);
    onSpecsChange({
      material,
      shape,
      size: activeSizeStr,
      customLength: sizeMode === 'custom' ? customLength : undefined,
      customWidth: sizeMode === 'custom' ? customWidth : undefined,
    });
  }, [material, shape, size, qty, sizeMode, customLength, customWidth, onSpecsChange]);

  const handleAdd = () => {
    const activeSizeStr = sizeMode === 'standard' ? size : `${customLength}×${customWidth} سم`;
    onAddItem({
      material,
      shape,
      size: activeSizeStr,
      qty,
      price,
      length: sizeMode === 'custom' ? customLength : undefined,
      width: sizeMode === 'custom' ? customWidth : undefined,
      isCustomSize: sizeMode === 'custom'
    });
  };

  return (
    <div className="bg-sleek-card border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between h-full">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-100 mb-1 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sleek-accent-text" />
            <span>اختر مواصفات الاستيكر</span>
          </h3>
          <p className="text-xs text-slate-400">اختر النوع، الشكل، المقاس والكمية المطلوبة بدقة للحصول على السعر الفوري.</p>
        </div>

        {/* Material Selection (النوع) */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
            <Layers className="w-4 h-4 text-sleek-accent-text" />
            <span>نوع الاستيكر:</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMaterial('ورقي')}
              className={`
                flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all text-right cursor-pointer
                ${material === 'ورقي'
                  ? 'border-sleek-accent bg-emerald-950/30 text-emerald-100'
                  : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800 text-slate-300'}
              `}
            >
              <span className="font-bold text-base">ورقي</span>
              <span className="text-[11px] opacity-70 mt-1">اقتصادي، غير مقاوم للماء</span>
            </button>
            <button
              type="button"
              onClick={() => setMaterial('بلاستيكي')}
              className={`
                flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all text-right cursor-pointer
                ${material === 'بلاستيكي'
                  ? 'border-sleek-accent bg-emerald-950/30 text-emerald-100'
                  : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800 text-slate-300'}
              `}
            >
              <span className="font-bold text-base">بلاستيكي</span>
              <span className="text-[11px] opacity-70 mt-1">مقاوم للرطوبة والماء، متين</span>
            </button>
          </div>
        </div>

        {/* Shape Selection (الشكل) */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
            <span className="flex items-center gap-1">
              <Circle className="w-3.5 h-3.5 text-sleek-accent-text" />
              <Square className="w-3.5 h-3.5 text-sleek-accent-text" />
            </span>
            <span>شكل الاستيكر:</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setShape('دائري')}
              className={`
                flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all cursor-pointer
                ${shape === 'دائري'
                  ? 'border-sleek-accent bg-emerald-950/30 text-emerald-100 font-bold'
                  : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800 text-slate-300'}
              `}
            >
              <Circle className={`w-4 h-4 ${shape === 'دائري' ? 'fill-sleek-accent text-sleek-accent-text' : ''}`} />
              <span>دائري</span>
            </button>
            <button
              type="button"
              onClick={() => setShape('مربع')}
              className={`
                flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all cursor-pointer
                ${shape === 'مربع'
                  ? 'border-sleek-accent bg-emerald-950/30 text-emerald-100 font-bold'
                  : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800 text-slate-300'}
              `}
            >
              <Square className={`w-4 h-4 ${shape === 'مربع' ? 'fill-sleek-accent text-sleek-accent-text' : ''}`} />
              <span>مربع</span>
            </button>
          </div>
        </div>

        {/* Size Selection Mode (طريقة اختيار المقاس) */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
            <Ruler className="w-4 h-4 text-sleek-accent-text" />
            <span>مقاس الاستيكر:</span>
          </label>
          <div className="flex bg-slate-950 border border-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setSizeMode('standard')}
              className={`flex-1 text-xs py-2 rounded-lg font-bold transition-all text-center cursor-pointer ${sizeMode === 'standard' ? 'bg-sleek-accent text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
            >
              مقاسات قياسية جاهزة
            </button>
            <button
              type="button"
              onClick={() => setSizeMode('custom')}
              className={`flex-1 text-xs py-2 rounded-lg font-bold transition-all text-center cursor-pointer ${sizeMode === 'custom' ? 'bg-sleek-accent text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
            >
              أبعاد مخصصة (طول × عرض)
            </button>
          </div>
        </div>

        {sizeMode === 'standard' ? (
          /* Standard Size & Qty Grid */
          <div className="grid grid-cols-2 gap-4">
            {/* Size (الحجم) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400">الحجم:</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as SizeType)}
                className="w-full p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl focus:border-sleek-accent focus:ring-1 focus:ring-sleek-accent font-bold text-slate-100 outline-hidden transition-all text-center cursor-pointer"
              >
                <option value="2cm">2cm (صغير جداً)</option>
                <option value="3cm">3cm (صغير)</option>
                <option value="4cm">4cm (متوسط)</option>
                <option value="5cm">5cm (مناسب للشعار)</option>
                <option value="6cm">6cm (كبير نسبياً)</option>
                <option value="7cm">7cm (كبير جداً)</option>
              </select>
            </div>

            {/* Qty (الكمية) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400">الكمية:</label>
              <select
                value={qty}
                onChange={(e) => setQty(e.target.value as QtyType)}
                className="w-full p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl focus:border-sleek-accent focus:ring-1 focus:ring-sleek-accent font-bold text-slate-100 outline-hidden transition-all text-center cursor-pointer"
              >
                <option value="50">50 حبة</option>
                <option value="100">100 حبة</option>
                <option value="200">200 حبة</option>
                <option value="500">500 حبة</option>
                <option value="1000">1000 حبة</option>
                <option value="2000">2000 حبة</option>
              </select>
            </div>
          </div>
        ) : (
          /* Custom Dimensions Grid */
          <div className="space-y-4">
            <div className="space-y-3 p-3 bg-slate-950/40 border border-slate-800/80 rounded-xl">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 flex justify-between">
                    <span>الطول:</span>
                    <span className="text-sleek-accent-text font-mono font-bold">{customLength} سم</span>
                  </label>
                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl overflow-hidden p-0.5">
                    <button
                      type="button"
                      onClick={() => setCustomLength(prev => Math.max(2, prev - 1))}
                      className="w-8 h-8 flex items-center justify-center font-bold text-slate-400 hover:text-slate-200 hover:bg-slate-850 rounded-lg cursor-pointer transition-all"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="2"
                      max="15"
                      value={customLength}
                      onChange={(e) => setCustomLength(Math.min(15, Math.max(2, parseInt(e.target.value) || 2)))}
                      className="w-full bg-transparent text-center font-bold text-slate-100 outline-hidden border-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      onClick={() => setCustomLength(prev => Math.min(15, prev + 1))}
                      className="w-8 h-8 flex items-center justify-center font-bold text-slate-400 hover:text-slate-200 hover:bg-slate-850 rounded-lg cursor-pointer transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 flex justify-between">
                    <span>العرض:</span>
                    <span className="text-sleek-accent-text font-mono font-bold">{customWidth} سم</span>
                  </label>
                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl overflow-hidden p-0.5">
                    <button
                      type="button"
                      onClick={() => setCustomWidth(prev => Math.max(2, prev - 1))}
                      className="w-8 h-8 flex items-center justify-center font-bold text-slate-400 hover:text-slate-200 hover:bg-slate-850 rounded-lg cursor-pointer transition-all"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="2"
                      max="15"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(Math.min(15, Math.max(2, parseInt(e.target.value) || 2)))}
                      className="w-full bg-transparent text-center font-bold text-slate-100 outline-hidden border-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      onClick={() => setCustomWidth(prev => Math.min(15, prev + 1))}
                      className="w-8 h-8 flex items-center justify-center font-bold text-slate-400 hover:text-slate-200 hover:bg-slate-850 rounded-lg cursor-pointer transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-800/60 pt-2 text-xs">
                <span className="text-slate-400">المساحة التقريبية للملصق:</span>
                <span className="font-bold text-slate-200 bg-slate-900 px-2 py-0.5 border border-slate-800 rounded-md font-mono">{customLength * customWidth} سم²</span>
              </div>
            </div>

            {/* Qty for Custom Mode */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                <Hash className="w-4 h-4 text-sleek-accent-text" />
                <span>الكمية:</span>
              </label>
              <select
                value={qty}
                onChange={(e) => setQty(e.target.value as QtyType)}
                className="w-full p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl focus:border-sleek-accent focus:ring-1 focus:ring-sleek-accent font-bold text-slate-100 outline-hidden transition-all text-center cursor-pointer"
              >
                <option value="50">50 حبة</option>
                <option value="100">100 حبة</option>
                <option value="200">200 حبة</option>
                <option value="500">500 حبة</option>
                <option value="1000">1000 حبة</option>
                <option value="2000">2000 حبة</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Pricing Box and Add Button */}
      <div className="mt-8 space-y-4">
        <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-4 flex items-center justify-between">
          <div className="text-slate-300 text-sm font-semibold">سعر هذا الصنف الحالي:</div>
          <div className="text-left">
            <span className="text-2xl font-black text-sleek-accent-text">{price.toFixed(2)}</span>
            <span className="text-xs font-bold text-emerald-300 mr-1">دينار</span>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleAdd}
          disabled={cartCount >= 5}
          className={`
            w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-base shadow-md cursor-pointer transition-all duration-200
            ${cartCount >= 5
              ? 'bg-slate-800 text-slate-500 border border-slate-700 shadow-none cursor-not-allowed'
              : 'bg-sleek-accent hover:bg-sleek-accent-hover text-slate-950 hover:shadow-lg hover:shadow-sleek-accent/20 active:translate-y-[1px]'}
          `}
        >
          <Plus className="w-5 h-5" />
          <span>{cartCount >= 5 ? 'الحد الأقصى مضاف (5 أصناف)' : 'إضافة هذا الصنف للطلب'}</span>
        </motion.button>
        {cartCount >= 5 && (
          <p className="text-center text-xs text-rose-400 font-medium">لقد أضفت الحد الأقصى للأصناف للطلب الواحد (5 أصناف).</p>
        )}
      </div>
    </div>
  );
}
