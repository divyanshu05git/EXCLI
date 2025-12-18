'use client'

import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useState } from 'react'

export default function AuthPage() {
    const [isSignup, setIsSignup] = useState(false);


  return (
    <Card className="w-full max-w-sm bg-indigo-200 shadow-md max-w-sm shadow-lg shadow-indigo-200/40">
      <CardHeader>
        <CardTitle className="text-center text-3xl">EXCALIDRAW</CardTitle>
        <CardDescription>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full bg-indigo-400 hover:bg-indigo-600">
          {isSignup ? "Sign up" : "Login"}
        </Button>
        <Button variant="outline" className="w-full text-gray-600">
          Login with Google
        </Button>
        <p className="text-sm text-muted-foreground text-center">
            {isSignup ? (
            <>
            Already have an account?{" "}
            <button
                onClick={() => setIsSignup(false)}
                className="text-indigo-600 font-medium hover:underline"
            >
                Sign in
            </button>
            </>
        ) : (
            <>
            Don&apos;t have an account?{" "}
            <button
                onClick={() => setIsSignup(true)}
                className="text-indigo-600 font-medium hover:underline"
            >
                Sign up
            </button>
            </>
        )}
        </p>
      </CardFooter>
    </Card>
  )
}
