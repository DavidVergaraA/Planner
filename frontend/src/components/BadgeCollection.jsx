function formatUnlockedDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'long',
  }).format(date);
}

export default function BadgeCollection({ badges }) {
  if (!badges.length) {
    return null;
  }

  return (
    <section className="panel panel--floating">
      <header className="panel__header">
        <div>
          <p className="panel__eyebrow">Colección de insignias</p>
          <h2 className="panel__title">Celebra tus victorias pequeñas</h2>
        </div>
        <p className="panel__subtitle">Cada logro desbloquea una chispa nueva en tu camino.</p>
      </header>
      <div className="badge-collection">
        {badges.map((badge) => {
          const unlockedDate = formatUnlockedDate(badge.unlocked_at);
          const unlockedMessage = badge.unlocked_at
            ? `Desbloqueada${unlockedDate ? ` ${unlockedDate}` : ''}`
            : `${badge.requirement_points} XP para obtenerla`;

          return (
            <article
              key={badge.id}
              className={`badge-card badge-card--${badge.tier} ${badge.unlocked_at ? 'badge-card--unlocked' : ''}`}
            >
              <h3>{badge.title}</h3>
              <p>{badge.description}</p>
              <span className="badge-card__meta">{unlockedMessage}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}

