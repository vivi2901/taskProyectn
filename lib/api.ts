import { Database } from "@/db_types";
import { supabase } from "./supabase";

export const fetchTasks = async () => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*, profile: profiles(username)")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.log(error);
    return [];
  } else {
    console.log(data);
    return data;
  }
};

export type Tasks = Awaited<ReturnType<typeof fetchTasks>>;
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Task = Tasks[number];