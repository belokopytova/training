import { type ChangeEvent, useState } from 'react'

function ColorConverter() {
  const [hex, setHex] = useState('#9921ff')
  const [backgroundColor, setBackgroundColor] = useState('#9921ff')
  const [error, setError] = useState(false)
  
  const HEX_REGEX = /^#[0-9a-fA-F]{6}$/

  const hexToRgb = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgb(${r}, ${g}, ${b})`
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setHex(value)

    if (value.length !== 7) {
      setError(false)
      return
    }

    if (HEX_REGEX.test(value)) {
      setBackgroundColor(value)
      setError(false)
    } else {
      setError(true)
    }
  }

  const displayText = hex.length !== 7 ? hexToRgb(backgroundColor) : error ? 'Ошибка!' : hexToRgb(hex)

  return (
    <div className="app" style={{ backgroundColor }}>
      <label className="container">
        <input
          type="text"
          className="input-field"
          value={hex}
          onChange={handleChange}
          placeholder="Введите код цвета..."
        />
        <span className={`result ${error ? 'error' : ''}`}>{displayText}</span>
      </label>
    </div>
  )
}

export default ColorConverter