"use server";

import { createClient } from "@/utils/supabase/server";
import { getUnsplashPhoto } from "../unsplash/queries";
import { getDailyZenquote } from "../zenquote/queries";
import OpenAI from "openai";

export async function cronCreateOne(): Promise<void> {
  const supabase = createClient();
  const openai = new OpenAI();

  const quote = await getDailyZenquote();

  const keywordCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You will be provided with a block of text, and your task is to extract a keyword from it.",
      },
      {
        role: "user",
        content: quote.q,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const photo = await getUnsplashPhoto(
    keywordCompletion.choices[0].message.content ?? quote.q
  );

  await supabase.from("quotes").insert({
    author: quote.a,
    quote: quote.q,
    picture_link: photo.urls.regular,
    picture_alt: photo.description ?? "An inspirational photo",
  });
}
