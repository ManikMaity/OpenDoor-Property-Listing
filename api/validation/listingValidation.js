import { z } from "zod";

const imageSchema = z
  .string()
  .max(200, { message: "The image name must be less than 100 characters" })
  .refine((value) => /\.(jpg|jpeg|png|gif|webp)$/i.test(value), {
    message:
      "The image name must end with one of the following extensions: .jpg, .jpeg, .png, .gif, .webp",
  });

export const listingValidation = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name should be a string",
    })
    .min(1, "Name is required")
    .max(100, "Name should be less than 100 characters")
    .trim(),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description should be a string",
    })
    .min(1, "Description is required")
    .max(1000, "Description should be less than 500 characters")
    .trim(),
  propertyType: z
    .string({
      required_error: "Property type is required",
      invalid_type_error: "Property type should be a string",
    })
    .min(1, "Property type is required")
    .max(20, "Property type should be less than 100 characters"),
  address: z
    .string({
      required_error: "Address is required",
      invalid_type_error: "Address should be a string",
    })
    .min(1, "Address is required")
    .max(100, "Address should be less than 100 characters"),
  regularPrice: z
    .number({
      required_error: "Regular price is required",
      invalid_type_error: "Regular price should be a number",
    })
    .min(1, "Regular price should be greater than 0")
    .max(100000000, "Regular price should be less than 100,000,000"),
  discountedPrice: z
    .number({
      required_error: "Discounted price is required",
      invalid_type_error: "Discounted price should be a number",
    })
    .min(0, "Discounted price should be greater than 0 or equal to 0")
    .max(100000000, "Discounted price should be less than 100,000,000"),
  bathrooms: z
    .number({
      required_error: "Bathrooms is required",
      invalid_type_error: "Bathrooms should be a number",
    })
    .min(0, "Bathrooms should be greater than 0 or equal to 0")
    .max(50, "Bathrooms should be less than 50"),
  bedrooms: z
    .number({
      required_error: "Bedrooms is required",
      invalid_type_error: "Bedrooms should be a number",
    })
    .min(0, "Bedrooms should be greater than 0 or equal to 0")
    .max(50, "Bedrooms should be less than 50"),
  area: z
    .number({
      required_error: "Area is required",
      invalid_type_error: "Area should be a number",
    })
    .min(0, "Area should be greater than 0 or equal to 0")
    .max(1000000, "Area should be less than 1,000,000"),
  parkingSpaces: z
    .number({
      required_error: "Parking spaces is required",
      invalid_type_error: "Parking spaces should be a number",
    })
    .min(0, "Parking spaces should be greater than 0 or equal to 0")
    .max(50, "Parking spaces should be less than 50"),
  furnished: z.boolean({
    required_error: "Furnished is required",
    invalid_type_error: "Furnished should be a boolean",
  }),
  offer: z.boolean({
    required_error: "Offer is required",
    invalid_type_error: "Offer should be a boolean",
  }),
  imageUrls: z.array(imageSchema),
  ytVideoUrl: z
    .string({
      required_error: "Youtube video link is required",
      invalid_type_error: "Youtube video link should be a string",
    })
    .refine(
      (url) =>
        /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/.test(
          url
        ),
      { message: "Invalid youtube video link" }
    )
    .optional(),
  facilities: z
    .array(z.string().max(100, "Facilities should be less than 100 characters"))
    .optional(),
});
