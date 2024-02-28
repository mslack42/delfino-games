import Link from "next/link";
import { LoginForm } from "./login-form";
import { Suspense } from "react";

export default async function LoginPage() {
  return (
    <>
      <section className="bg-ct-blue-600 min-h-screen pt-20">
        <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
          <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
            <Suspense fallback={<>Loading...</>}>
              <LoginForm />
            </Suspense>
          </div>
          <Link href="/register">{"Don't have an account?"}</Link>
        </div>
      </section>
    </>
  );
}
