import { useState } from "react";
import AnimeList from "../components/AnimeList.jsx";
import AddAnime from "../components/AddAnime.jsx";

export default function Main() {
  const [refreshKey, setRefreshKey] = useState(0);
  const handleAdded = () => setRefreshKey(k => k + 1); // тригер перезавантаження списку

  return (
    <main className="main">
      <section className="py-4">
        <div className="container">
          <h1 className="title mb-3">Anime List</h1>
          <AnimeList refreshKey={refreshKey} />
        </div>
      </section>

      <section className="py-4 bg-light">
        <div className="container">
          <h2 className="title h3 mb-3">Add Anime</h2>
          <AddAnime onAdded={handleAdded} />
        </div>
      </section>
    </main>
  );
}
