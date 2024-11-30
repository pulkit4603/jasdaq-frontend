import { useState, useEffect } from 'react';
import axios from 'axios';

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
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 150.25, change: 2.5, volume: 1000000 },
  { symbol: 'HIND', name: 'Hindalco Cement Inc.', price: 2750.80, change: -5.2, volume: 500000 },
  { symbol: 'RELI', name: 'Realiance Inds.', price: 305.75, change: 1.8, volume: 750000 },
  { symbol: 'ADNI', name: 'Adani Enterprices Inc.', price: 3380.50, change: -2.1, volume: 600000 },
];

export function useStocks() {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks);

  useEffect(() => {
    async function fetchInitialPrices() {
      const updatedStocks = await Promise.all(
        initialStocks.map(async (stock) => {
          const response = await axios.post('http://localhost:8080/api/orders/price', {
            stockSymbol: stock.symbol,
          });
          return {
            ...stock,
            price: response.data,
          };
        })
      );
      console.log("updated stocks: ", updatedStocks);
      setStocks(updatedStocks);
    }

    fetchInitialPrices();

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

