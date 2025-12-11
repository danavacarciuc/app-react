import "./User.css";

function UserDetails({ user }) {
  if (!user) {
    return <div className="details">Select a user to see details...</div>;
  }

  return (
    <div className="details">
      <h2>User Details</h2>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Full Name:</strong> {user.fullName}
      </p>
      {user.email && (
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      )}
      <p>
        <strong>Type:</strong> {user.type}
      </p>
    </div>
  );
}

export default UserDetails;
