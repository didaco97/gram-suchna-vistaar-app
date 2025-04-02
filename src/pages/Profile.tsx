
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { User, Bell, Settings, LogOut, Save, Bookmark } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

const Profile = () => {
  const { user, profile, signOut, setProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  // Profile form state
  const [userData, setUserData] = useState({
    full_name: profile?.full_name || '',
    age: profile?.age || '',
    category: profile?.category || '',
    village: profile?.village || '',
    district: profile?.district || '',
    state: profile?.state || ''
  });
  
  // Update local form state when profile data loads
  useEffect(() => {
    if (profile) {
      setUserData({
        full_name: profile.full_name || '',
        age: profile.age?.toString() || '',
        category: profile.category || '',
        village: profile.village || '',
        district: profile.district || '',
        state: profile.state || ''
      });
    }
  }, [profile]);
  
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

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      const updates = {
        id: user.id,
        full_name: userData.full_name,
        age: userData.age ? parseInt(userData.age as string) : null,
        category: userData.category,
        village: userData.village,
        district: userData.district,
        state: userData.state,
        updated_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('profiles')
        .upsert(updates);
        
      if (error) throw error;
      
      // Update local state
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "An error occurred while updating your profile",
        variant: "destructive"
      });
      console.error('Error updating profile:', error);
    }
  };

  const handleNotificationUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notification Preferences Updated",
      description: "Your notification preferences have been updated successfully",
    });
  };

  const handleLogout = async () => {
    await signOut();
  };

  if (!user) {
    return null; // or a loading spinner
  }

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
                <h2 className="text-xl font-semibold text-gramsuchna-brown">{profile?.full_name || user.email}</h2>
                <p className="text-sm text-muted-foreground">{profile?.village || 'Village'}, {profile?.district || 'District'}</p>
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
                          value={userData.full_name as string} 
                          onChange={(e) => setUserData({...userData, full_name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input 
                          id="age" 
                          type="number" 
                          value={userData.age as string} 
                          onChange={(e) => setUserData({...userData, age: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select 
                          value={userData.category as string} 
                          onValueChange={(value) => setUserData({...userData, category: value})}
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="General">General</SelectItem>
                            <SelectItem value="OBC">OBC</SelectItem>
                            <SelectItem value="SC">SC</SelectItem>
                            <SelectItem value="ST">ST</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="village">Village/Town</Label>
                        <Input 
                          id="village" 
                          value={userData.village as string} 
                          onChange={(e) => setUserData({...userData, village: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="district">District</Label>
                        <Input 
                          id="district" 
                          value={userData.district as string} 
                          onChange={(e) => setUserData({...userData, district: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input 
                          id="state" 
                          value={userData.state as string} 
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
