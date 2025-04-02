
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
  // Check if the link is external (has http/https) or internal
  const isExternalLink = link && (link.startsWith('http://') || link.startsWith('https://'));
  
  // Format title to ensure it's not too long
  const formattedTitle = title ? (title.length > 60 ? `${title.substring(0, 60)}...` : title) : "Untitled News";
  
  // Format summary to ensure it's not empty and is a string
  const formattedSummary = typeof summary === 'string' ? summary : "No additional details available for this news item.";
  
  // Format date to ensure it's not empty and is a string
  const formattedDate = typeof date === 'string' ? date : "Recent";
  
  // Format source to ensure it's not empty and is a string
  const formattedSource = typeof source === 'string' ? source : "News Source";
  
  // Format category to ensure it's not empty and is a string
  let formattedCategory = typeof category === 'string' ? category : "News";
  
  // Normalize category for display
  if (formattedCategory.toLowerCase().includes('healthcare') || formattedCategory.toLowerCase().includes('health')) {
    formattedCategory = "Healthcare";
  } else if (formattedCategory.toLowerCase().includes('education')) {
    formattedCategory = "Education";
  } else if (formattedCategory.toLowerCase().includes('agriculture') || formattedCategory.toLowerCase().includes('agri')) {
    formattedCategory = "Agriculture";
  } else if (formattedCategory.toLowerCase().includes('local') || formattedCategory.toLowerCase() === 'news') {
    formattedCategory = "Local News";
  }
  
  // Format link to ensure it's not empty
  const formattedLink = isExternalLink ? link : (link || "#");
  
  return (
    <Card className="news-card overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-gramsuchna-cream text-gramsuchna-brown">
            {formattedCategory}
          </Badge>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{formattedDate}</span>
          </div>
        </div>
        <CardTitle className="line-clamp-2 text-base font-semibold text-gramsuchna-brown">
          {formattedTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="line-clamp-3 text-sm">
          {formattedSummary}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-0">
        <div className="text-xs text-muted-foreground">
          Source: {formattedSource}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gramsuchna-green hover:bg-gramsuchna-cream"
          asChild
        >
          {isExternalLink ? (
            <a href={formattedLink} target="_blank" rel="noopener noreferrer">
              <span>Read</span>
              <ArrowRight className="ml-1 h-3 w-3" />
            </a>
          ) : (
            <a href={formattedLink}>
              <span>Read</span>
              <ArrowRight className="ml-1 h-3 w-3" />
            </a>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
