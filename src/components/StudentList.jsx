import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.get('/students'), api.get('/courses')])
      .then(([s, c]) => { setStudents(s.data); setCourses(c.data); })
      .catch(() => setError('Could not load data. Is json-server running on port 3001?'));
  }, []);

  const courseTitle = (id) => courses.find((c) => c.id === Number(id))?.title || '-';

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      await api.delete(`/students/${id}`);
      setStudents(students.filter((s) => s.id !== id));
    } catch {
      setError('Delete failed. Please try again.');
    }
  };

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h2 className="page-title">Students</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-flex flex-wrap gap-2 justify-content-between mb-3">
        <input className="form-control w-auto" placeholder="Search by name..."
          value={search} onChange={(e) => setSearch(e.target.value)} />
        <Link to="/students/add" className="btn btn-primary">+ Add Student</Link>
      </div>
      <div className="table-card table-responsive">
        <table className="table table-striped align-middle mb-0">
          <thead>
            <tr><th>ID</th><th>Name</th><th>Email</th><th>Course</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{courseTitle(s.courseId)}</td>
                <td>
                  <Link to={`/students/edit/${s.id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan="5" className="text-center text-muted">No students found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}