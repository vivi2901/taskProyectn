import { supabase } from "./supabase";

export const fetchTasks = async () => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.log(error);
    return [];
  } else {
    return data;
  }
};

export type Tasks = Awaited<ReturnType<typeof fetchTasks>>;
export type Task = Tasks[number];