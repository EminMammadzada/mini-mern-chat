import AppWindow from "./components/app-window/app-window";
import { ChatProvider } from "./store/chatContext";
import { SocketProvider } from "./store/socketContext";
import { UserProvider } from "./store/userContext";

function App() {
  return (
    <UserProvider>
      <ChatProvider>
        <SocketProvider>
          <AppWindow />
        </SocketProvider>
      </ChatProvider>
    </UserProvider>
  );
}

export default App;
