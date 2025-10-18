import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUser } from '@/store/userSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, GraduationCap, Home, Shield } from 'lucide-react';
import { toast } from 'sonner';

export const QuickRoleSwitcher = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const switchRole = (newRole: 'student' | 'tutor' | 'hostel_owner' | 'admin') => {
    if (!currentUser) return;
    
    const updatedUser = { ...currentUser, role: newRole };
    dispatch(setUser(updatedUser));
    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.success(`Switched to ${newRole} role`);
    
    // Reload to show correct dashboard
    window.location.reload();
  };

  if (!currentUser) return null;

  return (
    <Card className="border-2 border-dashed border-primary/20">
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          🔧 Developer: Quick Role Switcher
          <Badge variant="outline" className="capitalize">{currentUser.role}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button
            size="sm"
            variant={currentUser.role === 'student' ? 'default' : 'outline'}
            onClick={() => switchRole('student')}
            className="flex-col h-auto py-3"
          >
            <GraduationCap className="h-4 w-4 mb-1" />
            <span className="text-xs">Student</span>
          </Button>
          <Button
            size="sm"
            variant={currentUser.role === 'tutor' ? 'default' : 'outline'}
            onClick={() => switchRole('tutor')}
            className="flex-col h-auto py-3"
          >
            <Users className="h-4 w-4 mb-1" />
            <span className="text-xs">Tutor</span>
          </Button>
          <Button
            size="sm"
            variant={currentUser.role === 'hostel_owner' ? 'default' : 'outline'}
            onClick={() => switchRole('hostel_owner')}
            className="flex-col h-auto py-3"
          >
            <Home className="h-4 w-4 mb-1" />
            <span className="text-xs">Owner</span>
          </Button>
          <Button
            size="sm"
            variant={currentUser.role === 'admin' ? 'default' : 'outline'}
            onClick={() => switchRole('admin')}
            className="flex-col h-auto py-3"
          >
            <Shield className="h-4 w-4 mb-1" />
            <span className="text-xs">Admin</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
