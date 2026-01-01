import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  BookOpen,
  Briefcase,
  ShoppingCart,
  Globe,
  TrendingUp,
  Activity,
  Database,
  Settings,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  School,
} from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";

// Dashboard stats (would come from API)
const dashboardStats = [
  { title: "Total Users", value: "52,847", change: "+12%", icon: Users, color: "text-blue-400" },
  { title: "Active Courses", value: "2,543", change: "+8%", icon: BookOpen, color: "text-emerald-400" },
  { title: "Job Listings", value: "15,234", change: "+23%", icon: Briefcase, color: "text-amber-400" },
  { title: "Marketplace Items", value: "8,567", change: "+15%", icon: ShoppingCart, color: "text-purple-400" },
];

const scrapingStatus = [
  { source: "Indeed Jobs", status: "active", lastRun: "2 min ago", itemsScraped: 1234 },
  { source: "LinkedIn Jobs", status: "active", lastRun: "5 min ago", itemsScraped: 892 },
  { source: "Monster Jobs", status: "active", lastRun: "8 min ago", itemsScraped: 567 },
  { source: "TruckersReport Forum", status: "active", lastRun: "15 min ago", itemsScraped: 2341 },
  { source: "FleetOwner Articles", status: "paused", lastRun: "1 hour ago", itemsScraped: 156 },
  { source: "Driving Schools DB", status: "active", lastRun: "30 min ago", itemsScraped: 3456 },
];

const recentActivity = [
  { action: "New user registered", time: "2 min ago", type: "user" },
  { action: "Job scraping completed (Indeed)", time: "5 min ago", type: "scrape" },
  { action: "New marketplace listing", time: "12 min ago", type: "listing" },
  { action: "Course enrollment", time: "18 min ago", type: "course" },
  { action: "Knowledge article scraped", time: "25 min ago", type: "scrape" },
];

export default function AdminDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect non-admin users
  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== "admin")) {
      setLocation("/");
    }
  }, [loading, isAuthenticated, user, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Active</Badge>;
    }
    return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Paused</Badge>;
  };

  const getActivityIcon = (type: string) => {
    const icons: Record<string, typeof Users> = {
      user: Users,
      scrape: Globe,
      listing: ShoppingCart,
      course: BookOpen,
    };
    return icons[type] || Activity;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your platform, monitor scraping jobs, and view analytics.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardStats.map((stat, i) => (
            <Card key={i} className="bg-card/50 border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-emerald-400">{stat.change} this month</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-muted/50 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="scraping" className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="scraping" className="gap-2">
              <Globe className="h-4 w-4" />
              Web Scraping
            </TabsTrigger>
            <TabsTrigger value="content" className="gap-2">
              <Database className="h-4 w-4" />
              Content Management
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <Activity className="h-4 w-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Scraping Tab */}
          <TabsContent value="scraping" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Web Scraping Status</h2>
                <p className="text-sm text-muted-foreground">
                  Monitor and manage automated data collection jobs
                </p>
              </div>
              <Button className="gradient-primary">
                <RefreshCw className="me-2 h-4 w-4" />
                Run All Scrapers
              </Button>
            </div>

            <div className="grid gap-4">
              {scrapingStatus.map((scraper, i) => (
                <Card key={i} className="bg-card/50 border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Globe className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{scraper.source}</h3>
                          <p className="text-sm text-muted-foreground">
                            Last run: {scraper.lastRun}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">{scraper.itemsScraped.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">items scraped</p>
                        </div>
                        {getStatusBadge(scraper.status)}
                        <Button variant="outline" size="sm">
                          {scraper.status === "active" ? "Pause" : "Resume"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Courses", count: "2,543", icon: BookOpen, href: "/admin/courses" },
                { title: "Job Listings", count: "15,234", icon: Briefcase, href: "/admin/jobs" },
                { title: "Marketplace", count: "8,567", icon: ShoppingCart, href: "/admin/marketplace" },
                { title: "Knowledge Base", count: "25,123", icon: FileText, href: "/admin/knowledge" },
                { title: "License Guides", count: "156", icon: FileText, href: "/admin/licenses" },
                { title: "Driving Schools", count: "3,456", icon: School, href: "/admin/schools" },
              ].map((item, i) => (
                <Card key={i} className="bg-card/50 border-border/50 card-hover cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-2xl font-bold">{item.count}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-4">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions and events on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, i) => {
                    const Icon = getActivityIcon(activity.type);
                    return (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline">
                <Users className="me-2 h-4 w-4" />
                Manage Users
              </Button>
              <Button variant="outline">
                <Settings className="me-2 h-4 w-4" />
                System Settings
              </Button>
              <Button variant="outline">
                <Database className="me-2 h-4 w-4" />
                Database Backup
              </Button>
              <Button variant="outline">
                <TrendingUp className="me-2 h-4 w-4" />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
