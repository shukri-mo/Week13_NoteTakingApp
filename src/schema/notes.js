import { z } from "zod";

export const noteSchema = z.object({
  //TODO: create the title and content schema, 
  // Make sure the title is required and the content is required
  // Make sure the title is max 50 characters and the content is max 500 characters
  title:z.string().min(5),
  content:z.string().min(5)

  });