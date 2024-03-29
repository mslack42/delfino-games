import Link from "next/link";
import { LoginForm } from "./login-form";
import { ApplicationRoutes } from "@/constants/ApplicationRoutes";
import { CustomButton } from "@/components/input/CustomButton";

export default async function LoginPage() {
  return (
    <>
      <section className="bg-ct-blue-600 min-h-screen pt-20">
        <div className="container mx-auto px-6 py-8 h-full flex flex-wrap justify-center items-center">
          <h1 className="text-4xl w-full text-center py-8">Log In</h1>
          <div className="md:w-8/12  bg-white px-8 py-10 border-2 border-solid border-teal-800 rounded-lg">
            <LoginForm />
          </div>
          <div className="md:w-8/12  bg-white px-8 py-10">
            <Link href={ApplicationRoutes.Register}>
              <CustomButton
                type="notabutton"
                innerText={"Don't have an account?"}
                className="p-2 rounded-lg w-max"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
