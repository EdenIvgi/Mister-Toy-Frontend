// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react'
import { Bar, Pie, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js'
import { toyService } from '../services/toy.service.js'
import { utilService } from '../services/util.service.js'

ChartJS.register(
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement
)

export function Dashboard() {
  const [priceData, setPriceData] = useState(null)
  const [inventoryData, setInventoryData] = useState(null)
  const [lineData, setLineData] = useState(null)

  useEffect(() => {
    toyService.query().then((toys) => {
      const labels = Array.from(new Set(toys.flatMap(t => t.labels))).sort()

      const avgPrices = labels.map(lbl => {
        const arr = toys.filter(t => t.labels.includes(lbl))
        const avg = arr.length ? arr.reduce((s, t) => s + t.price, 0) / arr.length : 0
        return Number(avg.toFixed(2))
      })

      const stockPercents = labels.map(lbl => {
        const arr = toys.filter(t => t.labels.includes(lbl))
        const total = arr.length
        const inStock = arr.filter(t => t.inStock).length
        return total ? Math.round((inStock / total) * 100) : 0
      })

      setPriceData({
        labels,
        datasets: [{ label: 'Average Price', data: avgPrices }],
      })

      setInventoryData({
        labels,
        datasets: [{ label: '% In Stock', data: stockPercents }],
      })
    })

    const days = 10
    const dates = Array.from({ length: days }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (days - 1 - i))
      return d.toLocaleDateString('en-GB')
    })
    const values = dates.map(() => utilService.getRandomIntInclusive(10, 120))
    setLineData({
      labels: dates,
      datasets: [{ label: 'Random Metric', data: values }],
    })
  }, [])

  return (
    <section className="dashboard">
      <h1>Dashboard</h1>

      <div>
        <h2>Prices per Label</h2>
        {priceData && <Bar data={priceData} />}
      </div>

      <div>
        <h2>Inventory by Label</h2>
        {inventoryData && <Pie data={inventoryData} />}
      </div>

      <div>
        <h2>Random Line (dates & values)</h2>
        {lineData && <Line data={lineData} />}
      </div>
    </section>
  )
}

