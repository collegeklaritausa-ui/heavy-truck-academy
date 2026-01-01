import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Building2,
  Search,
  Filter,
  ExternalLink,
  Bookmark,
  Globe,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

// Sample job data
const sampleJobs = [
  {
    id: 1,
    titleEn: "Senior Diesel Mechanic",
    company: "TransCorp Logistics",
    location: "Berlin, Germany",
    country: "Germany",
    region: "europe",
    salaryMin: 55000,
    salaryMax: 75000,
    salaryCurrency: "EUR",
    employmentType: "full_time",
    experienceLevel: "senior",
    descriptionEn: "Looking for an experienced diesel mechanic to join our fleet maintenance team. Must have 5+ years experience with heavy-duty trucks.",
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    sourceType: "scraped",
    scrapedFrom: "Indeed",
  },
  {
    id: 2,
    titleEn: "Fleet Maintenance Manager",
    company: "EuroTruck Services",
    location: "Paris, France",
    country: "France",
    region: "europe",
    salaryMin: 70000,
    salaryMax: 90000,
    salaryCurrency: "EUR",
    employmentType: "full_time",
    experienceLevel: "executive",
    descriptionEn: "Lead our maintenance operations across multiple locations. Requires management experience and technical expertise.",
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    sourceType: "manual",
  },
  {
    id: 3,
    titleEn: "Heavy Equipment Technician",
    company: "American Trucking Co.",
    location: "Dallas, TX, USA",
    country: "USA",
    region: "north_america",
    salaryMin: 60000,
    salaryMax: 80000,
    salaryCurrency: "USD",
    employmentType: "full_time",
    experienceLevel: "mid",
    descriptionEn: "Service and repair heavy equipment including semi-trucks, trailers, and construction vehicles.",
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    sourceType: "scraped",
    scrapedFrom: "LinkedIn",
  },
  {
    id: 4,
    titleEn: "Apprentice Truck Mechanic",
    company: "Nordic Transport",
    location: "Stockholm, Sweden",
    country: "Sweden",
    region: "europe",
    salaryMin: 35000,
    salaryMax: 45000,
    salaryCurrency: "EUR",
    employmentType: "full_time",
    experienceLevel: "entry",
    descriptionEn: "Great opportunity for those starting their career in heavy vehicle maintenance. Training provided.",
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    sourceType: "manual",
  },
  {
    id: 5,
    titleEn: "Mobile Service Technician",
    company: "RoadSide Repairs Inc.",
    location: "Toronto, Canada",
    country: "Canada",
    region: "north_america",
    salaryMin: 55000,
    salaryMax: 70000,
    salaryCurrency: "CAD",
    employmentType: "full_time",
    experienceLevel: "mid",
    descriptionEn: "Provide on-site repair services for commercial vehicles. Company vehicle and tools provided.",
    postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    sourceType: "scraped",
    scrapedFrom: "Monster",
  },
  {
    id: 6,
    titleEn: "Electric Vehicle Specialist",
    company: "GreenFleet Solutions",
    location: "Amsterdam, Netherlands",
    country: "Netherlands",
    region: "europe",
    salaryMin: 65000,
    salaryMax: 85000,
    salaryCurrency: "EUR",
    employmentType: "full_time",
    experienceLevel: "senior",
    descriptionEn: "Specialize in electric and hybrid commercial vehicle maintenance. Certification in EV systems required.",
    postedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    sourceType: "manual",
  },
];

