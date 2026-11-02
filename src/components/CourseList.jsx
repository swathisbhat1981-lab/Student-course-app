import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/courses').then((r) => setCourses(r.data))
      .catch(() => setError('Could not load courses. Is json-server running on port 3001?'));
  }, []);

  const handleDelete = async (id) => {
    try {
      const enrolled = await api.get(`/students?courseId=${id}`);
      if (enrolled.data.length > 0) {
        setError('Cannot delete: students are enrolled in this course.');
        return;
      }
      if (!window.confirm('Are you sure you want to delete this course?')) return;
      await api.delete(`/courses/${id}`);
      setCourses(courses.filter((c) => c.id !== id));
      setError('');
    } catch {
      setError('Delete failed. Please try again.');
    }
  };

  return (
    <>
      <h2 className="page-title">Courses</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="text-end mb-3">
        <Link to="/courses/add" className="btn btn-success">+ Add Course</Link>
      </div>
      <div className="table-card table-responsive">
        <table className="table table-striped align-middle mb-0">
          <thead><tr><th>ID</th><th>Title</th><th>Duration</th><th>Actions</th></tr></thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td><td>{c.title}</td><td>{c.duration}</td>
                <td>
                  <Link to={`/courses/edit/${c.id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr><td colSpan="4" className="text-center text-muted">No courses found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}