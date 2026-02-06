import { useEffect, useState } from "react";
import { fetchArticles } from "../api/articles.api";

/**
 * @param {Object} options
 * @param {number} [options.limit=20]
 * @param {number|null} [options.categoryId=null]
 */
export function useArticles({ limit, categoryId } = {}) {
// export function useArticles({ limit = 20, categoryId } = {}) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchArticles({ limit, categoryId });
        if (alive) setArticles(data);
      } catch (e) {
        if (alive) setError(e?.message || "Failed to load articles");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [limit, categoryId]);

  return { articles, loading, error };
}
