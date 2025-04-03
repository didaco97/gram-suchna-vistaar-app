
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface SchemeSearchProps {
  onSearch: (query: string, filters: { category: string; sortBy: string }) => void;
}

const SchemeSearch: React.FC<SchemeSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, { category, sortBy });
  };

  return (
    <div className="mb-8 rounded-lg border bg-card p-6 shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Search for schemes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full md:w-1/3">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="agriculture">Agriculture</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="education">Education</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="bg-gramsuchna-green hover:bg-gramsuchna-green/90">
            <Search className="mr-2 h-4 w-4" />
            Search Schemes
          </Button>
        </div>
        
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Sort by:</span>
          </div>
          <RadioGroup 
            value={sortBy} 
            onValueChange={setSortBy}
            className="mt-2 flex flex-wrap gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="relevance" id="relevance" />
              <Label htmlFor="relevance">Relevance</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="latest" id="latest" />
              <Label htmlFor="latest">Latest</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="deadline" id="deadline" />
              <Label htmlFor="deadline">Deadline</Label>
            </div>
          </RadioGroup>
        </div>
      </form>
    </div>
  );
};

export default SchemeSearch;
