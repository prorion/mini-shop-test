import { describe, test, expect } from 'vitest';
import type { CartItem, Product } from '../types';
import { calculateTotal } from './cart';
import { SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from './constants';

const product = (
  overrides: Partial<Product> & Pick<Product, 'id' | 'name' | 'price'>
): Product => ({
  category: 'electronics',
  stock: 10,
  createdAt: '2021-01-01',
  ...overrides,
});

describe('calculateTotal', () => {
  test('빈 장바구니는 0원', () => {
    expect(calculateTotal([])).toBe(0);
  });

  test('단일 상품: 소계 + 배송비', () => {
    const items: CartItem[] = [
      { product: product({ id: 1, name: '상품1', price: 1000 }), quantity: 2 },
    ];
    // 소계 2000 < 무료배송 기준이면 배송비 추가
    expect(calculateTotal(items)).toBe(2000 + SHIPPING_FEE);
  });

  test('여러 상품: 소계 + 배송비', () => {
    const items: CartItem[] = [
      { product: product({ id: 1, name: '상품1', price: 1000 }), quantity: 2 },
      {
        product: product({
          id: 2,
          name: '상품2',
          price: 500,
          createdAt: '2021-01-02',
        }),
        quantity: 3,
      },
    ];
    expect(calculateTotal(items)).toBe(3500 + SHIPPING_FEE);
  });

  test('소계가 무료배송 기준 이상이면 배송비 없음', () => {
    const price = FREE_SHIPPING_THRESHOLD;
    const items: CartItem[] = [
      { product: product({ id: 1, name: '비싼상품', price }), quantity: 1 },
    ];
    expect(calculateTotal(items)).toBe(price);
  });
});
