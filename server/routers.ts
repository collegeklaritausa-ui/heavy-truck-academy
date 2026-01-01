import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { 
  getCourses, 
  getJobs, 
  getMarketplaceListings, 
  getKnowledgeArticles,
  getLicenseGuides,
  getDrivingSchools,
  getCourseById,
  getJobById,
  getListingById,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // Academy Module
  academy: router({
    getCourses: publicProcedure
      .input(z.object({
        category: z.string().optional(),
        level: z.enum(["beginner", "intermediate", "advanced", "expert"]).optional(),
        search: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      }).optional())
      .query(async ({ input }) => {
        return getCourses(input);
      }),
    
    getCourseById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getCourseById(input.id);
      }),
    
    enrollCourse: protectedProcedure
      .input(z.object({ courseId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        // Enrollment logic would go here
        return { success: true, message: "Enrolled successfully" };
      }),
  }),

  // Job Board Module
  jobs: router({
    getJobs: publicProcedure
      .input(z.object({
        region: z.enum(["europe", "north_america"]).optional(),
        employmentType: z.enum(["full_time", "part_time", "contract", "temporary"]).optional(),
        experienceLevel: z.enum(["entry", "mid", "senior", "executive"]).optional(),
        search: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      }).optional())
      .query(async ({ input }) => {
        return getJobs(input);
      }),
    
    getJobById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getJobById(input.id);
      }),
    
    saveJob: protectedProcedure
      .input(z.object({ jobId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return { success: true, message: "Job saved" };
      }),
  }),

  // Marketplace Module
  marketplace: router({
    getListings: publicProcedure
      .input(z.object({
        category: z.string().optional(),
        condition: z.enum(["new", "like_new", "good", "fair", "parts"]).optional(),
        minPrice: z.number().optional(),
        maxPrice: z.number().optional(),
        search: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      }).optional())
      .query(async ({ input }) => {
        return getMarketplaceListings(input);
      }),
    
    getListingById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getListingById(input.id);
      }),
    
    createListing: protectedProcedure
      .input(z.object({
        titleEn: z.string().min(5).max(200),
        descriptionEn: z.string().min(20).max(5000),
        price: z.number().positive(),
        currency: z.string().length(3),
        condition: z.enum(["new", "like_new", "good", "fair", "parts"]),
        category: z.string(),
        location: z.string(),
        country: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        // Create listing logic would go here
        return { success: true, message: "Listing created" };
      }),
  }),

  // Knowledge Base Module
  knowledge: router({
    getArticles: publicProcedure
      .input(z.object({
        category: z.string().optional(),
        articleType: z.enum(["repair_guide", "fabrication", "maintenance", "troubleshooting", "general"]).optional(),
        search: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      }).optional())
      .query(async ({ input }) => {
        return getKnowledgeArticles(input);
      }),
  }),

  // License Guides Module
  licenses: router({
    getGuides: publicProcedure
      .input(z.object({
        region: z.enum(["europe", "north_america"]).optional(),
        country: z.string().optional(),
      }).optional())
      .query(async ({ input }) => {
        return getLicenseGuides(input);
      }),
  }),

  // Driving Schools Module
  schools: router({
    getSchools: publicProcedure
      .input(z.object({
        region: z.enum(["europe", "north_america"]).optional(),
        country: z.string().optional(),
        search: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      }).optional())
      .query(async ({ input }) => {
        return getDrivingSchools(input);
      }),
  }),

  // Admin Module (protected)
  admin: router({
    getStats: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }
      // Return dashboard stats
      return {
        totalUsers: 52847,
        activeCourses: 2543,
        jobListings: 15234,
        marketplaceItems: 8567,
      };
    }),
    
    getScrapingStatus: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return [
        { source: "Indeed Jobs", status: "active", lastRun: new Date(), itemsScraped: 1234 },
        { source: "LinkedIn Jobs", status: "active", lastRun: new Date(), itemsScraped: 892 },
        { source: "Monster Jobs", status: "active", lastRun: new Date(), itemsScraped: 567 },
      ];
    }),
  }),
});

export type AppRouter = typeof appRouter;
