import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Smile, Meh, Frown, BookHeart, MessageCircle, AlertCircle, TrendingUp, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addJournalEntry, deleteJournalEntry } from '@/store/journalSlice';

const moodOptions = [
  { icon: '😊', label: 'Great', value: 5, color: 'text-success' },
  { icon: '🙂', label: 'Good', value: 4, color: 'text-accent' },
  { icon: '😐', label: 'Okay', value: 3, color: 'text-warning' },
  { icon: '😟', label: 'Not Good', value: 2, color: 'text-destructive' },
  { icon: '😢', label: 'Bad', value: 1, color: 'text-destructive' },
];

const affirmations = [
  "You are capable of amazing things. Keep going! 💪",
  "Every day is a new opportunity to grow and learn.",
  "Your mental health matters just as much as your grades.",
  "It's okay to take breaks. Rest is productive too.",
  "You've overcome challenges before, and you will again.",
];

const journalEntries = [
  { date: '2024-01-15', mood: 4, entry: 'Had a productive study session today. Feeling good about the upcoming exam.' },
  { date: '2024-01-14', mood: 3, entry: 'A bit stressed about assignments, but taking it one day at a time.' },
];

export default function Wellness() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const journalEntries = useAppSelector((state) => state.journal.entries);
  const userEntries = journalEntries.filter(entry => entry.userId === currentUser?.email);
  
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [journalText, setJournalText] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [todaysAffirmation] = useState(affirmations[Math.floor(Math.random() * affirmations.length)]);

  const logMood = () => {
    if (selectedMood === null || !currentUser) {
      toast.error('Please select a mood first');
      return;
    }
    
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      entry: `Mood logged: ${moodOptions.find(m => m.value === selectedMood)?.label}`,
      userId: currentUser.email,
    };
    
    dispatch(addJournalEntry(newEntry));
    toast.success('Mood logged successfully!');
    setSelectedMood(null);
  };

  const saveJournal = () => {
    if (!journalText.trim() || !currentUser) {
      toast.error('Please write something in your journal');
      return;
    }
    
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood || 3,
      entry: journalText,
      userId: currentUser.email,
    };
    
    dispatch(addJournalEntry(newEntry));
    toast.success('Journal entry saved!');
    setJournalText('');
  };

  const handleDeleteEntry = (entryId: string) => {
    dispatch(deleteJournalEntry(entryId));
    toast.success('Journal entry deleted!');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold mb-2">Wellness Zone</h1>
        <p className="text-muted-foreground">Take care of your mental health and emotional wellbeing</p>
      </div>

      {/* Daily Affirmation */}
      <Card className="gradient-wellness text-white border-0">
        <CardContent className="p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
              <Heart className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold mb-2">
                Your Daily Affirmation
              </h3>
              <p className="text-lg text-white/90">
                {todaysAffirmation}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="mood" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mood">
            <Smile className="mr-2 h-4 w-4" />
            Mood Tracker
          </TabsTrigger>
          <TabsTrigger value="journal">
            <BookHeart className="mr-2 h-4 w-4" />
            Journal
          </TabsTrigger>
          <TabsTrigger value="counselor">
            <MessageCircle className="mr-2 h-4 w-4" />
            AI Counselor
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mood" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How are you feeling today?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-5 gap-4">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all hover:scale-105 ${
                      selectedMood === mood.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <span className="text-4xl">{mood.icon}</span>
                    <span className="text-sm font-medium">{mood.label}</span>
                  </button>
                ))}
              </div>
              <Button onClick={logMood} className="w-full">
                Log Mood
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Your Mood History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userEntries.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No mood entries yet. Start tracking!</p>
                ) : (
                  userEntries.slice(0, 5).map((entry) => (
                    <div key={entry.id} className="flex items-start gap-4 rounded-lg border border-border p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-2xl">
                        {moodOptions.find((m) => m.value === entry.mood)?.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground mb-1">{entry.date}</p>
                        <p className="text-sm">{entry.entry}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteEntry(entry.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Journal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Write about your day, your feelings, or anything on your mind..."
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                className="min-h-[200px]"
              />
              <Button onClick={saveJournal} className="w-full">
                Save Entry
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Previous Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userEntries.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No journal entries yet. Start writing!</p>
                ) : (
                  userEntries.map((entry) => (
                    <div key={entry.id} className="rounded-lg border border-border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">{entry.date}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{moodOptions.find((m) => m.value === entry.mood)?.icon}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                            onClick={() => handleDeleteEntry(entry.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{entry.entry}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="counselor" className="space-y-6">
          <Card className="border-accent">
            <CardHeader className="bg-accent/5">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-accent" />
                AI Wellness Counselor
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-4 rounded-lg bg-muted p-4">
                <p className="text-sm">
                  <strong>AI Counselor:</strong> Hi! I'm here to listen and provide support. How are you feeling today? Remember, I'm an AI assistant - for serious concerns, please reach out to a professional counselor.
                </p>
              </div>
              <div className="space-y-4">
                <Textarea
                  placeholder="Share what's on your mind..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="min-h-[120px]"
                />
                <Button
                  onClick={() => {
                    if (chatMessage.trim()) {
                      toast.success('Message sent');
                      setChatMessage('');
                    }
                  }}
                  className="w-full"
                >
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                Need Immediate Help?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                If you're experiencing a mental health emergency, please reach out to these resources:
              </p>
              <div className="space-y-2 text-sm">
                <div className="rounded-lg bg-background p-3">
                  <p className="font-semibold mb-1">Campus Counseling Center</p>
                  <p className="text-muted-foreground">📞 1-800-XXX-XXXX (24/7)</p>
                </div>
                <div className="rounded-lg bg-background p-3">
                  <p className="font-semibold mb-1">National Mental Health Helpline</p>
                  <p className="text-muted-foreground">📞 1-800-XXX-XXXX</p>
                </div>
              </div>
              <Button variant="destructive" className="w-full">
                Call Emergency Helpline
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
