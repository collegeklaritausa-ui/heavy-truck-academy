import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GraduationCap,
  Clock,
  Users,
  Star,
  Search,
  Filter,
  BookOpen,
  Award,
  Play,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

// Sample course data
const sampleCourses = [
  {
    id: 1,
    titleEn: "Diesel Engine Fundamentals",
    descriptionEn: "Master the basics of diesel engine operation, maintenance, and troubleshooting for heavy-duty vehicles.",
    level: "beginner",
    durationHours: 40,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    enrolled: 1250,
    rating: 4.8,
    category: "Engine Systems",
  },
  {
    id: 2,
    titleEn: "Advanced Transmission Systems",
    descriptionEn: "Deep dive into automatic and manual transmission systems used in commercial trucks.",
    level: "advanced",
    durationHours: 60,
    imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400",
    enrolled: 890,
    rating: 4.9,
    category: "Drivetrain",
  },
  {
    id: 3,
    titleEn: "Electronic Control Units (ECU)",
    descriptionEn: "Learn to diagnose and repair electronic control systems in modern heavy-duty vehicles.",
    level: "intermediate",
    durationHours: 50,
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    enrolled: 720,
    rating: 4.7,
    category: "Electronics",
  },
  {
    id: 4,
    titleEn: "Hydraulic Systems Mastery",
    descriptionEn: "Comprehensive training on hydraulic systems found in trucks, trailers, and heavy equipment.",
    level: "intermediate",
    durationHours: 45,
    imageUrl: "https://images.unsplash.com/photo-1504222490345-c075b6008014?w=400",
    enrolled: 650,
    rating: 4.6,
    category: "Hydraulics",
  },
  {
    id: 5,
    titleEn: "Air Brake Systems",
    descriptionEn: "Essential training on air brake systems, inspection, maintenance, and DOT compliance.",
    level: "beginner",
    durationHours: 30,
    imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
    enrolled: 1580,
    rating: 4.9,
    category: "Braking Systems",
  },
  {
    id: 6,
    titleEn: "Electric & Hybrid Truck Technology",
    descriptionEn: "Future-proof your skills with training on electric and hybrid commercial vehicles.",
    level: "expert",
    durationHours: 80,
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400",
    enrolled: 420,
    rating: 4.8,
    category: "Alternative Propulsion",
  },
];

const categories = [
  "All Categories",
  "Engine Systems",
  "Drivetrain",
  "Electronics",
  "Hydraulics",
  "Braking Systems",
  "Alternative Propulsion",
];

export default function Academy() {
  const { t, getLocalized } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const filteredCourses = sampleCourses.filter((course) => {
    const matchesSearch = course.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getLevelBadge = (level: string) => {
    const colors: Record<string, string> = {
      beginner: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      intermediate: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      advanced: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      expert: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    };
    return colors[level] || colors.beginner;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 hero-gradient">
        <div className="container">
          <div className="max-w-3xl">
            <Badge className="badge-primary mb-4">
              <GraduationCap className="h-3 w-3 me-1" />
              {t.academy.title}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t.academy.subtitle}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Access industry-leading courses, earn certifications, and advance your career in heavy-duty vehicle mechanics.
            </p>
            
            {/* Search Bar */}
            <div className="flex gap-4 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ps-10 bg-card/50"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-b border-border/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "2,500+", label: "Courses Available" },
              { value: "50K+", label: "Students Enrolled" },
              { value: "98%", label: "Completion Rate" },
              { value: "4.8", label: "Average Rating" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === category
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Level Filter */}
                <div>
                  <h3 className="font-semibold mb-3">Skill Level</h3>
                  <div className="space-y-1">
                    {[
                      { value: "all", label: "All Levels" },
                      { value: "beginner", label: t.academy.beginner },
                      { value: "intermediate", label: t.academy.intermediate },
                      { value: "advanced", label: t.academy.advanced },
                      { value: "expert", label: t.academy.expert },
                    ].map((level) => (
                      <button
                        key={level.value}
                        onClick={() => setSelectedLevel(level.value)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedLevel === level.value
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted"
                        }`}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Course Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredCourses.length} courses
                </p>
                <Tabs defaultValue="grid" className="w-auto">
                  <TabsList className="bg-muted/50">
                    <TabsTrigger value="grid">Grid</TabsTrigger>
                    <TabsTrigger value="list">List</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="card-hover bg-card/50 border-border/50 overflow-hidden group">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={course.imageUrl}
                        alt={course.titleEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <Badge className={`absolute top-3 left-3 ${getLevelBadge(course.level)}`}>
                        {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                      </Badge>
                      <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
                          <Play className="h-6 w-6 text-primary-foreground ms-1" />
                        </div>
                      </button>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="text-xs text-muted-foreground mb-1">{course.category}</div>
                      <CardTitle className="text-lg line-clamp-2">{course.titleEn}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <CardDescription className="line-clamp-2">
                        {course.descriptionEn}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {course.durationHours}h
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {course.enrolled.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          {course.rating}
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className="text-center py-16">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No courses found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search query</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card/30">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-2xl glass">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center">
                <Award className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Get Certified Today</h3>
                <p className="text-muted-foreground">Earn industry-recognized certifications</p>
              </div>
            </div>
            <Button size="lg" className="gradient-primary">
              View Certifications
              <ChevronRight className="ms-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
