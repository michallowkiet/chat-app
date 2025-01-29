import { useEffect } from 'react';
import useAuthStore from '../../store/useAuthStore';
import { useChatStore } from '../../store/useChatStore';
import ChatHeader from './ChatHeader';
import ChatMessageInput from './ChatMessageInput';
import ChatMessages from './ChatMessages';
import ChatMessageSkeleton from './ChatMessageSkeleton';

const Chat = () => {
  const {
    messages,
    selectedUser,
    getMessages,
    isMessagesLoading,
    subscribeToNewMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { user: authorizedUser } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser);
    subscribeToNewMessages();
    return () => {
      // Cleanup subscription when component unmounts
      unsubscribeFromMessages();
    };
  }, [
    getMessages,
    selectedUser,
    subscribeToNewMessages,
    unsubscribeFromMessages,
  ]);

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
      <ChatMessages
        messages={messages}
        selectedUser={selectedUser}
        authorizedUser={authorizedUser}
      />
      <ChatMessageInput />
    </div>
  );
};

export default Chat;
