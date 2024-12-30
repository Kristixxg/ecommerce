const loginButton = document.getElementById("login-button");
const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");

loginButton.addEventListener("click", async () => {
  try {
    const data = {
      username: loginUsername.value,
      password: loginPassword.value,
    };

    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    const passwordMinLength = 8;

    if (!usernameRegex.test(data.username)) {
      alert(
        "Invalid username. Only letters, numbers, underscores, and dashes are allowed."
      );
      return;
    }
    if (data.password.length < passwordMinLength) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    console.log(data);

    const res = await fetch("/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      alert(`Login failed. Error Code: ${res.status} ${res.statusText}`);
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
