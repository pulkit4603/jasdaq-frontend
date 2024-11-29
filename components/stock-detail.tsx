'use client'

import { useState } from 'react'
import { useStocks, Stock } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import OrderForm from './order-form'

const generateChartData = (stock: Stock) => {
  const data = []
  let price = stock.price - (stock.change * (stock.price / 100))
  for (let i = 30; i >= 0; i--) {
    data.push({
      time: `${i}m ago`,
      price: price + (Math.random() - 0.5) * 2
    })
    price += (stock.change / 30) * (stock.price / 100)
  }
  return data
}

export default function StockDetail() {
  const stocks = useStocks()
  const [selectedStock, setSelectedStock] = useState<Stock | null>(stocks[0])

  const chartData = selectedStock ? generateChartData(selectedStock) : []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={stocks[0].symbol} onValueChange={(value) => setSelectedStock(stocks.find(s => s.symbol === value) || null)}>
          <TabsList>
            {stocks.map((stock) => (
              <TabsTrigger key={stock.symbol} value={stock.symbol}>{stock.symbol}</TabsTrigger>
            ))}
          </TabsList>
          {stocks.map((stock) => (
            <TabsContent key={stock.symbol} value={stock.symbol}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">{stock.name}</h3>
                  <p className="text-2xl font-bold">${stock.price.toFixed(2)}</p>
                  <p className={`text-lg ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                  </p>
                  <p>Volume: {stock.volume.toLocaleString()}</p>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={['auto', 'auto']} />
                      <Tooltip />
                      <Line type="monotone" dataKey="price" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <OrderForm stock={stock} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

