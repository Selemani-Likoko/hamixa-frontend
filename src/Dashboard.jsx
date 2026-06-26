import React, { useEffect, useState } from "react";

function Dashboard({ user }) {
  const [syllabus, setSyllabus] = useState(null);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/syllabus/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setSyllabus(data[0]); // take the latest syllabus
        }
      })
      .catch((err) => console.error("Error fetching syllabus:", err));
  }, [user]);

  if (!syllabus) return <p>Loading syllabus...</p>;

  return (
    <div>
      <h2>Syllabus Results</h2>

      <section>
        <h3>Theme</h3>
        <p>{syllabus.theme}</p>
      </section>

      <section>
        <h3>Highlights</h3>
        <ul>
          {syllabus.highlights?.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Vocabulary</h3>
        <ul>
          {syllabus.vocabulary?.map((v, i) => (
            <li key={i}>
              <strong>{v.word}</strong> ({v.pos})
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;
