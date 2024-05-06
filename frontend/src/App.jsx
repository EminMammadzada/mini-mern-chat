import AppWindow from "./components/app-window/app-window";
import { ChatProvider } from "./store/chatContext";

function App() {
  return (
    <ChatProvider>
      <AppWindow />
    </ChatProvider>
  );
}

export default App;
