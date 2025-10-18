import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/store/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Home as HomeIcon, Users, DollarSign, TrendingUp, Calendar, Star, Plus, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { icon: HomeIcon, label: 'hostels', value: '3', change: 'Active listings', color: 'text-secondary' },
  { icon: Users, label: 'bookings', value: '24', change: '+6 this month', color: 'text-accent' },
  { icon: DollarSign, label: 'earnings', value: '₹1,85,000', change: '+12% this month', color: 'text-success' },
  { icon: TrendingUp, label: 'occupancy', value: '87%', change: '+3% this week', color: 'text-warning' },
];

const hostels = [
  {
    id: '1',
    name: 'University Heights Hostel',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400',
    occupancy: 18,
    total: 20,
    revenue: '₹72,000',
    rating: 4.6,
    reviews: 142,
  },
  {
    id: '2',
    name: 'Green Valley PG',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
    occupancy: 10,
    total: 15,
    revenue: '₹48,500',
    rating: 4.4,
    reviews: 89,
  },
  {
    id: '3',
    name: 'Sunrise Girls Hostel',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
    occupancy: 22,
    total: 25,
    revenue: '₹64,500',
    rating: 4.8,
    reviews: 203,
  },
];

const recentBookings = [
  { student: 'Priya Sharma', hostel: 'University Heights', room: 'A-12', date: '2 days ago', status: 'confirmed' },
  { student: 'Anjali Patel', hostel: 'Sunrise Girls', room: 'B-8', date: '3 days ago', status: 'confirmed' },
  { student: 'Kavya Reddy', hostel: 'Green Valley PG', room: 'C-5', date: '5 days ago', status: 'pending' },
];

export default function HostelOwnerDashboard() {
  const { t } = useTranslation();
  const currentUser = useAppSelector((state) => state.user.currentUser);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="font-heading text-3xl font-bold mb-2">
            {t('dashboard.welcome')}, {currentUser?.name?.split(' ')[0] || 'Owner'}! 🏠
          </h1>
          <p className="text-muted-foreground">Manage your hostel properties and bookings</p>
        </div>
        
        {/* Profile Section */}
        <Card className="w-64">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-secondary/20 text-secondary font-semibold">
                  {currentUser?.name?.charAt(0) || 'O'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{currentUser?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{currentUser?.email}</p>
                <Badge variant="outline" className="mt-1 text-xs">Owner</Badge>
              </div>
            </div>
            <Button size="sm" className="w-full" asChild>
              <Link to="/dashboard/hostels">
                <Plus className="mr-2 h-4 w-4" />
                Add Hostel
              </Link>
            </Button>
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

      {/* Hostels Grid */}
      <div>
        <h2 className="font-heading text-2xl font-bold mb-4">My Hostels</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hostels.map((hostel) => (
            <Card key={hostel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img src={hostel.image} alt={hostel.name} className="h-48 w-full object-cover" />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg mb-2">{hostel.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-semibold">{hostel.rating}</span>
                      <span className="text-xs text-muted-foreground">({hostel.reviews})</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Occupancy</span>
                    <span className="font-semibold">
                      {hostel.occupancy}/{hostel.total} rooms
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-success rounded-full transition-all"
                      style={{ width: `${(hostel.occupancy / hostel.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                    <p className="font-heading text-xl font-bold">{hostel.revenue}</p>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link to={`/dashboard/hostels`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.map((booking, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-semibold">{booking.student}</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.hostel} • Room {booking.room}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{booking.date}</p>
                </div>
                <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'} className="capitalize">
                  {booking.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
