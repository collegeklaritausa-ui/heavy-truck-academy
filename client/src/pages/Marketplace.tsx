import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ShoppingCart,
  MapPin,
  Calendar,
  Eye,
  Search,
  Plus,
  Heart,
  Share2,
  Truck,
  Settings,
  Package,
} from "lucide-react";
import { useState } from "react";

// Sample listings data
const sampleListings = [
  {
    id: 1,
    titleEn: "2021 Volvo VNL 860",
    descriptionEn: "Excellent condition, low mileage, full service history. Cummins X15 engine, 500HP.",
    price: 125000,
    currency: "EUR",
    condition: "like_new",
    year: 2021,
    manufacturer: "Volvo",
    model: "VNL 860",
    location: "Munich, Germany",
    country: "Germany",
    images: ["https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400"],
    viewCount: 234,
    category: "Trucks",
  },
  {
    id: 2,
    titleEn: "Caterpillar 320 Excavator",
    descriptionEn: "2019 model, 3500 hours, well maintained. Perfect for construction projects.",
    price: 185000,
    currency: "USD",
    condition: "good",
    year: 2019,
    manufacturer: "Caterpillar",
    model: "320",
    location: "Chicago, IL, USA",
    country: "USA",
    images: ["https://images.unsplash.com/photo-1504222490345-c075b6008014?w=400"],
    viewCount: 156,
    category: "Heavy Equipment",
  },
  {
    id: 3,
    titleEn: "Mercedes-Benz Actros 1845",
    descriptionEn: "2020 Euro 6, automatic transmission, sleeper cab. Ready for long haul.",
    price: 95000,
    currency: "EUR",
    condition: "good",
    year: 2020,
    manufacturer: "Mercedes-Benz",
    model: "Actros 1845",
    location: "Rotterdam, Netherlands",
    country: "Netherlands",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"],
    viewCount: 312,
    category: "Trucks",
  },
  {
    id: 4,
    titleEn: "Utility 3000R Reefer Trailer",
    descriptionEn: "2022 refrigerated trailer, Carrier unit, excellent for temperature-controlled cargo.",
    price: 45000,
    currency: "USD",
    condition: "like_new",
    year: 2022,
    manufacturer: "Utility",
    model: "3000R",
    location: "Dallas, TX, USA",
    country: "USA",
    images: ["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400"],
    viewCount: 89,
    category: "Trailers",
  },
  {
    id: 5,
    titleEn: "Scania R500 V8",
    descriptionEn: "Powerful V8 engine, 2018 model, perfect for heavy loads. New tires.",
    price: 78000,
    currency: "EUR",
    condition: "good",
    year: 2018,
    manufacturer: "Scania",
    model: "R500",
    location: "Stockholm, Sweden",
    country: "Sweden",
    images: ["https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400"],
    viewCount: 198,
    category: "Trucks",
  },
  {
    id: 6,
    titleEn: "Cummins ISX15 Engine",
    descriptionEn: "Rebuilt engine, 450HP, 2 year warranty. Ready for installation.",
    price: 18500,
    currency: "USD",
    condition: "new",
    year: 2024,
    manufacturer: "Cummins",
    model: "ISX15",
    location: "Toronto, Canada",
    country: "Canada",
    images: ["https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400"],
    viewCount: 445,
    category: "Parts",
  },
];

const categories = ["All", "Trucks", "Trailers", "Heavy Equipment", "Parts"];

export default function Marketplace() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("all");

  const filteredListings = sampleListings.filter((listing) => {
    const matchesSearch = listing.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || listing.category === selectedCategory;
    const matchesCondition = selectedCondition === "all" || listing.condition === selectedCondition;
    return matchesSearch && matchesCategory && matchesCondition;
  });

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getConditionBadge = (condition: string) => {
    const styles: Record<string, string> = {
      new: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      like_new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      good: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      fair: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      parts: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    };
    const labels: Record<string, string> = {
      new: t.marketplace.new,
      like_new: t.marketplace.likeNew,
      good: t.marketplace.good,
      fair: t.marketplace.fair,
      parts: t.marketplace.forParts,
    };
    return { style: styles[condition] || styles.good, label: labels[condition] || condition };
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, typeof Truck> = {
      Trucks: Truck,
      Trailers: Package,
      "Heavy Equipment": Settings,
      Parts: Settings,
    };
    return icons[category] || Truck;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 hero-gradient">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="max-w-2xl">
              <Badge className="badge-primary mb-4">
                <ShoppingCart className="h-3 w-3 me-1" />
                {t.marketplace.title}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t.marketplace.subtitle}
              </h1>
              <p className="text-xl text-muted-foreground">
                Browse thousands of trucks, trailers, heavy equipment, and parts from trusted sellers.
              </p>
            </div>
            <Button size="lg" className="gradient-primary">
              <Plus className="me-2 h-5 w-5" />
              {t.marketplace.createListing}
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 max-w-3xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={t.marketplace.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-10 bg-card/50"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48 bg-card/50">
                <SelectValue placeholder={t.marketplace.category} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-b border-border/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "8,500+", label: "Active Listings" },
              { value: "2,000+", label: "Verified Sellers" },
              { value: "€50M+", label: "Monthly Volume" },
              { value: "25+", label: "Countries" },
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
                {/* Condition Filter */}
                <div>
                  <h3 className="font-semibold mb-3">{t.marketplace.condition}</h3>
                  <div className="space-y-1">
                    {[
                      { value: "all", label: t.common.all },
                      { value: "new", label: t.marketplace.new },
                      { value: "like_new", label: t.marketplace.likeNew },
                      { value: "good", label: t.marketplace.good },
                      { value: "fair", label: t.marketplace.fair },
                      { value: "parts", label: t.marketplace.forParts },
                    ].map((cond) => (
                      <button
                        key={cond.value}
                        onClick={() => setSelectedCondition(cond.value)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCondition === cond.value
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted"
                        }`}
                      >
                        {cond.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3">{t.marketplace.category}</h3>
                  <div className="space-y-1">
                    {categories.map((cat) => {
                      const Icon = getCategoryIcon(cat);
                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                            selectedCategory === cat
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-muted"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </aside>

            {/* Listings Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredListings.length} listings
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredListings.map((listing) => {
                  const conditionBadge = getConditionBadge(listing.condition);
                  return (
                    <Card key={listing.id} className="card-hover bg-card/50 border-border/50 overflow-hidden group">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={listing.images[0]}
                          alt={listing.titleEn}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        <Badge className={`absolute top-3 left-3 ${conditionBadge.style}`}>
                          {conditionBadge.label}
                        </Badge>
                        <div className="absolute top-3 right-3 flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/50 backdrop-blur-sm">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/50 backdrop-blur-sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <div className="text-2xl font-bold text-white">
                            {formatPrice(listing.price, listing.currency)}
                          </div>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                          <span>{listing.manufacturer}</span>
                          <span>•</span>
                          <span>{listing.year}</span>
                        </div>
                        <CardTitle className="text-lg line-clamp-1">{listing.titleEn}</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {listing.descriptionEn}
                        </p>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between pt-4 border-t border-border/50 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {listing.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {listing.viewCount}
                        </span>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>

              {filteredListings.length === 0 && (
                <div className="text-center py-16">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
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
