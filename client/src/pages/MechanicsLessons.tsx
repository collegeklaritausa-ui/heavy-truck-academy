import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Clock, BarChart3, Users } from "lucide-react";

export default function MechanicsLessons() {
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<"beginner" | "intermediate" | "advanced" | "expert" | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  // Fetch lessons
  const { data: lessons, isLoading: lessonsLoading } = trpc.mechanics.getLessons.useQuery({
    search: searchTerm,
    difficulty: selectedDifficulty,
    category: selectedCategory,
    limit: 20,
  });

  const difficulties = ["beginner", "intermediate", "advanced", "expert"];
  const categories = [
    "Engine Fundamentals",
    "Diesel Engine Repair",
    "Brake Systems",
    "Transmission & Drivetrain",
    "Electrical Systems",
    "Suspension & Steering",
    "Cooling Systems",
    "Fuel Systems",
    "Emissions Control",
    "HVAC Systems",
    "Welding & Fabrication",
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/20 text-green-400";
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-400";
      case "advanced":
        return "bg-orange-500/20 text-orange-400";
      case "expert":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Mechanics Lessons</h1>
          <p className="text-lg text-muted-foreground">
            5000+ professional mechanics training videos and tutorials
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Search Lessons</label>
            <Input
              placeholder="Search mechanics lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Difficulty Level</label>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((diff) => (
                <Button
                  key={diff}
                  variant={selectedDifficulty === diff ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? undefined : (diff as "beginner" | "intermediate" | "advanced" | "expert"))}
                  className="capitalize"
                >
                  {diff}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(selectedCategory === cat ? undefined : cat)}
                  className="text-xs"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessonsLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="border-border bg-card hover:bg-card/80 transition-colors">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-32 w-full mb-4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))
          ) : lessons && lessons.length > 0 ? (
            lessons.map((lesson: any) => (
              <Card
                key={lesson.id}
                className="border-border bg-card hover:bg-card/80 transition-colors cursor-pointer group"
                onClick={() => navigate(`/mechanics-lessons/${lesson.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-lg line-clamp-2">{lesson.titleEn}</CardTitle>
                    <Badge className={getDifficultyColor(lesson.difficulty)} variant="secondary">
                      {lesson.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">{lesson.descriptionEn}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Thumbnail placeholder */}
                  <div className="relative w-full h-32 bg-muted rounded-lg flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                    <Play className="w-12 h-12 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>

                  {/* Lesson Info */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{lesson.durationMinutes} minutes</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BarChart3 className="w-4 h-4" />
                      <span>{lesson.manufacturer} {lesson.vehicleType}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{lesson.viewCount} views</span>
                    </div>
                  </div>

                  {/* Rating */}
                  {lesson.rating && (
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-yellow-400">★</span>
                      <span className="font-medium">{lesson.rating}</span>
                      <span className="text-muted-foreground">({lesson.ratingCount} reviews)</span>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white mt-4">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Lesson
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No lessons found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
