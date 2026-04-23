"use server";

import { createClient } from "@/utils/supabase/server";
import { authActionClient } from "../safe-action";
import { toggleBookMarkSchema } from "./models";

export const toggleBookmark = authActionClient
  .inputSchema(toggleBookMarkSchema)
  .action(async ({ parsedInput: { quote_id }, ctx: { user_id } }) => {
    const supabase = await createClient();

    let new_state: boolean;

    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("quote_id", quote_id)
      .eq("user_id", user_id)
      .single();

    if (data) {
      await supabase
        .from("bookmarks")
        .delete()
        .eq("quote_id", quote_id)
        .eq("user_id", user_id);

      new_state = false;
    } else {
      await supabase.from("bookmarks").insert({ user_id, quote_id });
      new_state = true;
    }

    return new_state;
  });
