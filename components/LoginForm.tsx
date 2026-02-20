"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth/login";

// initial state untuk form
const initialState = {
  errors: {} as Record<string, string[]>,
};

export function LoginForm() {
  const [formState, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <div className="relative h-screen bg-darkbg">
      {/* subtle background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/40 blur-3xl" />
        <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-xl items-center px-6 py-14">
        <div className="w-full">
          <div className="rounded-3xl bg-darkbg p-8 shadow-white/20 shadow-sm backdrop-blur sm:p-10">
            <div className="mb-8 text-center">
              <h3 className="text-3xl font-semibold tracking-tight text-zinc-200">
                Login
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Login into your account in seconds
              </p>
            </div>

            <form action={formAction} className="space-y-5" noValidate>
              {/* Error umum */}
              {formState?.errors?._form?.length ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {formState.errors._form[0]}
                </div>
              ) : null}

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-zinc-200"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={`block w-full rounded-2xl border bg-white/5 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-400 outline-none transition focus:ring-2 focus:ring-primary/70 ${
                      formState?.errors?.email?.length
                        ? "border-red-400"
                        : "border-zinc-100/10"
                    }`}
                    placeholder="you@example.com"
                    disabled={isPending}
                  />
                </div>

                {/* Email error */}
                {formState?.errors?.email?.length ? (
                  <p className="mt-2 text-sm text-red-600">
                    {formState.errors.email[0]}
                  </p>
                ) : null}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-zinc-200"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-zinc-200 underline underline-offset-4 hover:text-zinc-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    className={`block w-full rounded-2xl border bg-white/5 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-400 outline-none transition focus:ring-2 focus:ring-primary/70 ${
                      formState?.errors?.password?.length
                        ? "border-red-400"
                        : "border-zinc-100/10"
                    }`}
                    placeholder="••••••••"
                    disabled={isPending}
                  />
                </div>

                {/* Password error */}
                {formState?.errors?.password?.length ? (
                  <p className="mt-2 text-sm text-red-600">
                    {formState.errors.password[0]}
                  </p>
                ) : null}
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full rounded-full bg-primary/90 px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
                >
                  {isPending ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Signing In...
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>

                <p className="mt-4 text-center text-xs text-zinc-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-zinc-200 underline underline-offset-4 hover:text-zinc-400"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-zinc-500">
            By continuing, you agree to our{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-zinc-700"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-zinc-700"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
