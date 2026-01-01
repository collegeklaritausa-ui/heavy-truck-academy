import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  School,
  Search,
  MapPin,
  Phone,
  Globe,
  Star,
  Clock,
  Users,
  CheckCircle,
  ExternalLink,
  DollarSign,
} from "lucide-react";
import { useState } from "react";

// Sample driving schools data - representing thousands of scraped schools
const sampleSchools = [
  {
    id: 1,
    nameEn: "Berlin Truck Academy",
    descriptionEn: "Premier CDL training facility in Germany with modern fleet and experienced instructors.",
    city: "Berlin",
    country: "Germany",
    region: "europe",
    address: "Industriestraße 45, 10115 Berlin",
    phone: "+49 30 1234567",
    website: "https://berlintruck.de",
    rating: 4.9,
    reviewCount: 234,
    servicesJson: ["CDL Training", "Hazmat", "Tanker", "Air Brakes"],
    priceRange: "€€€",
    verified: true,
    sourceType: "scraped",
  },
  {
    id: 2,
    nameEn: "Paris Commercial Driving School",
    descriptionEn: "Comprehensive training programs for all commercial vehicle categories.",
    city: "Paris",
    country: "France",
    region: "europe",
    address: "123 Avenue des Transporteurs, 75012 Paris",
    phone: "+33 1 23456789",
    website: "https://pariscdl.fr",
    rating: 4.7,
    reviewCount: 189,
    servicesJson: ["Permis C", "Permis CE", "FIMO", "FCO"],
    priceRange: "€€",
    verified: true,
    sourceType: "scraped",
  },
  {
    id: 3,
    nameEn: "Texas Trucking Institute",
    descriptionEn: "State-certified CDL training with job placement assistance.",
    city: "Dallas",
    country: "USA",
    region: "north_america",
    address: "5678 Highway 75, Dallas, TX 75201",
    phone: "+1 214-555-0123",
    website: "https://texastrucking.edu",
    rating: 4.8,
    reviewCount: 567,
    servicesJson: ["Class A CDL", "Class B CDL", "Hazmat", "Passenger"],
    priceRange: "$$$",
    verified: true,
    sourceType: "manual",
  },
  {
    id: 4,
    nameEn: "Ontario Truck Training Academy",
    descriptionEn: "Canada's leading truck driver training school with multiple locations.",
    city: "Toronto",
    country: "Canada",
    region: "north_america",
    address: "890 Transport Way, Toronto, ON M5V 2K1",
    phone: "+1 416-555-0456",
    website: "https://ontariotrucktraining.ca",
    rating: 4.6,
    reviewCount: 312,
    servicesJson: ["AZ License", "DZ License", "Air Brakes", "Job Placement"],
    priceRange: "$$$",
    verified: true,
    sourceType: "scraped",
  },
  {
    id: 5,
    nameEn: "Amsterdam Transport School",
    descriptionEn: "Modern training facility with simulators and experienced instructors.",
    city: "Amsterdam",
    country: "Netherlands",
    region: "europe",
    address: "Transportweg 12, 1043 Amsterdam",
    phone: "+31 20 1234567",
    website: "https://amsterdamtransport.nl",
    rating: 4.8,
    reviewCount: 156,
    servicesJson: ["Rijbewijs C", "Rijbewijs CE", "Code 95", "ADR"],
    priceRange: "€€€",
    verified: true,
    sourceType: "scraped",
  },
  {
    id: 6,
    nameEn: "Madrid Driving Academy",
    descriptionEn: "Professional truck driving courses with flexible schedules.",
    city: "Madrid",
    country: "Spain",
    region: "europe",
    address: "Calle de los Camioneros 78, 28001 Madrid",
    phone: "+34 91 1234567",
    website: "https://madriddriving.es",
    rating: 4.5,
    reviewCount: 98,
    servicesJson: ["Permiso C", "Permiso C+E", "CAP", "ADR"],
    priceRange: "€€",
    verified: false,
    sourceType: "scraped",
  },
];

const countries = [
  { value: "all", label: "All Countries" },
  { value: "Germany", label: "Germany" },
  { value: "France", label: "France" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "Spain", label: "Spain" },
  { value: "USA", label: "United States" },
  { value: "Canada", label: "Canada" },
];

export default function Schools() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const filteredSchools = sampleSchools.filter((school) => {
    const matchesSearch = school.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === "all" || school.country === selectedCountry;
    const matchesRegion = selectedRegion === "all" || school.region === selectedRegion;
    return matchesSearch && matchesCountry && matchesRegion;
  });

  const getPriceIndicator = (price: string) => {
    const count = price.length;
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3].map((i) => (
          <DollarSign
            key={i}
            className={`h-3 w-3 ${i <= count ? "text-primary" : "text-muted-foreground/30"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 hero-gradient">
        <div className="container">
          <div className="max-w-3xl">
            <Badge className="badge-accent mb-4">
              <School className="h-3 w-3 me-1" />
              {t.schools.title}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t.schools.subtitle}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find certified driving schools and training programs across Europe and North America.
            </p>
            
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search schools by name or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ps-10 bg-card/50"
                />
              </div>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-full sm:w-48 bg-card/50">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
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
              { value: "3,500+", label: "Driving Schools" },
              { value: "25+", label: "Countries" },
              { value: "50K+", label: "Reviews" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-accent">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Region Filter */}
      <section className="py-6 border-b border-border/50">
        <div className="container">
          <div className="flex gap-2">
            {[
              { value: "all", label: "All Regions" },
              { value: "europe", label: t.licenses.europe },
              { value: "north_america", label: t.licenses.northAmerica },
            ].map((region) => (
              <Button
                key={region.value}
                variant={selectedRegion === region.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRegion(region.value)}
                className={selectedRegion === region.value ? "gradient-accent" : ""}
              >
                {region.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing {filteredSchools.length} driving schools
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSchools.map((school) => (
              <Card key={school.id} className="card-hover bg-card/50 border-border/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {school.verified && (
                          <Badge className="badge-accent">
                            <CheckCircle className="h-3 w-3 me-1" />
                            Verified
                          </Badge>
                        )}
                        {school.sourceType === "scraped" && (
                          <Badge variant="outline" className="text-xs">
                            <Globe className="h-3 w-3 me-1" />
                            Aggregated
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">{school.nameEn}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-4 w-4" />
                        {school.city}, {school.country}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">{school.rating}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {school.reviewCount} reviews
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{school.descriptionEn}</p>
                  
                  {/* Services */}
                  <div className="flex flex-wrap gap-2">
                    {school.servicesJson.map((service, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Contact Info */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-border/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {school.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {getPriceIndicator(school.priceRange)}
                      <span className="text-muted-foreground">Price Range</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button className="flex-1 gradient-primary">
                      Contact School
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={school.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSchools.length === 0 && (
            <div className="text-center py-16">
              <School className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t.common.noResults}</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Are You a Driving School?</h2>
            <p className="text-muted-foreground mb-6">
              List your school on our platform and reach thousands of potential students looking for quality training.
            </p>
            <Button size="lg" className="gradient-accent">
              Register Your School
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
