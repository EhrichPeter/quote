import { createClient } from "@/utils/supabase/server";
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof Error) {
      return e.message;
    }
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const supabase = await createClient();
  const { user } = (await supabase.auth.getUser()).data;

  if (!user) {
    throw new Error("Log in to perform this action");
  }

  return next({ ctx: { user_id: user.id } });
});
