
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { User, Bell, Settings, LogOut, Save, Bookmark } from 'lucide-react';

const Profile = () => {
  const { toast } = useToast();
  
  // Mock user data - in a real app, this would come from authentication context
  const [userData, setUserData] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "9876543210",
    village: "Chandpur",
    district: "Varanasi",
    state: "Uttar Pradesh"
  });
  
  const [notifications, setNotifications] = useState({
    schemes: true,
    news: true,
    updates: false,
    email: true,
    sms: false
  });
  
  const savedSchemes = [
    { id: 1, title: "PM Kisan Samman Nidhi", category: "Agriculture" },
    { id: 2, title: "Ayushman Bharat Yojana", category: "Healthcare" },
    { id: 3, title: "PM Poshan", category: "Education" }
  ];

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully",
    });
  };

  const handleNotificationUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notification Preferences Updated",
      description: "Your notification preferences have been updated successfully",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    // In a real app, this would clear authentication state and redirect to login
  };

  return (
    <div className="app-container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gramsuchna-brown">User Profile</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[250px_1fr]">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="mb-4 rounded-full bg-gramsuchna-cream p-4">
                  <User className="h-12 w-12 text-gramsuchna-green" />
                </div>
                <h2 className="text-xl font-semibold text-gramsuchna-brown">{userData.name}</h2>
                <p className="text-sm text-muted-foreground">{userData.village}, {userData.district}</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              <span>Personal Information</span>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Bookmark className="mr-2 h-4 w-4" />
              <span>Saved Schemes</span>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Button>
            <Separator className="my-4" />
            <Button variant="outline" className="w-full justify-start text-destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
        
        <div>
          <Tabs defaultValue="personal">
            <TabsList className="mb-6">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="saved">Saved Schemes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <form onSubmit={handleProfileUpdate}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={userData.name} 
                          onChange={(e) => setUserData({...userData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={userData.email} 
                          onChange={(e) => setUserData({...userData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          value={userData.phone} 
                          onChange={(e) => setUserData({...userData, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="village">Village/Town</Label>
                        <Input 
                          id="village" 
                          value={userData.village} 
                          onChange={(e) => setUserData({...userData, village: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="district">District</Label>
                        <Input 
                          id="district" 
                          value={userData.district} 
                          onChange={(e) => setUserData({...userData, district: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input 
                          id="state" 
                          value={userData.state} 
                          onChange={(e) => setUserData({...userData, state: e.target.value})}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="bg-gramsuchna-green hover:bg-gramsuchna-green/90">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <form onSubmit={handleNotificationUpdate}>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">What to notify</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="notifySchemes" className="text-base">New Schemes</Label>
                          <p className="text-sm text-muted-foreground">Get notified about new government schemes</p>
                        </div>
                        <input 
                          type="checkbox" 
                          id="notifySchemes" 
                          className="h-4 w-4" 
                          checked={notifications.schemes} 
                          onChange={(e) => setNotifications({...notifications, schemes: e.target.checked})}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="notifyNews" className="text-base">Local News</Label>
                          <p className="text-sm text-muted-foreground">Get notified about important local news</p>
                        </div>
                        <input 
                          type="checkbox" 
                          id="notifyNews" 
                          className="h-4 w-4" 
                          checked={notifications.news} 
                          onChange={(e) => setNotifications({...notifications, news: e.target.checked})}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="notifyUpdates" className="text-base">Application Updates</Label>
                          <p className="text-sm text-muted-foreground">Get notified about app updates and improvements</p>
                        </div>
                        <input 
                          type="checkbox" 
                          id="notifyUpdates" 
                          className="h-4 w-4" 
                          checked={notifications.updates} 
                          onChange={(e) => setNotifications({...notifications, updates: e.target.checked})}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">How to notify</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="notifyEmail" className="text-base">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <input 
                          type="checkbox" 
                          id="notifyEmail" 
                          className="h-4 w-4" 
                          checked={notifications.email} 
                          onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="notifySMS" className="text-base">SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                        </div>
                        <input 
                          type="checkbox" 
                          id="notifySMS" 
                          className="h-4 w-4" 
                          checked={notifications.sms} 
                          onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="bg-gramsuchna-green hover:bg-gramsuchna-green/90">
                      <Save className="mr-2 h-4 w-4" />
                      Save Preferences
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="saved" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Schemes</CardTitle>
                  <CardDescription>Schemes you've saved for quick reference</CardDescription>
                </CardHeader>
                <CardContent>
                  {savedSchemes.length > 0 ? (
                    <div className="space-y-4">
                      {savedSchemes.map((scheme) => (
                        <div key={scheme.id} className="flex items-center justify-between rounded-lg border p-4">
                          <div>
                            <h3 className="font-medium">{scheme.title}</h3>
                            <p className="text-sm text-muted-foreground">{scheme.category}</p>
                          </div>
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Bookmark className="mb-4 h-12 w-12 text-muted-foreground" />
                      <h3 className="mb-2 text-lg font-medium">No saved schemes</h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        You haven't saved any schemes yet. Browse schemes and click the bookmark icon to save them for later.
                      </p>
                      <Button>Browse Schemes</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
