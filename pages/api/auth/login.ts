import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    // Check if user is teacher
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("email", email)
      .single();

    if (userError || userData?.role !== "teacher") {
      return res.status(403).json({ error: "Access denied. Teachers only." });
    }

    res.status(200).json({
      success: true,
      user: data.user,
      session: data.session,
      message: "Teacher login successful",
    });
  } catch (error) {
    console.error("Error logging in teacher:", error);
    res.status(401).json({ error: "Invalid credentials" });
  }
}
