import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import Home from './pages/Home';
import ItineraryGenerator from './pages/ItineraryGenerator';
import StoryGuide from './pages/StoryGuide';
import ReelsEngine from './pages/ReelsEngine';
import CaptionGenerator from './pages/CaptionGenerator';
import CreatorDashboard from './pages/CreatorDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="itinerary" element={<ItineraryGenerator />} />
          <Route path="story-guide" element={<StoryGuide />} />
          <Route path="reels-engine" element={<ReelsEngine />} />
          <Route path="captions" element={<CaptionGenerator />} />
          <Route path="dashboard" element={<CreatorDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
