import useHttp from "../../hooks/useHttp";
import classes from "./login.module.css";
import { fetchAvailableUsers } from "../../http";
import { useUser } from "../../store/userContext";
import { useEffect } from "react";

export default function Login() {
  const {
    isFetching,
    fetchedData: availableUsers,
    error,
    executeFetch,
  } = useHttp(fetchAvailableUsers, []);

  useEffect(() => {
    executeFetch();
  }, [executeFetch]);

  const { setSelectedUser } = useUser();

  const handleLogin = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className={classes.container}>
      {isFetching && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {availableUsers && availableUsers.length > 0 && (
        <>
          <header className={classes.header}>
            <h2>Log in as one of the available users</h2>
          </header>
          <ul className={classes.userContainer}>
            {availableUsers.map((user) => (
              <li
                key={user.id}
                className={classes.userBox}
                onClick={() => handleLogin(user)}
              >
                <p>{user.username}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
