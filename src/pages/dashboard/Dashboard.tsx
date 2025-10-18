import { useAppSelector } from '@/store/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Users, Home as HomeIcon, Heart, TrendingUp, BookOpen, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const stats = [
  { icon: Brain, label: 'AI Sessions', value: '12', change: '+3 this week', color: 'text-secondary' },
  { icon: Users, label: 'Study Partners', value: '8', change: '2 new connections', color: 'text-accent' },
  { icon: HomeIcon, label: 'Saved Hostels', value: '5', change: '3 new listings', color: 'text-warning' },
  { icon: Heart, label: 'Wellness Score', value: '85%', change: '+5% this week', color: 'text-success' },
];

const upcomingSessions = [
  { title: 'Data Structures Study Group', time: 'Today, 3:00 PM', tutor: 'Sarah Chen', subject: 'Computer Science' },
  { title: 'Calculus II Review', time: 'Tomorrow, 10:00 AM', tutor: 'Mike Johnson', subject: 'Mathematics' },
  { title: 'Physics Lab Discussion', time: 'Wed, 2:00 PM', tutor: 'Emily Davis', subject: 'Physics' },
];

const aiTips = [
  'Your focus time is best between 9 AM - 11 AM based on your study patterns',
  'You might want to review Linear Algebra - your last quiz was 2 weeks ago',
  'Take a 10-minute wellness break - you\'ve been studying for 2 hours',
];

export default function Dashboard() {
  const { t } = useTranslation();
  const currentUser = useAppSelector((state) => state.user.currentUser);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold mb-2">
            {t('dashboard.welcome')}, {currentUser?.name?.split(' ')[0] || 'Student'}! 👋
          </h1>
          <p className="text-muted-foreground">{t('dashboard.subtitle')}</p>
        </div>
        
        {/* Profile Section */}
        <Card className="w-64">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-secondary/20 text-secondary font-semibold">
                  {currentUser?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{currentUser?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{currentUser?.email}</p>
                <Badge variant="outline" className="mt-1 text-xs capitalize">{currentUser?.role}</Badge>
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
                <div className={cn('rounded-xl p-3 bg-opacity-10', stat.color)}>
                  <stat.icon className={cn('h-6 w-6', stat.color)} />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
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
        {/* Upcoming Sessions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Study Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.map((session, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="rounded-lg bg-secondary/10 p-3">
                  <BookOpen className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold mb-1">{session.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">with {session.tutor}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {session.time}
                    </span>
                    <span className="rounded-full bg-secondary/10 px-2 py-1 text-secondary">
                      {session.subject}
                    </span>
                  </div>
                </div>
              </div>
            ))}
              <Button variant="outline" className="w-full" asChild>
              <Link to="/dashboard/peer-learning">View All Sessions</Link>
            </Button>
          </CardContent>
        </Card>

        {/* AI Tips */}
        <Card className="gradient-secondary text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Sparkles className="h-5 w-5" />
              AI Insights for You
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiTips.map((tip, index) => (
              <div key={index} className="rounded-lg bg-white/10 backdrop-blur-sm p-4 border border-white/20">
                <p className="text-sm">{tip}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-white/20 hover:bg-white/30 border-white/30 text-white" asChild>
              <Link to="/dashboard/ai-assistant">Open AI Assistant</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-auto flex-col gap-2 p-6" asChild>
              <Link to="/dashboard/ai-assistant">
                <Brain className="h-6 w-6" />
                <span>Upload Notes</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-6" asChild>
              <Link to="/dashboard/peer-learning">
                <Users className="h-6 w-6" />
                <span>Find Tutor</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-6" asChild>
              <Link to="/dashboard/hostels">
                <HomeIcon className="h-6 w-6" />
                <span>Browse Hostels</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-6" asChild>
              <Link to="/dashboard/wellness">
                <Heart className="h-6 w-6" />
                <span>Log Mood</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
