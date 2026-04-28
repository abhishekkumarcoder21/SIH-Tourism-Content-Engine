import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateReelsIdeas } from '../services/gemini';
import LoadingAnimation from '../components/ui/LoadingAnimation';
import OutputCard from '../components/ui/OutputCard';

const audienceOptions = [
  'Gen Z (18-24)',
  'Millennials (25-34)',
  'Families',
  'Solo Travelers',
  'Budget Backpackers',
  'Luxury Travelers',
  'Adventure Seekers',
  'Food Enthusiasts',
];

const vibeOptions = [
  'Cinematic & Epic',
  'Fun & Trendy',
  'Informative & Educational',
  'Emotional & Soulful',
  'Comedy & Relatable',
  'ASMR & Aesthetic',
];

export default function ReelsEngine() {
  const [destination, setDestination] = useState('');
  const [audience, setAudience] = useState(audienceOptions[0]);
  const [vibe, setVibe] = useState(vibeOptions[0]);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!destination.trim()) return;

    setLoading(true);
    setOutput('');

    try {
      const result = await generateReelsIdeas({
        destination,
        audience,
        vibe,
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
        <span className="page-emoji">🎬</span>
        <h1>Reels Idea Engine</h1>
        <p>
          Generate scroll-stopping Instagram Reels and YouTube Shorts ideas
          complete with hooks, scripts, music suggestions, and hashtags.
        </p>
      </div>

      <div className="glass-card no-hover">
        <form onSubmit={handleGenerate}>
          <div className="form-group">
            <label className="form-label">📍 Destination / Topic</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Hidden places in Bihar, Offbeat Rajasthan, Budget Goa..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>

          <div className="grid-form">
            <div className="form-group">
              <label className="form-label">🎯 Target Audience</label>
              <select
                className="form-select"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              >
                {audienceOptions.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">🎨 Content Vibe</label>
              <select
                className="form-select"
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
              >
                {vibeOptions.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg mt-4"
            disabled={loading || !destination.trim()}
          >
            {loading ? 'Generating...' : '🎬 Generate Reel Ideas'}
          </button>
        </form>
      </div>

      {loading && <LoadingAnimation text="Cooking up viral Reels ideas..." />}

      <OutputCard
        title="Your Viral Reels Ideas"
        content={output}
        icon="🎬"
      />
    </motion.div>
  );
}
