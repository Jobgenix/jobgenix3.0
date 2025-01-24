import { object, string } from "zod";

export const addCompanySchema = object({
    name: string({ required_error: "Name is required" })
        .min(1, "Name is required"),

    website: string({ required_error: "Website is required" })
        .min(1, "Website is required").url("Invalid URL"),

    logo: string({ required_error: "Logo is required" }).min(1, "Logo is required").url("Invalid URL").optional(),

    // description: string({ required_error: "Description is required" })
    //     .min(1, "Description is required"),
});