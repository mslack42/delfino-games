import Link from "next/link";
import { LoginForm } from "./login-form";
import { Suspense } from "react";
import { ApplicationRoutes } from "@/constants/routes";
import { CustomButton } from "@/components/input/CustomButton";

export default async function LoginPage() {
  return (
    <>
      <section className="bg-ct-blue-600 min-h-screen pt-20">
        <div className="container mx-auto px-6 py-12 h-full flex flex-wrap justify-center items-center">
          <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10 border-2 border-solid border-teal-800 rounded-lg">
            <Suspense fallback={<>Loading...</>}>
              <LoginForm />
            </Suspense>
          </div>
          <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
            <Link href={ApplicationRoutes.Register}>
              <CustomButton
                type="button"
                innerText={"Don't have an account?"}
                className="p-2 rounded-lg"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
