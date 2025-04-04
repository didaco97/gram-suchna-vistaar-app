
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface SchemeCardProps {
  title: string;
  description: string;
  category: string;
  deadline?: string;
  icon: React.ReactNode;
  link: string;
}

const SchemeCard: React.FC<SchemeCardProps> = ({ 
  title, 
  description, 
  category, 
  deadline, 
  icon,
  link 
}) => {
  const { t } = useLanguage();
  
  return (
    <Card className="scheme-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className="rounded-full bg-gramsuchna-cream p-2 text-gramsuchna-green">
              {icon}
            </div>
            <Badge variant="outline" className="bg-gramsuchna-lightGreen/10 text-gramsuchna-green">
              {category}
            </Badge>
          </div>
          {deadline && (
            <div className="text-xs text-muted-foreground">
              {t('deadline')}: <span className="font-medium text-gramsuchna-orange">{deadline}</span>
            </div>
          )}
        </div>
        <CardTitle className="text-xl text-gramsuchna-brown">{title}</CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-gray-600">
          {description}
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          className="w-full justify-between text-gramsuchna-green hover:bg-gramsuchna-cream hover:text-gramsuchna-green"
          asChild
        >
          <a href={link}>
            <span>{t('viewDetails')}</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SchemeCard;
