import { MaterialType, SizeType, QtyType } from './types';

export const PRICES_PAPER: Record<SizeType, Record<QtyType, number>> = {
  "2cm": { "50": 1, "100": 2, "200": 3, "500": 6, "1000": 9, "2000": 15 },
  "3cm": { "50": 1, "100": 3, "200": 4, "500": 7, "1000": 10, "2000": 16 },
  "4cm": { "50": 3, "100": 4, "200": 6, "500": 9, "1000": 12, "2000": 20 },
  "5cm": { "50": 3, "100": 6, "200": 8, "500": 12, "1000": 15, "2000": 30 },
  "6cm": { "50": 4, "100": 7, "200": 9, "500": 15, "1000": 20, "2000": 44 },
  "7cm": { "50": 6, "100": 8, "200": 10, "500": 18, "1000": 30, "2000": 60 }
};

export const PRICES_PLASTIC: Record<SizeType, Record<QtyType, number>> = {
  "2cm": { "50": 1, "100": 3, "200": 4, "500": 7, "1000": 10, "2000": 16 },
  "3cm": { "50": 2, "100": 5, "200": 6, "500": 9, "1000": 12, "2000": 20 },
  "4cm": { "50": 3, "100": 6, "200": 7, "500": 10, "1000": 16, "2000": 24 },
  "5cm": { "50": 4, "100": 7, "200": 9, "500": 13, "1000": 18, "2000": 35 },
  "6cm": { "50": 5, "100": 8, "200": 10, "500": 17, "1000": 24, "2000": 50 },
  "7cm": { "50": 7, "100": 9, "200": 11, "500": 20, "1000": 35, "2000": 65 }
};

export const JORDAN_CITIES = [
  "عمان",
  "الزرقاء",
  "إربد",
  "العقبة",
  "السلط",
  "مأدبا",
  "المفرق",
  "جرش",
  "عجلون",
  "الكرك",
  "الطفيلة",
  "معان"
];

export const DELIVERY_FEE = 3.00;
export const WHATSAPP_NUMBER = "962782716551";

export function calculateAreaPrice(material: MaterialType, length: number, width: number, qty: QtyType): number {
  const area = length * width;
  const standardAreas = [4, 9, 16, 25, 36, 49]; // 2cm^2 to 7cm^2
  const standardSizes: SizeType[] = ['2cm', '3cm', '4cm', '5cm', '6cm', '7cm'];
  
  const prices = standardSizes.map(size => {
    if (material === "ورقي") {
      return PRICES_PAPER[size][qty] || 0;
    } else {
      return PRICES_PLASTIC[size][qty] || 0;
    }
  });

  // Under minimum standard size (4 cm^2)
  if (area <= 4) {
    return prices[0];
  }
  
  // Over maximum standard size (49 cm^2)
  if (area >= 49) {
    // Extrapolate slope between 6cm (36) and 7cm (49)
    const slope = (prices[5] - prices[4]) / (49 - 36);
    const rawPrice = prices[5] + (area - 49) * slope;
    return Math.max(1, parseFloat(rawPrice.toFixed(2)));
  }

  // Linear interpolation for intermediate sizes
  for (let i = 0; i < standardAreas.length - 1; i++) {
    const a0 = standardAreas[i];
    const a1 = standardAreas[i + 1];
    if (area >= a0 && area <= a1) {
      const p0 = prices[i];
      const p1 = prices[i + 1];
      const rawPrice = p0 + ((area - a0) / (a1 - a0)) * (p1 - p0);
      return Math.max(1, parseFloat(rawPrice.toFixed(2)));
    }
  }

  return prices[2]; // Fallback to 4cm (16 cm^2)
}

export function calculatePrice(
  material: MaterialType,
  size: SizeType | string,
  qty: QtyType,
  customLength?: number,
  customWidth?: number
): number {
  if (customLength && customWidth) {
    return calculateAreaPrice(material, customLength, customWidth, qty);
  }
  
  const sizeStr = size as SizeType;
  if (material === "ورقي") {
    return PRICES_PAPER[sizeStr]?.[qty] || 0;
  } else {
    return PRICES_PLASTIC[sizeStr]?.[qty] || 0;
  }
}
