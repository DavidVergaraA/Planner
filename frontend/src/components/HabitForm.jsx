import { useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  title: '',
  description: '',
  cadence: 'daily',
  priority: 3,
  rewardPoints: 20,
};

export default function HabitForm({ onSubmit }) {
  const [form, setForm] = useState(initialState);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: name === 'priority' || name === 'rewardPoints' ? Number(value) : value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await onSubmit(form);
    setForm(initialState);
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>Crea un hábito con propósito</h2>
      <p>Define un hábito específico y recompensa tu constancia para seguir motivado.</p>
      <label>
        Nombre del hábito
        <input name="title" value={form.title} onChange={handleChange} placeholder="Ej. Caminar 20 minutos" required minLength={3} />
      </label>
      <label>
        ¿Por qué es importante?
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Conecta con tu porqué" required minLength={5} />
      </label>
      <label>
        Frecuencia
        <select name="cadence" value={form.cadence} onChange={handleChange}>
          <option value="daily">Diaria</option>
          <option value="weekly">Semanal</option>
          <option value="custom">Personalizada</option>
        </select>
      </label>
      <label>
        Prioridad
        <input type="range" name="priority" min="1" max="5" value={form.priority} onChange={handleChange} />
        <span>Prioridad actual: {form.priority}</span>
      </label>
      <label>
        Recompensa XP
        <input type="number" name="rewardPoints" min="5" max="100" step="5" value={form.rewardPoints} onChange={handleChange} />
      </label>
      <button type="submit" className="cta">Añadir hábito</button>
    </form>
  );
}

HabitForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
