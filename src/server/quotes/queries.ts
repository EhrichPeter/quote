"use server";

import { createClient } from "@/utils/supabase/server";
import { PaginatedQuoteResponse, Quote, QuoteWithBookMark } from "./models";

export async function findMany({
  limit = 25,
  pageParam = 0,
}: {
  filterBookmarks?: boolean;
  limit?: number;
  pageParam?: number;
}): Promise<PaginatedQuoteResponse> {
  const supabase = await createClient();
  const { user } = (await supabase.auth.getUser()).data;

  const quoteResult = await supabase
    .from("quotes")
    .select("*, bookmarks(*)")
    .range(pageParam, pageParam + limit - 1)
    .order("created_at", { ascending: false });

  if (quoteResult.error) {
    throw quoteResult.error;
  }

  const res = quoteResult.data.map((quote) => ({
    ...quote,
    bookmarked: user
      ? quote.bookmarks.some((bookmark) => bookmark.user_id === user.id)
      : false,
  }));

  const paginatedResponse = {
    limit,
    cursor: pageParam,
    nextCursor: res.length === limit ? pageParam + limit : undefined,
    data: res,
  };

  return paginatedResponse;
}

export const countBookmarkedQuotes = async () => {
  const supabase = await createClient();
  const { user } = (await supabase.auth.getUser()).data;

  if (!user) {
    return 0;
  }

  const { count } = await supabase
    .from("quotes")
    .select("*, bookmarks(user_id)", { count: "exact", head: true })
    .match({ "bookmarks.user_id": user.id });

  return count ?? 0;
};

export const findOneLatest = async (): Promise<QuoteWithBookMark> => {
  const supabase = await createClient();
  const { user } = (await supabase.auth.getUser()).data;

  const quote = await supabase
    .from("quotes")
    .select("*, bookmarks(*)")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (quote.error) {
    throw quote.error;
  }

  return {
    ...quote.data,
    bookmarked: user
      ? quote.data.bookmarks.some((bookmark) => bookmark.user_id === user.id)
      : false,
  };
};
