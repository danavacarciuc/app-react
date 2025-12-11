import { useEffect, useState } from "react";
import User from "./User";
import "./UserList.css";

const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

function UserList(props) {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null); // FIX 1

  const getUsers = async () => {
    const response = await fetch(`${SERVER}/users`);
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="user-list">
      {users.map((u) => (
        <div key={u.id} onClick={() => props.onSelectUser(u)}>
          {" "}
          {/* FIX 2 */}
          <User item={u} />
        </div>
      ))}
    </div>
  );
}

export default UserList;
