import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal, json } from "drizzle-orm/mysql-core";

// ============================================
// USER & AUTH
// ============================================
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  preferredLanguage: varchar("preferredLanguage", { length: 5 }).default("en"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ============================================
// ACADEMY MODULE
// ============================================
export const courseCategories = mysqlTable("course_categories", {
  id: int("id").autoincrement().primaryKey(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  nameDe: varchar("nameDe", { length: 255 }),
  nameEs: varchar("nameEs", { length: 255 }),
  nameFr: varchar("nameFr", { length: 255 }),
  nameAr: varchar("nameAr", { length: 255 }),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  icon: varchar("icon", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const courses = mysqlTable("courses", {
  id: int("id").autoincrement().primaryKey(),
  categoryId: int("categoryId").references(() => courseCategories.id),
  titleEn: varchar("titleEn", { length: 500 }).notNull(),
  titleDe: varchar("titleDe", { length: 500 }),
  titleEs: varchar("titleEs", { length: 500 }),
  titleFr: varchar("titleFr", { length: 500 }),
  titleAr: varchar("titleAr", { length: 500 }),
  descriptionEn: text("descriptionEn"),
  descriptionDe: text("descriptionDe"),
  descriptionEs: text("descriptionEs"),
  descriptionFr: text("descriptionFr"),
  descriptionAr: text("descriptionAr"),
  level: mysqlEnum("level", ["beginner", "intermediate", "advanced", "expert"]).default("beginner"),
  durationHours: int("durationHours"),
  imageUrl: varchar("imageUrl", { length: 500 }),
  isPublished: boolean("isPublished").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const trainingMaterials = mysqlTable("training_materials", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("courseId").references(() => courses.id),
  titleEn: varchar("titleEn", { length: 500 }).notNull(),
  titleDe: varchar("titleDe", { length: 500 }),
  titleEs: varchar("titleEs", { length: 500 }),
  titleFr: varchar("titleFr", { length: 500 }),
  titleAr: varchar("titleAr", { length: 500 }),
  contentType: mysqlEnum("contentType", ["video", "document", "quiz", "interactive"]).default("document"),
  contentUrl: varchar("contentUrl", { length: 500 }),
  orderIndex: int("orderIndex").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const certifications = mysqlTable("certifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id),
  courseId: int("courseId").references(() => courses.id),
  certificateNumber: varchar("certificateNumber", { length: 100 }).notNull().unique(),
  issuedAt: timestamp("issuedAt").defaultNow().notNull(),
  expiresAt: timestamp("expiresAt"),
  status: mysqlEnum("status", ["active", "expired", "revoked"]).default("active"),
});

export const userCourseProgress = mysqlTable("user_course_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id),
  courseId: int("courseId").references(() => courses.id),
  progressPercent: int("progressPercent").default(0),
  completedMaterials: json("completedMaterials").$type<number[]>(),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

// ============================================
// JOB BOARD MODULE
// ============================================
export const jobCategories = mysqlTable("job_categories", {
  id: int("id").autoincrement().primaryKey(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  nameDe: varchar("nameDe", { length: 255 }),
  nameEs: varchar("nameEs", { length: 255 }),
  nameFr: varchar("nameFr", { length: 255 }),
  nameAr: varchar("nameAr", { length: 255 }),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const jobs = mysqlTable("jobs", {
  id: int("id").autoincrement().primaryKey(),
  categoryId: int("categoryId").references(() => jobCategories.id),
  titleEn: varchar("titleEn", { length: 500 }).notNull(),
  titleDe: varchar("titleDe", { length: 500 }),
  titleEs: varchar("titleEs", { length: 500 }),
  titleFr: varchar("titleFr", { length: 500 }),
  titleAr: varchar("titleAr", { length: 500 }),
  descriptionEn: text("descriptionEn"),
  descriptionDe: text("descriptionDe"),
  descriptionEs: text("descriptionEs"),
  descriptionFr: text("descriptionFr"),
  descriptionAr: text("descriptionAr"),
  company: varchar("company", { length: 255 }),
  location: varchar("location", { length: 255 }),
  country: varchar("country", { length: 100 }),
  region: mysqlEnum("region", ["europe", "north_america", "other"]).default("europe"),
  salaryMin: decimal("salaryMin", { precision: 12, scale: 2 }),
  salaryMax: decimal("salaryMax", { precision: 12, scale: 2 }),
  salaryCurrency: varchar("salaryCurrency", { length: 10 }).default("EUR"),
  employmentType: mysqlEnum("employmentType", ["full_time", "part_time", "contract", "temporary"]).default("full_time"),
  experienceLevel: mysqlEnum("experienceLevel", ["entry", "mid", "senior", "executive"]).default("entry"),
  sourceUrl: varchar("sourceUrl", { length: 1000 }),
  sourceType: mysqlEnum("sourceType", ["manual", "scraped"]).default("manual"),
  scrapedFrom: varchar("scrapedFrom", { length: 255 }),
  isActive: boolean("isActive").default(true),
  postedAt: timestamp("postedAt").defaultNow().notNull(),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const scrapingSources = mysqlTable("scraping_sources", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  url: varchar("url", { length: 1000 }).notNull(),
  sourceType: mysqlEnum("sourceType", ["jobs", "knowledge", "licenses", "schools"]).notNull(),
  region: mysqlEnum("region", ["europe", "north_america", "global"]).default("global"),
  isActive: boolean("isActive").default(true),
  lastScrapedAt: timestamp("lastScrapedAt"),
  scrapeFrequency: mysqlEnum("scrapeFrequency", ["hourly", "daily", "weekly"]).default("daily"),
  configJson: text("configJson"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const scrapingLogs = mysqlTable("scraping_logs", {
  id: int("id").autoincrement().primaryKey(),
  sourceId: int("sourceId").references(() => scrapingSources.id),
  status: mysqlEnum("status", ["success", "failed", "partial"]).notNull(),
  itemsFound: int("itemsFound").default(0),
  itemsAdded: int("itemsAdded").default(0),
  errorMessage: text("errorMessage"),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

// ============================================
// MARKETPLACE MODULE
// ============================================
export const equipmentCategories = mysqlTable("equipment_categories", {
  id: int("id").autoincrement().primaryKey(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  nameDe: varchar("nameDe", { length: 255 }),
  nameEs: varchar("nameEs", { length: 255 }),
  nameFr: varchar("nameFr", { length: 255 }),
  nameAr: varchar("nameAr", { length: 255 }),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  icon: varchar("icon", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const listings = mysqlTable("listings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id),
  categoryId: int("categoryId").references(() => equipmentCategories.id),
  titleEn: varchar("titleEn", { length: 500 }).notNull(),
  titleDe: varchar("titleDe", { length: 500 }),
  titleEs: varchar("titleEs", { length: 500 }),
  titleFr: varchar("titleFr", { length: 500 }),
  titleAr: varchar("titleAr", { length: 500 }),
  descriptionEn: text("descriptionEn"),
  descriptionDe: text("descriptionDe"),
  descriptionEs: text("descriptionEs"),
  descriptionFr: text("descriptionFr"),
  descriptionAr: text("descriptionAr"),
  price: decimal("price", { precision: 12, scale: 2 }),
  currency: varchar("currency", { length: 10 }).default("EUR"),
  condition: mysqlEnum("condition", ["new", "like_new", "good", "fair", "parts"]).default("good"),
  year: int("year"),
  manufacturer: varchar("manufacturer", { length: 255 }),
  model: varchar("model", { length: 255 }),
  location: varchar("location", { length: 255 }),
  country: varchar("country", { length: 100 }),
  imagesJson: text("imagesJson"),
  contactEmail: varchar("contactEmail", { length: 320 }),
  contactPhone: varchar("contactPhone", { length: 50 }),
  status: mysqlEnum("status", ["active", "sold", "pending", "expired"]).default("active"),
  viewCount: int("viewCount").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ============================================
// KNOWLEDGE BASE MODULE
// ============================================
export const knowledgeCategories = mysqlTable("knowledge_categories", {
  id: int("id").autoincrement().primaryKey(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  nameDe: varchar("nameDe", { length: 255 }),
  nameEs: varchar("nameEs", { length: 255 }),
  nameFr: varchar("nameFr", { length: 255 }),
  nameAr: varchar("nameAr", { length: 255 }),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  parentId: int("parentId"),
  icon: varchar("icon", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const knowledgeArticles = mysqlTable("knowledge_articles", {
  id: int("id").autoincrement().primaryKey(),
  categoryId: int("categoryId").references(() => knowledgeCategories.id),
  titleEn: varchar("titleEn", { length: 500 }).notNull(),
  titleDe: varchar("titleDe", { length: 500 }),
  titleEs: varchar("titleEs", { length: 500 }),
  titleFr: varchar("titleFr", { length: 500 }),
  titleAr: varchar("titleAr", { length: 500 }),
  contentEn: text("contentEn"),
  contentDe: text("contentDe"),
  contentEs: text("contentEs"),
  contentFr: text("contentFr"),
  contentAr: text("contentAr"),
  articleType: mysqlEnum("articleType", ["repair_guide", "fabrication", "maintenance", "troubleshooting", "general"]).default("general"),
  manufacturer: varchar("manufacturer", { length: 255 }),
  vehicleType: varchar("vehicleType", { length: 255 }),
  sourceUrl: varchar("sourceUrl", { length: 1000 }),
  sourceType: mysqlEnum("sourceType", ["manual", "scraped"]).default("manual"),
  scrapedFrom: varchar("scrapedFrom", { length: 255 }),
  tagsJson: text("tagsJson"),
  viewCount: int("viewCount").default(0),
  isPublished: boolean("isPublished").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ============================================
// DRIVING LICENSE GUIDES MODULE
// ============================================
export const licenseTypes = mysqlTable("license_types", {
  id: int("id").autoincrement().primaryKey(),
  code: varchar("code", { length: 50 }).notNull(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  nameDe: varchar("nameDe", { length: 255 }),
  nameEs: varchar("nameEs", { length: 255 }),
  nameFr: varchar("nameFr", { length: 255 }),
  nameAr: varchar("nameAr", { length: 255 }),
  descriptionEn: text("descriptionEn"),
  descriptionDe: text("descriptionDe"),
  descriptionEs: text("descriptionEs"),
  descriptionFr: text("descriptionFr"),
  descriptionAr: text("descriptionAr"),
  vehicleClass: mysqlEnum("vehicleClass", ["truck", "bus", "trailer", "hazmat", "passenger"]).default("truck"),
  region: mysqlEnum("region", ["europe", "north_america"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const licenseRequirements = mysqlTable("license_requirements", {
  id: int("id").autoincrement().primaryKey(),
  licenseTypeId: int("licenseTypeId").references(() => licenseTypes.id),
  country: varchar("country", { length: 100 }).notNull(),
  countryCode: varchar("countryCode", { length: 5 }).notNull(),
  requirementsEn: text("requirementsEn"),
  requirementsDe: text("requirementsDe"),
  requirementsEs: text("requirementsEs"),
  requirementsFr: text("requirementsFr"),
  requirementsAr: text("requirementsAr"),
  minimumAge: int("minimumAge"),
  medicalRequired: boolean("medicalRequired").default(true),
  testTypesJson: text("testTypesJson"),
  validityYears: int("validityYears"),
  renewalProcess: text("renewalProcess"),
  sourceUrl: varchar("sourceUrl", { length: 1000 }),
  sourceType: mysqlEnum("sourceType", ["manual", "scraped"]).default("manual"),
  lastVerified: timestamp("lastVerified"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const testMaterials = mysqlTable("test_materials", {
  id: int("id").autoincrement().primaryKey(),
  licenseTypeId: int("licenseTypeId").references(() => licenseTypes.id),
  country: varchar("country", { length: 100 }),
  titleEn: varchar("titleEn", { length: 500 }).notNull(),
  titleDe: varchar("titleDe", { length: 500 }),
  titleEs: varchar("titleEs", { length: 500 }),
  titleFr: varchar("titleFr", { length: 500 }),
  titleAr: varchar("titleAr", { length: 500 }),
  materialType: mysqlEnum("materialType", ["study_guide", "practice_test", "regulations", "handbook"]).default("study_guide"),
  contentUrl: varchar("contentUrl", { length: 1000 }),
  sourceUrl: varchar("sourceUrl", { length: 1000 }),
  sourceType: mysqlEnum("sourceType", ["manual", "scraped"]).default("manual"),
  isOfficial: boolean("isOfficial").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ============================================
// DRIVING LESSONS DIRECTORY MODULE
// ============================================
export const drivingSchools = mysqlTable("driving_schools", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 500 }).notNull(),
  descriptionEn: text("descriptionEn"),
  descriptionDe: text("descriptionDe"),
  descriptionEs: text("descriptionEs"),
  descriptionFr: text("descriptionFr"),
  descriptionAr: text("descriptionAr"),
  address: text("address"),
  city: varchar("city", { length: 255 }),
  state: varchar("state", { length: 255 }),
  country: varchar("country", { length: 100 }),
  countryCode: varchar("countryCode", { length: 5 }),
  region: mysqlEnum("region", ["europe", "north_america"]).notNull(),
  phone: varchar("phone", { length: 50 }),
  email: varchar("email", { length: 320 }),
  website: varchar("website", { length: 500 }),
  licenseTypesJson: text("licenseTypesJson"),
  servicesJson: text("servicesJson"),
  rating: decimal("rating", { precision: 3, scale: 2 }),
  reviewCount: int("reviewCount").default(0),
  priceRange: varchar("priceRange", { length: 100 }),
  imageUrl: varchar("imageUrl", { length: 500 }),
  sourceUrl: varchar("sourceUrl", { length: 1000 }),
  sourceType: mysqlEnum("sourceType", ["manual", "scraped"]).default("manual"),
  isVerified: boolean("isVerified").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const trainingPrograms = mysqlTable("training_programs", {
  id: int("id").autoincrement().primaryKey(),
  schoolId: int("schoolId").references(() => drivingSchools.id),
  titleEn: varchar("titleEn", { length: 500 }).notNull(),
  titleDe: varchar("titleDe", { length: 500 }),
  titleEs: varchar("titleEs", { length: 500 }),
  titleFr: varchar("titleFr", { length: 500 }),
  titleAr: varchar("titleAr", { length: 500 }),
  descriptionEn: text("descriptionEn"),
  descriptionDe: text("descriptionDe"),
  descriptionEs: text("descriptionEs"),
  descriptionFr: text("descriptionFr"),
  descriptionAr: text("descriptionAr"),
  licenseType: varchar("licenseType", { length: 100 }),
  durationWeeks: int("durationWeeks"),
  price: decimal("price", { precision: 10, scale: 2 }),
  currency: varchar("currency", { length: 10 }).default("EUR"),
  includesTheory: boolean("includesTheory").default(true),
  includesPractical: boolean("includesPractical").default(true),
  includesExam: boolean("includesExam").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Type exports
export type CourseCategory = typeof courseCategories.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type TrainingMaterial = typeof trainingMaterials.$inferSelect;
export type Certification = typeof certifications.$inferSelect;
export type JobCategory = typeof jobCategories.$inferSelect;
export type Job = typeof jobs.$inferSelect;
export type ScrapingSource = typeof scrapingSources.$inferSelect;
export type ScrapingLog = typeof scrapingLogs.$inferSelect;
export type EquipmentCategory = typeof equipmentCategories.$inferSelect;
export type Listing = typeof listings.$inferSelect;
export type KnowledgeCategory = typeof knowledgeCategories.$inferSelect;
export type KnowledgeArticle = typeof knowledgeArticles.$inferSelect;
export type LicenseType = typeof licenseTypes.$inferSelect;
export type LicenseRequirement = typeof licenseRequirements.$inferSelect;
export type TestMaterial = typeof testMaterials.$inferSelect;
export type DrivingSchool = typeof drivingSchools.$inferSelect;
export type TrainingProgram = typeof trainingPrograms.$inferSelect;
