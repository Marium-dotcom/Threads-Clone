import * as z from "zod";

export const CommentValidation = z.object({
  thread: z.string().nonempty().min(1, { message: "Minimum 1 characters." }),
  accountId: z.string(),
});