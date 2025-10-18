import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Brain, Users, Home as HomeIcon, Heart, Sparkles, ArrowRight, Check } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Study Assistant',
    description: 'Upload notes and get AI-generated summaries, flashcards, and quizzes',
    gradient: 'from-secondary to-accent',
  },
  {
    icon: Users,
    title: 'Peer Learning',
    description: 'Connect with verified tutors and study partners instantly',
    gradient: 'from-accent to-success',
  },
  {
    icon: HomeIcon,
    title: 'Hostel Finder',
    description: 'Find verified hostels and compatible roommates with AI matching',
    gradient: 'from-warning to-destructive',
  },
  {
    icon: Heart,
    title: 'Wellness Zone',
    description: 'Track your mood, journal daily, and chat with AI counselor',
    gradient: 'from-success to-accent',
  },
];

const benefits = [
  'AI-powered study tools',
  'Verified peer network',
  'Smart roommate matching',
  'Mental wellness support',
  '24/7 AI assistance',
  'Secure & private',
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5"></div>
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-2xl bg-primary p-4">
                <GraduationCap className="h-12 w-12 text-white" />
              </div>
              <h1 className="font-heading text-5xl font-bold">CampusEase</h1>
            </div>
            
            <h2 className="font-heading text-5xl md:text-6xl font-bold mb-6 max-w-4xl">
              Your Smart Campus <span className="gradient-primary bg-clip-text text-transparent">Companion</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Study smarter with AI, connect with the right peers, find your perfect hostel, 
              and take care of your mental wellness - all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/register">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <p className="font-heading text-4xl font-bold text-primary">10,000+</p>
                <p className="text-sm text-muted-foreground">Active Students</p>
              </div>
              <div>
                <p className="font-heading text-4xl font-bold text-secondary">500+</p>
                <p className="text-sm text-muted-foreground">Verified Tutors</p>
              </div>
              <div>
                <p className="font-heading text-4xl font-bold text-accent">1,200+</p>
                <p className="text-sm text-muted-foreground">Hostels Listed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4">Everything You Need in One Place</h2>
            <p className="text-xl text-muted-foreground">Powerful features to make your campus life easier</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
                <CardContent className="p-6">
                  <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${feature.gradient} p-4`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="font-heading text-4xl font-bold mb-6">
                Why Choose CampusEase?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We understand the challenges of campus life. That's why we've built a comprehensive 
                platform that addresses your academic, social, and wellness needs.
              </p>
              
              <div className="grid gap-4 sm:grid-cols-2 mb-8">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <div className="rounded-full bg-success/10 p-1">
                      <Check className="h-5 w-5 text-success" />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" asChild>
                <Link to="/register">Start Your Journey</Link>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 gradient-secondary rounded-3xl blur-3xl opacity-20"></div>
              <Card className="relative border-2">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <Sparkles className="h-12 w-12 text-secondary mb-4" />
                    <h3 className="font-heading text-2xl font-bold mb-2">Powered by AI</h3>
                    <p className="text-muted-foreground">
                      Our advanced AI helps you study better, find the right connections, 
                      and make informed decisions about your campus life.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-muted p-4">
                      <p className="font-semibold mb-1">Smart Study Materials</p>
                      <p className="text-sm text-muted-foreground">
                        AI creates personalized summaries and quizzes from your notes
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted p-4">
                      <p className="font-semibold mb-1">Perfect Matching</p>
                      <p className="text-sm text-muted-foreground">
                        Find tutors and roommates that match your preferences
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted p-4">
                      <p className="font-semibold mb-1">Wellness Support</p>
                      <p className="text-sm text-muted-foreground">
                        24/7 AI counselor for your mental health support
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="font-heading text-4xl font-bold mb-6">
              Ready to Transform Your Campus Experience?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of students who are already studying smarter, living better, 
              and thriving with CampusEase.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                <Link to="/register">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 bg-white/10 border-white/30 text-white hover:bg-white/20" 
                asChild
              >
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-heading font-bold">CampusEase</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 CampusEase. Making campus life easier, one student at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
