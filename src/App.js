import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import WeekView from './components/WeekView';
import AddRoutineForm from './components/AddRoutineForm';
import RoutineList from './components/RoutineList';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
const TODAY_IDX = (new Date().getDay() + 6) % 7;
const getTodayKey = () => new Date().toISOString().slice(0, 10);

function App() {
  const [routines, setRoutines] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('wt_routines') || '[]');
    } catch {
      return [];
    }
  });

  const [doneLog, setDoneLog] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('wt_done') || '{}');
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('wt_routines', JSON.stringify(routines));
  }, [routines]);

  useEffect(() => {
    localStorage.setItem('wt_done', JSON.stringify(doneLog));
  }, [doneLog]);

  const todayKey = getTodayKey();

  const isDone = (id) => (doneLog[todayKey] || []).includes(id);

  const toggleDone = (id) => {
    setDoneLog((prev) => {
      const todayDone = prev[todayKey] || [];
      const idx = todayDone.indexOf(id);
      const updated = idx >= 0
        ? todayDone.filter((i) => i !== id)
        : [...todayDone, id];
      return { ...prev, [todayKey]: updated };
    });
  };

  const addRoutine = (routine) => {
    setRoutines((prev) => [...prev, { ...routine, id: Date.now() }]);
  };

  const deleteRoutine = (id) => {
    setRoutines((prev) => prev.filter((r) => r.id !== id));
  };

  const todayRoutines = routines.filter((r) => r.days.includes(TODAY_IDX));
  const doneToday = todayRoutines.filter((r) => isDone(r.id)).length;
  const completionRate = todayRoutines.length
    ? Math.round((doneToday / todayRoutines.length) * 100)
    : 0;

  return (
    <div className="app">
      <Header />
      <main className="container">
        <StatsGrid
          total={routines.length}
          todayCount={todayRoutines.length}
          doneToday={doneToday}
          completionRate={completionRate}
        />
        <WeekView routines={routines} DAYS={DAYS} todayIdx={TODAY_IDX} isDone={isDone} />
        <AddRoutineForm onAdd={addRoutine} DAYS={DAYS} />
        <section>
          <h2 className="section-title">오늘의 루틴 ({DAYS[TODAY_IDX]}요일)</h2>
          <RoutineList
            routines={todayRoutines}
            isDone={isDone}
            onToggle={toggleDone}
            onDelete={deleteRoutine}
            showDays={false}
            emptyMsg="오늘 예정된 루틴이 없어요"
          />
        </section>
        <section>
          <h2 className="section-title">전체 루틴</h2>
          <RoutineList
            routines={routines}
            isDone={isDone}
            onToggle={toggleDone}
            onDelete={deleteRoutine}
            showDays={true}
            emptyMsg="루틴을 추가해보세요!"
          />
        </section>
      </main>
    </div>
  );
}

export default App;
