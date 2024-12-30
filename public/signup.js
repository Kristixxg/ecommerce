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

    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordMinLength = 8;

    if (!usernameRegex.test(data.username)) {
      alert(
        "Invalid username. Only letters, numbers, underscores, and dashes allowed and minimum length is 3."
      );
      return;
    }
    if (!emailRegex.test(data.email)) {
      alert("Invalid email format.");
      return;
    }
    if (data.password.length < passwordMinLength) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    const res = await fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.log(res);
      alert(`Cannot create User. Error ${res.status} ${res.statusText}`);
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
