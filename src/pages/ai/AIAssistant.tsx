import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileText, Sparkles, BookOpen, MessageSquare, Calendar, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addNote, deleteNote } from '@/store/notesSlice';
import { Badge } from '@/components/ui/badge';

const mockSummary = `
# Introduction to Data Structures

## Key Concepts:
- **Arrays**: Fixed-size sequential collection of elements
- **Linked Lists**: Dynamic data structure with nodes
- **Stacks**: LIFO (Last In First Out) principle
- **Queues**: FIFO (First In First Out) principle

## Important Points:
1. Time complexity varies by operation
2. Space-time tradeoff is crucial
3. Choose appropriate structure for your use case
`;

const mockFlashcards = [
  { question: 'What is the time complexity of array access?', answer: 'O(1) - Constant time' },
  { question: 'What does LIFO stand for?', answer: 'Last In First Out - used in Stacks' },
  { question: 'What is a linked list node?', answer: 'A data structure containing data and a reference to the next node' },
];

const mockQuiz = [
  {
    question: 'Which data structure uses LIFO principle?',
    options: ['Queue', 'Stack', 'Array', 'Tree'],
    correct: 1,
  },
  {
    question: 'What is the time complexity of searching in an unsorted array?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correct: 2,
  },
];

export default function AIAssistant() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const notes = useAppSelector((state) => state.notes.notes);
  const userNotes = notes.filter(note => note.userId === currentUser?.email);
  
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      toast.success('File uploaded successfully!');
    }
  };

  const processFile = () => {
    if (!file || !currentUser) return;
    
    setProcessing(true);
    setTimeout(() => {
      const newNote = {
        id: Date.now().toString(),
        title: file.name.replace(/\.[^/.]+$/, ''),
        content: mockSummary,
        fileName: file.name,
        uploadDate: new Date().toISOString(),
        userId: currentUser.email,
      };
      
      dispatch(addNote(newNote));
      setProcessing(false);
      setFile(null);
      toast.success('AI processing complete! Note saved.');
    }, 2000);
  };

  const handleDeleteNote = (noteId: string) => {
    dispatch(deleteNote(noteId));
    toast.success('Note deleted successfully!');
  };

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;
    toast.success('AI is thinking...');
    setChatMessage('');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold mb-2">AI Study Assistant</h1>
        <p className="text-muted-foreground">Upload notes, get summaries, flashcards, and quiz yourself with AI</p>
      </div>

      {/* Upload Section */}
      <Card className="border-2 border-dashed border-primary/20 bg-primary/5">
        <CardContent className="p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="rounded-full bg-primary/10 p-6">
              <Upload className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold mb-2">Upload Study Material</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload PDF, images, or documents. AI will analyze and create study materials.
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild>
                <label className="cursor-pointer">
                  <FileText className="mr-2 h-4 w-4" />
                  Choose File
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileUpload}
                  />
                </label>
              </Button>
              {file && (
                <Button onClick={processFile} disabled={processing}>
                  {processing ? 'Processing...' : 'Process with AI'}
                </Button>
              )}
            </div>
            {file && (
              <p className="text-sm text-muted-foreground">
                Selected: {file.name}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* My Notes Section */}
      {userNotes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>My Uploaded Notes ({userNotes.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {userNotes.map((note) => (
                <div key={note.id} className="rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{note.title}</h3>
                      <p className="text-xs text-muted-foreground">{note.fileName}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {new Date(note.uploadDate).toLocaleDateString()}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Features Tabs */}
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">
            <BookOpen className="mr-2 h-4 w-4" />
            Summary
          </TabsTrigger>
          <TabsTrigger value="flashcards">
            <Sparkles className="mr-2 h-4 w-4" />
            Flashcards
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <FileText className="mr-2 h-4 w-4" />
            Quiz
          </TabsTrigger>
          <TabsTrigger value="chat">
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap rounded-lg bg-muted p-6">
                  {mockSummary}
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Add to Study Plan
                </Button>
                <Button variant="outline">Export PDF</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flashcards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                Flashcard {flashcardIndex + 1} of {mockFlashcards.length}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className="min-h-[200px] cursor-pointer rounded-xl bg-gradient-to-br from-secondary to-accent p-8 text-white shadow-lg transition-transform hover:scale-105"
                onClick={() => setShowAnswer(!showAnswer)}
              >
                <div className="flex h-full flex-col items-center justify-center text-center">
                  {!showAnswer ? (
                    <>
                      <p className="text-sm opacity-80 mb-4">Question</p>
                      <p className="text-xl font-semibold">
                        {mockFlashcards[flashcardIndex].question}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm opacity-80 mb-4">Answer</p>
                      <p className="text-xl font-semibold">
                        {mockFlashcards[flashcardIndex].answer}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  disabled={flashcardIndex === 0}
                  onClick={() => {
                    setFlashcardIndex(flashcardIndex - 1);
                    setShowAnswer(false);
                  }}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  disabled={flashcardIndex === mockFlashcards.length - 1}
                  onClick={() => {
                    setFlashcardIndex(flashcardIndex + 1);
                    setShowAnswer(false);
                  }}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Quiz</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {mockQuiz.map((q, qIndex) => (
                <div key={qIndex} className="space-y-3">
                  <p className="font-semibold">
                    {qIndex + 1}. {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((option, oIndex) => (
                      <button
                        key={oIndex}
                        onClick={() => {
                          const newAnswers = [...quizAnswers];
                          newAnswers[qIndex] = oIndex;
                          setQuizAnswers(newAnswers);
                        }}
                        className={`w-full rounded-lg border p-3 text-left transition-colors ${
                          quizAnswers[qIndex] === oIndex
                            ? 'border-secondary bg-secondary/10'
                            : 'border-border hover:bg-muted'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <Button className="w-full">Submit Quiz</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chat with AI Tutor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="min-h-[300px] rounded-lg bg-muted p-4">
                <div className="mb-4 flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="flex-1 rounded-lg bg-background p-3">
                    <p className="text-sm">
                      Hi! I'm your AI study assistant. Ask me anything about your uploaded materials or any topic you're studying!
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Textarea
                  placeholder="Ask a question about your study material..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="min-h-[60px]"
                />
                <Button onClick={sendChatMessage}>Send</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
