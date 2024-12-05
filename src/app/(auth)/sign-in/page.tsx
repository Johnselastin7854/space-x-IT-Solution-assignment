"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setError({ ...error, [name]: value === "" });
  };

  const handleSingIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newError = {
      email: userData.email ? "" : "Email is required.",
      password: userData.password ? "" : "Password is required.",
    };
    setError(newError);

    if (Object.values(newError).some((err) => err)) return;
    try {
      setLoading(true);
      const user = await axios.post("/api/auth/sign-in", userData);
      setUserData({ email: "", password: "" });
      toast.success("Logged in  successful!");
      router.push("/");
    } catch (error) {
      toast.error("Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-normal">
      <Card className="m-[auto] w-[350px]">
        <CardHeader>
          <CardTitle className="text-center font-semibold">Login</CardTitle>
          <CardDescription className="mt-6 text-center">
            Welcome back to ECOMMERCE
          </CardDescription>
          <CardDescription className="text-center">
            The next gen business marketplace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSingIn}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Enter Your email"
                  value={userData.email}
                  onChange={(e) => handleInputChange(e)}
                />
                {error.email && (
                  <p className="text-sm text-red-500">{error.email}</p>
                )}
              </div>
              <div className="relative flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={userData.password}
                  placeholder="Enter Password"
                  onChange={(e) => handleInputChange(e)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 mt-3 -translate-y-1/2 transform text-xs text-black underline"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                {error.password && (
                  <p className="text-sm text-red-500">{error.password}</p>
                )}
              </div>
              <Button
                disabled={loading ? true : false}
                type="submit"
                className="w-full text-xs font-normal uppercase"
              >
                {loading && <Loader2 className="animate-spin" />}
                Login
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <p className="text-sm font-normal">
            Don’t have an Account?{" "}
            <Link href={"/sign-up"} className="text-xs font-semibold uppercase">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
