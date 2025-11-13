import { useCallback, useEffect, useState } from 'react';
import { createHabit, fetchHabits, completeHabit } from '../services/api';

export function useHabits() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHabits = useCallback(
    async (withSpinner = true) => {
      if (withSpinner) {
        setLoading(true);
      }
      try {
        setError(null);
        const data = await fetchHabits();
        setHabits(data);
        return data;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        if (withSpinner) {
          setLoading(false);
        }
      }
    },
    []
  );

  const addHabit = useCallback(
    async (habit) => {
      try {
        setError(null);
        const created = await createHabit(habit);
        await loadHabits(false);
        return created;
      } catch (err) {
        setError(err);
        throw err;
      }
    },
    [loadHabits]
  );

  const complete = useCallback(
    async (habitId, pointsEarned) => {
      try {
        setError(null);
        await completeHabit(habitId, pointsEarned);
        await loadHabits(false);
      } catch (err) {
        setError(err);
        throw err;
      }
    },
    [loadHabits]
  );

  useEffect(() => {
    loadHabits().catch(() => {});
  }, [loadHabits]);

  return {
    habits,
    loading,
    error,
    addHabit,
    completeHabit: complete,
    reload: loadHabits,
  };
}
