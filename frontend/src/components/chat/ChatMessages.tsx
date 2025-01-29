import useAuthStore from '../../store/useAuthStore';
import { useChatStore } from '../../store/useChatStore';

const ChatMessages = () => {
  const { messages, selectedUser } = useChatStore();
  const { user: authorizedUser } = useAuthStore();

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
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
