import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateStoryGuide } from '../services/gemini';
import LoadingAnimation from '../components/ui/LoadingAnimation';
import OutputCard from '../components/ui/OutputCard';

const moodOptions = [
  'Cinematic & Dramatic',
  'Warm & Nostalgic',
  'Mysterious & Intriguing',
  'Upbeat & Energetic',
  'Peaceful & Meditative',
  'Adventurous & Bold',
];

export default function StoryGuide() {
  const [destination, setDestination] = useState('');
  const [facts, setFacts] = useState('');
  const [mood, setMood] = useState(moodOptions[0]);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!destination.trim()) return;

    setLoading(true);
    setOutput('');

    try {
      const result = await generateStoryGuide({
        destination,
        facts: facts || 'A beautiful hidden destination with rich history and natural beauty.',
        mood,
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
        <span className="page-emoji">📖</span>
        <h1>Story-Based Destination Guide</h1>
        <p>
          Transform plain tourist information into emotionally engaging stories
          that make people feel the destination before they visit.
        </p>
      </div>

      <div className="glass-card no-hover">
        <form onSubmit={handleGenerate}>
          <div className="form-group">
            <label className="form-label">📍 Destination Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Kakolat Falls, Bihar"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">📝 Known Facts (optional)</label>
            <textarea
              className="form-textarea"
              placeholder="Share any facts, history, or details you know... e.g., 'Built 200 years ago by a local raja, has a natural spring nearby, popular with locals'"
              value={facts}
              onChange={(e) => setFacts(e.target.value)}
              rows={4}
            />
          </div>

          <div className="form-group">
            <label className="form-label">🎨 Mood & Tone</label>
            <select
              className="form-select"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            >
              {moodOptions.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg mt-4"
            disabled={loading || !destination.trim()}
          >
            {loading ? 'Writing...' : '✨ Generate Story Guide'}
          </button>
        </form>
      </div>

      {loading && <LoadingAnimation text="Crafting an immersive story..." />}

      <OutputCard
        title="Your Story-Based Guide"
        content={output}
        icon="📖"
      />
    </motion.div>
  );
}
