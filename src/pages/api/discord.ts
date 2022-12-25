import type { NextApiRequest, NextApiResponse } from "next";

import { createBot, Intents, startBot } from "discordeno";
import { CreateInvite } from "../../lib/CreateInvite";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { FormValues } from "../../components/Forminvite";
import { SheetService } from "../../lib/SheetsEditer";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { projectData } from "../../projectData";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export type Data = {
  url: string;
};
// Fake users data

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Get data from your database
  if (req.method == "POST") {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401);
    }
    const ReqBody: { data: FormValues } = req.body;
    console.log("session", session);
    console.log("req.body", req.body);

    const bot = createBot({
      token: process.env.NEXT_PUBLIC_DISCORD_TOKEN || "",
      intents: Intents.Guilds | Intents.GuildMessages | Intents.MessageContent,
      events: {
        ready: (_bot, payload) => {
          console.log(`${payload.user.username} is ready!`);
        },
      },
    });

    const inveite = await CreateInvite(
      bot,
      BigInt(projectData.discord.channelId)
    );
    console.log(`https://discord.gg/${inveite.code}`);
    const returnData: Data = {
      url: `https://discord.gg/${inveite.code}`,
    };

    const sheet = new SheetService();
    await sheet.init();
    await sheet.addRows([
      {
        name: `${session.user?.name}`,
        date: `${dayjs().tz().format()}`,
        email: `${session.user?.email}`,
        studentId: `${session.user?.email?.split("@")[0]}`,
        discord_username: `${ReqBody.data.discordUserName}`,
      },
    ]);
    // const allRows = await sheet.getRows();
    // console.log(allRows);

    // await sheet.addRows({
    //   data: dayjs().toISOString(),
    // });

    res.status(200).json(returnData);
  }
}
