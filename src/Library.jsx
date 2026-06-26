import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  TextField,
} from "@mui/material";

function Library({ user }) {
  const [books, setBooks] = useState([]);
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:3000/books/${user.id}`)
      .then((res) => res.json())
      .then(async (data) => {
        const enriched = await Promise.all(
          data.map(async (b) => {
            const notes = await fetch(`http://localhost:3000/notes/${user.id}?book_id=${b.id}`)
              .then((res) => res.json())
              .catch(() => []);
            const flashcards = await fetch(`http://localhost:3000/flashcards/${user.id}?book_id=${b.id}`)
              .then((res) => res.json())
              .catch(() => []);
            return { ...b, notes, flashcards, newNote: "", newQuestion: "", newAnswer: "" };
          })
        );
        setBooks(enriched);
      });
  }, [user]);

  async function viewSyllabus(bookId) {
    const res = await fetch(`http://localhost:3000/book/${bookId}/syllabus`);
    const data = await res.json();
    setSelectedSyllabus(data);
  }

  async function addNote(bookId, content) {
    await fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, book_id: bookId, content }),
    });
    const updated = await fetch(`http://localhost:3000/notes/${user.id}?book_id=${bookId}`).then(res => res.json());
    setBooks(prev => prev.map(b => b.id === bookId ? { ...b, notes: updated, newNote: "" } : b));
  }

  async function addFlashcard(bookId, question, answer) {
    await fetch("http://localhost:3000/flashcards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, book_id: bookId, question, answer }),
    });
    const updated = await fetch(`http://localhost:3000/flashcards/${user.id}?book_id=${bookId}`).then(res => res.json());
    setBooks(prev => prev.map(b => b.id === bookId ? { ...b, flashcards: updated, newQuestion: "", newAnswer: "" } : b));
  }

  async function generateFlashcards(bookId) {
    await fetch(`http://localhost:3000/generate-flashcards/${user.id}/${bookId}`);
    const updated = await fetch(`http://localhost:3000/flashcards/${user.id}?book_id=${bookId}`).then(res => res.json());
    setBooks(prev => prev.map(b => b.id === bookId ? { ...b, flashcards: updated } : b));
  }


  return (
    <div>
      <Typography variant="h4" gutterBottom>
        My Library
      </Typography>
      <Grid container spacing={2}>
        {books.map((b) => (
          <Grid item xs={12} md={6} lg={4} key={b.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{b.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Uploaded: {new Date(b.created_at).toLocaleDateString()}
                </Typography>

                {/* Notes */}
                <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
                  Notes
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={b.newNote}
                  onChange={(e) =>
                    setBooks(prev => prev.map(book => book.id === b.id ? { ...book, newNote: e.target.value } : book))
                  }
                  placeholder="Write a note..."
                />
                <Button size="small" onClick={() => addNote(b.id, b.newNote)}>Add Note</Button>
                <ul>
                  {b.notes.map((n, j) => <li key={j}>{n.content}</li>)}
                </ul>

                {/* Flashcards */}
                <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
                  Flashcards
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={b.newQuestion}
                  onChange={(e) =>
                    setBooks(prev => prev.map(book => book.id === b.id ? { ...book, newQuestion: e.target.value } : book))
                  }
                  placeholder="Enter question"
                />
                <TextField
                  fullWidth
                  size="small"
                  value={b.newAnswer}
                  onChange={(e) =>
                    setBooks(prev => prev.map(book => book.id === b.id ? { ...book, newAnswer: e.target.value } : book))
                  }
                  placeholder="Enter answer"
                />
                <Button size="small" onClick={() => addFlashcard(b.id, b.newQuestion, b.newAnswer)}>Add Flashcard</Button>
                {b.flashcards.map((c, j) => (
                  <div key={j} style={{ marginBottom: "8px" }}>
                    <p><strong>Q:</strong> {c.question}</p>
                    <p><strong>A:</strong> {c.answer}</p>
                  </div>
                ))}
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  href={b.file_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View File
                </Button>
                <Button size="small" onClick={() => viewSyllabus(b.id)}>
                  View Syllabus
                </Button>
                <Button size="small" onClick={() => generateFlashcards(b.id)}>
                  Generate Flashcards
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedSyllabus && (
        <Card style={{ marginTop: "20px" }}>
          <CardContent>
            <Typography variant="h5">Syllabus</Typography>
            <Typography variant="subtitle1">Theme</Typography>
            <Typography>{selectedSyllabus.theme}</Typography>

            <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
              Highlights
            </Typography>
            <ul>
              {selectedSyllabus.highlights.map((h, j) => (
                <li key={j}>{h}</li>
              ))}
            </ul>

            <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
              Vocabulary
            </Typography>
            <ul>
              {selectedSyllabus.vocabulary.map((v, j) => (
                <li key={j}>
                  <strong>{v.word}</strong> ({v.pos})
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Library;
