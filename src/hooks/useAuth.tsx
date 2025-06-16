"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/bd/firebaseConfig'
import { onAuthStateChanged, User, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

const providerGoogle = new GoogleAuthProvider()
const providerGithub = new GithubAuthProvider()
const useAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [isFetch, setIsFetch] = useState(true)
    const router = useRouter()

    // connection a Google:
    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, providerGoogle)
            setUser(result.user)
            router.push('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    // connection with GitHub:
    const loginWithGithub = async () => {
        try {
            const result = await signInWithPopup(auth, providerGithub)
            setUser(result.user)
            router.push('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
                // router.push('/signInAndUp')
            }
            setIsFetch(false) // Fin du chargement après vérification
        })
        return () => unsubscribe()
    }, [])

    const redirectIfAuthenticated = () => {
        if (user) {
            router.push('/dashboard')
        }

    }
    return { user, isFetch, loginWithGoogle, redirectIfAuthenticated, loginWithGithub }
}



export default useAuth;
