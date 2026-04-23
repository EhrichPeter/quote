"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginWithOtp } from "@/server/auth/actions";
import { loginWithOtpFormSchema } from "@/server/auth/models";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookmarkIcon,
  ChevronLeftIcon,
  LoaderIcon,
  QuoteIcon,
  SparklesIcon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type loginFormType = z.infer<typeof loginWithOtpFormSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginFormType>({
    resolver: zodResolver(loginWithOtpFormSchema),
  });

  const { execute, status } = useAction(loginWithOtp, {
    onSuccess: () => {
      toast("Magic link sent!", {
        description: "Check your email to login.",
      });
      reset();
    },
    onError: (error) => {
      if (error.validationErrors) {
        toast("Something went wrong!", {
          description: "Please check your email and try again.",
        });
      } else if (error.serverError) {
        toast("Something went wrong!", {
          description: error.serverError,
        });
      }
    },
  });

  const onSubmit = handleSubmit(async (data: loginFormType) => {
    execute(data);
  });

  return (
    <div className="flex min-h-screen w-full justify-center lg:grid lg:grid-cols-2">
      <div className="fixed left-5 top-5 z-10">
        <Link href="/">
          <Button variant="ghost">
            <ChevronLeftIcon className="h-5 w-5" />
            <span className="ml-1">Back</span>
          </Button>
        </Link>
      </div>
      <div className="container flex items-center justify-center">
        <div className="mx-auto grid w-full gap-6 sm:w-[360px]">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email and we&apos;ll send you a magic link to sign in.
            </p>
          </div>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email?.message && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={status === "executing"}
              className="w-full"
            >
              {status === "executing" ? (
                <LoaderIcon className="h-4 w-4 animate-spin" />
              ) : (
                "Send magic link"
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              No password needed — we&apos;ll email you a one-time link.
            </p>
          </form>
        </div>
      </div>
      <div className="relative hidden overflow-hidden bg-muted lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-muted to-primary/10" />
        <div className="relative flex h-full flex-col items-center justify-center gap-10 p-12">
          <QuoteIcon className="h-16 w-16 text-primary/70" />
          <blockquote className="max-w-md text-center">
            <p className="text-balance text-2xl font-semibold italic leading-snug">
              &ldquo;The only way to do great work is to love what you do.&rdquo;
            </p>
            <footer className="mt-3 text-sm text-muted-foreground">
              — Steve Jobs
            </footer>
          </blockquote>
          <ul className="grid gap-4 text-sm text-muted-foreground">
            <li className="flex items-center gap-3">
              <SparklesIcon className="h-4 w-4 text-primary/70" />
              A fresh quote every day, paired with a beautiful photo.
            </li>
            <li className="flex items-center gap-3">
              <BookmarkIcon className="h-4 w-4 text-primary/70" />
              Bookmark the quotes that move you and revisit them anytime.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
