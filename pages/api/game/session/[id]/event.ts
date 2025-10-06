import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../../lib/supabaseClient";
import { runFSM, FSMDefinition, FSMContext } from "../../../../../lib/fsm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { action } = req.body;

  if (!action) {
    return res.status(400).json({ error: "Action is required" });
  }

  try {
    // Get current game session
    const { data: sessionData, error: sessionError } = await supabase
      .from("gamesessions")
      .select(
        `
        *,
        quests (*)
      `
      )
      .eq("id", id)
      .single();

    if (sessionError) {
      throw sessionError;
    }

    if (sessionData.completed) {
      return res.status(400).json({ error: "Game session already completed" });
    }

    const fsm: FSMDefinition = sessionData.quests.fsm;
    const currentContext: FSMContext = {
      currentState: sessionData.current_state,
      score: sessionData.score,
      log: sessionData.quest_log || [],
    };

    // Run FSM transition
    const newContext = runFSM(fsm, currentContext, action);

    // Check if quest is completed
    const newState = fsm.states[newContext.currentState];
    const isCompleted = newState?.type === "final";

    // Update game session
    const { data, error } = await supabase
      .from("gamesessions")
      .update({
        current_state: newContext.currentState,
        score: newContext.score,
        quest_log: newContext.log,
        completed: isCompleted,
        ended_at: isCompleted ? new Date().toISOString() : null,
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
      currentState: newContext.currentState,
      score: newContext.score,
      completed: isCompleted,
      stateData: newState,
    });
  } catch (error) {
    console.error("Error processing game event:", error);
    res.status(500).json({ error: "Failed to process game event" });
  }
}
