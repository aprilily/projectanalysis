import React from 'react';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

function RoutineCard({ routine, isDone, onToggle, onDelete, showDays }) {
  const done = isDone(routine.id);
  const metaParts = [
    routine.sets ? `${routine.sets}세트` : null,
    routine.reps ? `${routine.reps}회` : null,
    routine.time ? `${routine.time}분` : null,
  ].filter(Boolean);
  const meta = metaParts.length ? metaParts.join(' · ') : '세부 정보 없음';

  return (
    <div className={`routine-card ${done ? 'done' : ''}`}>
      <div className="routine-header">
        <div>
          <div className={`routine-name ${done ? 'done-text' : ''}`}>
            {routine.name}
          </div>
          <div className="routine-meta">{meta}</div>
          <div className="badges">
            <span className="badge badge-cat">{routine.cat}</span>
            {showDays &&
              routine.days.map((d) => (
                <span key={d} className="badge badge-day">
                  {DAYS[d]}
                </span>
              ))}
            {done && <span className="badge badge-done">✓ 완료</span>}
          </div>
        </div>
        <div className="routine-actions">
          <button
            className={`btn-sm btn-done`}
            onClick={() => onToggle(routine.id)}
          >
            {done ? '↩ 취소' : '✓ 완료'}
          </button>
          <button
            className="btn-sm btn-del"
            onClick={() => onDelete(routine.id)}
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  );
}

function RoutineList({ routines, isDone, onToggle, onDelete, showDays, emptyMsg }) {
  if (routines.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">🏋️</span>
        {emptyMsg}
      </div>
    );
  }

  return (
    <div className="routines-list">
      {routines.map((r) => (
        <RoutineCard
          key={r.id}
          routine={r}
          isDone={isDone}
          onToggle={onToggle}
          onDelete={onDelete}
          showDays={showDays}
        />
      ))}
    </div>
  );
}

export default RoutineList;
