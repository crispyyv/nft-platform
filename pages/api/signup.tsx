import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";
import { generateURI } from "../../utils/api";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  if (body) {
    try {
      const response = await axios.post(
        generateURI("api/v1/user/create"),
        body
      );
      if (response.data) {
        const cookies = response.data.data.set_cookie;

        nookies.set({ res }, cookies.key, cookies.value, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          expires: new Date(Date.now() + 30 * 24 * 60 * 60),
          secure: true,
          httpOnly: true,
        });
        res.status(200).json({ ok: true });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ ok: false });
    }
  }
  return {};
}
