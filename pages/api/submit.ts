import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabaseClient";
import { createHash } from "crypto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    type,
    student_name,
    class: studentClass,
    gender,
    internet_hours,
    favorite_platform,
    received_suspicious,
    q_phishing,
    q_otp_request,
    q_password_strong,
    q_app_permissions,
    q_social_engineering,
    q_ransomware,
    q_attitude_worry,
    q_action_lottery,
    consent,
    ip_hash,
  } = req.body;

  // Validation
  if (!consent) {
    return res.status(400).json({ error: "Consent is required" });
  }

  if (!type || !studentClass) {
    return res.status(400).json({ error: "Type and class are required" });
  }

  if (!["pre", "post"].includes(type)) {
    return res.status(400).json({ error: "Invalid type" });
  }

  try {
    console.log("Received form submission:", { type, studentClass, consent });

    // Generate server-side IP hash for better security
    const clientIP =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      "unknown";
    const ipSalt =
      process.env.IP_SALT || "default-salt-cyberquest-sman1katapang";
    const serverIPHash = createHash("sha256")
      .update(clientIP + ipSalt)
      .digest("hex")
      .substring(0, 16);

    // Check rate limit
    const { data: recentSubmissions, error: rateLimitError } = await supabase
      .from("submissions")
      .select("id")
      .eq("ip_hash", serverIPHash)
      .gte("created_at", new Date(Date.now() - 5 * 60 * 1000).toISOString())
      .limit(3);

    if (rateLimitError) {
      console.error("Rate limit check error:", rateLimitError);
    } else if (recentSubmissions && recentSubmissions.length >= 3) {
      return res.status(429).json({
        error:
          "Too many submissions. Please wait 5 minutes before submitting again.",
      });
    }

    // Insert submission
    const { data, error } = await supabase
      .from("submissions")
      .insert({
        type,
        student_name: student_name || null,
        class: studentClass,
        gender: gender || null,
        internet_hours: internet_hours || null,
        favorite_platform: favorite_platform || null,
        received_suspicious,
        q_phishing: q_phishing || null,
        q_otp_request: q_otp_request || null,
        q_password_strong: q_password_strong || null,
        q_app_permissions: q_app_permissions || null,
        q_social_engineering: q_social_engineering || null,
        q_ransomware: q_ransomware || null,
        q_attitude_worry,
        q_action_lottery: q_action_lottery || null,
        consent: true,
        ip_hash: serverIPHash,
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({ error: "Failed to save submission" });
    }

    res.status(200).json({
      success: true,
      submission_id: data.id,
      message: `${
        type === "pre" ? "Pre-test" : "Post-test"
      } submitted successfully`,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
