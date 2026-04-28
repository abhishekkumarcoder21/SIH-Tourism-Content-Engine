import ReactMarkdown from 'react-markdown';
import CopyButton from './CopyButton';

export default function OutputCard({ title, content, icon = '✨' }) {
  if (!content) return null;

  return (
    <div className="output-section">
      <div className="output-card">
        <div className="output-card-header">
          <div className="output-card-title">
            <span>{icon}</span>
            {title}
          </div>
          <CopyButton text={content} label="Copy All" />
        </div>
        <div className="output-card-content">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
