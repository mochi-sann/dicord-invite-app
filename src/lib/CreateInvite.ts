import { BaseInvite, Bot } from "discordeno";

export const CreateInvite = (
  bot: Bot,
  channelId: bigint
): Promise<BaseInvite> => {
  return bot.helpers.createInvite(channelId, {
    maxAge: 60 * 60 * 24,
    maxUses: 1,
  });
};
