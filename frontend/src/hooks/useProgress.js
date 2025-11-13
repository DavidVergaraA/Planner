import { useEffect, useState } from 'react';
import { fetchProgress, fetchUser } from '../services/api';

export function useProgress() {
  const [summary, setSummary] = useState(null);
  const [badges, setBadges] = useState([]);
  const [pet, setPet] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadProgress() {
    setLoading(true);
    try {
      const [progressData, userData] = await Promise.all([fetchProgress(), fetchUser()]);
      setSummary(progressData.summary);
      setBadges(progressData.badges);
      setPet(progressData.pet);
      setUser(userData);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProgress();
  }, []);

  return {
    summary,
    badges,
    pet,
    user,
    loading,
    reload: loadProgress,
  };
}
