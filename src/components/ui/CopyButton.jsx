import { useState } from 'react';
import { HiOutlineClipboardCopy, HiOutlineCheck } from 'react-icons/hi';

export default function CopyButton({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      className={`copy-btn ${copied ? 'copied' : ''}`}
      onClick={handleCopy}
    >
      {copied ? <HiOutlineCheck /> : <HiOutlineClipboardCopy />}
      {copied ? 'Copied!' : label}
    </button>
  );
}
