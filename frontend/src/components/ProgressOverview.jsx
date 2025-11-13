export default function ProgressOverview({ summary, user }) {
  if (!summary) {
    return null;
  }

  const levelPercent = Math.min(Math.round((summary.progressToNextLevel / 100) * 100), 100);
  const earnedPoints = summary.earnedPoints ?? 0;
  const potentialPoints = summary.potentialPoints ?? 0;
  const totalHabits = summary.totalHabits ?? 0;
  const completionsToday = summary.completionsToday ?? 0;
  const remaining = Math.max(0, 100 - summary.progressToNextLevel);

  return (
    <section className="panel panel--floating">
      <header className="panel__header">
        <div>
          <p className="panel__eyebrow">Hola {user?.name ?? 'Aventurero'}</p>
          <h2 className="panel__title">Nivel {summary.level}</h2>
        </div>
        <span className="pill pill--accent">{earnedPoints} XP</span>
      </header>

      <div
        className="progress-meter"
        role="progressbar"
        aria-valuenow={levelPercent}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Progreso hacia el siguiente nivel"
      >
        <div className="progress-meter__fill" style={{ width: `${levelPercent}%` }} />
      </div>
      <p className="panel__subtitle">Te faltan {remaining} XP para tu próximo nivel.</p>

      <dl className="progress-stats">
        <div>
          <dt>Hábitos activos</dt>
          <dd>{totalHabits}</dd>
        </div>
        <div>
          <dt>Puntos potenciales</dt>
          <dd>{potentialPoints}</dd>
        </div>
        <div>
          <dt>Logros de hoy</dt>
          <dd>{completionsToday}</dd>
        </div>
      </dl>
    </section>
  );
}

