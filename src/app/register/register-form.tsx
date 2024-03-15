"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { CreateUserInput, createUserSchema } from "@/lib/user-schema";
import { ApiRoutes } from "@/constants/ApiRoutes";
import { CustomButton } from "@/components/input/CustomButton";
import { useSearchParams } from "next/navigation";
import { Conditional } from "@/components/common/Conditional";

export const RegisterForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const query = useSearchParams();

  const suppliedInviteCode: string | null = query.get("invite");

  const methods = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      invitationCode: suppliedInviteCode ? suppliedInviteCode : "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = methods;

  const onSubmitHandler: SubmitHandler<CreateUserInput> = async (values) => {
    try {
      setSubmitting(true);
      const res = await fetch(ApiRoutes.Register, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();

        if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
          //   errorData.errors.forEach((error: any) => {
          //     toast.error(error.message);
          //   });
          if (errorData.errors[0].invitationCode) {
            setError("invitationCode", errorData.errors[0].invitationCode);
          }

          return;
        }

        // toast.error(errorData.message);
        return;
      }

      signIn(undefined, { callbackUrl: "/" });
    } catch (error: any) {
      //   toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="mb-6">
        <input {...register("name")} placeholder="Name" maxLength={20} />
        <Conditional when={!!errors["name"]}>
          <span className="text-red-500 text-xs pt-1 block">
            {errors["name"]?.message as string}
          </span>
        </Conditional>
      </div>
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
      <div className="mb-6">
        <input
          type="password"
          {...register("passwordConfirm")}
          placeholder="Confirm Password"
        />
        <Conditional when={!!errors["passwordConfirm"]}>
          <span className="text-red-500 text-xs pt-1 block">
            {errors["passwordConfirm"]?.message as string}
          </span>
        </Conditional>
      </div>
      <div className="mb-6">
        <input
          type="text"
          {...register("invitationCode")}
          placeholder="Invitation Code"
        />
        <Conditional when={!!errors["invitationCode"]}>
          <span className="text-red-500 text-xs pt-1 block">
            {errors["invitationCode"]?.message as string}
          </span>
        </Conditional>
      </div>
      <CustomButton
        type="submit"
        innerText={submitting ? "loading..." : "Sign Up"}
        disabled={submitting}
        className="p-2 rounded-lg"
      />
    </form>
  );
};
