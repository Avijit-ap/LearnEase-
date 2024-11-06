"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, GraduationCap } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Navigation() {
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8" />
              <span className="font-bold text-xl">CodeMaster</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/courses">
                  <Button variant="ghost">Courses</Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost">Profile</Button>
                </Link>
                <Button variant="ghost" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="ghost">Sign Up</Button>
                </Link>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}