import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/userSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { GraduationCap } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock login - replace with actual API call
    setTimeout(() => {
      const mockUser = {
        id: '1',
        email,
        name: 'John Doe',
        role: 'student' as const,
        department: 'Computer Science',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      };

      dispatch(setUser(mockUser));
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast.success('Welcome back!');
      navigate('/dashboard');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary items-center justify-center p-12">
        <div className="max-w-md text-white">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-lg">
              <GraduationCap className="h-10 w-10" />
            </div>
            <h1 className="font-heading text-4xl font-bold">CampusEase</h1>
          </div>
          <h2 className="mb-4 font-heading text-3xl font-semibold">Your Smart Campus Companion</h2>
          <p className="text-lg text-white/90">
            Connect with peers, find perfect hostels, ace your studies with AI, and take care of your mental wellness - all in one place.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-secondary"></div>
              <span>AI-powered study assistant</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-accent"></div>
              <span>Connect with verified tutors</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-warning"></div>
              <span>Find compatible roommates</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-success"></div>
              <span>Mental wellness support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:hidden">
            <div className="mb-4 flex justify-center">
              <div className="rounded-2xl bg-primary p-3">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="font-heading text-3xl font-bold">CampusEase</h1>
          </div>

          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold">Welcome back</h2>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-secondary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/register" className="text-secondary hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
