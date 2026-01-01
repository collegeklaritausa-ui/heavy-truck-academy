import { eq, like, and, or, desc, asc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  courses, 
  jobs, 
  listings as marketplaceListings, 
  knowledgeArticles,
  licenseRequirements as licenseGuides,
  drivingSchools,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// User functions
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Course functions
interface GetCoursesInput {
  category?: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  search?: string;
  limit?: number;
  offset?: number;
}

export async function getCourses(input?: GetCoursesInput) {
  const db = await getDb();
  if (!db) return [];

  const { category, level, search, limit = 20, offset = 0 } = input || {};
  
  let query = db.select().from(courses);
  
  const conditions = [];
  if (category) conditions.push(eq(courses.categoryId, parseInt(category)));
  if (level) conditions.push(eq(courses.level, level));
  if (search) conditions.push(like(courses.titleEn, `%${search}%`));
  
  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as typeof query;
  }
  
  return query.orderBy(desc(courses.createdAt)).limit(limit).offset(offset);
}

export async function getCourseById(id: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(courses).where(eq(courses.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// Job functions
interface GetJobsInput {
  region?: "europe" | "north_america";
  employmentType?: "full_time" | "part_time" | "contract" | "temporary";
  experienceLevel?: "entry" | "mid" | "senior" | "executive";
  search?: string;
  limit?: number;
  offset?: number;
}

export async function getJobs(input?: GetJobsInput) {
  const db = await getDb();
  if (!db) return [];

  const { region, employmentType, experienceLevel, search, limit = 20, offset = 0 } = input || {};
  
  let query = db.select().from(jobs);
  
  const conditions = [];
  if (region) conditions.push(eq(jobs.region, region));
  if (employmentType) conditions.push(eq(jobs.employmentType, employmentType));
  if (experienceLevel) conditions.push(eq(jobs.experienceLevel, experienceLevel));
  if (search) conditions.push(like(jobs.titleEn, `%${search}%`));
  
  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as typeof query;
  }
  
  return query.orderBy(desc(jobs.postedAt)).limit(limit).offset(offset);
}

export async function getJobById(id: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// Marketplace functions
interface GetListingsInput {
  category?: string;
  condition?: "new" | "like_new" | "good" | "fair" | "parts";
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  limit?: number;
  offset?: number;
}

export async function getMarketplaceListings(input?: GetListingsInput) {
  const db = await getDb();
  if (!db) return [];

  const { category, condition, search, limit = 20, offset = 0 } = input || {};
  
  let query = db.select().from(marketplaceListings);
  
  const conditions = [];
  if (category) conditions.push(eq(marketplaceListings.categoryId, parseInt(category)));
  if (condition) conditions.push(eq(marketplaceListings.condition, condition));
  if (search) conditions.push(like(marketplaceListings.titleEn, `%${search}%`));
  
  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as typeof query;
  }
  
  return query.orderBy(desc(marketplaceListings.createdAt)).limit(limit).offset(offset);
}

export async function getListingById(id: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(marketplaceListings).where(eq(marketplaceListings.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// Knowledge Base functions
interface GetArticlesInput {
  category?: string;
  articleType?: "repair_guide" | "fabrication" | "maintenance" | "troubleshooting" | "general";
  search?: string;
  limit?: number;
  offset?: number;
}

export async function getKnowledgeArticles(input?: GetArticlesInput) {
  const db = await getDb();
  if (!db) return [];

  const { category, articleType, search, limit = 20, offset = 0 } = input || {};
  
  let query = db.select().from(knowledgeArticles);
  
  const conditions = [];
  if (category) conditions.push(eq(knowledgeArticles.categoryId, parseInt(category)));
  if (articleType) conditions.push(eq(knowledgeArticles.articleType, articleType));
  if (search) conditions.push(like(knowledgeArticles.titleEn, `%${search}%`));
  
  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as typeof query;
  }
  
  return query.orderBy(desc(knowledgeArticles.createdAt)).limit(limit).offset(offset);
}

// License Guides functions
interface GetLicenseGuidesInput {
  region?: "europe" | "north_america";
  country?: string;
}

export async function getLicenseGuides(input?: GetLicenseGuidesInput) {
  const db = await getDb();
  if (!db) return [];

  const { region, country } = input || {};
  
  let query = db.select().from(licenseGuides);
  
  const conditions = [];
  // Note: licenseRequirements doesn't have region field, filter by country instead
  if (country) conditions.push(eq(licenseGuides.country, country));
  
  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as typeof query;
  }
  
  return query.orderBy(asc(licenseGuides.country));
}

// Driving Schools functions
interface GetSchoolsInput {
  region?: "europe" | "north_america";
  country?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export async function getDrivingSchools(input?: GetSchoolsInput) {
  const db = await getDb();
  if (!db) return [];

  const { region, country, search, limit = 20, offset = 0 } = input || {};
  
  let query = db.select().from(drivingSchools);
  
  const conditions = [];
  if (region) conditions.push(eq(drivingSchools.region, region));
  if (country) conditions.push(eq(drivingSchools.country, country));
  if (search) conditions.push(like(drivingSchools.name, `%${search}%`));
  
  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as typeof query;
  }
  
  return query.orderBy(desc(drivingSchools.rating)).limit(limit).offset(offset);
}
