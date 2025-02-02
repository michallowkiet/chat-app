import { Camera, Mail, User } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import useAuthStore from '../store/useAuthStore';

const ProfilePage = () => {
  const { user, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const imageUrl = reader.result as string;
      setSelectedImage(imageUrl);

      updateProfile({ profilePicture: imageUrl });
    };
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="text-base-content/60">
              Your profile information goes here. You can update your profile
              picture by uploading a new image.
            </p>
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={
                  selectedImage ??
                  (user?.profilePicture && user?.profilePicture?.length > 0
                    ? user?.profilePicture
                    : null) ??
                  '/avatar.png'
                }
                alt="profile"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="image-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-transform duration-300 ${
                  isUpdatingProfile ? 'animated-pulse pointer-event-none' : ''
                }`}
              >
                <Camera className="size-5 text-base-200" />
                <input
                  type="file"
                  id="image-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p>
              {isUpdatingProfile
                ? 'Updating profile...'
                : 'Click the camera icon to upload a new avatar.'}
            </p>
          </div>

          {/* User details */}
          <div className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="size-4" />
                Full Name
              </div>
              <p className="px-4 py-3 bg-base-200 rounded-lg border">
                {user?.fullName}
              </p>
            </div>
            {/* Email */}
            <div className="space-y-2">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="size-4" />
                Email
              </div>
              <p className="px-4 py-3 bg-base-200 rounded-lg border">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Additional information */}
          <div className="mt-6 bg-base-200 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="text-sm space-y-2">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>
                  {new Date(
                    user?.createdAt ?? '1970-01-01',
                  ).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
