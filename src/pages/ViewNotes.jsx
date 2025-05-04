import { useState, useEffect } from "react";
import NoteCard from "../components/NoteCard";

import { StickyNote, Trash2 } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const ViewNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const loadNotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/api/notes");
      setNotes(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to load notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/api/notes/${id}`);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
      alert("Failed to delete note. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-yellow-500">
          <StickyNote size={48} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={loadNotes}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="flex justify-center mb-4 text-yellow-400">
          <StickyNote size={64} />
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          No Notes Yet
        </h2>
        <p className="text-gray-500 mb-6">
          Create your first note to get started
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
        >
          Create a Note
        </Link>
      </div>
    );
  }
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <>
      <div className="max-w-6xl mx-auto">

        {/* SEARCH BOX  */}

        <input
          type="text"
          placeholder="Search Notes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full outline-none border-2 rounded-lg p-2"
        />
        <>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Your Notes
            </h1>
            <p className="text-gray-600">
              {notes.length} {notes.length === 1 ? "note" : "notes"} stored
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <NoteCard key={note.id} note={note} onDelete={handleDelete} />
              ))
            ) : (
      //If there is no note same as the search query display this parapgraph
              <p className="text-black text-center pt-4">
                No result match for your search please try again
              </p>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default ViewNotes;
