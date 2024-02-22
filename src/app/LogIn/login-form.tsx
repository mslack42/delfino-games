"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { LoginUserInput, loginUserSchema } from "@/lib/user-schema";

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<LoginUserInput> = async (values) => {
    try {
      setSubmitting(true);

      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        redirectTo: callbackUrl,
      });

      setSubmitting(false);

      if (!res?.error) {
        // toast.success('successfully logged in');
        router.push(callbackUrl);
        router.refresh();
      } else {
        reset({ password: "" });
        const message = "invalid email or password";
        // toast.error(message);
        setError(message);
      }
    } catch (error: any) {
      //   toast.error(error.message);
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      {error && <p className="text-center bg-red-300">{error}</p>}
      <div className="mb-6">
        <input
          type="email"
          {...register("email")}
          placeholder="Email address"
        />
        {errors["email"] && (
          <span className="text-red-500 text-xs pt-1 block">
            {errors["email"]?.message as string}
          </span>
        )}
      </div>
      <div className="mb-6">
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
        />
        {errors["password"] && (
          <span className="text-red-500 text-xs pt-1 block">
            {errors["password"]?.message as string}
          </span>
        )}
      </div>
      <button type="submit" disabled={submitting}>
        {submitting ? "loading..." : "Sign In"}
      </button>
    </form>
  );
};