export default function Jobs() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const filteredJobs = sampleJobs.filter((job) => {
    const matchesSearch = job.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === "all" || job.region === selectedRegion;
    const matchesType = selectedType === "all" || job.employmentType === selectedType;
    const matchesLevel = selectedLevel === "all" || job.experienceLevel === selectedLevel;
    return matchesSearch && matchesRegion && matchesType && matchesLevel;
  });

  const formatSalary = (min: number, max: number, currency: string) => {
    const formatter = new Intl.NumberFormat('en-US', { notation: 'compact' });
    return `${currency} ${formatter.format(min)} - ${formatter.format(max)}`;
  };

  const formatDate = (date: Date) => {
    const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  const getTypeBadge = (type: string) => {
    const labels: Record<string, string> = {
      full_time: t.jobs.fullTime,
      part_time: t.jobs.partTime,
      contract: t.jobs.contract,
      temporary: t.jobs.temporary,
    };
    return labels[type] || type;
  };

  const getLevelBadge = (level: string) => {
    const labels: Record<string, string> = {
      entry: t.jobs.entry,
      mid: t.jobs.mid,
      senior: t.jobs.senior,
      executive: t.jobs.executive,
    };
    return labels[level] || level;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 hero-gradient">
        <div className="container">
          <div className="max-w-3xl">
            <Badge className="badge-accent mb-4">
              <Briefcase className="h-3 w-3 me-1" />
              {t.jobs.title}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t.jobs.subtitle}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Browse thousands of job opportunities aggregated from top job boards across Europe and North America.
            </p>
            
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder={t.jobs.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ps-10 bg-card/50"
                />
              </div>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-full sm:w-48 bg-card/50">
                  <Globe className="h-4 w-4 me-2" />
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="europe">{t.licenses.europe}</SelectItem>
                  <SelectItem value="north_america">{t.licenses.northAmerica}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-b border-border/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "15,000+", label: "Active Jobs" },
              { value: "500+", label: "Companies" },
              { value: "30+", label: "Countries" },
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
            {/* Sidebar Filters */}
            <aside className="lg:w-64 shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Employment Type */}
                <div>
                  <h3 className="font-semibold mb-3">{t.jobs.type}</h3>
                  <div className="space-y-1">
                    {[
                      { value: "all", label: t.common.all },
                      { value: "full_time", label: t.jobs.fullTime },
                      { value: "part_time", label: t.jobs.partTime },
                      { value: "contract", label: t.jobs.contract },
                      { value: "temporary", label: t.jobs.temporary },
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

                {/* Experience Level */}
                <div>
                  <h3 className="font-semibold mb-3">{t.jobs.experience}</h3>
                  <div className="space-y-1">
                    {[
                      { value: "all", label: t.common.all },
                      { value: "entry", label: t.jobs.entry },
                      { value: "mid", label: t.jobs.mid },
                      { value: "senior", label: t.jobs.senior },
                      { value: "executive", label: t.jobs.executive },
                    ].map((level) => (
                      <button
                        key={level.value}
                        onClick={() => setSelectedLevel(level.value)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedLevel === level.value
                            ? "bg-accent/10 text-accent"
                            : "hover:bg-muted"
                        }`}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scraping Info */}
                <Card className="bg-accent/5 border-accent/20">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-accent" />
                      <span className="font-medium text-sm">{t.jobs.scrapedJobs}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Jobs are automatically aggregated from Indeed, LinkedIn, Monster, and more.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Job Listings */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredJobs.length} jobs
                </p>
              </div>

              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <Card key={job.id} className="card-hover bg-card/50 border-border/50">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {job.sourceType === "scraped" && (
                              <Badge variant="outline" className="text-xs">
                                <Globe className="h-3 w-3 me-1" />
                                {job.scrapedFrom}
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {getTypeBadge(job.employmentType)}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {getLevelBadge(job.experienceLevel)}
                            </Badge>
                          </div>
                          
                          <h3 className="text-xl font-semibold mb-1">{job.titleEn}</h3>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Building2 className="h-4 w-4" />
                              {job.company}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
                            </span>
                          </div>
                          
                          <p className="text-muted-foreground line-clamp-2">
                            {job.descriptionEn}
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {formatDate(job.postedAt)}
                          </span>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Bookmark className="h-4 w-4" />
                            </Button>
                            <Button className="gradient-accent">
                              {t.jobs.apply}
                              <ExternalLink className="ms-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredJobs.length === 0 && (
                <div className="text-center py-16">
                  <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
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
