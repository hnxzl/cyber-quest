import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user_id, quest_id } = req.body;

  if (!user_id || !quest_id) {
    return res.status(400).json({ error: "User ID and Quest ID are required" });
  }

  try {
    // Get quest FSM definition
    const { data: questData, error: questError } = await supabase
      .from("quests")
      .select("*")
      .eq("id", quest_id)
      .single();

    if (questError) {
      throw questError;
    }

    // Create new game session
    const { data, error } = await supabase
      .from("gamesessions")
      .insert({
        user_id,
        quest_id,
        current_state: questData.fsm.initial,
        quest_log: [],
        score: 0,
        completed: false,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      session: data,
      quest: questData,
    });
  } catch (error) {
    console.error("Error starting game session:", error);
    res.status(500).json({ error: "Failed to start game session" });
  }
}
