import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export async function fetchHabits() {
  const { data } = await api.get('/habits');
  return data.habits;
}

export async function createHabit(habit) {
  const { data } = await api.post('/habits', habit);
  return data.habit;
}

export async function completeHabit(habitId, pointsEarned) {
  await api.post(`/habits/${habitId}/complete`, { pointsEarned });
}

export async function fetchProgress() {
  const { data } = await api.get('/progress');
  return data;
}

export async function fetchUser() {
  const { data } = await api.get('/users/me');
  return data.user;
}

export default api;
