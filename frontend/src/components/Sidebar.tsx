import { Users } from 'lucide-react';
import { useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import SidebarSkeleton from './SidebarSkeleton';

const Sidebar = () => {
  const { isUsersLoading, users, selectedUser, getUsers, selectUser } =
    useChatStore();

  const { onlineUsers, user } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading || !users.length) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-300">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Users className="size-6" />
            <span className="font-medium hidden lg:block">Contacts</span>
          </div>
          {/* Authorized user Avatar */}
          <div className="avatar avatar-online self-justify-end">
            <div className="w-8 rounded-full">
              <img
                src={
                  user?.profilePicture ? user?.profilePicture : '/avatar.png'
                }
                alt="your avatar"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto w-full p-3">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => selectUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
              selectedUser?._id === user._id
                ? 'bg-base-300 ring-1 ring-base-300'
                : ''
            }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user?.profilePicture ? user.profilePicture : '/avatar.png'}
                alt="profile"
                className="size-12 object-cover rounded-full"
              />

              {user._id && onlineUsers.includes(user?._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"></span>
              )}
            </div>

            {/* User info */}
            <div className="hidden lg:block text-left main-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {user?._id && onlineUsers.includes(user?._id)
                  ? 'Online'
                  : 'Offline'}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
