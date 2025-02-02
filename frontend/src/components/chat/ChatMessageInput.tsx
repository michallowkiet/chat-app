import { Image, Send, X } from 'lucide-react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useChatStore } from '../../store/useChatStore';

const ChatMessageInput = () => {
  const { sendMessage, selectedUser } = useChatStore();
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImagePreview(fileReader.result as string);
    };

    fileReader.readAsDataURL(file);
  };

  const removeImagePreview = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return;

    if (selectedUser) {
      await sendMessage(selectedUser, text, imagePreview);
    }

    setText('');
    removeImagePreview();
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="preview"
              className="size-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              type="button"
              onClick={removeImagePreview}
              className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      {/* message input */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            className="w-full input input-border rounded-lg input-sm sm:input-md"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`hidden sm:flex btn btn-circle items-center justify-center ${
              imagePreview ? 'text-emerald-500' : 'text-zinc-400'
            }`}
          >
            <Image size={20} />
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default ChatMessageInput;
