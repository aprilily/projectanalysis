import React from 'react';

function StatsGrid({ total, todayCount, doneToday, completionRate }) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-label">전체 루틴</div>
        <div className="stat-value">
          {total} <span className="stat-unit">개</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-label">오늘 루틴</div>
        <div className="stat-value">
          {todayCount} <span className="stat-unit">개</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-label">오늘 완료</div>
        <div className="stat-value">
          {doneToday} <span className="stat-unit">개</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-label">완료율</div>
        <div className="stat-value">
          {completionRate} <span className="stat-unit">%</span>
        </div>
        <div className="progress-bar-wrap">
          <div
            className="progress-bar"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default StatsGrid;
