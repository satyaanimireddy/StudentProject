import { Route, Routes } from 'react-router-dom';
import './App.css';
// import StudentRegistration from './components/StudentRegistration';
import Home from './components/Home';
import StudentRegistration from './components/StudentRegistration';
import StudentDelete from './components/StudentDelete';
import StudentEdit from './components/StudentEdit';

function App() {
  return (
    <div className="App bg-secondary vh-100">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/students/register' element={<StudentRegistration />} />
        <Route path='/students/edit/:id' element={<StudentEdit />} />
        <Route path='/students/delete/:id' element={<StudentDelete />} />
      </Routes>
    </div>
  );
}

export default App;
