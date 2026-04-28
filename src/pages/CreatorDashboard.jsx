import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateContentCalendar } from '../services/gemini';
import LoadingAnimation from '../components/ui/LoadingAnimation';
import OutputCard from '../components/ui/OutputCard';

const nicheOptions = [
  'Hidden Tourism Destinations',
  'Budget Travel India',
  'Offbeat Adventures',
  'Cultural Heritage',
  'Food & Travel',
  'Solo Female Travel',
  'Luxury Travel',
  'Weekend Getaways',
  'Spiritual Tourism',
  'Wildlife & Nature',
];

const durationOptions = [
  { value: '7', label: '1 Week (7 days)' },
  { value: '14', label: '2 Weeks (14 days)' },
  { value: '30', label: '1 Month (30 days)' },
];

const quickStats = [
  { label: 'Content Ideas / Week', value: '7+', color: '#8b5cf6' },
  { label: 'Avg. Engagement Boost', value: '3.2x', color: '#06b6d4' },
  { label: 'Time Saved', value: '10hrs', color: '#f59e0b' },
  { label: 'Platforms Covered', value: '5', color: '#10b981' },
];

const contentMix = [
  { category: 'Education', percentage: 30, color: '#3b82f6', emoji: '📚' },
  { category: 'Entertainment', percentage: 25, color: '#f59e0b', emoji: '🎬' },
  { category: 'Inspiration', percentage: 25, color: '#8b5cf6', emoji: '💫' },
  { category: 'Promotion', percentage: 20, color: '#10b981', emoji: '📢' },
];

const bestTimes = [
  { platform: 'Instagram', time: '7-9 PM', icon: '📸' },
  { platform: 'YouTube', time: '5-7 PM', icon: '🎬' },
  { platform: 'Twitter/X', time: '8-10 AM', icon: '🐦' },
  { platform: 'LinkedIn', time: '9-11 AM', icon: '💼' },
];

export default function CreatorDashboard() {
  const [niche, setNiche] = useState(nicheOptions[0]);
  const [duration, setDuration] = useState('7');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOutput('');

    try {
      const result = await generateContentCalendar({ niche, duration });
      setOutput(result);
    } catch (error) {
      setOutput('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-header">
        <span className="page-emoji">📅</span>
        <h1>Creator Dashboard</h1>
        <p>
          Your AI-powered command center. Get content calendars, posting
          strategies, and growth insights tailored to your niche.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="dashboard-stats">
        {quickStats.map((stat) => (
          <motion.div
            key={stat.label}
            className="glass-card stat-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="stat-card-value" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="stat-card-label">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Content Mix & Best Times */}
      <div className="grid-2 mb-6">
        <div className="glass-card no-hover">
          <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>📊 Recommended Content Mix</h3>
          {contentMix.map((item) => (
            <div key={item.category} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                <span>{item.emoji} {item.category}</span>
                <span style={{ color: item.color, fontWeight: 600 }}>{item.percentage}%</span>
              </div>
              <div style={{ height: '6px', background: 'var(--bg-glass)', borderRadius: '3px', overflow: 'hidden' }}>
                <motion.div
                  style={{ height: '100%', background: item.color, borderRadius: '3px' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card no-hover">
          <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>⏰ Best Posting Times</h3>
          {bestTimes.map((item) => (
            <div
              key={item.platform}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-glass)',
                marginBottom: '8px',
                fontSize: '14px',
              }}
            >
              <span>{item.icon} {item.platform}</span>
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Generator */}
      <div className="glass-card no-hover">
        <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>🗓️ Generate Content Calendar</h3>
        <form onSubmit={handleGenerate}>
          <div className="grid-form">
            <div className="form-group">
              <label className="form-label">🎯 Content Niche</label>
              <select
                className="form-select"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
              >
                {nicheOptions.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">📅 Duration</label>
              <select
                className="form-select"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                {durationOptions.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg mt-4"
            disabled={loading}
          >
            {loading ? 'Planning...' : '📅 Generate Calendar'}
          </button>
        </form>
      </div>

      {loading && <LoadingAnimation text="Building your content strategy..." />}

      <OutputCard
        title="Your Content Calendar & Strategy"
        content={output}
        icon="📅"
      />
    </motion.div>
  );
}
