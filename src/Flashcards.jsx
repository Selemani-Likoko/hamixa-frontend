import React, { useState, useEffect } from "react";

function Flashcards({ user }) {
  const [cards, setCards] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:3000/flashcards/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setCards(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching flashcards:", err);
        setLoading(false);
      });
  }, [user]);

  async function addCard() {
    if (!question.trim() || !answer.trim()) return;
    try {
      await fetch("http://localhost:3000/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, book_id: null, question, answer })
      });
      setQuestion("");
      setAnswer("");
      const updated = await fetch(`http://localhost:3000/flashcards/${user.id}`).then(res => res.json());
      setCards(updated);
    } catch (err) {
      console.error("Error adding flashcard:", err);
    }
  }

  // GenerateAutoCards function
  async function generateAutoCards() {
    try {
      await fetch(`http://localhost:3000/generate-flashcards/${user.id}`);
      // Refresh cards after generation
      const updated = await fetch(`http://localhost:3000/flashcards/${user.id}`).then(res => res.json());
      setCards(updated);
    } catch (err) {
      console.error("Error generating auto flashcards:", err);
    }
  }

  if (loading) return <p>Loading flashcards...</p>;

  return (
    <div>
      <h2>My Flashcards</h2>
      <input
        type="text"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Enter question"
      />
      <input
        type="text"
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        placeholder="Enter answer"
      />
      <button onClick={addCard}>Add Flashcard</button>

      {/* Button to trigger auto-generation */}
      <button onClick={generateAutoCards}>Generate Flashcards from Syllabus</button>

      <div>
        {cards.map((c, i) => (
          <div key={i} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <p><strong>Q:</strong> {c.question}</p>
            <p><strong>A:</strong> {c.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Flashcards;
