import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../api';

export default function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', courseId: '' });
  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    api.get('/courses').then((r) => setCourses(r.data)).catch(() => setServerError('Could not load courses.'));
    if (id) {
      api.get(`/students/${id}`).then((r) => setForm(r.data)).catch(() => setServerError('Student not found.'));
    }
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.courseId) e.courseId = 'Please select a course';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    const data = { ...form, courseId: Number(form.courseId) };
    try {
      if (id) await api.put(`/students/${id}`, data);
      else await api.post('/students', data);
      navigate('/students');
    } catch {
      setServerError('Save failed. Please try again.');
    }
  };

  return (
    <>
      <h2 className="page-title">{id ? 'Edit Student' : 'Add Student'}</h2>
      {serverError && <div className="alert alert-danger">{serverError}</div>}
      <form className="table-card" onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input name="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            value={form.name} onChange={handleChange} />
          <div className="invalid-feedback">{errors.name}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={form.email} onChange={handleChange} />
          <div className="invalid-feedback">{errors.email}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Course</label>
          <select name="courseId" className={`form-select ${errors.courseId ? 'is-invalid' : ''}`}
            value={form.courseId} onChange={handleChange}>
            <option value="">-- Select course --</option>
            {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
          <div className="invalid-feedback">{errors.courseId}</div>
        </div>
        <button type="submit" className="btn btn-primary me-2">{id ? 'Update' : 'Save'}</button>
        <Link to="/students" className="btn btn-secondary">Cancel</Link>
      </form>
    </>
  );
}