import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/add" element={<StudentForm />} />
          <Route path="/students/edit/:id" element={<StudentForm />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/add" element={<CourseForm />} />
          <Route path="/courses/edit/:id" element={<CourseForm />} />
        </Routes>
      </div>
    </>
  );
}