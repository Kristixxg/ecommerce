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
    const { token, userId, role } = dataJson;

    // currentUserId = dataJson.userId;
    // console.log(dataJson.userId);

    window.localStorage.setItem("username", data.username);
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("id", userId);
    window.localStorage.setItem("role", role);
    document.location.href = "/";
  } catch (error) {
    console.error(`Login unsucessfully: ${error}`);
  }
});
