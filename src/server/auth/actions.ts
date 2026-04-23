"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { publicAction } from "../safe-action";
import { loginWithOtpFormSchema } from "./models";
import { getURL } from "./queries";

export const loginWithOtp = publicAction(
  loginWithOtpFormSchema,
  async (input) => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOtp({
      email: input.email,
      options: {
        emailRedirectTo: getURL(),
      },
    });

    if (error) {
      throw new Error(error.message);
    }
  }
);

export const logout = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
};
