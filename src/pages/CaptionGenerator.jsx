import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateCaptions } from '../services/gemini';
import LoadingAnimation from '../components/ui/LoadingAnimation';
import OutputCard from '../components/ui/OutputCard';

const platformOptions = [
  'Instagram',
  'YouTube',
  'Twitter / X',
  'LinkedIn',
  'Facebook',
];

const toneOptions = [
  'Bold & Confident',
  'Casual & Friendly',
  'Inspirational & Motivational',
  'Witty & Humorous',
  'Professional & Informative',
  'Emotional & Story-driven',
  'Controversial & Hot Take',
];

export default function CaptionGenerator() {
  const [theme, setTheme] = useState('');
  const [platform, setPlatform] = useState(platformOptions[0]);
  const [tone, setTone] = useState(toneOptions[0]);
  const [count, setCount] = useState('5');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!theme.trim()) return;

    setLoading(true);
    setOutput('');

    try {
      const result = await generateCaptions({
        theme,
        platform,
        tone,
        count: parseInt(count),
      });
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
        <span className="page-emoji">✍️</span>
        <h1>Caption Generator</h1>
        <p>
          Write captions that stop the scroll. Every caption comes with a hook,
          body, CTA, and strategic hashtag set.
        </p>
      </div>

      <div className="glass-card no-hover">
        <form onSubmit={handleGenerate}>
          <div className="form-group">
            <label className="form-label">📝 Theme / Topic</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Hidden waterfall in Bihar, Budget travel tips, Temple at sunrise..."
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              required
            />
          </div>

          <div className="grid-form">
            <div className="form-group">
              <label className="form-label">📱 Platform</label>
              <select
                className="form-select"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                {platformOptions.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">🎭 Tone</label>
              <select
                className="form-select"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                {toneOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">🔢 Number of Captions</label>
              <select
                className="form-select"
                value={count}
                onChange={(e) => setCount(e.target.value)}
              >
                <option value="3">3 Captions</option>
                <option value="5">5 Captions</option>
                <option value="8">8 Captions</option>
                <option value="10">10 Captions</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg mt-4"
            disabled={loading || !theme.trim()}
          >
            {loading ? 'Writing...' : '✍️ Generate Captions'}
          </button>
        </form>
      </div>

      {loading && <LoadingAnimation text="Writing scroll-stopping captions..." />}

      <OutputCard
        title="Your Captions"
        content={output}
        icon="✍️"
      />
    </motion.div>
  );
}
