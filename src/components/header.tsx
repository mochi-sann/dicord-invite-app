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
                <span className={styles.signedInText}>
                  <small>Signed in as</small>
                  <br />
                  <strong>{session.user.email ?? session.user.name}</strong>
                </span>
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
      <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/client">Client</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/server">Server</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/protected">Protected</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/api-example">API</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/admin">Admin</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/me">Me</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
