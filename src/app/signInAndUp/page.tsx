"use client"

import { Button } from "@/components/ui/button";
import useAuth from "../../hooks/useAuth";

export default function SignInAndUpPage() {
    const { user, isFetch, loginWithGoogle, loginWithGithub } = useAuth();

    // Si l'utilisateur est connecté, ne pas rendre la page
    if (user) {
        return null; // La redirection se fera via useAuth
    }

    if (isFetch) {
        return (
            <section className="w-full h-screen flex items-center justify-center">
                <h2 className="text-xl font-semibold text-center text-gray-500">
                    Vérification de l'authentification...
                </h2>
            </section>
        );
    }

    return (
        <>
            <section className="w-full h-screen items-center justify-center flex flex-col gap-4">
                <Button type="button" variant="outline" onClick={loginWithGoogle}>
                    Continuer avec Google
                </Button>
                <Button type="button" variant="outline" onClick={loginWithGithub}>
                    Continuer avec GitHub
                </Button>
            </section>
        </>
    )
}