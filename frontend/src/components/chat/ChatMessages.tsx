import { useEffect, useRef } from 'react';
import { ChatMessage, User } from '../../types/types';

interface ChatMessagesProps {
  messages: ChatMessage[];
  selectedUser: User | null;
  authorizedUser: User | null;
}

const ChatMessages = ({
  messages,
  selectedUser,
  authorizedUser,
}: ChatMessagesProps) => {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          ref={messageRef}
          key={message._id}
          className={`chat ${
            message.senderId === authorizedUser?._id ? 'chat-end' : 'chat-start'
          }`}
        >
          <div className="chat-image avatar">
            <div className="size-10 rounded-full border">
              <img
                src={
                  message.senderId === authorizedUser?._id
                    ? authorizedUser.profilePicture || './avatar.png'
                    : selectedUser?.profilePicture || './avatar.png'
                }
                alt=""
              />
            </div>
          </div>

          <div className="chat-header mb-1">
            <time className="text-xs opacity-50 ml-1">
              {new Date(message?.createdAt as string).toLocaleString()}
            </time>
          </div>

          <div className="chat-bubble flex flex-col gap-2">
            {message.imageUrl && (
              <img
                src={message.imageUrl}
                alt="attachment"
                className="sm:max-w-[200px] rounded-md mb-2"
              />
            )}
            <p>{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
