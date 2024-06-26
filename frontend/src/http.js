export async function fetchAvailableUsers() {
  const response = await fetch("http://localhost:3000/api/users");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return resData.users;
}

export async function fetchAvailableConversations(userId) {
  const response = await fetch(
    `http://localhost:3000/api/users/${userId}/conversations`
  );
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch conversations");
  }
  return resData.conversations;
}

export async function fetchAvailableConversationMessages(conversationId) {
  const response = await fetch(
    `http://localhost:3000/api/conversations/${conversationId}/messages`
  );
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch conversation messages");
  }
  return resData.messages.messages;
}

export async function sendMessage(senderId, receiverId, message) {
  const response = await fetch(`http://localhost:3000/api/messages`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ senderId, receiverId, message }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch conversation messages");
  }
}
