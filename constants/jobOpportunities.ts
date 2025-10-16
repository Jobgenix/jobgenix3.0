import {
  benefitsTypeEnum,
  degreeTypeEnum,
  diversityTypeEnum,
  experienceTypeEnum,
  jobStatusEnum,
  jobTypeEnum,
  passoutYearEnum,
  stipendTypeEnum,
  workplaceTypeEnum,
} from "@/lib/schema";
import { z } from "zod";

export const jobTypeSchema = z.enum(jobTypeEnum.enumValues);
export const workplaceTypeSchema = z.enum(workplaceTypeEnum.enumValues);
export const stipendTypeSchema = z.enum(stipendTypeEnum.enumValues);
export const diversityTypeSchema = z.enum(diversityTypeEnum.enumValues);
export const experienceTypeSchema = z.enum(experienceTypeEnum.enumValues);
export const degreeTypeSchema = z.enum(degreeTypeEnum.enumValues);
export const benefitsTypeSchema = z.enum(benefitsTypeEnum.enumValues);
export const jobStatusSchema = z.enum(jobStatusEnum.enumValues);
export const passoutYearSchema = z.enum(passoutYearEnum.enumValues);
export const referralSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  designation: z.string().min(1, "Designation is required"),
  mail: z.string().email("Invalid email"),
  linkedin: z.string().url("Invalid LinkedIn URL"),
});
