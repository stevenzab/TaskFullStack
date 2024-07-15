import "../app/globals.css";
import type { AppProps } from "next/app";
import RootLayout from "@/components/layout";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
};

export default MyApp;
