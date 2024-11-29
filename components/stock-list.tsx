'use client'

import { useStocks } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function StockList() {
  const stocks = useStocks()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stocks</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {stocks.map((stock) => (
            <li key={stock.symbol} className="flex justify-between items-center">
              <div>
                <span className="font-bold">{stock.symbol}</span>
                <span className="text-sm text-gray-500 ml-2">{stock.name}</span>
              </div>
              <div>
                <span className={`font-bold ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  ${stock.price.toFixed(2)}
                </span>
                <span className={`text-sm ml-2 ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

