import React, { useState } from "react";
import Login from "./Login";
import Layout from "./Layout";
import UploadBook from "./UploadBook";


function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return <Layout user={user} />;
}

export default App;
