const loginButton = document.getElementById("login-button");
const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");

loginButton.addEventListener("click", async () => {
  try {
    const data = {
      username: loginUsername.value,
      password: loginPassword.value,
    };

    console.log(data);

    const res = await fetch("/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      alert(`Login failed: ${res.status}`);
      return;
    }

    const dataJson = await res.json();
    const { token, userId } = dataJson;

    // currentUserId = dataJson.userId;
    // console.log(dataJson.userId);

    window.localStorage.setItem("username", data.username);
    window.localStorage.setItem("token", token);
    document.location.href = "/";
    // renderLikedSongs(currentUserId);
    // renderArtists(currentUserId);
  } catch (error) {
    console.error(`Login unsucessfully: ${error}`);
  }
});
