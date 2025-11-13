function formatCadence(value) {
  switch (value) {
    case 'daily':
      return 'Diaria';
    case 'weekly':
      return 'Semanal';
    default:
      return 'Personalizada';
  }
}

function formatLastCompleted(lastCompleted) {
  if (!lastCompleted) return 'Aún sin registrar';

  const date = new Date(lastCompleted);
  if (Number.isNaN(date.getTime())) return 'Aún sin registrar';

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
  }).format(date);
}

export default function HabitList({ habits, onComplete, completingId = null }) {
  if (!habits.length) {
    return (
      <div className="panel panel--floating empty-panel">
        <h2>Tu lienzo está en blanco</h2>
        <p>Crea tu primer hábito y observa cómo el tablero se llena de color.</p>
      </div>
    );
  }

  return (
    <section className="panel panel--floating panel--list">
      <header className="panel__header">
        <div>
          <p className="panel__eyebrow">Tus rituales activos</p>
          <h2 className="panel__title">Mantén el pulso de tus hábitos</h2>
        </div>
        <p className="panel__subtitle">Marca completado cuando termines y suma energía para Lumi.</p>
      </header>
      <ul className="habit-list">
        {habits.map((habit) => {
          const reward = habit.reward_points ?? habit.rewardPoints;
          const lastCompleted = habit.lastCompleted ?? habit.last_completed;
          return (
            <li key={habit.id} className="habit-list__item">
              <div className="habit-list__content">
                <div className="habit-list__header">
                  <h3>{habit.title}</h3>
                  <span className="tag">Prioridad {habit.priority}</span>
                </div>
                <p>{habit.description}</p>
                <div className="habit-list__meta">
                  <span>{formatCadence(habit.cadence)}</span>
                  <span className="status-pill">Última vez: {formatLastCompleted(lastCompleted)}</span>
                </div>
              </div>
              <div className="habit-list__actions">
                <span className="habit-list__reward">{reward} XP</span>
                <button
                  type="button"
                  className="button button--quiet"
                  onClick={() => onComplete(habit.id, reward)}
                  disabled={completingId === habit.id}
                >
                  {completingId === habit.id ? 'Registrando...' : 'Marcar completado'}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
