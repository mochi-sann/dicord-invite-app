import { Button, Input, VStack } from "@chakra-ui/react";
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
    formState: { errors },
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
    window.open(DiscordUrl, "_target");
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <VStack>
          <ControlledInput
            placeholder="Discordのユーザー名"
            label="Discordのユーザー名を入力してください "
            errors={errors}
            isRequired
            {...register("discordUserName")}
          />

          <Button type="submit" size={"lg"} w="full">
            join Discord{" "}
          </Button>
        </VStack>
      </form>
    </div>
  );
};
