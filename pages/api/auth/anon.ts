import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Create anonymous user
    const { data, error } = await supabase.rpc("create_anonymous_user");

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      user_id: data,
      message: "Anonymous user created successfully",
    });
  } catch (error) {
    console.error("Error creating anonymous user:", error);
    res.status(500).json({ error: "Failed to create anonymous user" });
  }
}
