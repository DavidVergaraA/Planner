import { useState } from 'react';

const initialState = {
  title: '',
  description: '',
  cadence: 'daily',
  priority: 3,
  rewardPoints: 20,
};

export default function HabitForm({ onSubmit, isSubmitting = false }) {
  const [form, setForm] = useState(initialState);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'priority' || name === 'rewardPoints' ? Number(value) : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await onSubmit(form);
      setForm(initialState);
    } catch (error) {
      // mantenemos los valores para que la persona pueda corregirlos
      if (import.meta.env?.MODE !== 'production') {
        console.error(error);
      }
    }
  }

  return (
    <section className="panel panel--form">
      <header className="panel__header">
        <div>
          <p className="panel__eyebrow">Nuevo hábito</p>
          <h2 className="panel__title">Diseña tu siguiente ritual</h2>
        </div>
        <p className="panel__subtitle">Elige una acción pequeña y concreta para cultivar tu bienestar.</p>
      </header>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="form-field">
            Nombre del hábito
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Ej. Respirar consciente 5 minutos"
              required
              minLength={3}
            />
            <span className="form-hint">Ponle un nombre que te inspire.</span>
          </label>

          <label className="form-field form-field--textarea">
            Intención
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="¿Qué quieres sentir al completar este hábito?"
              required
              minLength={5}
            />
          </label>

          <label className="form-field">
            Frecuencia
            <select name="cadence" value={form.cadence} onChange={handleChange}>
              <option value="daily">Diaria</option>
              <option value="weekly">Semanal</option>
              <option value="custom">Personalizada</option>
            </select>
          </label>

          <label className="form-field">
            Prioridad
            <input type="range" name="priority" min="1" max="5" value={form.priority} onChange={handleChange} />
            <span className="form-hint">Prioridad actual: {form.priority}</span>
          </label>

          <label className="form-field">
            Recompensa (XP)
            <input
              type="number"
              name="rewardPoints"
              min="5"
              max="100"
              step="5"
              value={form.rewardPoints}
              onChange={handleChange}
            />
            <span className="form-hint">La recompensa ideal te anima sin generar presión.</span>
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="button button--primary" disabled={isSubmitting} aria-busy={isSubmitting}>
            {isSubmitting ? 'Guardando hábito...' : 'Añadir hábito'}
          </button>
        </div>
      </form>
    </section>
  );
}
