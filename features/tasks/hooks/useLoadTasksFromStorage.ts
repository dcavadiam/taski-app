import { useEffect } from "react";
import { useTaskStore } from "../store/useTaskStore";

export const useLoadTasksFromStorage = () => {
  const setTasks = useTaskStore((state) => state.setTasks);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [setTasks]);
};
