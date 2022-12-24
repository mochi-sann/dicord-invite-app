import { Button, Input, Text, VStack } from "@chakra-ui/react";
import { type } from "os";
import React from "react";
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
    window.open(DiscordUrl, "_blank");
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
        </VStack>
      </form>
    </div>
  );
};
