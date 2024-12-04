"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";

const SignUp = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setError({ ...error, [name]: value === "" });
  };

  const handleSingUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newError = {
      username: userData.username ? "" : "Name is required.",
      email: userData.email ? "" : "Email is required.",
      password: userData.password ? "" : "Password is required.",
    };
    setError(newError);

    if (Object.values(newError).some((err) => err)) return;
    try {
      setLoading(true);
      const user = await axios.post("/api/user/sign-up", userData);
      toast.success("Sign up successful!");
      setUserData({ username: "", email: "", password: "" });
    } catch (error) {
      toast.error("Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-normal">
      <Card className="m-[auto] w-[350px]">
        <CardHeader>
          <CardTitle className="text-center font-semibold">
            Create Your Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSingUp}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Name</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter Your Name"
                  value={userData.username}
                  onChange={(e) => handleInputChange(e)}
                />
                {error.username && (
                  <p className="text-sm text-red-500">{error.username}</p>
                )}
              </div>
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={userData.password}
                  placeholder="Enter Password"
                  onChange={(e) => handleInputChange(e)}
                />
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
                create account
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <p className="text-sm font-normal">
            Have an Account?{" "}
            <Link href={"/sign-in"} className="text-xs font-semibold uppercase">
              login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
