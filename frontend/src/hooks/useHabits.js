import { useEffect, useState } from 'react';
import { createHabit, fetchHabits, completeHabit } from '../services/api';

export function useHabits() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadHabits() {
    try {
      setLoading(true);
      const data = await fetchHabits();
      setHabits(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  async function addHabit(habit) {
    const newHabit = await createHabit(habit);
    setHabits((prev) => [...prev, newHabit]);
  }

  async function complete(habitId, pointsEarned) {
    await completeHabit(habitId, pointsEarned);
    await loadHabits();
  }

  useEffect(() => {
    loadHabits();
  }, []);

  return {
    habits,
    loading,
    error,
    addHabit,
    completeHabit: complete,
    reload: loadHabits,
  };
}
