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
  console.log(resData);
  return resData.conversations;
}
