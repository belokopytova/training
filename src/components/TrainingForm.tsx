import { formatDateToDisplay } from "../utils/parseDate"

interface TrainingFormProps {
  dateInput: string;
  distanceInput: string;
  onDateChange: (value: string) => void;
  onDistanceChange: (value: string) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

function TrainingForm({
  dateInput,
  distanceInput,
  onDateChange,
  onDistanceChange,
  onSubmit,
}: TrainingFormProps) {
  
  const handleDateChange = (value: string) => {
    const displayFormat = formatDateToDisplay(value);
    onDateChange(displayFormat);
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
            <input
              type="date"
              id="date"
              name="date"
              value={dateInput ? dateInput.split('.').reverse().join('-') : ''}
              onChange={({ target: { value } }) => handleDateChange(value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="distance">Пройдено км</label>
            <input
              type="number"
              id="distance"
              name="distance"
              placeholder="0"
              step="0.1"
              min="0"
              value={distanceInput}
              onChange={({ target: { value } }) => onDistanceChange(value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            OK
          </button>
        </div>
      </form>
    </div>
  );
}

export default TrainingForm;