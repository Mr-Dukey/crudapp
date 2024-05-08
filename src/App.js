import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import FileUploadForm from './Components/FileUploadForm';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to={'/home'}/>}/>
        <Route path='/update' Component={FileUploadForm}/>
        <Route path='/home' Component={Dashboard}/>
      </Routes>
    </div>
  );
}

export default App;
