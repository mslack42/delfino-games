import { Suspense } from "react";
import { RegisterForm } from "./register-form";
import { LoadingIdler } from "@/components/common/LoadingIdler";

export default async function RegisterPage() {
  return (
    <>
      <section className="bg-ct-blue-600 min-h-screen pt-20">
        <div className="container mx-auto px-6 py-12 h-full flex flex-wrap justify-center items-center">
          <h1 className="text-4xl w-full text-center py-8">Register</h1>{" "}
          <div className="md:w-8/12 min-w-80 bg-white px-8 py-10 border-solid border-2 border-teal-800 rounded-lg">
            <Suspense fallback={<LoadingIdler />}>
              <RegisterForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
