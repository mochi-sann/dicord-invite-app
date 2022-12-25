import { Button, Input, Link, Text, VStack } from "@chakra-ui/react";
import { type } from "os";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postData } from "../lib/postData";
import { Data } from "../pages/api/discord";
import { ControlledInput } from "./parts/ContorolledInput";

export type FormInviteProps = {};

export const schema = z.object({
  discordUserName: z.string(),
});

export type FormValues = z.infer<typeof schema>;

export const FormInvite: React.FC<FormInviteProps> = (props) => {
  const [DiscordUrlstate, setDiscordUrlstate] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const DiscordUrl = await postData("/api/discord", { data: data }).then(
      (value: Data) => {
        console.log("value", value);
        return value.url;
      }
    );
    setDiscordUrlstate(DiscordUrl);
    window.location.href = DiscordUrl;
    return window.open(DiscordUrl);
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <VStack gap={4}>
          <ControlledInput
            placeholder="Discordのユーザー名"
            label="Discordのユーザー名を入力してください "
            errors={errors}
            isRequired
            {...register("discordUserName")}
          />
          <Text>
            ※ Googleアカウントの氏名・メールアドレス・
            Discordのユーザー名はサークル運営のために記録されます。
          </Text>

          <Button
            isLoading={isSubmitting}
            colorScheme="blue"
            type="submit"
            size={"lg"}
            w="full"
          >
            Discord サーバーに参加する
          </Button>
          {DiscordUrlstate && (
            <Link
              href={DiscordUrlstate}
              textColor={"blue.500"}
              textDecoration={"underline"}
              isExternal
            >
              ページが開かない場合はこのリンクをクリックしてください
            </Link>
          )}
        </VStack>
      </form>
    </div>
  );
};
