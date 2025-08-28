import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { SkillCard } from './ui/skill-card';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  TrendingUp,
  Clock,
  Star,
  Users,
  ArrowLeft,
  ChevronDown
} from 'lucide-react';

interface ExplorePageProps {
  onNavigate: (page: string) => void;
  user?: any;
  onLogout: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function ExplorePage({ onNavigate }: ExplorePageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('trending');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'All', 'Programming', 'Design', 'Business', 'Languages', 'Music', 'Fitness', 'Cooking'
  ];

  const skills = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      instructor: 'Alex Rodriguez',
      rating: 4.9,
      price: 50,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      category: 'Programming',
      students: 245,
      duration: '2 hours'
    },
    {
      id: 2,
      title: 'Digital Marketing Strategy',
      instructor: 'Emma Watson',
      rating: 4.8,
      price: 35,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      category: 'Business',
      students: 189,
      duration: '1.5 hours'
    },
    {
      id: 3,
      title: 'Graphic Design Fundamentals',
      instructor: 'David Kim',
      rating: 4.7,
      price: 40,
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=250&fit=crop',
      category: 'Design',
      students: 312,
      duration: '3 hours'
    },
    {
      id: 4,
      title: 'Spanish Conversation',
      instructor: 'Maria Garcia',
      rating: 4.9,
      price: 25,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
      category: 'Languages',
      students: 156,
      duration: '1 hour'
    },
    {
      id: 5,
      title: 'Piano for Beginners',
      instructor: 'John Smith',
      rating: 4.6,
      price: 30,
      image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=250&fit=crop',
      category: 'Music',
      students: 98,
      duration: '45 minutes'
    },
    {
      id: 6,
      title: 'Yoga & Mindfulness',
      instructor: 'Sarah Johnson',
      rating: 4.8,
      price: 20,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop',
      category: 'Fitness',
      students: 267,
      duration: '1 hour'
    }
  ];

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedSkills = [...filteredSkills].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'popular':
        return b.students - a.students;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated grid background */}
      <div className="grid-background" />

      {/* Header */}
      <header className="glass-nav border-b border-white/20 dark:border-slate-700/50 p-4 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Explore Skills
            </h1>
            <p className="text-sm text-muted-foreground">
              Discover amazing skills from talented people worldwide
            </p>
          </div>
        </div>
      </header>

      <div className="p-4 md:p-6">
        {/* Search and Filter Bar */}
        <Card className="glass-card border-white/20 dark:border-slate-700/50 mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search skills, instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glass-card border-white/30 dark:border-slate-600/30"
                />
              </div>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="glass-card border-white/30 dark:border-slate-600/30"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
            </div>

            {/* Filter Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-white/20 dark:border-slate-600/20 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Categories */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">Category</label>
                        <div className="flex flex-wrap gap-2">
                          {categories.map((category) => (
                            <Badge
                              key={category}
                              variant={selectedCategory === category ? 'default' : 'outline'}
                              className={`cursor-pointer transition-all hover:scale-105 ${
                                selectedCategory === category
                                  ? 'bg-skillswap-primary text-white'
                                  : 'glass-card border-white/30 dark:border-slate-600/30'
                              }`}
                              onClick={() => setSelectedCategory(category)}
                            >
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Sort By */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">Sort by</label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { value: 'trending', label: 'Trending' },
                            { value: 'rating', label: 'Top Rated' },
                            { value: 'popular', label: 'Most Popular' },
                            { value: 'price-low', label: 'Price: Low to High' },
                            { value: 'price-high', label: 'Price: High to Low' }
                          ].map((option) => (
                            <Badge
                              key={option.value}
                              variant={sortBy === option.value ? 'default' : 'outline'}
                              className={`cursor-pointer transition-all hover:scale-105 ${
                                sortBy === option.value
                                  ? 'bg-skillswap-accent text-white'
                                  : 'glass-card border-white/30 dark:border-slate-600/30'
                              }`}
                              onClick={() => setSortBy(option.value)}
                            >
                              {option.label}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-sm">
              Showing {sortedSkills.length} of {skills.length} skills
            </span>
            {selectedCategory !== 'All' && (
              <Badge variant="outline" className="text-xs">
                {selectedCategory}
              </Badge>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Trending
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              Top Rated
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              Popular
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {sortedSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                  type: 'spring',
                  damping: 25,
                  stiffness: 200
                }}
              >
                <SkillCard
                  {...skill}
                  onExplore={() => onNavigate('booking')}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {sortedSkills.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No skills found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters to find more skills.
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSortBy('trending');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Load More */}
        {sortedSkills.length > 0 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="lg"
              className="glass-card border-white/30 dark:border-slate-600/30"
            >
              Load More Skills
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}