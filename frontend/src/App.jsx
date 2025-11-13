import { useEffect, useState } from 'react';
import HabitForm from './components/HabitForm.jsx';
import HabitList from './components/HabitList.jsx';
import ProgressOverview from './components/ProgressOverview.jsx';
import BadgeCollection from './components/BadgeCollection.jsx';
import PetStatus from './components/PetStatus.jsx';
import { useHabits } from './hooks/useHabits.js';
import { useProgress } from './hooks/useProgress.js';

export default function App() {
  const {
    habits,
    loading: habitsLoading,
    error: habitsError,
    addHabit,
    completeHabit,
  } = useHabits();
  const {
    summary,
    badges,
    pet,
    user,
    loading: progressLoading,
    reload: reloadProgress,
  } = useProgress();
  const [toast, setToast] = useState(null);
  const [creating, setCreating] = useState(false);
  const [completingId, setCompletingId] = useState(null);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timeout);
  }, [toast]);

  function showToast(type, message) {
    setToast({ type, message });
  }

  async function handleCreate(habit) {
    try {
      setCreating(true);
      await addHabit(habit);
      await reloadProgress();
      showToast('success', 'Nuevo hábito añadido a tu ritual.');
    } catch (error) {
      const validationMessage = error?.response?.data?.errors?.[0]?.msg;
      const fallback = error?.response?.data?.error;
      showToast(
        'error',
        validationMessage || fallback || 'No pudimos guardar el hábito. Revisa los datos e inténtalo de nuevo.'
      );
      throw error;
    } finally {
      setCreating(false);
    }
  }

  async function handleComplete(habitId, points) {
    try {
      setCompletingId(habitId);
      await completeHabit(habitId, points);
      await reloadProgress();
      showToast('success', '¡Respira hondo! Has completado el hábito.');
    } catch (error) {
      const message = error?.response?.data?.error || 'No pudimos registrar la completitud. Vuelve a intentarlo.';
      showToast('error', message);
    } finally {
      setCompletingId(null);
    }
  }

  return (
    <div className="app-shell">
      {toast && (
        <div className={`toast toast--${toast.type}`} role="status">
          <span>{toast.message}</span>
        </div>
      )}

      <header className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">Planner mindfulness</p>
          <h1 className="hero__title">Diseña rituales que nutren tu energía</h1>
          <p className="hero__subtitle">
            Pequeñas acciones constantes transforman tus días. Acompaña a Lumi y convierte cada hábito en un gesto de bienestar.
          </p>
        </div>
        {!progressLoading && summary && (
          <dl className="hero__metrics">
            <div>
              <dt>XP acumulada</dt>
              <dd>{summary.earnedPoints}</dd>
            </div>
            <div>
              <dt>Hábitos activos</dt>
              <dd>{summary.totalHabits}</dd>
            </div>
            <div>
              <dt>Nivel actual</dt>
              <dd>{summary.level}</dd>
            </div>
          </dl>
        )}
        <span className="hero__glow" aria-hidden="true" />
      </header>

      <main className="mindful-grid">
        <section className="stack">
          <HabitForm onSubmit={handleCreate} isSubmitting={creating} />
          {habitsError && (
            <p className="error-banner" role="alert">
              Algo salió mal al cargar tus hábitos. Actualiza la página o inténtalo más tarde.
            </p>
          )}
          {habitsLoading ? (
            <div className="panel panel--floating">
              <p className="loading">Respira... estamos preparando tus rituales.</p>
            </div>
          ) : (
            <HabitList habits={habits} onComplete={handleComplete} completingId={completingId} />
          )}
        </section>

        <section className="stack">
          {progressLoading ? (
            <div className="panel panel--floating">
              <p className="loading">Harmonizando tu tablero de progreso...</p>
            </div>
          ) : (
            <>
              <ProgressOverview summary={summary} user={user} />
              <PetStatus pet={pet} />
              <BadgeCollection badges={badges} />
            </>
          )}
        </section>
      </main>
    </div>
  );
}
