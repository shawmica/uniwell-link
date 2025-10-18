import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/store/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, DollarSign, Star, TrendingUp, Calendar, Clock, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { icon: Users, label: 'students', value: '42', change: '+8 this month', color: 'text-secondary' },
  { icon: DollarSign, label: 'earnings', value: '₹12,500', change: '+15% this month', color: 'text-success' },
  { icon: Star, label: 'rating', value: '4.8', change: '156 reviews', color: 'text-warning' },
  { icon: Calendar, label: 'sessions', value: '28', change: 'This month', color: 'text-accent' },
];

const pendingRequests = [
  { id: '1', student: 'Rahul Kumar', subject: 'Data Structures', time: '2 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul' },
  { id: '2', student: 'Priya Sharma', subject: 'Algorithms', time: '5 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' },
  { id: '3', student: 'Arjun Patel', subject: 'Python', time: '1 day ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun' },
];

const upcomingSessions = [
  { student: 'Meera Singh', subject: 'Data Structures', time: 'Today, 3:00 PM', duration: '1 hour' },
  { student: 'Karthik Reddy', subject: 'Algorithms', time: 'Tomorrow, 10:00 AM', duration: '1.5 hours' },
  { student: 'Ananya Das', subject: 'Python Basics', time: 'Wed, 2:00 PM', duration: '1 hour' },
];

export default function TutorDashboard() {
  const { t } = useTranslation();
  const currentUser = useAppSelector((state) => state.user.currentUser);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold mb-2">
            {t('dashboard.welcome')}, {currentUser?.name?.split(' ')[0] || 'Tutor'}! 👨‍🏫
          </h1>
          <p className="text-muted-foreground">Manage your tutoring sessions and connect with students</p>
        </div>
        
        {/* Profile Section */}
        <Card className="w-64">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-secondary/20 text-secondary font-semibold">
                  {currentUser?.name?.charAt(0) || 'T'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{currentUser?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{currentUser?.email}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 fill-warning text-warning" />
                  <span className="text-xs font-semibold">4.8</span>
                  <Badge variant="outline" className="text-xs ml-1">Tutor</Badge>
                </div>
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
        {/* Pending Requests */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Pending Student Requests</span>
              <Badge variant="secondary">{pendingRequests.length} New</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingRequests.map((request) => (
              <div key={request.id} className="flex items-center gap-4 rounded-lg border border-border p-4">
                <Avatar>
                  <AvatarImage src={request.avatar} alt={request.student} />
                  <AvatarFallback>{request.student.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">{request.student}</p>
                  <p className="text-sm text-muted-foreground">Subject: {request.subject}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3" />
                    {request.time}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-success border-success hover:bg-success/10">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.map((session, index) => (
              <div key={index} className="rounded-lg bg-muted p-4">
                <p className="font-semibold mb-1">{session.student}</p>
                <p className="text-sm text-muted-foreground mb-2">{session.subject}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {session.time}
                  </span>
                  <span>{session.duration}</span>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" asChild>
              <Link to="/dashboard/peer-learning">View All</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

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
                <span>View Students</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-6">
              <Calendar className="h-6 w-6" />
              <span>Set Availability</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-6" asChild>
              <Link to="/dashboard/messages">
                <Users className="h-6 w-6" />
                <span>Messages</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-6" asChild>
              <Link to="/dashboard/settings">
                <Star className="h-6 w-6" />
                <span>My Profile</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
