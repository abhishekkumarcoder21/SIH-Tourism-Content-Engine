import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiOutlineMap,
  HiOutlineBookOpen,
  HiOutlineFilm,
  HiOutlinePencilAlt,
  HiOutlineCalendar,
  HiOutlineArrowRight,
} from 'react-icons/hi';

const features = [
  {
    path: '/itinerary',
    icon: <HiOutlineMap />,
    title: 'AI Itinerary Generator',
    description: 'Create hyper-personalized travel plans tuned to budget, duration, and interests in seconds.',
    color: '#8b5cf6',
  },
  {
    path: '/story-guide',
    icon: <HiOutlineBookOpen />,
    title: 'Story-Based Guides',
    description: 'Transform plain facts into emotionally compelling travel narratives that get saved and shared.',
    color: '#06b6d4',
  },
  {
    path: '/reels-engine',
    icon: <HiOutlineFilm />,
    title: 'Reels Idea Engine',
    description: 'Generate scroll-stopping Reels concepts with hooks, scripts, and trending audio suggestions.',
    color: '#f59e0b',
  },
  {
    path: '/captions',
    icon: <HiOutlinePencilAlt />,
    title: 'Caption Generator',
    description: 'Write captions that convert scrollers into savers — hooks, CTAs, and strategic hashtags included.',
    color: '#10b981',
  },
  {
    path: '/dashboard',
    icon: <HiOutlineCalendar />,
    title: 'Creator Dashboard',
    description: 'Get a full content calendar with daily topics, posting times, and growth strategy built in.',
    color: '#f43f5e',
  },
];

const stats = [
  { number: '5', label: 'AI Tools' },
  { number: '∞', label: 'Content Ideas' },
  { number: '0', label: 'Cost to Start' },
  { number: '24/7', label: 'Available' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero */}
      <motion.section className="hero" variants={itemVariants}>
        <span className="page-emoji">🌏</span>
        <h1>
          Turn Hidden Destinations
          <br />
          Into <span className="gradient-text">Viral Content</span>
        </h1>
        <p>
          AI-powered content engine for travel creators. Generate itineraries,
          stories, Reels ideas, captions, and content calendars — all in seconds.
        </p>
        <div className="hero-buttons">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/itinerary')}
          >
            <HiOutlineMap />
            Start Creating
          </button>
          <button
            className="btn btn-secondary btn-lg"
            onClick={() => navigate('/reels-engine')}
          >
            <HiOutlineFilm />
            Try Reels Engine
          </button>
        </div>
        <div className="hero-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="hero-stat">
              <div className="hero-stat-number">{stat.number}</div>
              <div className="hero-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Feature Cards */}
      <motion.div className="feature-cards" variants={containerVariants}>
        {features.map((feature) => (
          <motion.div
            key={feature.path}
            className="glass-card feature-card"
            variants={itemVariants}
            whileHover={{ y: -4 }}
            onClick={() => navigate(feature.path)}
          >
            <div
              className="feature-card-icon"
              style={{
                background: `${feature.color}15`,
                color: feature.color,
              }}
            >
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <div className="feature-card-arrow">
              Try it now <HiOutlineArrowRight />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
