import { useEffect } from 'react';
import { useChatStore } from '../../store/useChatStore';
import ChatHeader from './ChatHeader';
import ChatMessageInput from './ChatMessageInput';
import ChatMessages from './ChatMessages';
import ChatMessageSkeleton from './ChatMessageSkeleton';

const Chat = () => {
  const { selectedUser, getMessages, isMessagesLoading } = useChatStore();

  useEffect(() => {
    getMessages(selectedUser);
  }, [getMessages, selectedUser]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <ChatMessageSkeleton />
        <ChatMessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <ChatMessages />
      <ChatMessageInput />
    </div>
  );
};

export default Chat;
