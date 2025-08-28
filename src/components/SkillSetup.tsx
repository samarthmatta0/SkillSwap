import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { ArrowLeft, ArrowRight, Plus, X, Lightbulb, Target, CheckCircle, AlertCircle, Loader2, Upload } from 'lucide-react';
import { skillSwapAPI, handleAPIError } from '../utils/api';
import { Footer } from './ui/footer';

interface SkillSetupProps {
  onNavigate: (page: string) => void;
}

const SkillSetup: React.FC<SkillSetupProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [skills, setSkills] = useState([{ id: Date.now(), name: '', category: '', level: '', description: '', tags: [], proof: null }]);
  const [interests, setInterests] = useState([]);
  const [currentInterest, setCurrentInterest] = useState({ name: '', category: '', level: '', description: '' });
  const [currentTag, setCurrentTag] = useState('');
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = [
    'Technology & Programming',
    'Design & Creative', 
    'Business & Marketing',
    'Languages',
    'Music & Arts',
    'Health & Fitness',
    'Cooking & Food',
    'Crafts & DIY',
    'Education & Tutoring',
    'Other'
  ];

  const addSkill = () => {
    setSkills([...skills, {
      id: Date.now(),
      name: '',
      category: '',
      level: '',
      description: '',
      tags: [],
      proof: null
    }]);
  };

  const addInterest = () => {
    if (!currentInterest.name || !currentInterest.category || !currentInterest.level) {
      return;
    }

    setInterests([...interests, {
      id: Date.now(),
      ...currentInterest
    }]);

    // Reset form
    setCurrentInterest({ name: '', category: '', level: '', description: '' });
  };

  const updateSkill = (id: number, field: string, value: any) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const removeSkill = (id: number) => {
    if (skills.length > 1) {
      setSkills(skills.filter(skill => skill.id !== id));
    }
  };

  const removeInterest = (index: number) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  const addTag = (skillId: number) => {
    if (currentTag.trim()) {
      const skill = skills.find(s => s.id === skillId);
      if (skill) {
        updateSkill(skillId, 'tags', [...skill.tags, currentTag.trim()]);
        setCurrentTag('');
      }
    }
  };

  const removeTag = (skillId: number, tagIndex: number) => {
    const skill = skills.find(s => s.id === skillId);
    if (skill) {
      updateSkill(skillId, 'tags', skill.tags.filter((_, i) => i !== tagIndex));
    }
  };

  // Handle final submission
  const handleCompleteSetup = async () => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Prepare skills data for backend
      const skillsData = {
        skills: skills
          .filter(skill => skill.name && skill.category && skill.level)
          .map(skill => ({
            name: skill.name,
            category: skill.category,
            level: skill.level,
            description: skill.description
          })),
        interests: interests.map(interest => ({
          name: interest.name,
          category: interest.category,
          level: interest.level,
          description: interest.description
        }))
      };

      // Call backend API to save skills
      const result = await skillSwapAPI.updateSkills(skillsData);

      if (result.success) {
        setSuccess('Skills and interests saved successfully!');
        
        // Navigate to dashboard after successful setup
        setTimeout(() => {
          onNavigate('dashboard');
        }, 1500);
      }

    } catch (error) {
      setError(handleAPIError(error, 'Failed to save skills and interests'));
    } finally {
      setIsLoading(false);
    }
  };

  const goodExamples = {
    offered: {
      title: "React Development",
      description: "I can teach React fundamentals, hooks, state management with Redux, and building responsive web applications. I have 4 years of professional experience and have built 10+ production apps.",
      category: "Technology & Programming",
      tags: ["React", "JavaScript", "Redux", "Frontend"],
      experienceLevel: "Advanced (5+ years)"
    },
    wanted: {
      title: "Spanish Conversation",
      description: "Looking to practice conversational Spanish with a native speaker. I'm intermediate level and want to improve fluency for travel and work.",
      category: "Languages",
      tags: ["Spanish", "Conversation", "Intermediate"]
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => onNavigate('onboarding')}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-lg font-semibold">Skill Setup</h1>
            </div>
            <Badge variant="secondary">Step {currentStep} of 2</Badge>
          </div>
          <Progress value={(currentStep / 2) * 100} className="h-2" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    Skills I Can Offer
                    <Lightbulb className="w-5 h-5 ml-2 text-yellow-500" />
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Add skills you can teach others. Be specific about your experience level and what you can cover.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {skills.map((skill, index) => (
                    <div key={skill.id} className="space-y-4 p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Skill {index + 1}</h4>
                        {skills.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSkill(skill.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Skill Title *</Label>
                          <Input
                            placeholder="e.g., React Development"
                            value={skill.name}
                            onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Category *</Label>
                          <Select value={skill.category} onValueChange={(value) => updateSkill(skill.id, 'category', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>{category}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Experience Level *</Label>
                        <Select value={skill.level} onValueChange={(value) => updateSkill(skill.id, 'level', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner (0-1 years)</SelectItem>
                            <SelectItem value="Intermediate">Intermediate (2-5 years)</SelectItem>
                            <SelectItem value="Advanced">Advanced (5+ years)</SelectItem>
                            <SelectItem value="Expert">Expert (Professional/10+ years)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Description *</Label>
                        <Textarea
                          placeholder="Describe what you can teach, your experience, and what students will learn..."
                          value={skill.description}
                          onChange={(e) => updateSkill(skill.id, 'description', e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Tags (Optional)</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {skill.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="flex items-center gap-1">
                              {tag}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTag(skill.id, tagIndex)}
                                className="h-4 w-4 p-0 hover:bg-red-100"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a tag..."
                            value={currentTag}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addTag(skill.id)}
                          />
                          <Button variant="outline" onClick={() => addTag(skill.id)}>
                            Add
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Proof of Skills (Optional)</Label>
                        <div 
                          className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer"
                          onClick={() => updateSkill(skill.id, 'proof', 'uploaded')}
                        >
                          {skill.proof ? (
                            <div className="flex items-center justify-center space-x-2 text-green-600">
                              <CheckCircle className="w-5 h-5" />
                              <span>File uploaded</span>
                            </div>
                          ) : (
                            <div>
                              <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">
                                Upload certificates, portfolio, or work samples
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" onClick={addSkill} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Skill
                  </Button>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => onNavigate('onboarding')}>
                      Back
                    </Button>
                    <Button onClick={() => setCurrentStep(2)} className="skillswap-gradient text-white">
                      Next: Learning Interests
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-skillswap-primary" />
                    Learning Interests
                  </CardTitle>
                  <CardDescription>
                    What skills would you like to learn from others?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Error/Success Messages */}
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="bg-skillswap-success/10 border-skillswap-success/20">
                      <CheckCircle className="h-4 w-4 text-skillswap-success" />
                      <AlertDescription className="text-skillswap-success">{success}</AlertDescription>
                    </Alert>
                  )}

                  {/* Interest input form */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="interest-name">Skill Name</Label>
                        <Input
                          id="interest-name"
                          placeholder="e.g., Digital Photography"
                          value={currentInterest.name}
                          onChange={(e) => setCurrentInterest(prev => ({ ...prev, name: e.target.value }))}
                          disabled={isLoading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="interest-category">Category</Label>
                        <Select
                          value={currentInterest.category}
                          onValueChange={(value) => setCurrentInterest(prev => ({ ...prev, category: value }))}
                          disabled={isLoading}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interest-level">Desired Learning Level</Label>
                      <Select
                        value={currentInterest.level}
                        onValueChange={(value) => setCurrentInterest(prev => ({ ...prev, level: value }))}
                        disabled={isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="How deep do you want to learn?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner - Learn the basics</SelectItem>
                          <SelectItem value="Intermediate">Intermediate - Build on basics</SelectItem>
                          <SelectItem value="Advanced">Advanced - Master the skill</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interest-description">Why are you interested? (Optional)</Label>
                      <Textarea
                        id="interest-description"
                        placeholder="What draws you to this skill? What do you hope to achieve?"
                        value={currentInterest.description}
                        onChange={(e) => setCurrentInterest(prev => ({ ...prev, description: e.target.value }))}
                        disabled={isLoading}
                      />
                    </div>

                    <Button 
                      onClick={addInterest} 
                      className="w-full"
                      disabled={!currentInterest.name || !currentInterest.category || !currentInterest.level || isLoading}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Learning Interest
                    </Button>
                  </div>

                  {/* Current interests list */}
                  {interests.length > 0 && (
                    <div className="space-y-3">
                      <Label>Your Learning Interests ({interests.length})</Label>
                      <div className="grid gap-3">
                        {interests.map((interest, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">{interest.name}</span>
                                <Badge variant="outline" className="text-xs">
                                  {interest.category}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {interest.level}
                                </Badge>
                              </div>
                              {interest.description && (
                                <p className="text-sm text-muted-foreground">{interest.description}</p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeInterest(index)}
                              disabled={isLoading}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)} disabled={isLoading}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button 
                    onClick={handleCompleteSetup}
                    className="skillswap-gradient text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        Complete Setup
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          {/* Sidebar with Examples */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Good Example
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentStep === 1 ? (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Title</Label>
                      <p className="text-sm text-muted-foreground">{goodExamples.offered.title}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Category</Label>
                      <p className="text-sm text-muted-foreground">{goodExamples.offered.category}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Experience</Label>
                      <p className="text-sm text-muted-foreground">{goodExamples.offered.experienceLevel}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Description</Label>
                      <p className="text-sm text-muted-foreground">{goodExamples.offered.description}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Tags</Label>
                      <div className="flex flex-wrap gap-1">
                        {goodExamples.offered.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Title</Label>
                      <p className="text-sm text-muted-foreground">{goodExamples.wanted.title}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Category</Label>
                      <p className="text-sm text-muted-foreground">{goodExamples.wanted.category}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Description</Label>
                      <p className="text-sm text-muted-foreground">{goodExamples.wanted.description}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Tags</Label>
                      <div className="flex flex-wrap gap-1">
                        {goodExamples.wanted.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    {currentStep === 1 
                      ? "Be specific about what you can teach and your experience level. This helps students know what to expect."
                      : "Describe your current level and what you hope to achieve. This helps teachers understand how to help you best."
                    }
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default SkillSetup;