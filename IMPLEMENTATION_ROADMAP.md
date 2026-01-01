# Heavy Truck Academy - Implementation Roadmap

## Quick Start for Feature Development

This document provides step-by-step guides for implementing each major feature from the MEGA_PROMPT.

---

## Feature Implementation Templates

### Template 1: Adding a New Database Table

**Step 1: Create Migration**
```sql
-- drizzle/migrations/add_new_feature.sql
CREATE TABLE new_feature (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  data TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

**Step 2: Update Schema** (`drizzle/schema.ts`)
```typescript
import { int, text, timestamp, mysqlTable } from "drizzle-orm/mysql-core";

export const newFeature = mysqlTable("new_feature", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  data: text("data"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
```

**Step 3: Add Query Helper** (`server/db.ts`)
```typescript
export async function getNewFeatureData(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(newFeature).where(eq(newFeature.userId, userId));
}
```

**Step 4: Create tRPC Router** (`server/routers.ts`)
```typescript
newFeature: router({
  get: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      return getNewFeatureData(input.userId);
    }),
  
  create: protectedProcedure
    .input(z.object({ data: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Implementation here
    }),
}),
```

**Step 5: Build UI Component** (`client/src/pages/NewFeature.tsx`)
```typescript
import { trpc } from "@/lib/trpc";

export default function NewFeature() {
  const { data, isLoading } = trpc.newFeature.get.useQuery({ userId: 1 });
  
  return (
    <div>
      {isLoading ? <Skeleton /> : <div>{/* Render data */}</div>}
    </div>
  );
}
```

**Step 6: Write Tests** (`server/newFeature.test.ts`)
```typescript
import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";

describe("newFeature", () => {
  it("should fetch user data", async () => {
    // Test implementation
  });
});
```

---

### Template 2: Implementing a Payment Feature

**Step 1: Install Stripe**
```bash
pnpm add stripe @stripe/react-stripe-js @stripe/stripe-js
```

**Step 2: Add Stripe Keys to Environment**
```bash
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

**Step 3: Create Payment Handler** (`server/payments.ts`)
```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createPaymentIntent(amount: number, userId: number) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to cents
    currency: 'usd',
    metadata: { userId },
  });
  return paymentIntent;
}

export async function handleWebhook(event: Stripe.Event) {
  switch (event.type) {
    case 'payment_intent.succeeded':
      // Handle successful payment
      break;
    case 'payment_intent.payment_failed':
      // Handle failed payment
      break;
  }
}
```

**Step 4: Create Payment Route** (`server/routers.ts`)
```typescript
payments: router({
  createPaymentIntent: protectedProcedure
    .input(z.object({ amount: z.number(), planId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return createPaymentIntent(input.amount, ctx.user.id);
    }),
}),
```

**Step 5: Build Payment Component** (`client/src/components/PaymentForm.tsx`)
```typescript
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY!);

export function PaymentForm() {
  const stripe = useStripe();
  // Implementation
}
```

---

### Template 3: Adding Video Streaming

**Step 1: Setup Video Storage**
```typescript
// server/videoStorage.ts
import { storagePut } from "./storage";

export async function uploadVideo(fileBuffer: Buffer, fileName: string) {
  const key = `videos/${Date.now()}-${fileName}`;
  const { url } = await storagePut(key, fileBuffer, "video/mp4");
  return { url, key };
}
```

**Step 2: Create Video Player Component** (`client/src/components/VideoPlayer.tsx`)
```typescript
import { useRef, useState } from 'react';

export function VideoPlayer({ videoUrl }: { videoUrl: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  
  return (
    <video
      ref={videoRef}
      src={videoUrl}
      controls
      onTimeUpdate={(e) => {
        const current = e.currentTarget.currentTime;
        const duration = e.currentTarget.duration;
        setProgress((current / duration) * 100);
      }}
      className="w-full"
    />
  );
}
```

**Step 3: Track Video Progress**
```typescript
// server/routers.ts
mechanics: router({
  updateLessonProgress: protectedProcedure
    .input(z.object({
      lessonId: z.number(),
      watchedSeconds: z.number(),
      completed: z.boolean(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Update progress in database
    }),
}),
```

---

### Template 4: Building an Analytics Dashboard

**Step 1: Create Analytics Events**
```typescript
// client/src/lib/analytics.ts
export function trackEvent(eventName: string, properties: Record<string, any>) {
  // Send to analytics service
  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify({ eventName, properties }),
  });
}
```

**Step 2: Create Analytics Table**
```sql
CREATE TABLE analytics_events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT,
  eventName VARCHAR(255),
  properties JSON,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Step 3: Build Dashboard** (`client/src/pages/Analytics.tsx`)
```typescript
import { LineChart, Line, XAxis, YAxis } from 'recharts';

export function AnalyticsDashboard() {
  const { data: stats } = trpc.admin.getAnalytics.useQuery();
  
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard title="Total Users" value={stats?.totalUsers} />
      <StatCard title="Active Courses" value={stats?.activeCourses} />
      <LineChart data={stats?.dailySignups}>
        <XAxis dataKey="date" />
        <YAxis />
        <Line type="monotone" dataKey="count" stroke="#ff6b35" />
      </LineChart>
    </div>
  );
}
```

---

## Feature-Specific Implementation Guides

### Premium Subscription System

**Database Schema**:
```sql
CREATE TABLE subscriptions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL UNIQUE,
  tier ENUM('free', 'pro', 'enterprise') DEFAULT 'free',
  billingCycle ENUM('monthly', 'annual') DEFAULT 'monthly',
  status ENUM('active', 'cancelled', 'expired') DEFAULT 'active',
  stripeCustomerId VARCHAR(255),
  stripeSubscriptionId VARCHAR(255),
  currentPeriodStart TIMESTAMP,
  currentPeriodEnd TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE subscription_features (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tier VARCHAR(50),
  featureName VARCHAR(255),
  enabled BOOLEAN DEFAULT true,
  limit INT
);
```

**API Implementation**:
```typescript
// Check subscription status
export async function checkSubscriptionAccess(userId: number, feature: string) {
  const subscription = await db.select().from(subscriptions)
    .where(eq(subscriptions.userId, userId));
  
  const features = await db.select().from(subscriptionFeatures)
    .where(eq(subscriptionFeatures.tier, subscription[0].tier));
  
  return features.some(f => f.featureName === feature && f.enabled);
}
```

**Middleware**:
```typescript
export const subscriptionMiddleware = async (ctx: TrpcContext, next: any) => {
  const hasAccess = await checkSubscriptionAccess(ctx.user.id, 'premium_feature');
  if (!hasAccess) throw new Error('Subscription required');
  return next({ ctx });
};
```

---

### Discussion Forums

**Database Schema**:
```sql
CREATE TABLE forum_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nameEn VARCHAR(255),
  descriptionEn TEXT,
  slug VARCHAR(255) UNIQUE,
  icon VARCHAR(100),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE forum_threads (
  id INT PRIMARY KEY AUTO_INCREMENT,
  categoryId INT NOT NULL,
  userId INT NOT NULL,
  title VARCHAR(500),
  content TEXT,
  viewCount INT DEFAULT 0,
  replyCount INT DEFAULT 0,
  isPinned BOOLEAN DEFAULT false,
  isClosed BOOLEAN DEFAULT false,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (categoryId) REFERENCES forum_categories(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE forum_replies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  threadId INT NOT NULL,
  userId INT NOT NULL,
  content TEXT,
  upvotes INT DEFAULT 0,
  isAccepted BOOLEAN DEFAULT false,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (threadId) REFERENCES forum_threads(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

**tRPC Router**:
```typescript
forum: router({
  getThreads: publicProcedure
    .input(z.object({ categoryId: z.number(), limit: z.number().default(20) }))
    .query(async ({ input }) => {
      // Fetch threads
    }),
  
  createThread: protectedProcedure
    .input(z.object({ categoryId: z.number(), title: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Create thread
    }),
  
  replyToThread: protectedProcedure
    .input(z.object({ threadId: z.number(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Add reply
    }),
}),
```

---

### Instructor Program

**Database Schema**:
```sql
CREATE TABLE instructors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL UNIQUE,
  verificationStatus ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
  bio TEXT,
  profileImage VARCHAR(500),
  specializations JSON,
  totalStudents INT DEFAULT 0,
  averageRating DECIMAL(3,2),
  totalEarnings DECIMAL(12,2) DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE instructor_courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  instructorId INT NOT NULL,
  courseId INT NOT NULL,
  revenue DECIMAL(12,2) DEFAULT 0,
  studentCount INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (instructorId) REFERENCES instructors(id),
  FOREIGN KEY (courseId) REFERENCES courses(id)
);
```

**Dashboard Component**:
```typescript
export function InstructorDashboard() {
  const { data: instructor } = trpc.instructor.getProfile.useQuery();
  const { data: earnings } = trpc.instructor.getEarnings.useQuery();
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <StatCard title="Total Students" value={instructor?.totalStudents} />
        <StatCard title="Average Rating" value={instructor?.averageRating} />
        <StatCard title="Total Earnings" value={`$${earnings?.total}`} />
      </div>
      {/* Course management, earnings charts, etc. */}
    </div>
  );
}
```

---

## Testing Guidelines

### Unit Tests
```typescript
// server/features.test.ts
import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";

describe("Feature Name", () => {
  it("should perform action correctly", async () => {
    const caller = appRouter.createCaller(mockContext);
    const result = await caller.feature.action({ input: "test" });
    expect(result).toBeDefined();
  });
});
```

### Integration Tests
```typescript
// Use test database and full context
describe("Feature Integration", () => {
  it("should work end-to-end", async () => {
    // Create test data
    // Call API
    // Verify results in database
  });
});
```

### E2E Tests
```typescript
// Use Playwright for browser testing
import { test, expect } from '@playwright/test';

test('user can complete feature flow', async ({ page }) => {
  await page.goto('/feature');
  await page.click('button:has-text("Start")');
  await expect(page).toHaveURL('/feature/success');
});
```

---

## Deployment Checklist

- [ ] All tests passing
- [ ] Database migrations applied
- [ ] Environment variables set
- [ ] Code reviewed and approved
- [ ] Performance benchmarks met
- [ ] Security audit completed
- [ ] Documentation updated
- [ ] Monitoring configured
- [ ] Rollback plan prepared
- [ ] Stakeholders notified

---

## Common Pitfalls & Solutions

**Pitfall 1: N+1 Query Problem**
- **Problem**: Loading related data in loops
- **Solution**: Use database joins or batch loading

**Pitfall 2: Unhandled Errors**
- **Problem**: API calls without error handling
- **Solution**: Use try-catch and proper error responses

**Pitfall 3: Performance Issues**
- **Problem**: Slow queries on large datasets
- **Solution**: Add indexes, use pagination, cache results

**Pitfall 4: Type Safety**
- **Problem**: Missing TypeScript types
- **Solution**: Use strict mode, validate all inputs with Zod

---

## Resources

- [tRPC Documentation](https://trpc.io)
- [Drizzle ORM Guide](https://orm.drizzle.team)
- [React Best Practices](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Last Updated**: December 31, 2025
