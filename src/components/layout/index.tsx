import Head from 'next/head';
import { ReactNode } from 'react';
import Topbar from '../shared/topbar/Topbar';

interface LayoutProps {
  title?: string;
  children: ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
    return (
      <>
        <Head>
          <title>{`${title ? title + ' - ' : ''}Rick and Morty`}</title>
          <meta name="description" content="Rick and Morty App" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/logo2.jpg" />
        </Head>
  
        <header className='fixed w-full z-10 bg-white shadow-md'>
          <Topbar />
        </header>
  
        <main className="bg-slate-200 w-screen h-screen antialiased text-slate-900 selection:bg-blue-900 selection:text-white pt-16 overflow-auto">
          {children}
        </main>
  
      </>
    );
  }
