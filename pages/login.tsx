import React, { useState } from "react";
import Layout from "@components/Layout";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useAuth } from "@hooks/useAuth";
import Spinner from "@components/Spinner";
import { useRouter } from "next/router";

interface Inputs {
  email: string;
  password: string;
}

const login = () => {
  const auth = useAuth();
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [login, setLogin] = useState(true);

  const onSubmitHandler: SubmitHandler<Inputs> = async (data) => {
    if (login) {
      const { error } = await auth.signIn(data);
      if (error) {
        alert(error);
      } else {
        push("/");
      }
    } else {
    }
  };

  return (
    <Layout title="Login">
      <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
        <Image
          src="https://rb.gy/p2hphi"
          layout="fill"
          className="-z-10 !hidden opacity-60 sm:!inline"
          objectFit="cover"
          alt="background"
        />
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
            width={150}
            height={150}
            alt="logo"
          />
        </Link>
        <form
          className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <h1 className="text-4xl font-semibold">Sign In</h1>
          <div className="space-y-4">
            <label className="inline-block w-full">
              <input
                type="email"
                placeholder="Email"
                className={`input ${
                  errors.email && "border-b-2 border-orange-500"
                }`}
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid email.
                </p>
              )}
            </label>
            <label className="inline-block w-full">
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Password"
                className={`input ${
                  errors.password && "border-b-2 border-orange-500"
                }`}
              />
              {errors.password && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Your password must contain between 4 and 60 characters.
                </p>
              )}
            </label>
          </div>
          <button
            className="w-full rounded bg-[#E50914] py-3 font-semibold"
            onClick={() => setLogin(true)}
            type="submit"
          >
            {!auth.loading && "Login"}
            {auth.loading && <Spinner color="white" text="Loading..." />}
          </button>
          <div className="text-[gray]">
            New to Netflix?{" "}
            <button
              className="cursor-pointer text-white hover:underline"
              onClick={() => setLogin(false)}
              type="button"
            >
              Sign up now
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default login;
