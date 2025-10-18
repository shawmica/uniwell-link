import { useAppSelector } from '@/store/hooks';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

export const RoleDebugger = () => {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  
  if (!currentUser) return null;
  
  return (
    <Card className="border-info bg-info/5">
      <CardContent className="p-3">
        <div className="flex items-center gap-2 text-sm">
          <Info className="h-4 w-4 text-info" />
          <span className="font-medium">Current Role:</span>
          <Badge variant="outline" className="capitalize">{currentUser.role}</Badge>
          <span className="text-muted-foreground">({currentUser.email})</span>
        </div>
      </CardContent>
    </Card>
  );
};
