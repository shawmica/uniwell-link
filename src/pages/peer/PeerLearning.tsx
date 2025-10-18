import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Star, MessageCircle, Video, BookOpen, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const mockPeers = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'tutor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    subjects: ['Data Structures', 'Algorithms', 'Python'],
    rating: 4.8,
    sessions: 156,
    department: 'Computer Science',
    available: true,
    bio: 'CS senior specializing in competitive programming and system design.',
  },
  {
    id: '2',
    name: 'Mike Johnson',
    role: 'tutor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    subjects: ['Calculus', 'Linear Algebra', 'Statistics'],
    rating: 4.9,
    sessions: 203,
    department: 'Mathematics',
    available: true,
    bio: 'Math grad student passionate about making calculus easy to understand.',
  },
  {
    id: '3',
    name: 'Emily Davis',
    role: 'tutor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    subjects: ['Physics', 'Thermodynamics', 'Mechanics'],
    rating: 4.7,
    sessions: 89,
    department: 'Physics',
    available: false,
    bio: 'Physics enthusiast helping students ace their exams since 2022.',
  },
  {
    id: '4',
    name: 'Alex Kumar',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    subjects: ['Web Development', 'JavaScript', 'React'],
    rating: 4.5,
    sessions: 34,
    department: 'Computer Science',
    available: true,
    bio: 'Looking to collaborate on web dev projects and share knowledge.',
  },
];

export default function PeerLearning() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const filteredPeers = mockPeers.filter((peer) => {
    const matchesSearch = peer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      peer.subjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || peer.subjects.some((s) => s === selectedSubject);
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold mb-2">Peer Learning & Tutoring</h1>
        <p className="text-muted-foreground">Connect with tutors and study partners to accelerate your learning</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="Data Structures">Data Structures</SelectItem>
                <SelectItem value="Calculus">Calculus</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Web Development">Web Development</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Peer Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPeers.map((peer) => (
          <Card key={peer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={peer.avatar} alt={peer.name} />
                    <AvatarFallback>{peer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{peer.name}</CardTitle>
                    <p className="text-sm text-muted-foreground capitalize">{peer.role}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="font-semibold">{peer.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{peer.sessions} sessions</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">{peer.department}</p>
                <p className="text-sm mb-3">{peer.bio}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {peer.subjects.slice(0, 3).map((subject) => (
                  <Badge key={subject} variant="secondary" className="text-xs">
                    <BookOpen className="mr-1 h-3 w-3" />
                    {subject}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    peer.available ? 'bg-success' : 'bg-muted-foreground'
                  }`}
                ></div>
                <span className="text-xs text-muted-foreground">
                  {peer.available ? 'Available now' : 'Busy'}
                </span>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button size="sm" variant="outline">
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPeers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No peers found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
