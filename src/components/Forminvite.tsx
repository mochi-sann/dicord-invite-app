import { Button, Input } from "@chakra-ui/react";
import { type } from "os";
import React from "react";
import { useForm } from "react-hook-form";
import { postData } from "../lib/postData";

export type FormInviteProps = {};

type FormData = {
  discordId: string;
};
export const FormInvite: React.FC<FormInviteProps> = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => {
    postData("/api/discord", { data: data.discordId }).then((value) => {
      console.log("value", value);
    });
    console.log(data);
  });

  console.log(watch("discordId")); // watch input value by passing the name of it

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Input id="discordID" {...register("discordId")} />
        <Button type="submit"> Submit</Button>
      </form>
    </div>
  );
};
