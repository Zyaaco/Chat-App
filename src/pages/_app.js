import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { ChatProvider } from "../context/ChatContext";
import { UserProvider } from "@/context/UserContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
        }}
      >
        <UserProvider>
          <ChatProvider>
            <Toaster />
            <ModalsProvider>
              <Navbar />
              <Component {...pageProps} />
            </ModalsProvider>
          </ChatProvider>
        </UserProvider>
      </MantineProvider>
    </>
  );
}
