"use client"
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Chat from "@/components/chat";
import { ChatService } from '@/lib/service';
import {useMemo, useEffect } from 'react';
interface IndexPageProps {
  params: {
     id: string;
  };
 }
 
 export default function IndexPage({params}: IndexPageProps) {
   const { data: session, status } = useSession();
   const [fstNam, lstNam] = session?.user?.name?.split(' ') ?? ['', ''];
   const userMail = session?.user?.email ?? '';
   const userImage = session?.user?.image ?? '';
   const partner = (session as any)?.partner;
   const userid = (session as any)?.userid;
   const back_auth = (session as any)?.back_auth;
   const router = useRouter();
   // Create an instance of ChatService
   const chatService = useMemo(() => ChatService.getInstance(), []);
   
  useEffect(() => {
    if (status === 'unauthenticated') {
      console.log("Redirecting to login page");
      router.push('/login');
    }
    if (status === 'authenticated') {
      chatService.authToken$.next(back_auth);
    }
  }, [status]);

   return <Chat chatId={params.id} fName={fstNam} lName={lstNam} uMail={userMail} uImg={userImage} partner={partner} userid={userid} back_auth={back_auth} chatService={chatService}/>
 }