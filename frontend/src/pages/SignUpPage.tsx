import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import useAuthStore from '../store/useAuthStore';
import { SignUpForm } from '../types/types';

const SignUpPage = () => {
  const { isSigningUp, signup } = useAuthStore((state) => state);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignUpForm>({
    email: '',
    password: '',
    fullName: '',
  });

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error('Please enter your full name');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (!formData.password.trim()) {
      toast.error('Please enter a password');
      return false;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      signup(formData);
    }

    setFormData({
      email: '',
      password: '',
      fullName: '',
    });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side content*/}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and title */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex justify-center items-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your account
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Form Group Full Name */}
            <div className="join join-vertical w-full">
              <label htmlFor="fullName" className="label mb-1">
                <span className="label font-medium text-base">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  name="fullName"
                  type="text"
                  className="input w-full pl-10"
                  placeholder="Full Name"
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  value={formData.fullName}
                />
              </div>
            </div>

            {/* Form Group Email */}
            <div className="join join-vertical w-full">
              <label htmlFor="email" className="label mb-1">
                <span className="label font-medium text-base">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  name="email"
                  type="text"
                  className="input w-full pl-10"
                  placeholder="Email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  value={formData.email}
                />
              </div>
            </div>

            {/* Form Group Password */}
            <div className="join join-vertical w-full">
              <label htmlFor="password" className="label mb-1">
                <span className="label font-medium text-base">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="input w-full pl-10"
                  placeholder="Password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  value={formData.password}
                />
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" /> Loading...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Link to Login Page */}
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{' '}
              <Link className="link link-primary" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side content */}
      <AuthImagePattern
        title="Join our community"
        content="Sign up for free to start exploring the platform."
      />
    </div>
  );
};

export default SignUpPage;
