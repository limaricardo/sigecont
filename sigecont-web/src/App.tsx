import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/nav-bar/Navbar';
import Home from './pages/home/Home';
import Upload from './pages/upload-time-sheet/UploadTimeSheet';
import TimeSheetResults from './pages/time-sheet-results/TimeSheetResults';
import AdicionalNoturno from './pages/adicional-noturno/AdicionalNoturno';


const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/results" element={<TimeSheetResults />} />
        <Route path="/adicional-noturno" element={<AdicionalNoturno />} />

      </Routes>
    </Router>
  );
};

export default App;
