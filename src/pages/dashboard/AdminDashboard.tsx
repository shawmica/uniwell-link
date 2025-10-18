import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/store/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Home as HomeIcon, FileText, AlertCircle, TrendingUp, UserCheck, Shield, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { icon: Users, label: 'users', value: '10,542', change: '+234 this week', color: 'text-secondary' },
  { icon: UserCheck, label: 'students', value: '8,912', change: '84% of total', color: 'text-accent' },
  { icon: HomeIcon, label: 'hostels', value: '1,234', change: '+45 this month', color: 'text-warning' },
  { icon: FileText, label: 'reports', value: '23', change: '12 pending', color: 'text-destructive' },
];

const recentActivity = [
  { type: 'user', action: 'New tutor registered', user: 'Sarah Chen', time: '5 min ago', status: 'pending' },
  { type: 'hostel', action: 'New hostel listing', user: 'Ramesh Kumar', time: '1 hour ago', status: 'pending' },
  { type: 'report', action: 'User reported fake profile', user: 'Anonymous', time: '2 hours ago', status: 'urgent' },
  { type: 'user', action: 'Student verification completed', user: 'Priya Sharma', time: '3 hours ago', status: 'completed' },
];

const pendingVerifications = [
  { type: 'Tutor', name: 'Mike Johnson', submitted: '2 days ago', documents: 3 },
  { type: 'Hostel', name: 'Green Valley PG', submitted: '1 day ago', documents: 5 },
  { type: 'Tutor', name: 'Emily Davis', submitted: '3 days ago', documents: 2 },
];

const systemHealth = [
  { metric: 'Server Status', value: 'Healthy', status: 'success' },
  { metric: 'Database', value: '99.9% uptime', status: 'success' },
  { metric: 'API Response', value: '145ms avg', status: 'success' },
  { metric: 'Active Sessions', value: '1,234', status: 'success' },
];

export default function AdminDashboard() {
  const { t } = useTranslation();
  const currentUser = useAppSelector((state) => state.user.currentUser);

  // Debug: Log current user role
  console.log('Admin Dashboard - Current User:', currentUser);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="font-heading text-3xl font-bold mb-2">
            {t('dashboard.welcome')}, {currentUser?.name?.split(' ')[0] || 'Admin'}! 🛡️
          </h1>
          <p className="text-muted-foreground">System overview and administrative controls</p>
          <Badge variant="outline" className="text-destructive border-destructive mt-2">
            <AlertCircle className="mr-1 h-3 w-3" />
            {recentActivity.filter((a) => a.status === 'urgent' || a.status === 'pending').length} Pending Actions
          </Badge>
        </div>
        
        {/* Profile Section */}
        <Card className="w-64 border-primary shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarFallback className="bg-primary/20 text-primary font-semibold text-lg">
                  {currentUser?.name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{currentUser?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{currentUser?.email}</p>
                <Badge className="mt-1 text-xs bg-primary">Admin Dashboard</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`rounded-xl p-3 bg-opacity-10 ${stat.color}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 capitalize">{t(`dashboard.stats.${stat.label}`)}</p>
                <p className="font-heading text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start justify-between rounded-lg border border-border p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                    {activity.status === 'urgent' && (
                      <Badge variant="destructive" className="text-xs">
                        Urgent
                      </Badge>
                    )}
                  </div>
                  <p className="font-semibold mb-1">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.user}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
                <Button size="sm" variant="outline">
                  Review
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="border-success">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <Shield className="h-5 w-5" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemHealth.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.metric}</p>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </div>
                <div className="h-2 w-2 rounded-full bg-success"></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Pending Verifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Pending Verifications
            </span>
            <Badge variant="secondary">{pendingVerifications.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingVerifications.map((item, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline">{item.type}</Badge>
                    <p className="font-semibold">{item.name}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.documents} documents • Submitted {item.submitted}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-success border-success hover:bg-success/10">
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.quickActions')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button className="h-auto flex-col gap-2 p-6" asChild>
              <Link to="/dashboard/peer-learning">
                <Users className="h-6 w-6" />
                <span>Manage Users</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-6" asChild>
              <Link to="/dashboard/hostels">
                <HomeIcon className="h-6 w-6" />
                <span>Manage Hostels</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-6">
              <FileText className="h-6 w-6" />
              <span>View Reports</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-6" asChild>
              <Link to="/dashboard/settings">
                <Shield className="h-6 w-6" />
                <span>System Settings</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
