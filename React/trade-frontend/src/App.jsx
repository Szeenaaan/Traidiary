import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './global.css';

import Home      from './pages/Home';

import Courses   from './pages/Courses';
import Dashboard from './pages/Dashboard';
import PageLayout from './components/PageLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Home />} />
        
        <Route path="/courses"   element={<Courses />} />
        <Route path="/dashboard" element={
          <PageLayout>
            <Dashboard />
          </PageLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;