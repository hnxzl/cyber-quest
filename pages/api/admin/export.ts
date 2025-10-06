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
    const { data: submissions, error } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    // Generate CSV
    const headers = [
      "ID",
      "Created At",
      "Type",
      "Student Name",
      "Class",
      "Gender",
      "Internet Hours",
      "Favorite Platform",
      "Received Suspicious",
      "Q Phishing",
      "Q OTP Request",
      "Q Password Strong",
      "Q App Permissions",
      "Q Social Engineering",
      "Q Ransomware",
      "Q Attitude Worry",
      "Q Action Lottery",
      "Teacher Notes",
      "Consent",
    ];

    const csvRows = [
      headers.join(","),
      ...submissions.map((s) =>
        [
          s.id,
          s.created_at,
          s.type,
          s.student_name || "",
          s.class,
          s.gender || "",
          s.internet_hours || "",
          s.favorite_platform || "",
          s.received_suspicious,
          s.q_phishing || "",
          s.q_otp_request || "",
          s.q_password_strong || "",
          s.q_app_permissions || "",
          s.q_social_engineering || "",
          s.q_ransomware || "",
          s.q_attitude_worry,
          s.q_action_lottery || "",
          s.teacher_notes || "",
          s.consent,
        ]
          .map((field) => `"${String(field).replace(/"/g, '""')}"`)
          .join(",")
      ),
    ];

    const csv = csvRows.join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="cyberquest-data-${
        new Date().toISOString().split("T")[0]
      }.csv"`
    );
    res.status(200).send(csv);
  } catch (error) {
    console.error("Error exporting CSV:", error);
    res.status(500).json({ error: "Failed to export CSV" });
  }
}
