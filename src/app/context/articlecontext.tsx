"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { collection, onSnapshot, query, addDoc, deleteDoc, doc, updateDoc, where, serverTimestamp } from 'firebase/firestore'
import { db } from '@/bd/firebaseConfig'
import { useRouter } from 'next/navigation'
import { DataType, DbContextType } from '../../../types/types'
import useAuth from '@/hooks/useAuth'

const ArticleContext = createContext<DbContextType | null>(null);

// creation d'un hook personnaliser
export const useFirebase = () => {
    const context = useContext(ArticleContext)
    if (!context) {
        throw new Error('useFirebase must be used within a FirebaseProvider')
    }
    return context
}

// Fournisseur de context qu'on peut fournir a tout les enfants du composant ArticleProvider 
export const ArticleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [articles, setArticles] = useState<DataType[]>([])
    const { user } = useAuth()
    const authorId = user?.uid as string
    const router = useRouter()

    useEffect(() => {
        if (!authorId) return

        const q = query(collection(db, "articles"), where("authorId", "==", authorId));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data: DataType[] = [];
            snapshot.forEach((doc) => {
                const docData = doc.data();
                data.push({
                    id: doc.id,
                    ...docData,
                    // Conversion du timestamp Firestore en Date
                    createdAt: docData.createdAt?.toDate() || new Date()
                } as DataType)
            })
            setArticles(data)
        })

        return () => unsubscribe()
    }, [authorId])

    // ✅ Signature corrigée selon DbContextType
    const addArticle = async (articleData: Omit<DataType, "id" | "createdAt"> & {image:string}) => {
        try {
            const docRef = await addDoc(collection(db, "articles"), {
                ...articleData,
                createdAt: serverTimestamp() // Utiliser serverTimestamp pour Firestore
            })

            // Pas besoin de mettre à jour manuellement l'état, 
            // onSnapshot le fera automatiquement
        } catch (error) {
            console.log(error)
            console.error("Une erreur est survenue lors de l'ajout de l'article", error)
            throw new Error('Erreur lors de l\'ajout de l\'article')
        }
    }

    // ✅ Signature corrigée selon DbContextType
    const updateArticle = async (id: string, articleData: Omit<DataType, "id" | "createdAt">) => {
        try {
            const articleRef = doc(db, "articles", id)
            await updateDoc(articleRef, articleData)

            // Pas besoin de mettre à jour manuellement l'état, 
            // onSnapshot le fera automatiquement
        } catch (error) {
            console.log(error)
            console.error("Une erreur est survenue lors de la modification de l'article", error)
            throw new Error("Erreur lors de la modification de l'article")
        }
    }

    // ✅ Signature corrigée selon DbContextType
    const deleteArticle = async (id: string, authorId: string, authorName: string) => {
        try {
            // Vérification de sécurité
            if (authorId !== user?.uid) {
                throw new Error("Vous n'êtes pas autorisé à supprimer cet article")
            }

            await deleteDoc(doc(db, "articles", id))

            // Pas besoin de mettre à jour manuellement l'état, 
            // onSnapshot le fera automatiquement
        } catch (error) {
            console.log(error)
            console.error("Une erreur est survenue lors de la suppression de l'article", error)
            throw new Error("Erreur lors de la suppression de l'article")
        }
    }

    const value: DbContextType = {
        articles,
        addArticle,
        updateArticle,
        deleteArticle
    }

    // ✅ Correction de la syntaxe du return
    return (
        <ArticleContext.Provider value={value}>
            {children}
        </ArticleContext.Provider>
    )
}

export default ArticleProvider