import { useLocation } from 'react-router-dom';
import { HiOutlineSparkles } from 'react-icons/hi';

const pageTitles = {
  '/': 'Home',
  '/itinerary': 'AI Itinerary Generator',
  '/story-guide': 'Story Guide Writer',
  '/reels-engine': 'Reels Idea Engine',
  '/captions': 'Caption Generator',
  '/dashboard': 'Creator Dashboard',
};

export default function Header() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Tourism Content Engine';

  return (
    <header className="app-header">
      <h1 className="header-title">{title}</h1>
      <div className="header-right">
        <div className="header-badge">
          <HiOutlineSparkles />
          AI Powered
        </div>
      </div>
    </header>
  );
}
