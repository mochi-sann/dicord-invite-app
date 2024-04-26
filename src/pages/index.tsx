import { Button, Flex, VStack } from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import NextHeadSeo from "next-head-seo";
import { FormInvite } from "../components/Forminvite";
import Layout from "../components/layout";
import { VerificationDomain } from "../lib/VerificationDomain";
import { Icon } from "@iconify/react";
import googleIcon from "@iconify/icons-cib/google";
import Image from "next/image";

export default function IndexPage() {
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
        <Image
          width={1200}
          height={675}
          src={"/ogp.svg"}
          alt="join Virtaul life"
        />
        <FormInvite />
      </Layout>
    );
  }
  return (
    <Layout>
      <Flex flexDir={"column"} gap={"2"}>
        <Image
          width={1200}
          height={675}
          src={"/ogp.svg"}
          alt="join Virtaul life"
        />
        <h1>
          大学のGoogleアカウント
          {process.env.NEXT_PUBLIC_VERIFICATION_DOMAIN && (
            <>
              （{process.env.NEXT_PUBLIC_VERIFICATION_DOMAIN}{" "}
              で終わるメールアドレス）
            </>
          )}
          でログインしてください
        </h1>
        <Button
          leftIcon={<Icon icon={googleIcon} />}
          w={"full"}
          colorScheme={"blue"}
          onClick={() => signIn("google")}
        >
          Googleでログイン
        </Button>
      </Flex>
    </Layout>
  );
}
