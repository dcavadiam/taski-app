import { useEffect } from "react";
import { useProjectStore } from "../store/useProjectStore";

export const useLoadProjectsFromStorage = () => {
  const setProjects = useProjectStore((state) => state.setProjects);

  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
  }, [setProjects]);
};
