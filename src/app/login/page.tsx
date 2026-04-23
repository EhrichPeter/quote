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
    <div className="relative flex min-h-screen w-full justify-center lg:grid lg:grid-cols-2">
      <Link
        href="/"
        className="fixed left-5 top-5 z-20 inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/60 px-3 py-1.5 text-sm text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Back
      </Link>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden lg:hidden"
      >
        <div className="absolute left-1/2 top-[-20%] h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="flex items-center justify-center px-6 py-20">
        <div className="mx-auto grid w-full gap-8 sm:w-[380px]">
          <div className="flex flex-col items-center gap-2 text-center">
            <span
              aria-hidden
              className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 text-lg font-semibold text-primary-foreground shadow-soft"
            >
              &ldquo;
            </span>
            <h1 className="font-display text-4xl font-normal tracking-tight">
              Welcome back
            </h1>
            <p className="text-balance text-sm text-muted-foreground">
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
                className={errors.email ? "border-destructive" : ""}
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
              className="w-full rounded-full"
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

      <div className="relative hidden overflow-hidden border-l border-border/70 bg-muted/30 lg:block">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-fuchsia-500/10 dark:from-primary/30 dark:via-background dark:to-fuchsia-500/10"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-grid opacity-50 mask-radial-fade"
        />
        <div
          aria-hidden
          className="absolute left-[20%] top-[10%] h-64 w-64 rounded-full bg-primary/30 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute bottom-[10%] right-[10%] h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl"
        />

        <div className="relative flex h-full flex-col justify-between p-12">
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60 text-sm font-semibold text-primary-foreground shadow-soft"
            >
              &ldquo;
            </span>
            <span className="text-sm font-semibold tracking-tight">Quote</span>
          </div>

          <figure className="max-w-md">
            <p className="font-display text-balance text-4xl leading-tight tracking-tight">
              &ldquo;The only way to do great work is to love what you do.&rdquo;
            </p>
            <figcaption className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              — Steve Jobs
            </figcaption>
          </figure>

          <ul className="grid gap-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                <SparklesIcon className="h-3.5 w-3.5" />
              </span>
              A fresh quote every day, paired with a beautiful photo.
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BookmarkIcon className="h-3.5 w-3.5" />
              </span>
              Bookmark the quotes that move you and revisit them anytime.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
