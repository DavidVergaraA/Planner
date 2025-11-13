import PropTypes from 'prop-types';

export default function HabitList({ habits, onComplete }) {
  if (!habits.length) {
    return <p className="empty-state">Todavía no tienes hábitos. ¡Crea uno para comenzar la aventura!</p>;
  }

  return (
    <ul className="card-grid">
      {habits.map((habit) => (
        <li key={habit.id} className="card habit-card">
          <header>
            <h3>{habit.title}</h3>
            <span className={`priority priority-${habit.priority}`}>Prioridad {habit.priority}</span>
          </header>
          <p>{habit.description}</p>
          <div className="habit-meta">
            <span>Frecuencia: {habit.cadence === 'daily' ? 'Diaria' : habit.cadence === 'weekly' ? 'Semanal' : 'Personalizada'}</span>
            <span>Puntos: {habit.reward_points || habit.rewardPoints}</span>
          </div>
          <button type="button" className="cta" onClick={() => onComplete(habit.id, habit.reward_points || habit.rewardPoints)}>
            Completar y ganar {habit.reward_points || habit.rewardPoints} XP
          </button>
        </li>
      ))}
    </ul>
  );
}

HabitList.propTypes = {
  habits: PropTypes.arrayOf(PropTypes.object).isRequired,
  onComplete: PropTypes.func.isRequired,
};
