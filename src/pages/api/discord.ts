import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  url: string;
};
const returnData = { url: "hoge" };
// Fake users data

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Get data from your database
  if (req.method == "POST") {
    console.log(req.body);
    res.status(200).json(returnData);
  }
}
