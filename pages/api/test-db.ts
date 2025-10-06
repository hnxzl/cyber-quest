import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("Testing Supabase connection...");

    // Try to query submissions table directly
    const { data: subData, error: subError } = await supabase
      .from("submissions")
      .select("id")
      .limit(1);

    if (subError) {
      console.error("Submissions table error:", subError);

      // Try to check what tables actually exist
      const { data: gameData, error: gameError } = await supabase
        .from("gamesessions")
        .select("id")
        .limit(1);

      return res.status(500).json({
        success: false,
        message: "Submissions table not found",
        submissionsError: subError.message,
        gamesessionsExists: !gameError,
        suggestion:
          "You need to run the supabase-research-schema.sql file in your Supabase SQL Editor",
      });
    }

    console.log("Submissions table exists and working");
    res.status(200).json({
      success: true,
      message: "Database connection working - submissions table found",
      recordCount: subData?.length || 0,
    });
  } catch (error) {
    console.error("Test error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to connect to database",
      details: error,
    });
  }
}
