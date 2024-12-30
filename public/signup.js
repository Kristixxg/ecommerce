const signupButton = document.getElementById("signupBtn");
const signupUsername = document.getElementById("signup-username");
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
const goToLogin = document.getElementById("go-to-login");

signupButton.addEventListener("click", async () => {
  try {
    const data = {
      username: signupUsername.value,
      email: signupEmail.value,
      password: signupPassword.value,
    };

    const res = await fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      alert("Cannot create User", res.status);
      return;
    }

    const dataJson = await res.json();
    console.log(dataJson);
    const { token, user } = dataJson;
    // window.localStorage.setItem("token", token);
    // window.localStorage.setItem("username", data.username);
    // window.localStorage.setItem("id", user._id);
    document.location.href = "/login.html";
  } catch (error) {
    alert(`Sign up failed: ${error}`);
  }
});
