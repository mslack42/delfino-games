"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { LoginUserInput, loginUserSchema } from "@/lib/user-schema";
import { CustomButton } from "@/components/input/CustomButton";
import { Conditional } from "@/components/common/Conditional";
import { useToast } from "@/components/shadcn/use-toast";

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

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
        router.push(callbackUrl);
        router.refresh();
      } else {
        reset({ password: "" });
        const message = "invalid email or password";
        setError(message);
      }
    } catch (error: any) {
      toast({ title: "Internal Failure" });
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Conditional when={!!error}>
        <p className="text-center bg-red-300">{error}</p>
      </Conditional>
      <div className="mb-6">
        <input
          type="email"
          {...register("email")}
          placeholder="Email address"
        />
        <Conditional when={!!errors["email"]}>
          <span className="text-red-500 text-xs pt-1 block">
            {errors["email"]?.message as string}
          </span>
        </Conditional>
      </div>
      <div className="mb-6">
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
        />
        <Conditional when={!!errors["password"]}>
          <span className="text-red-500 text-xs pt-1 block">
            {errors["password"]?.message as string}
          </span>
        </Conditional>
      </div>
      <CustomButton
        type={"submit"}
        innerText={submitting ? "loading..." : "Sign In"}
        actionType="confirm"
        disabled={submitting}
        className="p-2 rounded-lg"
      />
    </form>
  );
};
