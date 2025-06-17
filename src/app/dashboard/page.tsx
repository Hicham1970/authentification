"use client";

import { ContactRound, Mail, User } from 'lucide-react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardAction } from "@/components/ui/card";
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import { Button } from '@/components/ui/button';



function DashboardPage() {
  const { user } = useAuth();
  console.log(user);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-black uppercase">Dashboard</CardTitle>
          <CardDescription className="text-muted-foreground text-lg">Votre Profile</CardDescription>
          <CardContent>
            <ul className="flex flex-col space-y-4">
              {user?.photoURL && (
                <li className="flex items-center space-x-2">
                  <Image src={user?.photoURL} alt={`Photo de Profile de ${user?.displayName}`} width={50} height={50} className="rounded-full" />
                </li>
              )}
              <li className="flex items-center space-x-2">
                <span><ContactRound /></span>
                <span><b>Votre Nom :</b>{ user?.displayName}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span><Mail /></span>
                <span><b>Votre Email :</b>{ user?.email}</span>
              </li>
              <li>
                <span className="text-muted-foreground">Membre depuis le : {
                  user?.metadata?.creationTime ? new Intl.DateTimeFormat('fr-FR', { dateStyle: "full", timeStyle: "short"  }).format(new Date(user?.metadata?.creationTime)) : "Date inconnue"
                }</span>
              </li>
            </ul>
          </CardContent>

        </CardHeader>
      </Card>


    </>
  )
}

export default DashboardPage
