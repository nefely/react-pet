const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost/news-api";

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories.php`);

  if (!res.ok) {
    throw new Error(`Categories request failed: ${res.status}`);
  }

  return await res.json(); // [{ id, name }]
}
