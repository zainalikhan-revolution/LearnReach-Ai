import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, X, Briefcase, GraduationCap } from 'lucide-react';
import { useState } from 'react';

export const SearchFilters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const [selectedType, setSelectedType] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const categories = [
    'All Categories',
    'Jobs',
    'Internships', 
    'Scholarships',
    'Research',
    'Conferences',
    'Volunteer Work',
    'Courses'
  ];


  const types = [
    'All Types',
    'Remote',
    'Hybrid',
    'On-site'
  ];

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  return (
    <div className="bg-background/95 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-card">
      {/* Main Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Search for opportunities, companies, or keywords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-4 py-4 text-lg border-2 focus:border-primary"
        />
        <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-hero px-6">
          Search
        </Button>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="h-12">
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Category" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category.toLowerCase().replace(' ', '-')}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>


        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="h-12">
            <div className="flex items-center">
              <GraduationCap className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Work Type" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" className="h-12 border-2 hover:border-primary">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Filters:</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'High Salary',
            'Fully Funded',
            'Entry Level',
            'PhD Programs',
            'Tech Jobs',
            'Remote Work',
            'Urgent Hiring',
            'No Experience Required'
          ].map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-3 py-1"
              onClick={() => {
                if (!activeFilters.includes(filter)) {
                  setActiveFilters([...activeFilters, filter]);
                }
              }}
            >
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="default"
              className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
              onClick={() => removeFilter(filter)}
            >
              {filter}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setActiveFilters([])}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};