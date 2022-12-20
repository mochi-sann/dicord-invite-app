import { useSession } from "next-auth/react";
import Link from "next/link";
import Layout from "../components/layout";
import { VerificationDomain } from "../lib/VerificationDomain";

export default function InviteDiscord() {
  const session = useSession();

  if (
    (session.data?.user?.email &&
      !VerificationDomain(
        session.data?.user?.email,
        process.env.NEXT_PUBLIC_VERIFICATION_DOMAIN || ""
      )) ||
    session.status == "unauthenticated"
  ) {
    return (
      <Layout>
        <h1>this is not allow domain adress</h1>
      </Layout>
    );
  }
  return (
    <Layout>
      <h1>NextAuth.js Example</h1>
    </Layout>
  );
}
