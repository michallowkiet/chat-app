import { useState, useRef } from 'react';

const ChatMessageInput = () => {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return <div>ChatMessageInput</div>;
};

export default ChatMessageInput;
