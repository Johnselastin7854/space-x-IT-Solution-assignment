"use client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Products from "~/components/Products";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onLogout = async () => {
    try {
      setLoading(true);
      await axios.get("/api/auth/log-out");
      toast.success("Logged out successfully");
      router.push("/sign-in");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Logout failed");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-3">
      <Products />
      <Button
        disabled={loading ? true : false}
        type="submit"
        className="w-20 text-xs font-normal"
        onClick={onLogout}
      >
        {loading && <Loader2 className="animate-spin" />}
        Log Out
      </Button>
    </main>
  );
}
