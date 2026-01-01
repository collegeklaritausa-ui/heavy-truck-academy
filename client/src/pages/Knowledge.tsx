import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Search,
  Wrench,
  Hammer,
  Settings,
  AlertTriangle,
  FileText,
  Eye,
  Clock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

// Sample knowledge articles
const sampleArticles = [
  {
    id: 1,
    titleEn: "Complete Diesel Engine Overhaul Guide",
    contentEn: "Step-by-step guide for performing a complete diesel engine overhaul on heavy-duty trucks...",
    articleType: "repair_guide",
    manufacturer: "Cummins",
    vehicleType: "Heavy Truck",
    viewCount: 15420,
    sourceType: "scraped",
    scrapedFrom: "TruckersReport",
    category: "Engine",
  },
  {
    id: 2,
    titleEn: "Fabricating Custom Exhaust Systems",
    contentEn: "Learn how to design and fabricate custom exhaust systems for commercial vehicles...",
    articleType: "fabrication",
    manufacturer: "Universal",
    vehicleType: "All",
    viewCount: 8930,
    sourceType: "manual",
    category: "Exhaust",
  },
  {
    id: 3,
    titleEn: "Air Brake System Maintenance Schedule",
    contentEn: "Comprehensive maintenance schedule for air brake systems to ensure DOT compliance...",
    articleType: "maintenance",
    manufacturer: "Bendix",
    vehicleType: "Semi-Truck",
    viewCount: 22150,
    sourceType: "scraped",
    scrapedFrom: "FleetOwner",
    category: "Brakes",
  },
  {
    id: 4,
    titleEn: "Troubleshooting DEF System Errors",
    contentEn: "Common DEF system error codes and their solutions for modern diesel trucks...",
    articleType: "troubleshooting",
    manufacturer: "Various",
    vehicleType: "Euro 6 Trucks",
    viewCount: 18760,
    sourceType: "scraped",
    scrapedFrom: "DieselHub",
    category: "Emissions",
  },
  {
    id: 5,
    titleEn: "Transmission Rebuild Procedures",
    contentEn: "Detailed procedures for rebuilding Eaton Fuller transmissions...",
    articleType: "repair_guide",
    manufacturer: "Eaton",
    vehicleType: "Heavy Truck",
    viewCount: 12340,
    sourceType: "manual",
    category: "Transmission",
  },
  {
    id: 6,
    titleEn: "Welding Techniques for Trailer Repair",
    contentEn: "Professional welding techniques for repairing trailer frames and components...",
    articleType: "fabrication",
    manufacturer: "Universal",
    vehicleType: "Trailer",
    viewCount: 9870,
    sourceType: "scraped",
    scrapedFrom: "WeldingWeb",
    category: "Structural",
  },
];

const categories = [
  { name: "All", icon: BookOpen },
  { name: "Engine", icon: Settings },
  { name: "Brakes", icon: AlertTriangle },
  { name: "Transmission", icon: Settings },
  { name: "Emissions", icon: Settings },
  { name: "Exhaust", icon: Settings },
  { name: "Structural", icon: Hammer },
];

export default function Knowledge() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("all");

  const filteredArticles = sampleArticles.filter((article) => {
    const matchesSearch = article.titleEn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesType = selectedType === "all" || article.articleType === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeIcon = (type: string) => {
    const icons: Record<string, typeof Wrench> = {
      repair_guide: Wrench,
      fabrication: Hammer,
      maintenance: Settings,
      troubleshooting: AlertTriangle,
      general: FileText,
    };
    return icons[type] || FileText;
  };

  const getTypeBadge = (type: string) => {
    const styles: Record<string, string> = {
      repair_guide: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      fabrication: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      maintenance: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      troubleshooting: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      general: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    };
    const labels: Record<string, string> = {
      repair_guide: t.knowledge.repairGuides,
      fabrication: t.knowledge.fabrication,
      maintenance: t.knowledge.maintenance,
      troubleshooting: t.knowledge.troubleshooting,
      general: t.knowledge.general,
    };
    return { style: styles[type] || styles.general, label: labels[type] || type };
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 hero-gradient">
        <div className="container">
          <div className="max-w-3xl">
            <Badge className="badge-accent mb-4">
              <BookOpen className="h-3 w-3 me-1" />
              {t.knowledge.title}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t.knowledge.subtitle}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Access thousands of repair guides, fabrication tutorials, and maintenance documentation aggregated from trusted sources.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={t.knowledge.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-10 bg-card/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-b border-border/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "25,000+", label: "Articles" },
              { value: "500+", label: "Repair Guides" },
              { value: "1,200+", label: "Tutorials" },
              { value: "Daily", label: "Updates" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-accent">{stat.value}</div>
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
            {/* Sidebar */}
            <aside className="lg:w-64 shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3">{t.knowledge.categories}</h3>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                          selectedCategory === cat.name
                            ? "bg-accent/10 text-accent"
                            : "hover:bg-muted"
                        }`}
                      >
                        <cat.icon className="h-4 w-4" />
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Article Type */}
                <div>
                  <h3 className="font-semibold mb-3">Article Type</h3>
                  <div className="space-y-1">
                    {[
                      { value: "all", label: t.common.all },
                      { value: "repair_guide", label: t.knowledge.repairGuides },
                      { value: "fabrication", label: t.knowledge.fabrication },
                      { value: "maintenance", label: t.knowledge.maintenance },
                      { value: "troubleshooting", label: t.knowledge.troubleshooting },
                    ].map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setSelectedType(type.value)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedType === type.value
                            ? "bg-accent/10 text-accent"
                            : "hover:bg-muted"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Articles Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredArticles.length} articles
                </p>
              </div>

              <div className="space-y-4">
                {filteredArticles.map((article) => {
                  const TypeIcon = getTypeIcon(article.articleType);
                  const typeBadge = getTypeBadge(article.articleType);
                  return (
                    <Card key={article.id} className="card-hover bg-card/50 border-border/50">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                            <TypeIcon className="h-6 w-6 text-accent" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={typeBadge.style}>{typeBadge.label}</Badge>
                              {article.sourceType === "scraped" && (
                                <Badge variant="outline" className="text-xs">
                                  <ExternalLink className="h-3 w-3 me-1" />
                                  {article.scrapedFrom}
                                </Badge>
                              )}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{article.titleEn}</h3>
                            <p className="text-muted-foreground mb-4">{article.contentEn}</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <span>{article.manufacturer}</span>
                              <span>•</span>
                              <span>{article.vehicleType}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {article.viewCount.toLocaleString()} views
                              </span>
                            </div>
                          </div>
                          <Button variant="ghost" className="shrink-0">
                            {t.knowledge.readMore}
                            <ArrowRight className="ms-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-16">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{t.common.noResults}</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search query</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
