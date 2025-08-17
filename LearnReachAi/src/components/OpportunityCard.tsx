import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, DollarSign, Users } from 'lucide-react';

interface OpportunityCardProps {
  title: string;
  company: string;
  location: string;
  type: 'remote' | 'hybrid' | 'onsite';
  category: 'job' | 'internship' | 'scholarship' | 'research' | 'conference' | 'volunteer';
  salary?: string;
  deadline?: string;
  rating: number;
  description: string;
  tags: string[];
  image?: string;
}

export const OpportunityCard = ({
  title,
  company,
  location: _location,
  type,
  category,
  salary,
  deadline,
  rating,
  description,
  tags,
  image
}: OpportunityCardProps) => {
  const categoryColors = {
    job: 'bg-primary text-primary-foreground',
    internship: 'bg-secondary text-secondary-foreground',
    scholarship: 'bg-accent text-accent-foreground',
    research: 'bg-gradient-to-r from-primary to-accent text-primary-foreground',
    conference: 'bg-gradient-to-r from-secondary to-secondary-glow text-secondary-foreground',
    volunteer: 'bg-success text-success-foreground'
  };

  const typeColors = {
    remote: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    hybrid: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    onsite: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
  };

  return (
    <div className="card-3d p-6 group hover:shadow-float transition-all duration-300" data-location={_location}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={categoryColors[category]} variant="secondary">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
            <Badge className={typeColors[type]} variant="outline">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Badge>
          </div>
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-foreground font-medium mt-1">{company}</p>
        </div>
        {image && (
          <img 
            src={image} 
            alt={company}
            className="w-12 h-12 rounded-lg object-cover ml-4"
          />
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center mb-3">
        <div className="star-rating">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`star w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground ml-1">({rating})</span>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        {salary && (
          <div className="flex items-center text-sm">
            <DollarSign className="w-4 h-4 mr-2 text-success" />
            <span className="font-medium text-success">{salary}</span>
          </div>
        )}
        {deadline && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            <span>Deadline: {deadline}</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.slice(0, 3).map((tag, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
        {tags.length > 3 && (
          <Badge variant="outline" className="text-xs">
            +{tags.length - 3} more
          </Badge>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button className="flex-1 btn-hero text-sm py-2">
          View Details
        </Button>
        <Button variant="outline" size="sm" className="px-4">
          <Users className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};