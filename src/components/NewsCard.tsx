
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';

interface NewsCardProps {
  title: string;
  summary: string;
  date: string;
  source: string;
  category: string;
  link: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ 
  title, 
  summary, 
  date, 
  source, 
  category,
  link 
}) => {
  return (
    <Card className="news-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-gramsuchna-cream text-gramsuchna-brown">
            {category}
          </Badge>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{date}</span>
          </div>
        </div>
        <CardTitle className="line-clamp-2 text-base font-semibold text-gramsuchna-brown">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-2 text-sm">
          {summary}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-0">
        <div className="text-xs text-muted-foreground">
          Source: {source}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gramsuchna-green hover:bg-gramsuchna-cream"
          asChild
        >
          <a href={link}>
            <span>Read</span>
            <ArrowRight className="ml-1 h-3 w-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
