import { useState, useEffect } from 'react';

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
}

export interface Order {
  symbol: string;
  type: 'market' | 'limit';
  action: 'buy' | 'sell';
  shares: number;
  price?: number;
}

const initialStocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, change: 2.5, volume: 1000000 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.80, change: -5.2, volume: 500000 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 305.75, change: 1.8, volume: 750000 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3380.50, change: -2.1, volume: 600000 },
];

export function useStocks() {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks =>
        prevStocks.map(stock => ({
          ...stock,
          price: stock.price + (Math.random() - 0.5) * 2,
          change: (Math.random() - 0.5) * 5,
          volume: stock.volume + Math.floor(Math.random() * 10000),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return stocks;
}

export function placeOrder(order: Order): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Order placed:', order);
      resolve(true);
    }, 1000);
  });
}

