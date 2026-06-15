import type { Training } from '../types/types'

interface TrainingRowProps {
  training: Training;
  onEdit: (training: Training) => void;
  onDelete: (date: string) => void;
}

function TrainingRow({ training, onEdit, onDelete }: TrainingRowProps) {
  const { date, dateDisplay, distance } = training;

  return (
    <div className="table-row">
      <div className="col-date">{dateDisplay}</div>
      <div className="col-distance">{distance}</div>
      <div className="col-actions">
        <button
          type="button"
          className="action-btn edit-btn"
          title="Редактировать"
          onClick={() => onEdit(training)}
        >
          ✎
        </button>
        <button
          type="button"
          className="action-btn delete-btn"
          title="Удалить"
          onClick={() => onDelete(date)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default TrainingRow;