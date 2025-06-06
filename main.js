document.getElementById("search-btn").onclick = async () => {
  const username = document.getElementById("username").value.trim();
  const userInfoDiv = document.getElementById("user-info");

  if (!username) {
    alert("Please enter a GitHub username.");
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error("User not found");

    const data = await response.json();

    userInfoDiv.innerHTML = `
      <img src="${data.avatar_url}" width="150" />
      <h2>${data.name || "No name"} (${data.login})</h2>
      <p><strong>GitHub:</strong> <a href="${data.html_url}" target="_blank">${data.html_url}</a></p>
      <p><strong>Blog:</strong> <a href="${data.blog}" target="_blank">${data.blog || "N/A"}</a></p>
      <p><strong>Location:</strong> ${data.location || "N/A"}</p>
      <p><strong>Email:</strong> ${data.email || "N/A"}</p>
      <p><strong>Followers:</strong> ${data.followers} | <strong>Following:</strong> ${data.following}</p>
    `;
  } catch (error) {
    userInfoDiv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
};
