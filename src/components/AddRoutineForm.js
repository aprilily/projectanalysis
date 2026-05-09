import React, { useState } from 'react';

const CATEGORIES = ['하체', '상체', '코어', '유산소', '전신', '스트레칭'];

function AddRoutineForm({ onAdd, DAYS }) {
  const [name, setName] = useState('');
  const [cat, setCat] = useState('하체');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [time, setTime] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (i) => {
    setSelectedDays((prev) =>
      prev.includes(i) ? prev.filter((d) => d !== i) : [...prev, i]
    );
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('운동 이름을 입력해주세요');
      return;
    }
    onAdd({
      name: name.trim(),
      cat,
      sets: sets ? parseInt(sets) : null,
      reps: reps ? parseInt(reps) : null,
      time: time ? parseInt(time) : null,
      days: selectedDays.length ? [...selectedDays] : [0, 1, 2, 3, 4, 5, 6],
    });
    setName('');
    setSets('');
    setReps('');
    setTime('');
    setSelectedDays([]);
  };

  return (
    <section>
      <div className="add-form">
        <h2 className="section-title">루틴 추가</h2>
        <div className="form-row">
          <div className="field">
            <label>운동 이름</label>
            <input
              type="text"
              placeholder="예) 스쿼트"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
          <div className="field">
            <label>분류</label>
            <select value={cat} onChange={(e) => setCat(e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row-3">
          <div className="field">
            <label>세트</label>
            <input
              type="number"
              placeholder="3"
              min="1"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
            />
          </div>
          <div className="field">
            <label>횟수</label>
            <input
              type="number"
              placeholder="12"
              min="1"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
          </div>
          <div className="field">
            <label>시간(분)</label>
            <input
              type="number"
              placeholder="30"
              min="1"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="days-label">요일 선택 (미선택 시 매일)</div>
          <div className="days-row">
            {DAYS.map((day, i) => (
              <button
                key={day}
                className={`day-btn ${selectedDays.includes(i) ? 'active' : ''}`}
                onClick={() => toggleDay(i)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
        <button className="btn-add" onClick={handleSubmit}>
          + 루틴 추가
        </button>
      </div>
    </section>
  );
}

export default AddRoutineForm;
