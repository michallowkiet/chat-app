import { User } from 'lucide-react';
import { SKELETON_CONTACTS } from '../constants/mockData';

const SidebarSkeleton = () => {
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-300">
      {/* Skeleton Header */}
      <div className="border-b border-base-300 flex flex-col transition-all duration-300">
        <div className="flex items-center gap-2">
          <User className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div>
        {SKELETON_CONTACTS.map((_, i) => (
          <div key={i} className="w-full p-3 flex items-center gap-2">
            {/* Avatar */}
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full"></div>
            </div>

            {/* User info */}
            <div className="hidden lg:block text-left on large screens">
              <div className="skeleton h-4 w-32 mb-2"></div>
              <div className="skeleton h-3 w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
