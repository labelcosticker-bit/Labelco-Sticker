import { CustomerInfo } from '../types';
import { JORDAN_CITIES } from '../data';
import { User, MapPin, MessageSquare, Phone } from 'lucide-react';

interface CustomerInfoFormProps {
  info: CustomerInfo;
  onChange: (info: CustomerInfo) => void;
}

export function CustomerInfoForm({ info, onChange }: CustomerInfoFormProps) {
  const handleInputChange = (key: keyof CustomerInfo, value: string) => {
    onChange({
      ...info,
      [key]: value
    });
  };

  return (
    <div className="bg-sleek-card border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-100 mb-1 flex items-center gap-2">
          <User className="w-4.5 h-4.5 text-sleek-accent-text" />
          <span>معلومات التوصيل والاتصال</span>
        </h3>
        <p className="text-xs text-slate-400">يرجى ملء البيانات لتسهيل عملية التوصيل وتأكيد الطلب بسرعة.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-slate-500" />
            <span>الاسم الكامل:</span>
          </label>
          <input
            type="text"
            required
            placeholder="مثال: أحمد العلي"
            value={info.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full text-sm border border-slate-800 focus:border-sleek-accent focus:ring-1 focus:ring-sleek-accent rounded-xl p-2.5 bg-slate-950 text-slate-100 outline-hidden transition-all"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-slate-500" />
            <span>رقم الهاتف للتواصل:</span>
          </label>
          <input
            type="tel"
            required
            placeholder="مثال: 078XXXXXXX"
            value={info.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full text-sm border border-slate-800 focus:border-sleek-accent focus:ring-1 focus:ring-sleek-accent rounded-xl p-2.5 bg-slate-950 text-slate-100 outline-hidden transition-all text-left"
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* City Selection */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>المدينة:</span>
          </label>
          <select
            value={info.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="w-full text-sm border border-slate-800 focus:border-sleek-accent focus:ring-1 focus:ring-sleek-accent rounded-xl p-2.5 bg-slate-950 text-slate-100 outline-hidden transition-all font-medium cursor-pointer"
          >
            <option value="" className="bg-slate-900 text-slate-400">-- اختر المدينة --</option>
            {JORDAN_CITIES.map((city) => (
              <option key={city} value={city} className="bg-slate-900 text-slate-100">
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Detail Address */}
        <div className="md:col-span-2 space-y-1">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>العنوان التفصيلي:</span>
          </label>
          <input
            type="text"
            placeholder="المنطقة، الشارع، البناية، رقم الشقة"
            value={info.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="w-full text-sm border border-slate-800 focus:border-sleek-accent focus:ring-1 focus:ring-sleek-accent rounded-xl p-2.5 bg-slate-950 text-slate-100 outline-hidden transition-all"
          />
        </div>
      </div>

      {/* Special Notes */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
          <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
          <span>ملاحظات إضافية (اختياري):</span>
        </label>
        <textarea
          rows={2}
          placeholder="أي طلب خاص بالتصميم أو تفاصيل التوصيل..."
          value={info.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          className="w-full text-sm border border-slate-800 focus:border-sleek-accent focus:ring-1 focus:ring-sleek-accent rounded-xl p-2.5 bg-slate-950 text-slate-100 outline-hidden transition-all resize-none"
        ></textarea>
      </div>
    </div>
  );
}
