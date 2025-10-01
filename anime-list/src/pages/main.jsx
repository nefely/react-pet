import { useState } from "react";
import AnimeList from "../components/AnimeList.jsx";
import AddAnimeModal from "../components/AddAnimeModal.jsx";
import AuthStatus from "../components/AuthStatus.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


export default function Main() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [showAdd, setShowAdd] = useState(false);
    const [user, setUser] = useState(null);

    const handleAdded = () => {
        setRefreshKey((k) => k + 1);
        setShowAdd(false);
    };

    return (
        <main className="main">
            <section className="py-4">
                <div className="container">
                    <div className="mb-4 center">
                        <AuthStatus onSignedIn={setUser} style={{display: "flex"}}/>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h1 className="title mb-0">Anime List</h1>
                        <div className="d-flex align-items-center gap-3">
                            {user && (
                                <button className="btn btn-success" onClick={() => setShowAdd(true)}><FontAwesomeIcon icon={faPlus} /></button>
                            )}
                        </div>
                    </div>

                    <AnimeList refreshKey={refreshKey} />
                </div>
            </section>

            <AddAnimeModal show={showAdd} onClose={() => setShowAdd(false)} onSaved={handleAdded} />
        </main>
    );
}
