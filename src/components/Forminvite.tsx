import { Button, Input } from "@chakra-ui/react";
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

  const onSubmit = handleSubmit((data) => {
    postData("/api/discord", { data: data }).then((value: Data) => {
      console.log("value", value);
      window.open(value.url, "_blank");
    });
    console.log(data);
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <ControlledInput
          label="Discordのユーザー名を入力してください "
          errors={errors}
          isRequired
          {...register("discordUserName")}
        />

        <Button type="submit" w="full">
          join Discord{" "}
        </Button>
      </form>
    </div>
  );
};
