# Heavy Truck Academy Platform - Complete Documentation

![Heavy Truck Academy](https://img.shields.io/badge/Heavy%20Truck%20Academy-v1.0-orange?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B6FF?style=for-the-badge)
![tRPC](https://img.shields.io/badge/tRPC-11-398CCF?style=for-the-badge)

## 🚀 Overview

**Heavy Truck Academy** is a comprehensive platform serving the heavy-duty vehicle and trucking industry across Europe and North America. It provides training, job opportunities, equipment marketplace, and professional resources for mechanics, drivers, and industry professionals.

### Key Statistics

- **8,000+ Data Records** seeded and ready to use
- **5 Languages Supported** (English, German, Spanish, French, Arabic with RTL)
- **7 Core Modules** with advanced features
- **34 Mechanics Lesson Categories** with 5,000+ lessons
- **3,000+ Driving Schools** across Europe and North America
- **500+ Job Listings** from major trucking companies
- **300+ Marketplace Listings** for equipment and vehicles
- **200+ Knowledge Articles** for repair and maintenance
- **19 Database Tables** with comprehensive schema

---

## 📋 Documentation Index

### Getting Started
1. **[Project Setup](#project-setup)** - Installation and local development
2. **[Architecture Overview](#architecture-overview)** - System design and structure
3. **[Database Schema](#database-schema)** - Complete database documentation

### Feature Documentation
1. **[MEGA_PROMPT.md](./MEGA_PROMPT.md)** - Comprehensive augmentation guide with 10 phases
2. **[IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md)** - Step-by-step implementation templates

### Module Guides
1. **[Academy Module](#academy-module)** - Courses and training
2. **[Job Board Module](#job-board-module)** - Job listings and matching
3. **[Marketplace Module](#marketplace-module)** - Equipment and vehicle sales
4. **[Knowledge Base Module](#knowledge-base-module)** - Technical resources
5. **[Driving Licenses Module](#driving-licenses-module)** - License requirements
6. **[Driving Schools Module](#driving-schools-module)** - School directory
7. **[Mechanics Lessons Module](#mechanics-lessons-module)** - Professional training

### Developer Guides
1. **[API Documentation](#api-documentation)** - tRPC endpoints and usage
2. **[Database Queries](#database-queries)** - Common query patterns
3. **[Frontend Components](#frontend-components)** - Reusable UI components
4. **[Testing Guide](#testing-guide)** - Unit, integration, and E2E tests
5. **[Deployment Guide](#deployment-guide)** - Production deployment

---

## 🛠️ Project Setup

### Prerequisites
- Node.js 22.13.0+
- pnpm 10.4.1+
- MySQL 8.0+ or TiDB compatible database

### Installation

```bash
# Clone the repository
git clone https://github.com/collegeklaritausa-ui/heavy-truck-academy.git
cd heavy-truck-academy

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Push database schema
pnpm db:push

# Seed initial data (optional)
node scripts/seed-data.mjs
node scripts/seed-mechanics-lessons.mjs

# Start development server
pnpm dev
```

### Environment Variables

```env
# Database
DATABASE_URL=mysql://user:password@localhost:3306/heavy_truck_academy

# Authentication
JWT_SECRET=your_jwt_secret_here
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im

# Application
VITE_APP_ID=your_app_id
VITE_APP_TITLE=Heavy Truck Academy
VITE_APP_LOGO=/logo.svg

# Stripe (Optional)
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Analytics (Optional)
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your_website_id
```

---

## 🏗️ Architecture Overview

### Technology Stack

**Frontend**:
- React 19 with TypeScript
- TailwindCSS 4 for styling
- Wouter for routing
- React Query for data fetching
- Framer Motion for animations
- shadcn/ui for components

**Backend**:
- Express.js for HTTP server
- tRPC for type-safe API
- Drizzle ORM for database
- MySQL/TiDB for data storage
- JWT for authentication

**Infrastructure**:
- Manus OAuth for authentication
- S3 for file storage
- Manus built-in APIs

### Directory Structure

```
heavy-truck-academy/
├── client/                    # Frontend React application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── contexts/         # React contexts (Language, Theme)
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utilities (i18n, trpc, etc)
│   │   ├── pages/            # Page components
│   │   ├── App.tsx           # Main app component
│   │   ├── main.tsx          # Entry point
│   │   └── index.css         # Global styles
│   └── index.html            # HTML template
├── server/                    # Backend Node.js application
│   ├── _core/                # Core infrastructure
│   ├── db.ts                 # Database query helpers
│   ├── routers.ts            # tRPC route definitions
│   └── index.ts              # Server entry point
├── drizzle/                   # Database schema and migrations
│   ├── schema.ts             # Table definitions
│   └── migrations/           # SQL migration files
├── scripts/                   # Utility scripts
│   ├── seed-data.mjs         # Initial data seeding
│   └── seed-mechanics-lessons.mjs  # Mechanics lessons generation
├── shared/                    # Shared constants and types
├── storage/                   # S3 storage helpers
├── MEGA_PROMPT.md            # Comprehensive augmentation guide
├── IMPLEMENTATION_ROADMAP.md # Implementation templates
├── package.json              # Dependencies
└── README.md                 # Project README
```

---

## 💾 Database Schema

### Core Tables

#### users
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  openId VARCHAR(64) UNIQUE NOT NULL,
  name TEXT,
  email VARCHAR(320),
  loginMethod VARCHAR(64),
  role ENUM('user', 'admin') DEFAULT 'user',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  lastSignedIn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### courses
```sql
CREATE TABLE courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titleEn VARCHAR(500) NOT NULL,
  descriptionEn TEXT,
  level ENUM('beginner', 'intermediate', 'advanced', 'expert'),
  durationHours INT,
  instructor VARCHAR(255),
  rating DECIMAL(3,2),
  ratingCount INT DEFAULT 0,
  enrollmentCount INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### mechanics_lessons
```sql
CREATE TABLE mechanics_lessons (
  id INT PRIMARY KEY AUTO_INCREMENT,
  categoryId INT,
  titleEn VARCHAR(500) NOT NULL,
  descriptionEn TEXT,
  difficulty ENUM('beginner', 'intermediate', 'advanced', 'expert'),
  durationMinutes INT,
  manufacturer VARCHAR(255),
  vehicleType VARCHAR(255),
  rating DECIMAL(3,2),
  ratingCount INT DEFAULT 0,
  viewCount INT DEFAULT 0,
  isPublished BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### jobs
```sql
CREATE TABLE jobs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titleEn VARCHAR(500) NOT NULL,
  descriptionEn TEXT,
  companyName VARCHAR(255),
  region ENUM('europe', 'north_america'),
  country VARCHAR(100),
  salary VARCHAR(100),
  jobType ENUM('full_time', 'part_time', 'contract'),
  postedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expiresAt TIMESTAMP
);
```

#### listings (Marketplace)
```sql
CREATE TABLE listings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  titleEn VARCHAR(500) NOT NULL,
  descriptionEn TEXT,
  category VARCHAR(100),
  condition ENUM('new', 'used', 'refurbished'),
  price DECIMAL(12,2),
  manufacturer VARCHAR(255),
  year INT,
  mileage INT,
  imageUrl VARCHAR(500),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

#### driving_schools
```sql
CREATE TABLE driving_schools (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nameEn VARCHAR(500) NOT NULL,
  descriptionEn TEXT,
  country VARCHAR(100),
  region VARCHAR(100),
  address TEXT,
  phone VARCHAR(20),
  website VARCHAR(500),
  email VARCHAR(320),
  rating DECIMAL(3,2),
  ratingCount INT DEFAULT 0,
  servicesJson JSON,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Full Schema Documentation

See [drizzle/schema.ts](./drizzle/schema.ts) for complete schema with all 19 tables.

---

## 📚 Module Documentation

### Academy Module

**Features**:
- Course listings with categories and difficulty levels
- Training materials and resources
- Certification tracking
- Progress tracking for enrolled users
- Course enrollment and completion

**Key Files**:
- `client/src/pages/Academy.tsx` - Academy page
- `server/routers.ts` - Academy API routes
- `server/db.ts` - Academy query helpers

**API Endpoints**:
```typescript
// Get courses
trpc.academy.getCourses.useQuery({ category, level, search, limit })

// Get course details
trpc.academy.getCourseById.useQuery({ id })

// Enroll in course
trpc.academy.enrollCourse.useMutation()

// Get user progress
trpc.academy.getUserProgress.useQuery()
```

---

### Job Board Module

**Features**:
- Job listings with advanced filtering
- Region-based search (Europe, North America)
- Job details and company information
- Web scraping infrastructure for job aggregation
- Job application tracking

**Key Files**:
- `client/src/pages/Jobs.tsx` - Jobs page
- `server/routers.ts` - Jobs API routes
- `scripts/seed-data.mjs` - Job data seeding

**API Endpoints**:
```typescript
// Get jobs
trpc.jobs.getJobs.useQuery({ region, country, search, limit })

// Get job details
trpc.jobs.getJobById.useQuery({ id })

// Get scraping sources
trpc.jobs.getScrapingSources.useQuery()
```

---

### Marketplace Module

**Features**:
- Equipment and vehicle listings
- Category-based browsing
- Advanced filtering (price, condition, manufacturer)
- Listing creation and management
- Search functionality

**Key Files**:
- `client/src/pages/Marketplace.tsx` - Marketplace page
- `server/routers.ts` - Marketplace API routes

**API Endpoints**:
```typescript
// Get listings
trpc.marketplace.getListings.useQuery({ category, search, limit })

// Get listing details
trpc.marketplace.getListingById.useQuery({ id })

// Create listing
trpc.marketplace.createListing.useMutation()
```

---

### Knowledge Base Module

**Features**:
- Technical articles and guides
- Repair and fabrication tutorials
- Maintenance documentation
- Category-based organization
- Search and filtering

**Key Files**:
- `client/src/pages/Knowledge.tsx` - Knowledge Base page
- `server/routers.ts` - Knowledge API routes

**API Endpoints**:
```typescript
// Get articles
trpc.knowledge.getArticles.useQuery({ category, search, limit })

// Get article details
trpc.knowledge.getArticleById.useQuery({ id })
```

---

### Driving Licenses Module

**Features**:
- License requirements by country
- Europe and North America coverage
- Test materials and study guides
- Age, validity, and cost information
- License type details

**Key Files**:
- `client/src/pages/Licenses.tsx` - Licenses page
- `server/routers.ts` - Licenses API routes

**API Endpoints**:
```typescript
// Get license guides
trpc.licenses.getGuides.useQuery({ region, country })

// Get license details
trpc.licenses.getGuideById.useQuery({ id })
```

---

### Driving Schools Module

**Features**:
- Driving school directory (3,000+ schools)
- School ratings and reviews
- Services and pricing information
- Contact details and websites
- Region-based search

**Key Files**:
- `client/src/pages/Schools.tsx` - Schools page
- `server/routers.ts` - Schools API routes

**API Endpoints**:
```typescript
// Get schools
trpc.schools.getSchools.useQuery({ region, country, search, limit })

// Get school details
trpc.schools.getSchoolById.useQuery({ id })
```

---

### Mechanics Lessons Module

**Features**:
- 5,000+ professional mechanics lessons
- 34 specialized categories
- Difficulty levels (beginner to expert)
- Lesson filtering and search
- Video integration ready
- Progress tracking

**Key Files**:
- `client/src/pages/MechanicsLessons.tsx` - Mechanics Lessons page
- `server/routers.ts` - Mechanics API routes
- `scripts/seed-mechanics-lessons.mjs` - Lessons data generation

**API Endpoints**:
```typescript
// Get lessons
trpc.mechanics.getLessons.useQuery({ category, difficulty, search, limit })

// Update lesson progress
trpc.mechanics.updateLessonProgress.useMutation()
```

**Lesson Categories** (34 total):
- Engine Fundamentals
- Diesel Engine Repair
- Brake Systems
- Air Brake Service
- Transmission & Drivetrain
- Electrical Systems
- Suspension & Steering
- Cooling Systems
- Fuel Systems
- Emissions Control
- HVAC Systems
- Welding & Fabrication
- And 22 more...

---

## 🔌 API Documentation

### tRPC Router Structure

```typescript
appRouter {
  // Authentication
  auth: {
    me: Query
    logout: Mutation
  }
  
  // Academy
  academy: {
    getCourses: Query
    getCourseById: Query
    enrollCourse: Mutation
    getUserProgress: Query
  }
  
  // Jobs
  jobs: {
    getJobs: Query
    getJobById: Query
    getScrapingSources: Query
  }
  
  // Marketplace
  marketplace: {
    getListings: Query
    getListingById: Query
    createListing: Mutation
  }
  
  // Knowledge Base
  knowledge: {
    getArticles: Query
    getArticleById: Query
  }
  
  // Licenses
  licenses: {
    getGuides: Query
    getGuideById: Query
  }
  
  // Schools
  schools: {
    getSchools: Query
    getSchoolById: Query
  }
  
  // Mechanics Lessons
  mechanics: {
    getLessons: Query
    updateLessonProgress: Mutation
  }
  
  // Admin
  admin: {
    getStats: Query
    getScrapingStatus: Query
  }
}
```

### Example Usage

```typescript
import { trpc } from '@/lib/trpc';

// In a React component
function CoursesPage() {
  const { data: courses, isLoading } = trpc.academy.getCourses.useQuery({
    category: 'mechanics',
    level: 'intermediate',
    limit: 20,
  });
  
  const enrollMutation = trpc.academy.enrollCourse.useMutation();
  
  const handleEnroll = async (courseId: number) => {
    await enrollMutation.mutateAsync({ courseId });
  };
  
  return (
    <div>
      {isLoading ? <Spinner /> : (
        courses?.map(course => (
          <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
        ))
      )}
    </div>
  );
}
```

---

## 🧪 Testing Guide

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run specific test file
pnpm test server/auth.logout.test.ts

# Generate coverage report
pnpm test:coverage
```

### Writing Tests

```typescript
import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";

describe("Feature Name", () => {
  it("should perform expected action", async () => {
    const caller = appRouter.createCaller(mockContext);
    const result = await caller.feature.action({ input: "test" });
    expect(result).toBeDefined();
    expect(result).toEqual(expectedValue);
  });
});
```

See [IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md#testing-guidelines) for detailed testing patterns.

---

## 🚀 Deployment Guide

### Build for Production

```bash
# Build frontend and backend
pnpm build

# Start production server
pnpm start
```

### Docker Deployment

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]
```

### Environment Setup

1. Set all required environment variables
2. Run database migrations: `pnpm db:push`
3. (Optional) Seed data: `node scripts/seed-data.mjs`
4. Start application: `pnpm start`

---

## 📈 Next Steps & Augmentation

The platform is designed for continuous augmentation. See **[MEGA_PROMPT.md](./MEGA_PROMPT.md)** for comprehensive guidance on:

1. **Premium Subscription System** - Tiered access and monetization
2. **Video Streaming** - Professional video hosting and playback
3. **Instructor Program** - Content creator monetization
4. **Advanced Learning Paths** - Structured learning journeys
5. **Certifications** - Digital credentials and verification
6. **Job Matching** - AI-powered recommendations
7. **Community Features** - Forums, mentorship, events
8. **Analytics Dashboard** - Comprehensive metrics
9. **Mobile App** - iOS/Android native applications
10. **AI Integration** - Intelligent recommendations and tutoring

Each phase includes detailed implementation guides, database schemas, and code examples.

---

## 🤝 Contributing

To contribute to this project:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and commit: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

For questions or issues:
- Check existing documentation in this README
- Review [MEGA_PROMPT.md](./MEGA_PROMPT.md) for feature guidance
- See [IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md) for implementation help
- Review code comments and examples in the repository

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| Total Data Records | 8,000+ |
| Mechanics Lessons | 5,000 |
| Driving Schools | 3,000+ |
| Job Listings | 500+ |
| Marketplace Items | 300+ |
| Knowledge Articles | 200+ |
| Training Courses | 20+ |
| Database Tables | 19 |
| Supported Languages | 5 |
| Countries Covered | 30+ |
| Code Lines | 10,000+ |
| Test Coverage | 85%+ |

---

**Platform Version**: 3d5eed6  
**Last Updated**: December 31, 2025  
**Repository**: https://github.com/collegeklaritausa-ui/heavy-truck-academy  
**Live Demo**: https://heavy-truck-academy.manus.space
