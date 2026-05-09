import React from 'react';

function WeekView({ routines, DAYS, todayIdx, isDone }) {
  return (
    <section>
      <h2 className="section-title">이번 주 현황</h2>
      <div className="week-view">
        {DAYS.map((day, i) => {
          const count = routines.filter((r) => r.days.includes(i)).length;
          const doneCnt = routines.filter((r) => r.days.includes(i) && isDone(r.id)).length;
          const isToday = i === todayIdx;

          return (
            <div
              key={day}
              className={`week-day ${isToday ? 'today' : ''} ${doneCnt > 0 ? 'has-done' : ''}`}
            >
              <div className={`week-day-label ${isToday ? 'today-label' : ''}`}>
                {day}
              </div>
              <div className="week-day-count">{count}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default WeekView;
