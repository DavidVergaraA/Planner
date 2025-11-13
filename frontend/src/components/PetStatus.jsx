const stages = [
  { level: 1, description: 'Un brote tímido que necesita tu cuidado diario.', icon: '🌱', theme: 'pet-panel--seed' },
  {
    level: 3,
    description: 'Ha nacido Lumi, tu espíritu guardián. Está aprendiendo de tu constancia.',
    icon: '🌿',
    theme: 'pet-panel--sprout',
  },
  {
    level: 5,
    description: 'Lumi evoluciona y brilla cada vez que cumples tus hábitos.',
    icon: '🌸',
    theme: 'pet-panel--bloom',
  },
  {
    level: 8,
    description: 'Tu compañero alcanza una forma épica y te inspira a seguir creciendo.',
    icon: '🦄',
    theme: 'pet-panel--mythic',
  },
];

function getStage(level) {
  return stages.reduce((acc, stage) => (level >= stage.level ? stage : acc), stages[0]);
}

export default function PetStatus({ pet }) {
  if (!pet) {
    return (
      <section className="panel panel--floating pet-panel pet-panel--seed">
        <header className="panel__header">
          <div>
            <p className="panel__eyebrow">Tu compañero interior</p>
            <h2 className="panel__title">Despierta a Lumi</h2>
          </div>
        </header>
        <div className="pet-panel__body">
          <span className="pet-panel__icon" role="img" aria-label="compañero">🌱</span>
          <p>Cuida tus hábitos para que Lumi cobre vida y evolucione contigo.</p>
        </div>
      </section>
    );
  }

  const stage = getStage(pet.level);

  return (
    <section className={`panel panel--floating pet-panel ${stage.theme}`}>
      <header className="panel__header">
        <div>
          <p className="panel__eyebrow">Lumi te acompaña</p>
          <h2 className="panel__title">Nivel {pet.level}</h2>
        </div>
        <span className="pill">{pet.experience} XP</span>
      </header>
      <div className="pet-panel__body">
        <span className="pet-panel__icon" role="img" aria-label="compañero">{stage.icon}</span>
        <p>{stage.description}</p>
      </div>
    </section>
  );
}

