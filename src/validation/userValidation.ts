import { z } from "zod";

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    photo: z.string().optional(),
    salary: z.string().optional(),
    companyName: z.string().optional(),
  }),
});

export default update;
