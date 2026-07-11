export type MaterialType = 'ورقي' | 'بلاستيكي';
export type ShapeType = 'مربع' | 'دائري';
export type SizeType = '2cm' | '3cm' | '4cm' | '5cm' | '6cm' | '7cm';
export type QtyType = '50' | '100' | '200' | '500' | '1000' | '2000';

export interface CartItem {
  id: string;
  material: MaterialType;
  shape: ShapeType;
  size: string;
  qty: QtyType;
  price: number;
  length?: number;
  width?: number;
  isCustomSize?: boolean;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
}
