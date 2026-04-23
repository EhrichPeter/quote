"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginWithOtp } from "@/server/auth/actions";
import { loginWithOtpFormSchema } from "@/server/auth/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon, LoaderIcon } from "lucide-react";
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
      toast("Magic link sent", {
        description: "Check your email to sign in.",
      });
      reset();
    },
    onError: ({ error }) => {
      if (error.validationErrors) {
        toast("Check your email", {
          description: "Please enter a valid address.",
        });
      } else if (error.serverError) {
        toast("Something went wrong", {
          description:
            typeof error.serverError === "string"
              ? error.serverError
              : "Please try again.",
        });
      }
    },
  });

  const onSubmit = handleSubmit(async (data: loginFormType) => {
    execute(data);
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <Link
        href="/"
        className="fixed left-5 top-5 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Back
      </Link>

      <div className="mx-auto flex w-full max-w-sm flex-col gap-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Quote
          </p>
          <h1 className="font-display text-3xl tracking-tight">
            Sign in
          </h1>
          <p className="text-balance text-sm text-muted-foreground">
            We&apos;ll email you a one-time link — no password.
          </p>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-xs text-muted-foreground">
              Email
            </Label>
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
              <p className="text-xs text-destructive">{errors.email.message}</p>
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
        </form>
      </div>
    </div>
  );
}
