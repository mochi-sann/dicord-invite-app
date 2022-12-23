import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./header.module.css";
import { Avatar, Box, Button, HStack, Text } from "@chakra-ui/react";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <Box
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {session && session.user ? (
            <HStack>
              {session.user.image && (
                <Avatar
                  name={session?.user?.name || ""}
                  src={session?.user?.image || ""}
                />
              )}
              <Box h="full" flex={"1"}>
                <Text>
                  <small>ログイン中</small>
                  <br />
                  <strong>{session.user.email ?? session.user.name}</strong>
                </Text>
              </Box>
              <Button
                colorScheme={"red"}
                onClick={(e) => {
                  signOut();
                }}
              >
                ログアウト
              </Button>
            </HStack>
          ) : (
            <HStack>
              <Box flex={1}>
                <Text>ログインしていません</Text>
              </Box>
              <Button
                // as={"a"}
                colorScheme="blue"
                // href={`/api/auth/signin`}
                onClick={(e) => {
                  signIn("google");
                }}
              >
                ログイン
              </Button>
            </HStack>
          )}
        </Box>
      </div>
    </header>
  );
}
