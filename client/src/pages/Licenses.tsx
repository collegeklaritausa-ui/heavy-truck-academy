import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Search,
  Globe,
  CheckCircle,
  Clock,
  DollarSign,
  ArrowRight,
  MapPin,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

// Sample license data
const europeanLicenses = [
  {
    id: 1,
    country: "Germany",
    countryCode: "DE",
    licenseClass: "CE",
    titleEn: "Heavy Truck License (CE)",
    descriptionEn: "Required for driving trucks over 7.5 tons with trailers over 750kg.",
    minAge: 21,
    validityYears: 5,
    estimatedCost: "€3,000 - €5,000",
    requirements: ["Class B license", "Medical exam", "Theory test", "Practical test"],
    testTypesJson: ["theory", "practical"],
  },
  {
    id: 2,
    country: "France",
    countryCode: "FR",
    licenseClass: "CE",
    titleEn: "Permis CE - Heavy Truck",
    descriptionEn: "License for heavy goods vehicles with trailers in France.",
    minAge: 21,
    validityYears: 5,
    estimatedCost: "€2,500 - €4,500",
    requirements: ["Permis C license", "FIMO certification", "Medical exam"],
    testTypesJson: ["theory", "practical"],
  },
  {
    id: 3,
    country: "Netherlands",
    countryCode: "NL",
    licenseClass: "CE",
    titleEn: "Rijbewijs CE",
    descriptionEn: "Dutch commercial driver's license for heavy combinations.",
    minAge: 21,
    validityYears: 5,
    estimatedCost: "€2,800 - €4,000",
    requirements: ["Category C license", "CCV exam", "Medical certificate"],
    testTypesJson: ["theory", "practical"],
  },
  {
    id: 4,
    country: "Spain",
    countryCode: "ES",
    licenseClass: "C+E",
    titleEn: "Permiso C+E",
    descriptionEn: "Spanish license for heavy trucks with trailers.",
    minAge: 21,
    validityYears: 5,
    estimatedCost: "€2,000 - €3,500",
    requirements: ["Permiso C", "CAP certification", "Medical exam"],
    testTypesJson: ["theory", "practical"],
  },
];

const northAmericanLicenses = [
  {
    id: 5,
    country: "USA",
    countryCode: "US",
    licenseClass: "Class A CDL",
    titleEn: "Commercial Driver's License Class A",
    descriptionEn: "Required for operating combination vehicles with GCWR over 26,001 lbs.",
    minAge: 21,
    validityYears: 4,
    estimatedCost: "$3,000 - $7,000",
    requirements: ["Valid driver's license", "DOT medical card", "CDL permit", "Skills test"],
    testTypesJson: ["knowledge", "skills", "road"],
  },
  {
    id: 6,
    country: "Canada",
    countryCode: "CA",
    licenseClass: "Class 1",
    titleEn: "Class 1 License (AZ)",
    descriptionEn: "Canadian license for tractor-trailers and large commercial vehicles.",
    minAge: 18,
    validityYears: 5,
    estimatedCost: "CAD $4,000 - $8,000",
    requirements: ["Class 5 license", "Medical exam", "Air brake endorsement", "Road test"],
    testTypesJson: ["knowledge", "practical", "air_brake"],
  },
  {
    id: 7,
    country: "Mexico",
    countryCode: "MX",
    licenseClass: "Licencia Federal Tipo E",
    titleEn: "Federal License Type E",
    descriptionEn: "Mexican federal license for heavy cargo transport.",
    minAge: 21,
    validityYears: 3,
    estimatedCost: "MXN $15,000 - $25,000",
    requirements: ["Valid license", "Medical exam", "Psychometric test", "Training course"],
    testTypesJson: ["theory", "practical"],
  },
];

export default function Licenses() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("europe");

  const licenses = selectedRegion === "europe" ? europeanLicenses : northAmericanLicenses;

  const filteredLicenses = licenses.filter((license) => {
    return license.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      license.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      license.licenseClass.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 hero-gradient">
        <div className="container">
          <div className="max-w-3xl">
            <Badge className="badge-primary mb-4">
              <FileText className="h-3 w-3 me-1" />
              {t.licenses.title}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t.licenses.subtitle}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Complete guides to obtaining commercial driving licenses in Europe and North America.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by country or license type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-10 bg-card/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Region Tabs */}
      <section className="py-8 border-b border-border/50">
        <div className="container">
          <Tabs value={selectedRegion} onValueChange={setSelectedRegion} className="w-full">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="europe" className="gap-2">
                <Globe className="h-4 w-4" />
                {t.licenses.europe}
              </TabsTrigger>
              <TabsTrigger value="north_america" className="gap-2">
                <Globe className="h-4 w-4" />
                {t.licenses.northAmerica}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredLicenses.map((license) => (
              <Card key={license.id} className="card-hover bg-card/50 border-border/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {license.countryCode}
                        </Badge>
                        <Badge className="badge-primary">
                          {license.licenseClass}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{license.titleEn}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-4 w-4" />
                        {license.country}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{license.descriptionEn}</p>
                  
                  {/* Key Info */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-border/50">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Min Age</div>
                      <div className="font-semibold">{license.minAge} years</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">{t.licenses.validity}</div>
                      <div className="font-semibold">{license.validityYears} years</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Est. Cost</div>
                      <div className="font-semibold text-sm">{license.estimatedCost}</div>
                    </div>
                  </div>
                  
                  {/* Requirements */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      {t.licenses.requirements}
                    </h4>
                    <ul className="space-y-1">
                      {license.requirements.map((req, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Test Types */}
                  <div className="flex flex-wrap gap-2">
                    {license.testTypesJson.map((test, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {test.charAt(0).toUpperCase() + test.slice(1)} Test
                      </Badge>
                    ))}
                  </div>
                  
                  <Button className="w-full gradient-primary">
                    View Full Guide
                    <ArrowRight className="ms-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredLicenses.length === 0 && (
            <div className="text-center py-16">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t.common.noResults}</h3>
              <p className="text-muted-foreground">Try adjusting your search query</p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-card/30">
        <div className="container">
          <Card className="glass">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertCircle className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Important Notice</h3>
                  <p className="text-muted-foreground">
                    License requirements and costs may vary by state/province and are subject to change. 
                    Always verify current requirements with your local licensing authority. 
                    This information is aggregated from official sources and updated regularly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
