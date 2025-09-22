import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  varchar,
  pgEnum,
  uuid,
  jsonb,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  gender: text("gender").notNull().default("male"), // ✅ match Neon default
  phoneNumber: text("phoneNumber").notNull(), // New field for phone number
  password: text("password"),
  salt: text("passwordSalt"),
  roleId: text("role_id").references(() => roles.id),
  location: text("location").array(), // User's location
  university: text("university"), // User's university
  summary: text("summary"), // User's summary or bio
  resumeUrl: text("resume_url"),
  skills: text("skills"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const roles = pgTable("roles", {
  id: text("id").primaryKey(),
  role: varchar("role", { length: 50 }).unique().notNull(), // 'candidate', 'employer'
  permissions: text("permissions").notNull(), // Comma-separated permissions
});

export const companies = pgTable("companies", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  logo: text("logo"),
  website: text("website").notNull(),
});

export const jobTypeEnum = pgEnum("type", ["contracts", "jobs", "internships"]);
export const workplaceTypeEnum = pgEnum("workplaceType", [
  "remote",
  "office",
  "hybrid",
]);
export const stipendTypeEnum = pgEnum("stipendType", [
  "fixed",
  "performance-based",
  "unpaid",
  "fixed + performance-based",
]);
export const diversityTypeEnum = pgEnum("diversityType", [
  "female",
  "male",
  "transgender",
  "intersex",
  "non-binary",
  "other",
]);
export const experienceTypeEnum = pgEnum("experienceType", [
  "fresher",
  "experienced",
  "both",
]);
export const degreeTypeEnum = pgEnum("degreeType", [
  "bachelor",
  "master",
  "dual",
  "other",
  "all",
]);
export const benefitsTypeEnum = pgEnum("benefitsType", [
  "health-insurance",
  "paid-leave",
  "work-from-home",
  "flexible-hours",
  "performance-bonus",
  "other",
]);
export const jobStatusEnum = pgEnum("status", ["active", "inactive", "filled"]);
export const passoutYearEnum = pgEnum("passoutYear", [
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
]);

export const fieldEnum = pgEnum("field", [
  "engineering",
  "business",
  "design",
  "arts",
  "science",
  "commerce",
  "medical",
  "law",
  "other",
]);

export const opportunities = pgTable("opportunities", {
  id: text("id").primaryKey(),
  companyId: text("companyId").references(() => companies.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  duration: text("duration").notNull().default("not-declared"),
  location: text("location").array().notNull(),
  type: jobTypeEnum("type").notNull(),
  workplaceType: workplaceTypeEnum("workplaceType").notNull(),
  stipendType: stipendTypeEnum("stipendType").notNull(),
  diversityType: diversityTypeEnum("diversityType"),
  experience: experienceTypeEnum("experience").notNull(),
  yearsOfExperience: text("yearsOfExperience").notNull(),
  degree: text("degree").array(), // Reference degree table
  benefits: benefitsTypeEnum("benefitsType").array(),
  salary: text("salary"),
  status: jobStatusEnum("status").notNull().default("active"),
  jobLink: text("jobLink").notNull(),
  passoutYear: passoutYearEnum("passoutYear").array(),
  category: text("category").array(), // Add a category table and reference it here
  deadline: timestamp("deadline", { mode: "date" }).notNull(),
  postedAt: timestamp("postedAt", { mode: "date" }).notNull(),
  requiredSkils: text("requiredSkils"),
});

export const degrees = pgTable("degrees", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  field: fieldEnum("field").notNull(),
});

export const blog = pgTable("blog", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  content: jsonb("content").notNull(), // Storing Editor.js data as JSON
  tags: text("tags").array(),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // FK to user table
  createdAt: timestamp("created_at").defaultNow(),
  featuredImage: text("featured_image"), // Cloudinary image URL (nullable)
  category: text("category"),
  subcategory: text("subcategory"),
});

export const gwjenrollment = pgTable("gwjenrollment", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 20 }).notNull(),
  college: varchar("college", { length: 150 }).notNull(),
  referralname: varchar("referralname", { length: 100 }),
  // ENUM-like check constraint in SQL can be modeled using union enums
  source: text("source", {
    enum: ["Our Website", "LinkedIn", "Instagram", "YouTube", "Referral"],
  }).notNull(),
  subject: text("subject", {
    enum: [
      "Trending Course",
      "Aptitude",
      "Crack on campus placement",
      "Interview Preparation",
      "Core Subjects",
      "Management Subjects",
      "Crack Product - Based Companies",
    ],
  }).notNull(),

  payment_id: uuid("payment_id").references(() => orders.id, {
    onDelete: "cascade",
  }),

  screenshot: varchar("screenshot", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  order_id: varchar("order_id", { length: 128 }).notNull(), // razorpay order id
  amount: integer("amount").notNull(), // in paise
  currency: varchar("currency", { length: 8 }).default("INR").notNull(),
  status: varchar("status", { length: 32 }).notNull(), // created / paid / failed
  user_id: varchar("user_id", { length: 128 }).references(() => users.id, {
    onDelete: "cascade",
  }), // your user id reference
  razorpay_payment_id: varchar("razorpay_payment_id", {
    length: 128,
  }),
  razorpay_signature: varchar("razorpay_signature", { length: 256 }),
  meta: text("meta"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
