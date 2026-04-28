import { NavLink } from 'react-router-dom';
import { getApiStatus } from '../../services/gemini';
import {
  HiOutlineHome,
  HiOutlineMap,
  HiOutlineBookOpen,
  HiOutlineFilm,
  HiOutlinePencilAlt,
  HiOutlineCalendar,
} from 'react-icons/hi';

const navItems = [
  { path: '/', label: 'Home', icon: HiOutlineHome },
  { path: '/itinerary', label: 'Itinerary Generator', icon: HiOutlineMap },
  { path: '/story-guide', label: 'Story Guide', icon: HiOutlineBookOpen },
  { path: '/reels-engine', label: 'Reels Engine', icon: HiOutlineFilm },
  { path: '/captions', label: 'Caption Generator', icon: HiOutlinePencilAlt },
  { path: '/dashboard', label: 'Creator Dashboard', icon: HiOutlineCalendar },
];

export default function Sidebar() {
  const apiStatus = getApiStatus();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">🌏</div>
        <div>
          <h2>Tourism Engine</h2>
          <p>AI Content Creator</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Navigation</div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="sidebar-link-icon">
              <item.icon />
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-api-status">
          <span
            className={`sidebar-api-dot ${apiStatus === 'demo' ? 'disconnected' : ''}`}
          ></span>
          {apiStatus === 'connected' ? 'Gemini AI Connected' : 'Demo Mode (Mock Data)'}
        </div>
      </div>
    </aside>
  );
}
