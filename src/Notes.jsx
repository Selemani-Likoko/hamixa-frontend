import React, { useState, useEffect } from "react";

function Notes({ user }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:3000/notes/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setNotes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching notes:", err);
        setLoading(false);
      });
  }, [user]);

  async function addNote() {
    if (!newNote.trim()) return;
    try {
      await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, book_id: null, content: newNote })
      });
      setNewNote("");
      // Refresh notes from backend
      const updated = await fetch(`http://localhost:3000/notes/${user.id}`).then(res => res.json());
      setNotes(updated);
    } catch (err) {
      console.error("Error adding note:", err);
    }
  }

  if (loading) return <p>Loading notes...</p>;

  return (
    <div>
      <h2>My Notes</h2>
      <textarea
        value={newNote}
        onChange={e => setNewNote(e.target.value)}
        placeholder="Write your note here..."
      />
      <button onClick={addNote}>Add Note</button>
      <ul>
        {notes.map((n, i) => <li key={i}>{n.content}</li>)}
      </ul>
    </div>
  );
}

export default Notes;
