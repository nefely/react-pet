import { useEffect, useState } from "react";
import { fetchCategories } from "../api/categories.api";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchCategories();
        if (alive) setCategories(data);
      } catch (e) {
        if (alive) setError(e?.message || "Failed to load categories");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return { categories, loading, error };
}
