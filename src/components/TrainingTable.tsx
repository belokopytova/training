import type { Training } from '../types/types'
import TrainingRow from './TrainingRow'

interface TrainingTableProps {
  trainings: Training[];
  onEdit: (training: Training) => void;
  onDelete: (date: string) => void;
}

function TrainingTable({ trainings, onEdit, onDelete }: TrainingTableProps) {
  return (
    <div className="data-table">
      <div className="table-header">
        <div className="col-date">Дата (ДД.ММ.ГГ)</div>
        <div className="col-distance">Пройдено км</div>
        <div className="col-actions">Действия</div>
      </div>
      <div className="table-body">
        {trainings.length === 0 ? (
          <div className="empty-state">Нет данных о тренировках</div>
        ) : (
          trainings.map((training) => (
            <TrainingRow
              key={training.date}
              training={training}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TrainingTable;