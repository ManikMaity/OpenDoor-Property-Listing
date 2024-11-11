import { z } from "zod";

const imageSchema = z
  .string()
  .max(200, { message: "The image name must be less than 100 characters" })
  .refine(
    (value) =>
      /https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/.*\.(jpg|jpeg|png|gif|webp)\?alt=media&token=.*/i.test(
        value
      ),
    {
      message:
        "The image URL must be a valid Firebase Storage link ending in .jpg, .jpeg, .png, .gif, or .webp with an alt=media parameter.",
    }
  )
  .optional();

export const editListingValidation = z.object({
  name: z
    .string({
      invalid_type_error: "Name should be a string",
    })
    .min(1, "Name is required")
    .max(100, "Name should be less than 100 characters")
    .trim()
    .optional(),
  description: z
    .string({
      invalid_type_error: "Description should be a string",
    })
    .min(1, "Description is required")
    .max(1000, "Description should be less than 500 characters")
    .trim()
    .optional(),
  propertyType: z
    .string({
      invalid_type_error: "Property type should be a string",
    })
    .min(1, "Property type is required")
    .max(20, "Property type should be less than 100 characters")
    .optional(),
  address: z
    .string({
      invalid_type_error: "Address should be a string",
    })
    .min(1, "Address is required")
    .max(100, "Address should be less than 100 characters")
    .optional(),
  regularPrice: z
    .number({
      invalid_type_error: "Regular price should be a number",
    })
    .min(1, "Regular price should be greater than 0")
    .max(100000000, "Regular price should be less than 100,000,000")
    .optional(),
  discountedPrice: z
    .number({
      invalid_type_error: "Discounted price should be a number",
    })
    .min(0, "Discounted price should be greater than 0 or equal to 0")
    .max(100000000, "Discounted price should be less than 100,000,000")
    .optional(),
  bathrooms: z
    .number({
      invalid_type_error: "Bathrooms should be a number",
    })
    .min(0, "Bathrooms should be greater than 0 or equal to 0")
    .max(50, "Bathrooms should be less than 50")
    .optional(),
  bedrooms: z
    .number({
      invalid_type_error: "Bedrooms should be a number",
    })
    .min(0, "Bedrooms should be greater than 0 or equal to 0")
    .max(50, "Bedrooms should be less than 50")
    .optional(),
  area: z
    .number({
      invalid_type_error: "Area should be a number",
    })
    .min(0, "Area should be greater than 0 or equal to 0")
    .max(1000000, "Area should be less than 1,000,000")
    .optional(),
  parkingSpaces: z
    .number({
      invalid_type_error: "Parking spaces should be a number",
    })
    .min(0, "Parking spaces should be greater than 0 or equal to 0")
    .max(50, "Parking spaces should be less than 50")
    .optional(),
  furnished: z
    .boolean({
      invalid_type_error: "Furnished should be a boolean",
    })
    .default(false)
    .optional(),
  offer: z
    .boolean({
      invalid_type_error: "Offer should be a boolean",
    })
    .optional(),
  imageUrls: z.array(imageSchema).optional(),
  ytVideoUrl: z
    .string({
      invalid_type_error: "Youtube video link should be a string",
    })
    .optional(),
  facilities: z
    .array(z.string().max(100, "Facilities should be less than 100 characters"))
    .optional(),
  sellType: z
    .enum(["rent", "sale"], {
      invalid_type_error: "Sell type should be a string",
    })
    .optional(),
});
