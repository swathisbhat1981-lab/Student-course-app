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

  return (
    <>
      <h2 className="page-title">Dashboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card stat-card text-center p-4">
            <h1 className="text-primary">{counts.students}</h1>
            <p className="mb-3">Total Students</p>
            <Link to="/students" className="btn btn-primary">Manage Students</Link>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card stat-card text-center p-4">
            <h1 className="text-success">{counts.courses}</h1>
            <p className="mb-3">Total Courses</p>
            <Link to="/courses" className="btn btn-success">Manage Courses</Link>
          </div>
        </div>
      </div>
    </>
  );
}