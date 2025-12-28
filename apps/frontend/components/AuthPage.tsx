"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { HTTP_BACKEND } from "@/config";
import axios from "axios";


export function AuthPage({ 
    isSignin 
}: { 
    isSignin: boolean 
}) {

    const usernameRef= useRef<HTMLInputElement>(null);
    const passwordRef= useRef<HTMLInputElement>(null);
    const router = useRouter();

    async function Signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        console.log(username,password);

        try{
            await axios.post(HTTP_BACKEND+"/signup",{
                username:username,
                password:password,
                name:"null"
            })
            alert("Signup successful! Please signin now.")
            router.push("/signin")
        }
        catch(err){
            alert("Error signing up")
        }
    }

    async function Signin(){
        const username=usernameRef.current?.value;
        const password=passwordRef.current?.value;

        try{
            const res=await axios.post(HTTP_BACKEND+"/signin",{
                username:username,
                password:password
            })
            alert("Signin successful!")

            const roomId=res.data.roomId
            router.push(`/canvas/${roomId}`)
        }
        catch(err){
            alert("Error signing in")
        }
    }

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#eef1ff]">
      <div className="w-[380px] bg-[#e0e7ff] rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6">DRAW APP</h1>

        <label className="text-sm">Email</label>
        <input className="w-full mb-4 mt-1 px-3 py-2 rounded-md border" ref={usernameRef}/>

        <label className="text-sm">Password</label>
        <input
          type="password"
          className="w-full mb-6 mt-1 px-3 py-2 rounded-md border"
          ref={passwordRef}
        />

        <button className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600" onClick={isSignin?Signin:Signup}>
          {isSignin ? "Login" : "Create account"}
        </button>

        <p className="text-sm text-center text-gray-500 mt-4">
          {isSignin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => router.push(isSignin ? "/signup" : "/signin")}
          >
            {isSignin ? "Sign up" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
}


