import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Get aggregated results for teacher dashboard
    const { data: statsData, error: statsError } = await supabase
      .from("teacher_stats")
      .select("*");

    if (statsError) {
      throw statsError;
    }

    // Get detailed responses
    const { data: responsesData, error: responsesError } = await supabase
      .from("responses")
      .select(
        `
        *,
        users (name, class),
        tests (title, type)
      `
      )
      .order("created_at", { ascending: false });

    if (responsesError) {
      throw responsesError;
    }

    // Get game sessions
    const { data: gameData, error: gameError } = await supabase
      .from("gamesessions")
      .select(
        `
        *,
        users (name, class),
        quests (title, topic)
      `
      )
      .eq("completed", true)
      .order("ended_at", { ascending: false });

    if (gameError) {
      throw gameError;
    }

    res.status(200).json({
      success: true,
      stats: statsData,
      responses: responsesData,
      gameSessions: gameData,
    });
  } catch (error) {
    console.error("Error fetching teacher results:", error);
    res.status(500).json({ error: "Failed to fetch teacher results" });
  }
}
