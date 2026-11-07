import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../api';

export default function CourseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', duration: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (id) {
      api.get(`/courses/${id}`).then((r) => setForm(r.data)).catch(() => setServerError('Course not found.'));
    }
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.duration.trim()) e.duration = 'Duration is required';
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    try {
      if (id) await api.put(`/courses/${id}`, form);
      else await api.post('/courses', form);
      navigate('/courses');
    } catch {
      setServerError('Save failed. Please try again.');
    }
  };

  return (
    <>
      <h2 className="page-title">{id ? 'Edit Course' : 'Add Course'}</h2>
      {serverError && <div className="alert alert-danger">{serverError}</div>}
      <form className="table-card" onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input name="title" className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            value={form.title} onChange={handleChange} />
          <div className="invalid-feedback">{errors.title}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Duration (e.g. 3 months)</label>
          <input name="duration" className={`form-control ${errors.duration ? 'is-invalid' : ''}`}
            value={form.duration} onChange={handleChange} />
          <div className="invalid-feedback">{errors.duration}</div>
        </div>
        <button type="submit" className="btn btn-success me-2">{id ? 'Update' : 'Save'}</button>
        <Link to="/courses" className="btn btn-secondary">Cancel</Link>
      </form>
    </>
  );
}