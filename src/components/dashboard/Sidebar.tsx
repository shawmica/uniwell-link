import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  GraduationCap,
  LayoutDashboard,
  Brain,
  Users,
  Home as HomeIcon,
  Heart,
  MessageSquare,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/userSlice';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', key: 'dashboard' },
  { icon: Brain, label: 'AI Assistant', path: '/dashboard/ai-assistant', key: 'aiassistant' },
  { icon: Users, label: 'Peer Learning', path: '/dashboard/peer-learning', key: 'peerlearning' },
  { icon: HomeIcon, label: 'Hostel Finder', path: '/dashboard/hostels', key: 'hostelfinder' },
  { icon: Heart, label: 'Wellness Zone', path: '/dashboard/wellness', key: 'wellness' },
  { icon: MessageSquare, label: 'Messages', path: '/dashboard/messages', key: 'messages' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings', key: 'settings' },
];

export const Sidebar = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="border-b border-sidebar-border p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary p-2">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="font-heading text-xl font-bold">{t('app.name')}</span>
          </div>
          <div className="mt-4">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                )
              }
              >
                <item.icon className="h-5 w-5" />
                {t(`nav.${item.key}`)}
              </NavLink>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="border-t border-sidebar-border p-4">
          <div className="mb-3 flex items-center gap-3 rounded-lg bg-sidebar-accent/50 p-3">
            <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
              <span className="font-heading font-semibold text-secondary">
                {currentUser?.name.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{currentUser?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground capitalize">{currentUser?.role || 'Student'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            {t('nav.logout')}
          </button>
        </div>
      </div>
    </aside>
  );
};
