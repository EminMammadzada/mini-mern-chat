import classes from "./app-window.module.css";
import { useUser } from "../../store/userContext";
import Login from "../login/login";
import MainWindow from "../main-window/main-window";

export default function AppWindow() {
  const { selectedUser } = useUser();

  return (
    <div className={classes.window}>
      {selectedUser && <MainWindow />}
      {!selectedUser && <Login />}
    </div>
  );
}
