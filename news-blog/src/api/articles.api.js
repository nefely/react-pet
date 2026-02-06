const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost/news-api";

export async function fetchArticles(params = {}) {
  const url = new URL(`${API_BASE}/articles.php`);

  if (params.limit != null) {
    url.searchParams.set("limit", String(params.limit));
  }

  if (params.categoryId != null) {
    url.searchParams.set("category_id", String(params.categoryId));
  }

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`Articles request failed: ${res.status}`);
  }

  return await res.json();
}

