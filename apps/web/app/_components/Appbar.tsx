"use client";
import { useRouter } from "next/navigation"
import { LinkButton } from "./buttons/LinkButton";
import { PrimaryButton } from "./buttons/PrimaryButton";
import Link from "next/link";

export const Appbar = () => {
    const router = useRouter();
    return <div className="flex border-b justify-between p-4">
        <Link href={'/'} className="flex items-center justify-center text-2xl ">
            <span className="text-primary mb-2 mr-1 text-2xl font-black">_</span> 
            <h1 className="font-black">Zapies</h1>
        </Link>
        <div className="flex">
            
            <div className="pr-4">
                <LinkButton onClick={() => {
                    router.push("/login")
                }}>Login</LinkButton>
            </div>
            <PrimaryButton onClick={() => {
                router.push("/signup")
            }}>
                Signup
            </PrimaryButton>            
        </div>
    </div>
}