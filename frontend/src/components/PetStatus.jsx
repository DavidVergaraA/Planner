import PropTypes from 'prop-types';

const stages = [
  { level: 1, description: 'Un brote tímido que necesita tu cuidado diario.' },
  { level: 3, description: 'Ha nacido Lumi, tu espíritu guardián. Está aprendiendo de tu constancia.' },
  { level: 5, description: 'Lumi evoluciona y brilla cada vez que cumples tus hábitos.' },
  { level: 8, description: 'Tu compañero alcanza una forma épica y te inspira a seguir creciendo.' },
];

function getStage(level) {
  return stages.reduce((acc, stage) => (level >= stage.level ? stage : acc), stages[0]);
}

export default function PetStatus({ pet }) {
  if (!pet) {
    return (
      <section className="card pet-card">
        <h2>Cultiva tu compañero</h2>
        <p>Cuida tus hábitos para despertar a Lumi, el espíritu que crece con tu progreso.</p>
      </section>
    );
  }

  const stage = getStage(pet.level);

  return (
    <section className="card pet-card">
      <h2>Lumi - Nivel {pet.level}</h2>
      <p>{stage.description}</p>
      <div className="pet-figure">
        <span role="img" aria-label="mascota">🌱</span>
        <div className="xp">{pet.experience} XP total</div>
      </div>
    </section>
  );
}

PetStatus.propTypes = {
  pet: PropTypes.shape({
    level: PropTypes.number,
    experience: PropTypes.number,
  }),
};

PetStatus.defaultProps = {
  pet: null,
};
