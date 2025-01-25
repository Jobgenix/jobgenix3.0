import { z } from "zod";
import { jobTypeSchema, workplaceTypeSchema, stipendTypeSchema, diversityTypeSchema, experienceTypeSchema, degreeTypeSchema, jobStatusSchema, passoutYearSchema, benefitsTypeSchema } from "@/constants/jobOpportunities";

export const opportunitySchema = z.object({
    id: z.string(),
    companyId: z.string(),
    title: z.string(),
    description: z.string(),
    location: z.string().array(),
    duration: z.string(),
    type: jobTypeSchema,
    workplaceType: workplaceTypeSchema,
    stipendType: stipendTypeSchema,
    diversityType: diversityTypeSchema.optional(),
    experience: experienceTypeSchema,
    yearsOfExperience: z.string(),
    degree: degreeTypeSchema.array().optional(),
    benefits: benefitsTypeSchema.array().optional(),
    salary: z.string().optional(),
    graduadtionYear: z.string().optional(),
    status: jobStatusSchema.default("active"),
    jobLink: z.string(),
    passoutYear: passoutYearSchema.array().optional(),
    category: z.string().array().optional(),
    deadline: z.date(),
    postedAt: z.date(),
});

