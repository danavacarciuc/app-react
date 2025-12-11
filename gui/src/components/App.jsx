import { useState } from "react";
import UserList from "./UserList";
import UserDetails from "./UserDetails";
import "./App.css";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="app-container">
      <div className="left-panel">
        <UserList onSelectUser={setSelectedUser} />
      </div>

      <div className="right-panel">
        <UserDetails user={selectedUser} />
      </div>
    </div>
  );
}

export default App;
