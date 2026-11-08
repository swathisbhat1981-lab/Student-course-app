import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Home() {
  const [counts, setCounts] = useState({ students: 0, courses: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.get('/students'), api.get('/courses')])
      .then(([s, c]) => setCounts({ students: s.data.length, courses: c.data.length }))
      .catch(() => setError('Cannot reach the server. Start json-server on port 3001.'));
  }, []);
