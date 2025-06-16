"use client"

import { Button } from "@/components/ui/button";
import useAuth from "../../hooks/useAuth";

export default function SignInAndUpPage() {
    const { redirectIfAuthenticated, loginWithGoogle, loginWithGithub } = useAuth();
    
    redirectIfAuthenticated();


    return (
        <>
            <section className="w-full h-screen items-center justify-center flex flex-col gap-4">
                <Button type="button" variant="outline" onClick={loginWithGoogle}> Continuer avec Google

                </Button>
                <Button type="button" variant="outline" onClick={loginWithGithub}> Continuer avec GitHub

                </Button>
            
            </section>
        </>
    )
}