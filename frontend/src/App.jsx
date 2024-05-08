import AppWindow from "./components/app-window/app-window";
import { ChatProvider } from "./store/chatContext";
import { UserProvider } from "./store/userContext";

function App() {
  return (
    <UserProvider>
      <ChatProvider>
        <AppWindow />
      </ChatProvider>
    </UserProvider>
  );
}

export default App;
