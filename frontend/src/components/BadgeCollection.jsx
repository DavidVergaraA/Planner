import PropTypes from 'prop-types';

export default function BadgeCollection({ badges }) {
  if (!badges.length) {
    return null;
  }

  return (
    <section className="card">
      <h2>Insignias desbloqueables</h2>
      <div className="badge-grid">
        {badges.map((badge) => (
          <article key={badge.id} className={`badge badge-${badge.tier} ${badge.unlocked_at ? 'badge-unlocked' : ''}`}>
            <h3>{badge.title}</h3>
            <p>{badge.description}</p>
            <span>{badge.unlocked_at ? 'Desbloqueada' : `Necesitas ${badge.requirement_points} XP`}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

BadgeCollection.propTypes = {
  badges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      tier: PropTypes.string,
      unlocked_at: PropTypes.string,
      requirement_points: PropTypes.number,
    })
  ).isRequired,
};
