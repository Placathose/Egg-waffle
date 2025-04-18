
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar'
import { SummaryList } from './pages/SummaryList';
import { AddSummary } from './pages/AddSummary';
import { Schedule } from './pages/Schedule';
import { Study } from './pages/Study';
import { Quiz } from './pages/Quiz';

function App() {


  return (
    <>
      <Router>
        <Navbar/>
        <main>
        <Routes>
          <Route path="/" element={<SummaryList />} />
          <Route path="/add-summary" element={<AddSummary />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/study" element={<Study />} /> {/* ✅ NEW */}
          <Route path="/quiz" element={<Quiz />} />   {/* ✅ NEW */}
        </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
