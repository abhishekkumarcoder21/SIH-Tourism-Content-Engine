export default function LoadingAnimation({ text = 'AI is crafting your content...' }) {
  return (
    <div className="loading-container">
      <div className="loading-dots">
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
      <p className="loading-text">{text}</p>
    </div>
  );
}
