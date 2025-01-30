'use client'
import './globals.css';
import React, { useEffect, useState } from 'react';

import LogoutButton from "../components/LogoutButton";

import Image from 'next/image';

export default function Layout({ children }) {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
      
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleString());
        };
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer); // Cleanup timer
    }, []);

    
        


    return (
        <html lang="en">
            <body>
                <header className="bg-green-300 text-black  text-xl font-bold  py-4">

        
                    <nav className="flex justify-between px-4 items-center">
                        <div className="flex items-center">
                            <Image src="/logo.png"  alt="Logo" width='90'height='30' />
                            <h1 className="text-black-200 ml-9 text-2xl">
                           
                                Task Management</h1>
                        
                      
                        </div>
                        
                        <div className="flex items-center  space-x-8">
                            <span>{currentTime}</span>

                             <LogoutButton />
                       
                        </div>
                    </nav>
                </header>
                <main className="p-4">{children}</main>
            </body>
        </html>
    );
}
