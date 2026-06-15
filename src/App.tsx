import { useState } from 'react'
import './App.css'
import TrainingForm from './components/TrainingForm'
import TrainingTable from './components/TrainingTable'
import { useTrainingStorage } from './hooks/useTrainingStorage'
import type { Training } from './types/types'
import { parseDate } from './utils/parseDate'

function App() {
  const { trainings, updateTrainings } = useTrainingStorage([])
  const [dateInput, setDateInput] = useState('')
  const [distanceInput, setDistanceInput] = useState('')
  const [editingDate, setEditingDate] = useState<string | null>(null)

  const mergeTrainingsByDate = (items: Training[]) => {
    const grouped = new Map<string, Training>()

    items.forEach((item) => {
      const existing = grouped.get(item.date)
      if (existing) {
        existing.distance = parseFloat((existing.distance + item.distance).toFixed(2))
      } else {
        grouped.set(item.date, { ...item })
      }
    })

    return Array.from(grouped.values())
  }

  const addOrUpdate = (dateStr: string, distance: number, isEdit = false) => {
    const parsed = parseDate(dateStr)
    if (!parsed) return false
    const { iso, display } = parsed

    updateTrainings((prev) => {
      let next = [...prev]

      if (isEdit && editingDate) {
        next = next.filter(({ date }) => date !== editingDate)
      }

      next.push({ date: iso, dateDisplay: display, distance })
      next = mergeTrainingsByDate(next)

      return next.sort((a, b) => (b.date > a.date ? 1 : -1))
    })

    setEditingDate(null)
    return true
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    const distance = parseFloat(distanceInput.replace(',', '.'))
    if (isNaN(distance) || distance <= 0) return

    if (addOrUpdate(dateInput, distance, !!editingDate)) {
      setDateInput('')
      setDistanceInput('')
    }
  }

  const handleDelete = (date: string) => {
    updateTrainings((prev) => prev.filter(({ date: d }) => d !== date))
    if (editingDate === date) {
      setEditingDate(null)
      setDateInput('')
      setDistanceInput('')
    }
  }

  const handleEdit = ({ date, dateDisplay, distance }: Training) => {
    setEditingDate(date)
    setDateInput(dateDisplay)
    setDistanceInput(String(distance))
  }

  return (
    <div className="container">
      <TrainingForm
        dateInput={dateInput}
        distanceInput={distanceInput}
        onDateChange={setDateInput}
        onDistanceChange={setDistanceInput}
        onSubmit={handleSubmit}
      />
      <TrainingTable
        trainings={trainings}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App