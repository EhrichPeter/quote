"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { actionClient } from "../safe-action";
import { loginWithOtpFormSchema } from "./models";
import { getURL } from "./queries";

export const loginWithOtp = actionClient
  .inputSchema(loginWithOtpFormSchema)
  .action(async ({ parsedInput }) => {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithOtp({
      email: parsedInput.email,
      options: {
        emailRedirectTo: getURL(),
      },
    });

    if (error) {
      throw new Error(error.message);
    }
  });

export const logout = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
};
