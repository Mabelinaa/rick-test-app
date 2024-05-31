import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ScreenSizeStoreProvider } from "@/providers/screenSizeStore-provider";

export default function App({ 
  Component, 
  pageProps
 }: AppProps<{ isSsrMobile: boolean }>) {
  return (
    <ScreenSizeStoreProvider>
      <Component {...pageProps} />
    </ScreenSizeStoreProvider>
  );
}
