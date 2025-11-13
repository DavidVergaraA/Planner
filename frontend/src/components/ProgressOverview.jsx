import PropTypes from 'prop-types';

export default function ProgressOverview({ summary, user }) {
  if (!summary) {
    return null;
  }

  return (
    <section className="card progress-card">
      <header>
        <h2>Hola {user?.name ?? 'Aventurero'}, nivel {summary.level}</h2>
        <p>
          Has acumulado {summary.earnedPoints} XP. Mantén el ritmo para desbloquear recompensas y fortalecer tus hábitos.
        </p>
      </header>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${Math.min((summary.progressToNextLevel / 100) * 100, 100)}%` }} />
      </div>
      <ul className="stats">
        <li>
          <span className="stat-label">Hábitos activos</span>
          <span className="stat-value">{summary.totalHabits}</span>
        </li>
        <li>
          <span className="stat-label">Puntos potenciales</span>
          <span className="stat-value">{summary.potentialPoints}</span>
        </li>
        <li>
          <span className="stat-label">Logros diarios</span>
          <span className="stat-value">{summary.completionsToday}</span>
        </li>
      </ul>
    </section>
  );
}

ProgressOverview.propTypes = {
  summary: PropTypes.shape({
    level: PropTypes.number,
    earnedPoints: PropTypes.number,
    progressToNextLevel: PropTypes.number,
    totalHabits: PropTypes.number,
    potentialPoints: PropTypes.number,
    completionsToday: PropTypes.number,
  }),
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

ProgressOverview.defaultProps = {
  summary: null,
  user: null,
};
