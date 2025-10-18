import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { MapPin, Wifi, Utensils, Car, Star, Heart, Filter, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockHostels = [
  {
    id: '1',
    name: 'University Heights Hostel',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
    price: 8000,
    distance: 0.5,
    rating: 4.6,
    reviews: 142,
    amenities: ['WiFi', 'Meals', 'Parking', 'Laundry'],
    gender: 'Mixed',
    available: 5,
    verified: true,
  },
  {
    id: '2',
    name: 'Green Valley PG',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    price: 6500,
    distance: 1.2,
    rating: 4.4,
    reviews: 89,
    amenities: ['WiFi', 'Meals', 'AC'],
    gender: 'Boys',
    available: 3,
    verified: true,
  },
  {
    id: '3',
    name: 'Sunrise Girls Hostel',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    price: 7500,
    distance: 0.8,
    rating: 4.8,
    reviews: 203,
    amenities: ['WiFi', 'Meals', 'Gym', 'Security'],
    gender: 'Girls',
    available: 2,
    verified: true,
  },
];

const roommateProfiles = [
  {
    id: '1',
    name: 'Priya Sharma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    course: 'BTech CS',
    year: 2,
    habits: ['Early Bird', 'Non-Smoker', 'Vegetarian', 'Quiet'],
    interests: ['Reading', 'Music', 'Cooking'],
    compatibility: 92,
  },
  {
    id: '2',
    name: 'Anjali Patel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali',
    course: 'MBA',
    year: 1,
    habits: ['Night Owl', 'Non-Smoker', 'Flexible', 'Social'],
    interests: ['Movies', 'Yoga', 'Travel'],
    compatibility: 85,
  },
];

export default function Hostels() {
  const [priceRange, setPriceRange] = useState([5000, 15000]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold mb-2">Hostel & Roommate Finder</h1>
        <p className="text-muted-foreground">Find your perfect accommodation and compatible roommates</p>
      </div>

      <Tabs defaultValue="hostels" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="hostels">
            <MapPin className="mr-2 h-4 w-4" />
            Browse Hostels
          </TabsTrigger>
          <TabsTrigger value="roommates">
            <Users className="mr-2 h-4 w-4" />
            Find Roommates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hostels" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter Hostels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  placeholder="Search by location or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </label>
                <Slider
                  min={3000}
                  max={20000}
                  step={500}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Hostel Listings */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockHostels.map((hostel) => (
              <Card key={hostel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={hostel.image}
                    alt={hostel.name}
                    className="h-48 w-full object-cover"
                  />
                  {hostel.verified && (
                    <Badge className="absolute top-3 right-3 bg-success">
                      ✓ Verified
                    </Badge>
                  )}
                  <button className="absolute top-3 left-3 rounded-full bg-white/90 p-2 hover:bg-white transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{hostel.name}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {hostel.distance} km from campus
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-warning text-warning" />
                        <span className="font-semibold">{hostel.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{hostel.reviews} reviews</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {hostel.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity === 'WiFi' && <Wifi className="mr-1 h-3 w-3" />}
                        {amenity === 'Meals' && <Utensils className="mr-1 h-3 w-3" />}
                        {amenity === 'Parking' && <Car className="mr-1 h-3 w-3" />}
                        {amenity}
                      </Badge>
                    ))}
                    {hostel.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{hostel.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Gender</p>
                      <p className="font-semibold">{hostel.gender}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Available</p>
                      <p className="font-semibold text-success">{hostel.available} rooms</p>
                    </div>
                  </div>

                  <div className="flex items-end justify-between pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Starting from</p>
                      <p className="font-heading text-2xl font-bold">₹{hostel.price}</p>
                      <p className="text-xs text-muted-foreground">per month</p>
                    </div>
                    <Button size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="roommates" className="space-y-6">
          <Card className="gradient-wellness text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-white/20 p-4">
                  <Users className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold mb-1">
                    AI-Powered Roommate Matching
                  </h3>
                  <p className="text-white/90">
                    Take our compatibility quiz to find roommates who match your lifestyle and habits
                  </p>
                </div>
              </div>
              <Button className="mt-4 bg-white text-primary hover:bg-white/90">
                Take Compatibility Quiz
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {roommateProfiles.map((profile) => (
              <Card key={profile.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="h-16 w-16 rounded-full"
                    />
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{profile.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {profile.course} • Year {profile.year}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="rounded-full bg-success/10 px-3 py-1">
                        <p className="font-heading text-lg font-bold text-success">
                          {profile.compatibility}%
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Match</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Living Habits</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.habits.map((habit) => (
                        <Badge key={habit} variant="secondary" className="text-xs">
                          {habit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Interests</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map((interest) => (
                        <Badge key={interest} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">Connect</Button>
                    <Button variant="outline">View Profile</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
