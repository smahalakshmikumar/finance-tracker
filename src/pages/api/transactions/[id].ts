import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../lib/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    const { error } = await supabase.from("transactions").delete().eq("id", id);
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ id });
  }
}
