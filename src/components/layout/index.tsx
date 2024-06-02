import Head from 'next/head';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

import Topbar from '../shared/topbar/Topbar';

interface LayoutProps {
  title?: string;
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  const router = useRouter();
  let titlePage = '';
  if (router.pathname === '/' || router.pathname === '/episode/[id]'){
    titlePage = 'Episodios';
  } else if (router.pathname === '/locations' || router.pathname === '/location/[id]'){
    titlePage = 'Localizaciones';
  } else if (router.pathname === '/user'){
    titlePage = 'Usuario';
  }

    return (
      <>
        <Head>
          <title>{`${titlePage ? titlePage + ' de ' : ''}Rick and Morty`}</title>
          <meta name="description" content="Rick and Morty" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/logo2.jpg" />
        </Head>
  
        <header className='fixed w-full z-10 bg-white shadow-md'>
          <Topbar />
        </header>
  
        <main className="bg-slate-200 w-screen h-screen antialiased text-slate-900 selection:bg-blue-900 selection:text-white pt-16 overflow-auto pb-4">
          {children}
        </main>
  
      </>
    );
  }
