import { SessionProvider } from "next-auth/react";
import "./styles.css";
import NextHeadSeo from "next-head-seo";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { ChakraProvider } from "@chakra-ui/react";
import { projectData } from "../projectData";
import Head from "next/head";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="robots" content="noindex" />
      </Head>
      <NextHeadSeo
        title={projectData.siteName}
        og={{
          title: projectData.siteName,
          image: `${projectData.url}/og.png`,
          type: "article",
        }}
        twitter={{
          card: "summary_large_image",
        }}
      />
      <SessionProvider session={session}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}
