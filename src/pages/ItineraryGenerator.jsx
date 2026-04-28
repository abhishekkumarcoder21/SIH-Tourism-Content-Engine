import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateItinerary } from '../services/gemini';
import TagSelector from '../components/ui/TagSelector';
import LoadingAnimation from '../components/ui/LoadingAnimation';
import OutputCard from '../components/ui/OutputCard';

const interestTags = [
  '🏔️ Nature',
  '🍜 Food',
  '🏛️ Heritage',
  '🎒 Adventure',
  '📸 Photography',
  '🧘 Spiritual',
  '🎨 Art & Culture',
  '🏖️ Beach',
  '🌲 Wildlife',
  '🛍️ Shopping',
];

export default function ItineraryGenerator() {
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('3');
  const [budget, setBudget] = useState('5000');
  const [interests, setInterests] = useState([]);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!location.trim()) return;

    setLoading(true);
    setOutput('');

    try {
      const result = await generateItinerary({
        location,
        duration,
        budget,
        interests: interests.length > 0 ? interests : ['General sightseeing'],
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
        <span className="page-emoji">🗺️</span>
        <h1>AI Itinerary Generator</h1>
        <p>
          Create hyper-personalized travel plans for any destination.
          Complete with budget breakdowns, food tips, and creator angles.
        </p>
      </div>

      <div className="glass-card no-hover">
        <form onSubmit={handleGenerate}>
          <div className="grid-form">
            <div className="form-group">
              <label className="form-label">📍 Destination</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Hidden places in Bihar, Rajgir, Coorg..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">⏳ Duration (days)</label>
              <select
                className="form-select"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="1">1 Day</option>
                <option value="2">2 Days</option>
                <option value="3">3 Days</option>
                <option value="5">5 Days</option>
                <option value="7">7 Days</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">💰 Budget (₹)</label>
              <select
                className="form-select"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option value="2000">Under ₹2,000</option>
                <option value="3000">Under ₹3,000</option>
                <option value="5000">Under ₹5,000</option>
                <option value="10000">Under ₹10,000</option>
                <option value="25000">Under ₹25,000</option>
                <option value="50000">Premium (₹50,000+)</option>
              </select>
            </div>
          </div>

          <TagSelector
            tags={interestTags}
            selected={interests}
            onChange={setInterests}
            label="❤️ Interests (select multiple)"
          />

          <button
            type="submit"
            className="btn btn-primary btn-lg mt-4"
            disabled={loading || !location.trim()}
          >
            {loading ? 'Generating...' : '✨ Generate Itinerary'}
          </button>
        </form>
      </div>

      {loading && <LoadingAnimation text="Crafting your perfect trip..." />}

      <OutputCard
        title="Your AI-Generated Itinerary"
        content={output}
        icon="🗺️"
      />
    </motion.div>
  );
}
