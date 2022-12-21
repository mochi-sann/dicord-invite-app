import { useSession } from "next-auth/react";
import { FormInvite } from "../components/Forminvite";
import Layout from "../components/layout";
import { VerificationDomain } from "../lib/VerificationDomain";

export default function InviteDiscord() {
  const session = useSession();

  if (
    session.data?.user?.email &&
    VerificationDomain(
      session.data?.user?.email,
      process.env.NEXT_PUBLIC_VERIFICATION_DOMAIN || ""
    ) &&
    session.status == "authenticated"
  ) {
    return (
      <Layout>
        <FormInvite />
      </Layout>
    );
  }
  return (
    <Layout>
      <h1>デジタルハリウッド大学のGoogleアカウントでログインしてください</h1>
      {/* <FormInvite /> */}
    </Layout>
  );
}
