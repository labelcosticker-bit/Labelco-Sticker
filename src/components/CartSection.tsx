import { motion, AnimatePresence } from 'motion/react';
import { CartItem, CustomerInfo } from '../types';
import { DELIVERY_FEE, WHATSAPP_NUMBER } from '../data';
import { ShoppingBag, Trash2, Truck, MessageSquare, AlertTriangle, CheckCircle } from 'lucide-react';

interface CartSectionProps {
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  customerInfo: CustomerInfo;
}

export function CartSection({ items, onRemoveItem, customerInfo }: CartSectionProps) {
  const itemsTotal = items.reduce((sum, item) => sum + item.price, 0);
  const currentDeliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
  const grandTotal = itemsTotal + currentDeliveryFee;

  const handleSendOrder = () => {
    if (items.length === 0) return;

    // Build the formatted WhatsApp text in Arabic
    let message = `*مرحباً لايبلكو (Labelco)، أود طلب الاستيكرات التالية:*\n\n`;

    items.forEach((item, index) => {
      message += `*📦 الصنف ${index + 1}:*\n`;
      message += `← *النوع:* ${item.material}\n`;
      message += `← *الشكل:* ${item.shape}\n`;
      message += `← *المقاس:* ${item.size}\n`;
      message += `← *الكمية:* ${item.qty} ملصق\n`;
      message += `← *السعر:* ${item.price.toFixed(2)} دينار أردني\n`;
      message += `----------------------------\n`;
    });

    message += `\n*🧾 ملخص الحساب:*\n`;
    message += `← *قيمة الأصناف:* ${itemsTotal.toFixed(2)} د.أ\n`;
    message += `← *رسوم التوصيل:* ${currentDeliveryFee.toFixed(2)} د.أ\n`;
    message += `← *💰 المجموع الكلي:* *${grandTotal.toFixed(2)} دينار أردني*\n\n`;

    // Customer details
    message += `*📍 معلومات العميل للتوصيل:*\n`;
    message += `← *الاسم:* ${customerInfo.name || 'لم يحدد'}\n`;
    message += `← *الهاتف:* ${customerInfo.phone || 'لم يحدد'}\n`;
    message += `← *المدينة:* ${customerInfo.city || 'لم يحدد'}\n`;
    message += `← *العنوان:* ${customerInfo.address || 'لم يحدد'}\n`;

    if (customerInfo.notes.trim()) {
      message += `← *ملاحظات إضافية:* ${customerInfo.notes}\n`;
    }

    message += `\nالرجاء تأكيد استلام الطلب وتجهيز التصميم. شكراً لكم!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const isFormIncomplete = !customerInfo.name.trim() || !customerInfo.phone.trim() || !customerInfo.city;

  return (
    <div className="bg-sleek-card border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-sleek-accent-text" />
            <span>سلة الطلبات المضافة</span>
          </h3>
          <span className="bg-emerald-950/40 text-sleek-accent-text border border-emerald-900/30 font-bold px-3 py-1 rounded-full text-xs">
            {items.length} / 5 أصناف
          </span>
        </div>

        {/* Flat delivery fee disclaimer */}
        <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-3 flex items-start gap-2.5 text-emerald-300 mb-4">
          <Truck className="w-5 h-5 text-sleek-accent-text shrink-0 mt-0.5" />
          <p className="text-xs font-semibold leading-relaxed">
            ملاحظة: رسوم التوصيل لكافة الأصناف هي 3 دنانير أردنية تُضاف تلقائياً للمجموع الكلي للطلب.
          </p>
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center text-slate-500">
            <ShoppingBag className="w-12 h-12 stroke-1 text-slate-700 mb-3" />
            <p className="text-sm font-bold text-slate-400">لا توجد أصناف مضافة بعد</p>
            <p className="text-xs text-slate-500 mt-1">اختر المواصفات من اليسار ثم اضغط على زر "إضافة للطلب".</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, height: 0, y: 15 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between gap-3 overflow-hidden group hover:border-sleek-accent/30 hover:bg-emerald-950/10 transition-all"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                        صنف {index + 1}
                      </span>
                      <span className="text-xs font-bold bg-emerald-950/40 text-sleek-accent-text px-2 py-0.5 rounded-md">
                        {item.material} ({item.shape})
                      </span>
                      <span className="text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                        {item.size}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 font-medium flex justify-between items-center">
                      <span>الكمية المطلوبة: <strong className="text-slate-200 font-bold">{item.qty} حبة</strong></span>
                      <div className="text-left flex flex-col items-end">
                        <span>سعر الصنف: <strong className="text-sleek-accent-text font-bold">{item.price.toFixed(2)} دينار</strong></span>
                        <span className="text-[10px] text-slate-500">({(item.price / parseInt(item.qty)).toFixed(3)} د.أ / حبة)</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition-all cursor-pointer"
                    title="حذف هذا الصنف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Bill summary and send button */}
      <div className="mt-6 border-t border-slate-800 pt-4 space-y-4">
        <div className="bg-slate-950/40 rounded-xl p-4 border border-slate-800 space-y-2 text-sm">
          <div className="flex justify-between text-slate-400 font-medium">
            <span>قيمة الأصناف:</span>
            <span className="font-bold text-slate-200">{itemsTotal.toFixed(2)} دينار</span>
          </div>
          <div className="flex justify-between text-slate-400 font-medium">
            <span>رسوم التوصيل لكافة الأصناف:</span>
            <span className="font-bold text-slate-200">{currentDeliveryFee.toFixed(2)} دينار</span>
          </div>
          <div className="flex justify-between text-base font-black text-sleek-accent-text border-t border-slate-800 pt-2.5 mt-1">
            <span>المجموع الكلي المترتب:</span>
            <span>{grandTotal.toFixed(2)} دينار أردني</span>
          </div>
        </div>

        {/* Validation warnings */}
        {items.length > 0 && isFormIncomplete && (
          <div className="bg-red-950/40 text-red-300 rounded-lg p-3 text-xs font-semibold flex items-start gap-2 border border-red-900/30">
            <AlertTriangle className="w-4.5 h-4.5 text-red-400 shrink-0 mt-0.5" />
            <span>الرجاء إكمال بيانات الاتصال والتوصيل (الاسم، الهاتف، والمدينة) لتتمكن من إرسال طلبك بنجاح.</span>
          </div>
        )}

        {items.length > 0 && !isFormIncomplete && (
          <div className="bg-emerald-950/20 text-emerald-300 rounded-lg p-3 text-xs font-semibold flex items-start gap-2 border border-emerald-900/30">
            <CheckCircle className="w-4.5 h-4.5 text-sleek-accent-text shrink-0 mt-0.5" />
            <span>بيانات الطلب جاهزة ومكتملة! يمكنك الآن الضغط على الزر لإرسالها مباشرة لقسم المبيعات عبر الواتساب.</span>
          </div>
        )}

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSendOrder}
          disabled={items.length === 0 || isFormIncomplete}
          className={`
            w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-lg shadow-md cursor-pointer transition-all duration-200
            ${items.length === 0 || isFormIncomplete
              ? 'bg-slate-850 text-slate-500 shadow-none cursor-not-allowed border border-slate-800'
              : 'bg-sleek-accent hover:bg-sleek-accent-hover text-slate-950 hover:shadow-lg hover:shadow-sleek-accent/20 active:translate-y-[1px]'}
          `}
        >
          <MessageSquare className="w-5 h-5 fill-current" />
          <span>إرسال الطلب عبر واتساب</span>
        </motion.button>
      </div>
    </div>
  );
}
