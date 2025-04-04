
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const handleNotificationClick = () => {
    toast({
      title: t('notifications'),
      description: t('noNotifications'),
    });
  };

  return (
    <nav className="border-b bg-white py-3 shadow-sm">
      <div className="app-container">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                  <div className="flex flex-col gap-4 py-4">
                    <Link to="/" className="text-lg font-semibold text-gramsuchna-green">
                      {t('nativeAppName')} ({t('appName')})
                    </Link>
                    <div className="flex flex-col space-y-3 pt-4">
                      <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gramsuchna-cream hover:text-gramsuchna-green">
                        {t('home')}
                      </Link>
                      <Link to="/agriculture" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gramsuchna-cream hover:text-gramsuchna-green">
                        {t('agriculture')}
                      </Link>
                      <Link to="/healthcare" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gramsuchna-cream hover:text-gramsuchna-green">
                        {t('healthcare')}
                      </Link>
                      <Link to="/education" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gramsuchna-cream hover:text-gramsuchna-green">
                        {t('education')}
                      </Link>
                      <Link to="/news" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gramsuchna-cream hover:text-gramsuchna-green">
                        {t('localNews')}
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gramsuchna-green">
                {isMobile ? "GS" : `${t('nativeAppName')} (${t('appName')})`}
              </span>
            </Link>
          </div>
          
          {!isMobile && (
            <div className="hidden md:flex md:items-center md:space-x-6">
              <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gramsuchna-green">
                {t('home')}
              </Link>
              <Link to="/agriculture" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gramsuchna-green">
                {t('agriculture')}
              </Link>
              <Link to="/healthcare" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gramsuchna-green">
                {t('healthcare')}
              </Link>
              <Link to="/education" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gramsuchna-green">
                {t('education')}
              </Link>
              <Link to="/news" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gramsuchna-green">
                {t('localNews')}
              </Link>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <LanguageSelector />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleNotificationClick}
              className="text-gray-600 hover:text-gramsuchna-green"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gramsuchna-green">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
