import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Create a mock context for testing public procedures
function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

// Create a mock context for testing protected procedures
function createAuthContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user",
      email: "test@example.com",
      name: "Test User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Academy Routes", () => {
  it("getCourses returns an array", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.academy.getCourses();
    
    expect(Array.isArray(result)).toBe(true);
  });

  it("getCourses accepts filter parameters", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.academy.getCourses({
      level: "beginner",
      limit: 10,
      offset: 0,
    });
    
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("Jobs Routes", () => {
  it("getJobs returns an array", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.jobs.getJobs();
    
    expect(Array.isArray(result)).toBe(true);
  });

  it("getJobs accepts region filter", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.jobs.getJobs({
      region: "europe",
      limit: 10,
    });
    
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("Marketplace Routes", () => {
  it("getListings returns an array", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.marketplace.getListings();
    
    expect(Array.isArray(result)).toBe(true);
  });

  it("getListings accepts condition filter", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.marketplace.getListings({
      condition: "good",
      limit: 10,
    });
    
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("Knowledge Routes", () => {
  it("getArticles returns an array", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.knowledge.getArticles();
    
    expect(Array.isArray(result)).toBe(true);
  });

  it("getArticles accepts articleType filter", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.knowledge.getArticles({
      articleType: "repair_guide",
      limit: 10,
    });
    
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("Licenses Routes", () => {
  it("getGuides returns an array", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.licenses.getGuides();
    
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("Schools Routes", () => {
  it("getSchools returns an array", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.schools.getSchools();
    
    expect(Array.isArray(result)).toBe(true);
  });

  it("getSchools accepts region filter", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.schools.getSchools({
      region: "europe",
      limit: 10,
    });
    
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("Auth Routes", () => {
  it("me returns null for unauthenticated users", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.auth.me();
    
    expect(result).toBeNull();
  });

  it("me returns user for authenticated users", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.auth.me();
    
    expect(result).not.toBeNull();
    expect(result?.email).toBe("test@example.com");
  });
});
