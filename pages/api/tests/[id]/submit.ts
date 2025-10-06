import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user_id, answers } = req.body;

  if (!user_id || !answers) {
    return res.status(400).json({ error: "User ID and answers are required" });
  }

  try {
    // Get test to calculate score
    const { data: testData, error: testError } = await supabase
      .from("tests")
      .select("questions")
      .eq("id", id)
      .single();

    if (testError) {
      throw testError;
    }

    const questions = testData.questions;
    let score = 0;
    const totalQuestions = questions.length;

    // Calculate score
    questions.forEach((question: any, index: number) => {
      if (answers[index] === question.correct) {
        score++;
      }
    });

    const finalScore = Math.round((score / totalQuestions) * 100);

    // Save response
    const { data, error } = await supabase
      .from("responses")
      .insert({
        user_id,
        test_id: id,
        answers,
        score: finalScore,
        total_questions: totalQuestions,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      response: data,
      score: finalScore,
      correctAnswers: score,
      totalQuestions,
    });
  } catch (error) {
    console.error("Error submitting test:", error);
    res.status(500).json({ error: "Failed to submit test" });
  }
}
