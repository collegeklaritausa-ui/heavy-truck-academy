# Heavy Truck Academy Platform

A comprehensive web platform for the heavy-duty vehicle and trucking industry, featuring training courses, job listings, equipment marketplace, knowledge base, driving license guides, and driving school directory.

![Heavy Truck Academy](https://img.shields.io/badge/Platform-Heavy%20Truck%20Academy-orange)
![License](https://img.shields.io/badge/License-MIT-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![React](https://img.shields.io/badge/React-19-blue)

## 🚛 Features

### Multi-Language Support
- **5 Languages**: English, German, Spanish, French, Arabic
- **RTL Support**: Full right-to-left layout for Arabic
- **Dynamic Language Switching**: Change language without page reload

### Academy Module
- Training courses for heavy-duty vehicle mechanics
- Course categories: Engine, Brakes, Transmission, Electrical, HVAC, Emissions
- Progress tracking and certification system
- Video, document, and interactive content support

### Job Board
- **500+ Job Listings** across Europe and North America
- Filter by region, employment type, experience level
- Salary range information
- Web scraping infrastructure for automated job aggregation
- Sources: Indeed, LinkedIn, Monster, StepStone

### Marketplace
- **300+ Equipment Listings** for trucks, trailers, parts
- Buy/sell heavy equipment and vehicles
- Condition ratings and price comparisons
- Contact sellers directly

### Knowledge Base
- **200+ Technical Articles**
- Repair guides, fabrication tutorials, maintenance documentation
- Aggregated from trusted industry sources
- Categories: Engine, Brakes, Transmission, Electrical, Exhaust, Structural

### Driving License Guides
- Complete licensing requirements for Europe and North America
- Country-specific regulations and test information
- Age requirements, validity periods, costs
- Practice test materials

### Driving Schools Directory
- **3,000+ Driving Schools** across 18 countries
- Ratings and reviews
- Services offered, price ranges
- Contact information and websites

## 🛠 Tech Stack

### Frontend
- **React 19** with TypeScript
- **TailwindCSS 4** for styling
- **shadcn/ui** component library
- **Wouter** for routing
- **TanStack Query** for data fetching

### Backend
- **Express 4** server
- **tRPC 11** for type-safe APIs
- **Drizzle ORM** for database operations
- **MySQL/TiDB** database

### Infrastructure
- **Manus OAuth** for authentication
- **S3** for file storage
- **Vitest** for testing

## 📊 Database Schema

The platform uses 19 database tables:

| Module | Tables |
|--------|--------|
| Users & Auth | users, certifications, user_course_progress |
| Academy | course_categories, courses, training_materials |
| Jobs | job_categories, jobs |
| Marketplace | equipment_categories, listings |
| Knowledge | knowledge_categories, knowledge_articles |
| Licenses | license_types, license_requirements, test_materials |
| Schools | driving_schools, training_programs |
| Scraping | scraping_sources, scraping_logs |

## 🚀 Getting Started

### Prerequisites
- Node.js 22+
- pnpm 10+
- MySQL/TiDB database

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/heavy-truck-academy.git
cd heavy-truck-academy

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Push database schema
pnpm db:push

# Seed the database (optional)
node scripts/seed-data.mjs

# Start development server
pnpm dev
```

### Environment Variables

```env
DATABASE_URL=mysql://user:password@host:port/database
JWT_SECRET=your-jwt-secret
VITE_APP_ID=your-app-id
```

## 📁 Project Structure

```
heavy-truck-academy/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (Language, Theme)
│   │   ├── lib/           # Utilities and i18n
│   │   └── pages/         # Page components
├── server/                 # Backend Express server
│   ├── _core/             # Core server infrastructure
│   ├── db.ts              # Database queries
│   └── routers.ts         # tRPC API routes
├── drizzle/               # Database schema and migrations
├── scripts/               # Utility scripts
└── shared/                # Shared types and constants
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch
```

## 📝 API Routes

### Public Routes
- `academy.getCourses` - List training courses
- `jobs.getJobs` - List job postings
- `marketplace.getListings` - List equipment for sale
- `knowledge.getArticles` - List knowledge base articles
- `licenses.getGuides` - List license requirements
- `schools.getSchools` - List driving schools

### Protected Routes
- `academy.enrollCourse` - Enroll in a course
- `jobs.saveJob` - Save a job listing
- `marketplace.createListing` - Create equipment listing
- `admin.*` - Admin dashboard routes

## 🌍 Supported Regions

### Europe
Germany, France, Netherlands, Spain, Italy, Poland, Belgium, Austria, Sweden, Switzerland, United Kingdom, Ireland, Portugal, Czech Republic, Denmark

### North America
United States, Canada, Mexico

## 🔒 Security

- OAuth 2.0 authentication via Manus
- Role-based access control (User/Admin)
- Session management with secure cookies
- Input validation with Zod schemas

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Built with ❤️ for the trucking industry
