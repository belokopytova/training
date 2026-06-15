import { useEffect, useState } from 'react'
import type { Training } from '../types/types'

const STORAGE_KEY = 'training_data'

export function useTrainingStorage(initialData: Training[] = []) {
  const [trainings, setTrainings] = useState<Training[]>(initialData)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Training[]
        setTrainings(parsed)
      }
    } catch (error) {
      console.error('Ошибка загрузки данных из localStorage:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trainings))
    } catch (error) {
      console.error('Ошибка сохранения данных в localStorage:', error)
    }
  }, [trainings, isLoaded])

  const updateTrainings = (updater: (prev: Training[]) => Training[]) => {
    setTrainings(updater)
  }

  return { trainings, updateTrainings, isLoaded }
}