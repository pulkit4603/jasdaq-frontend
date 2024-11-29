import { Suspense } from 'react'
import StockList from '../components/stock-list'
import StockDetail from '../components/stock-detail'

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Stock Trading Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Suspense fallback={<div>Loading stocks...</div>}>
            <StockList />
          </Suspense>
        </div>
        <div className="md:col-span-2">
          <Suspense fallback={<div>Loading stock details...</div>}>
            <StockDetail />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

