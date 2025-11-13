import HabitForm from './components/HabitForm.jsx';
import HabitList from './components/HabitList.jsx';
import ProgressOverview from './components/ProgressOverview.jsx';
import BadgeCollection from './components/BadgeCollection.jsx';
import PetStatus from './components/PetStatus.jsx';
import { useHabits } from './hooks/useHabits.js';
import { useProgress } from './hooks/useProgress.js';

export default function App() {
  const { habits, loading: habitsLoading, addHabit, completeHabit } = useHabits();
  const { summary, badges, pet, user, loading: progressLoading, reload: reloadProgress } = useProgress();

  async function handleComplete(habitId, points) {
    await completeHabit(habitId, points);
    reloadProgress();
  }

  return (
    <div className="layout">
      <header className="hero">
        <h1>Aventuras de Bienestar</h1>
        <p>Convierte tus hábitos en misiones épicas y cuida a Lumi, tu compañero de viaje.</p>
      </header>

      <main className="grid">
        <section className="column">
          <HabitForm onSubmit={async (habit) => {
            await addHabit(habit);
            reloadProgress();
          }} />
          {habitsLoading ? <p className="loading">Cargando hábitos...</p> : <HabitList habits={habits} onComplete={handleComplete} />}
        </section>

        <section className="column">
          {progressLoading ? (
            <p className="loading">Calculando tu progreso...</p>
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
