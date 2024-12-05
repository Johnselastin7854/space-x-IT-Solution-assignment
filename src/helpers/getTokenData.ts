import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { env } from "~/env";

export const getTokenData = (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";

    const decodedToken = jwt.verify(token, env.TOKEN_SECRET!);
    return decodedToken;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
