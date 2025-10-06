import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../../lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // End game session
    const { data, error } = await supabase
      .from("gamesessions")
      .update({
        completed: true,
        ended_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      session: data,
      message: "Game session ended successfully",
    });
  } catch (error) {
    console.error("Error ending game session:", error);
    res.status(500).json({ error: "Failed to end game session" });
  }
}
