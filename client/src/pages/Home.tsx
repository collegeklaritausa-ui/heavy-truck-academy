import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import {
  Truck,
  GraduationCap,
  Briefcase,
  ShoppingCart,
  BookOpen,
  FileText,
  School,
  Globe,
  Users,
  Award,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Clock,
} from "lucide-react";

export default function Home() {
  const { t } = useLanguage();

  const features = [
    {
      icon: GraduationCap,
      title: t.nav.academy,
      description: "Master heavy-duty vehicle mechanics with expert-led courses and certifications",
      href: "/academy",
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: Briefcase,
      title: t.nav.jobs,
      description: "Find your next opportunity with our AI-powered job aggregation system",
      href: "/jobs",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: ShoppingCart,
      title: t.nav.marketplace,
      description: "Buy and sell heavy equipment and vehicles in our trusted marketplace",
      href: "/marketplace",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: BookOpen,
      title: t.nav.knowledge,
      description: "Access repair guides, fabrication tutorials, and maintenance documentation",
      href: "/knowledge",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: FileText,
      title: t.nav.licenses,
      description: "Complete licensing requirements for Europe and North America",
      href: "/licenses",
      color: "from-rose-500 to-pink-500",
    },
    {
      icon: School,
      title: t.nav.schools,
      description: "Find certified driving schools and training programs in your area",
      href: "/schools",
      color: "from-indigo-500 to-blue-500",
    },
  ];

  const stats = [
    { value: "50K+", label: "Active Users", icon: Users },
    { value: "2,500+", label: "Courses", icon: GraduationCap },
    { value: "15K+", label: "Job Listings", icon: Briefcase },
    { value: "30+", label: "Countries", icon: Globe },
  ];

  const benefits = [
    { icon: Zap, title: "Real-time Updates", description: "Get instant notifications on new jobs and listings" },
    { icon: Shield, title: "Verified Content", description: "All content is verified by industry experts" },
    { icon: Clock, title: "24/7 Access", description: "Learn and browse anytime, anywhere" },
    { icon: Award, title: "Certifications", description: "Earn recognized industry certifications" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center stagger-children">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 badge-primary mb-6">
              <Truck className="h-4 w-4" />
              <span>The #1 Platform for Heavy-Duty Vehicle Professionals</span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gradient-primary">{t.hero.title}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-primary text-lg px-8 glow-primary">
                <Link href="/academy">
                  {t.hero.exploreCourses}
                  <ArrowRight className="ms-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link href="/jobs">
                  {t.hero.findJobs}
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 text-muted-foreground">
              {[
                "Trusted by 50,000+ professionals",
                "Available in 5 languages",
                "Covering 30+ countries",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b border-border/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-4xl font-bold text-gradient-primary mb-1">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From training and certifications to job opportunities and equipment marketplace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Link key={i} href={feature.href}>
                <Card className="h-full card-hover bg-card/50 border-border/50 group cursor-pointer">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      {feature.title}
                      <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-card/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose Heavy Truck Academy?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We provide the most comprehensive platform for heavy-duty vehicle professionals,
                combining education, job opportunities, and industry resources in one place.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <benefit.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  {[
                    { icon: Truck, label: "Trucks" },
                    { icon: TrendingUp, label: "Growth" },
                    { icon: Award, label: "Certified" },
                    { icon: Globe, label: "Global" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl glass flex flex-col items-center justify-center gap-2 animate-pulse-glow"
                      style={{ animationDelay: `${i * 0.5}s` }}
                    >
                      <item.icon className="h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 gradient-primary opacity-90" />
            <div className="absolute inset-0 grid-pattern opacity-20" />
            
            <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
                Ready to Accelerate Your Career?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who are advancing their careers with Heavy Truck Academy
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                  <Link href="/academy">
                    {t.hero.cta}
                    <ArrowRight className="ms-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <Link href="/jobs">
                    {t.hero.findJobs}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
