export async function fetchAvailableUsers() {
  const response = await fetch("http://localhost:3000/api/users");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return resData.users;
}
