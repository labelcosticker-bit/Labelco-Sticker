import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { CartItem, CustomerInfo, MaterialType, ShapeType, SizeType } from './types';
import { StickerPreview } from './components/StickerPreview';
import { OrderForm } from './components/OrderForm';
import { CustomerInfoForm } from './components/CustomerInfoForm';
import { CartSection } from './components/CartSection';
import { LabelcoLogo } from './components/LabelcoLogo';
import { 
  Sparkles, 
  Printer, 
  Phone, 
  MapPin, 
  HelpCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Image as ImageIcon 
} from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    city: '',
    address: '',
    notes: '',
  });

  // Current spec state to keep live preview in sync with what's selected in the form
  const [activeSpecs, setActiveSpecs] = useState<{
    material: MaterialType;
    shape: ShapeType;
    size: string;
    customLength?: number;
    customWidth?: number;
  }>({
    material: 'ورقي',
    shape: 'دائري',
    size: '4cm',
  });

  // Unique ID generator for cart items
  const generateId = () => Math.random().toString(36).substring(2, 9);

  const handleAddItem = (item: Omit<CartItem, 'id'>) => {
    if (cartItems.length >= 5) return;
    setCartItems([
      ...cartItems,
      {
        ...item,
        id: generateId(),
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleSpecsChange = useCallback((specs: {
    material: MaterialType;
    shape: ShapeType;
    size: string;
    customLength?: number;
    customWidth?: number;
  }) => {
    setActiveSpecs(specs);
  }, []);

  return (
    <div className="min-h-screen bg-sleek-bg text-slate-200 flex flex-col font-sans selection:bg-sleek-accent selection:text-white" dir="rtl">
      {/* Top micro-banner */}
      <div className="bg-sleek-card text-emerald-100 text-[11px] py-1.5 px-4 text-center flex items-center justify-center gap-2 border-b border-slate-800">
        <Sparkles className="w-3.5 h-3.5 text-sleek-accent-text animate-pulse" />
        <span>احصل على أفضل جودة طباعة استيكرات وملصقات مخصصة في الأردن! التوصيل لجميع المحافظات خلال 48 ساعة فقط.</span>
      </div>

      {/* Header / Brand Nav */}
      <header className="bg-sleek-card border-b border-slate-800 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3">
            {/* Elegant authentic Labelco brand logo graphic icon */}
            <div className="relative w-14 h-14 bg-white rounded-xl flex items-center justify-center border border-slate-700 shadow-lg shrink-0 overflow-hidden">
              <LabelcoLogo variant="icon" className="w-12 h-12" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl font-black text-white tracking-tight">لايبلكو</h1>
                <span className="text-xl font-bold text-sleek-accent-text font-mono">Labelco</span>
              </div>
              <p className="text-xs font-semibold text-slate-400">ملصقات واستيكرات مخصصة لمنتجاتك ومشاريعك</p>
            </div>
          </div>

          {/* Quick contact and indicators */}
          <div className="flex items-center gap-3.5 text-xs flex-wrap justify-center">
            <a 
              href="tel:+962782716551" 
              className="flex items-center gap-1.5 bg-sleek-panel hover:bg-slate-800 border border-slate-800 rounded-full px-3.5 py-1.5 font-bold text-slate-300 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-sleek-accent-text" />
              <span dir="ltr">078 271 6551</span>
            </a>
            <div className="flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-900/30 rounded-full px-3.5 py-1.5 font-bold text-emerald-300">
              <MapPin className="w-3.5 h-3.5 text-sleek-accent-text" />
              <span>المبيعات والتوصيل - الأردن</span>
            </div>
          </div>

        </div>
      </header>

      {/* Hero Welcome banner */}
      <section className="bg-gradient-to-br from-sleek-card via-sleek-panel to-sleek-bg text-white py-12 px-4 border-b border-slate-800 relative overflow-hidden">
        {/* Animated decorative circle lights */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-lime-400/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-sleek-accent-text animate-pulse" />
            تحديث فوري لأسعار 2026
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-slate-100">
            صمّم ملصقات منتجاتك بلمسة احترافية وسعر فوري
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            منصتنا التفاعلية تتيح لك اختيار المقاسات والكميات والنوع لملصقات مشاريعك (سواء كانت عبوات أطعمة، علب تجميل، أو ملصقات كرتونية) وحساب السعر وتجهيز الطلب مباشرة لإرساله عبر الواتساب في ثوانٍ معدودة.
          </p>
        </div>
      </section>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Column Left: Live Interactive Preview (Col span 5 on desktop) */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <StickerPreview 
              material={activeSpecs.material} 
              shape={activeSpecs.shape} 
              size={activeSpecs.size} 
              customLength={activeSpecs.customLength}
              customWidth={activeSpecs.customWidth}
            />
          </div>

          {/* Column Middle: Pricing Specs Config (Col span 4 on desktop) */}
          <div className="lg:col-span-4 flex flex-col h-full">
            <OrderForm 
              onAddItem={handleAddItem} 
              cartCount={cartItems.length} 
              onSpecsChange={handleSpecsChange} 
            />
          </div>

          {/* Column Right: Delivery and Shopping Cart Summary (Col span 3 on desktop) */}
          <div className="lg:col-span-3 flex flex-col h-full gap-6">
            <CartSection 
              items={cartItems} 
              onRemoveItem={handleRemoveItem} 
              customerInfo={customerInfo} 
            />
          </div>

        </div>

        {/* Customer Information Section - Span across width for easier input */}
        <div className="bg-sleek-panel rounded-2xl p-0.5 shadow-md border border-slate-800">
          <CustomerInfoForm 
            info={customerInfo} 
            onChange={setCustomerInfo} 
          />
        </div>

        {/* Features banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-sleek-card border border-slate-800 rounded-2xl p-5 flex gap-4 items-start shadow-xs">
            <div className="p-3 bg-emerald-950/60 rounded-xl text-sleek-accent-text">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm mb-1">دقة طباعة فائقة</h4>
              <p className="text-xs text-slate-400 leading-relaxed">نستخدم أحدث مكينات القص الرقمي والطباعة بالألوان الزاهية لمظهر رائع يجذب زبائنك لمنتجك.</p>
            </div>
          </div>

          <div className="bg-sleek-card border border-slate-800 rounded-2xl p-5 flex gap-4 items-start shadow-xs">
            <div className="p-3 bg-emerald-950/60 rounded-xl text-sleek-accent-text">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm mb-1">توصيل سريع وثابت</h4>
              <p className="text-xs text-slate-400 leading-relaxed">رسوم توصيل موحدة بقيمة 3 دنانير لكافة محافظات ومدن الأردن دون مفاجآت عند باب البيت.</p>
            </div>
          </div>

          <div className="bg-sleek-card border border-slate-800 rounded-2xl p-5 flex gap-4 items-start shadow-xs">
            <div className="p-3 bg-emerald-950/60 rounded-xl text-sleek-accent-text">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm mb-1">تجهيز ومراجعة التصميم مجاناً</h4>
              <p className="text-xs text-slate-400 leading-relaxed">بعد إرسال الطلب عبر الواتساب، يقوم فريق التصميم لدينا بمراجعة شعارك للتأكد من ملاءمته للقص والطباعة.</p>
            </div>
          </div>
        </div>

        {/* Dynamic FAQ / Help Section */}
        <div className="bg-sleek-card border border-slate-800 rounded-2xl p-6 md:p-8 shadow-md">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5.5 h-5.5 text-sleek-accent-text" />
            <h3 className="text-lg font-bold text-slate-100">الأسئلة الشائعة والمساعدة</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sleek-accent"></span>
                كيف أقوم بإرسال ملف الشعار أو التصميم لطباعته؟
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed pr-3">
                بعد قيامك بتحديد المواصفات المطلوبة وتعبئة معلومات التوصيل، اضغط على زر "إرسال الطلب عبر واتساب". سيقوم التطبيق بفتح محادثة واتساب معنا، وعندها يمكنك إرسال ملف التصميم الخاص بك (سواء كان صورة PNG، ملف PDF، أو Ai) للبدء في تجهيزه فوراً.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sleek-accent"></span>
                ما هو الفرق الفعلي بين الملصق الورقي والبلاستيكي؟
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed pr-3">
                الملصق الورقي خيار اقتصادي وممتاز للمنتجات الجافة مثل الصناديق الكرتونية، الأكياس الورقية، والعلب التي لا تتعرض لرطوبة. بينما الملصق البلاستيكي يتميز بمقاومته الكاملة للماء والزيوت والرطوبة، مما يجعله مثالياً لعبوات الصابون، العصائر، والعطور والمواد الغذائية المبردة.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sleek-accent"></span>
                ما هي مدة تجهيز الطلب والتوصيل في الأردن؟
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed pr-3">
                تستغرق عملية مراجعة التصميم والطباعة والقص من 24 إلى 48 ساعة كحد أقصى. يتم تسليم الطلب بعدها مباشرة لشركة التوصيل لتصلك شحنتك أينما كنت في الأردن خلال يوم عمل واحد فقط.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sleek-accent"></span>
                هل يمكنني طلب شكل أو تصميم مخصص غير دائري أو مربع؟
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed pr-3">
                نعم بالتأكيد! نحن نوفر قص مخصص على حدود الشعار بالضبط (Die-Cut). للطلبات الخاصة أو الأشكال الفريدة غير المدرجة هنا، يمكنك إعلام موظف المبيعات بذلك عند الانتقال للواتساب وسيقوم بمساعدتك وتسعيرها لك فوراً.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-[#05070a] text-slate-500 border-t border-slate-900 py-10 text-center text-xs">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex justify-center mb-2">
            <div className="bg-white p-5 rounded-2xl shadow-xl inline-block">
              <LabelcoLogo variant="full" className="w-52" theme="light" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="font-black text-slate-200 text-sm">لايبلكو</span>
            <span className="font-bold text-sleek-accent-text font-mono text-sm">Labelco © 2026</span>
          </div>
          <p className="max-w-md mx-auto text-slate-600">
            جميع الحقوق محفوظة. تم تطوير هذه المنصة التفاعلية لتسهيل اختيار وحساب أسعار الملصقات لرواد الأعمال والمشاريع الصغيرة والمتوسطة في المملكة الأردنية الهاشمية.
          </p>
        </div>
      </footer>
    </div>
  );
}
