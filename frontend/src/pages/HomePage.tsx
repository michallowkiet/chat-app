import Chat from '../components/chat/Chat';
import NoChatSelected from '../components/NoChatSelected';
import Sidebar from '../components/Sidebar';
import { useChatStore } from '../store/useChatStore';

const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <Chat />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
