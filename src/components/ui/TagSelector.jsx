export default function TagSelector({ tags, selected, onChange, label }) {
  const toggleTag = (tag) => {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  };

  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <div className="tag-group">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`tag ${selected.includes(tag) ? 'selected' : ''}`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
