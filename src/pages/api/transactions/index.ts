import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const newTx = req.body;
    const { data, error } = await supabase.from("transactions").insert([newTx]).select();
    if (error) return res.status(500).json({ error: error.message });
    data && res.status(200).json(data[0]);
  }

  if (req.method === "GET") {
    const { data, error } = await supabase.from("transactions").select("*");
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
  }

  if (req.method === "DELETE") {
    const { error } = await supabase
      .from("transactions")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000"); //dummy UUID
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ message: "All transactions cleared" });
  }
}
