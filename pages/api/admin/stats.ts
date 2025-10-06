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
    console.log("Fetching submissions from Supabase...");
    // Get total counts
    const { data: submissions, error } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    console.log(`Found ${submissions?.length || 0} submissions`);

    // Calculate stats
    const preSubmissions = submissions.filter((s) => s.type === "pre");
    const postSubmissions = submissions.filter((s) => s.type === "post");

    // Group by class
    const byClass: Record<string, number> = {};
    submissions.forEach((s) => {
      byClass[s.class] = (byClass[s.class] || 0) + 1;
    });

    // Get recent 10 submissions
    const recentSubmissions = submissions.slice(0, 10).map((s) => ({
      id: s.id,
      created_at: s.created_at,
      type: s.type,
      class: s.class,
      student_name: s.student_name || "Anonymous",
    }));

    res.status(200).json({
      total: submissions.length,
      preTest: preSubmissions.length,
      postTest: postSubmissions.length,
      byClass,
      correctAnswers: {}, // Add empty object for now
      recentSubmissions,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
}
