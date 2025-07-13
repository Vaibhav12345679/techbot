const chatBox = document.getElementById("chat-box");

function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  chatBox.innerHTML += `<div><b>You:</b> ${message}</div>`;
  input.value = "";

  fetch("https://techoftheworld.great-site.net/?techbot", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "message=" + encodeURIComponent(message)
  })
  .then(res => res.text())
  .then(reply => {
    chatBox.innerHTML += `<div><b>TechBot:</b> ${reply}</div>`;
    document.getElementById("feedback-form").style.display = "block";
  })
  .catch(() => {
    chatBox.innerHTML += `<div><b>TechBot:</b> Failed to connect.</div>`;
  });
}

function submitFeedback() {
  const feedback = document.getElementById("feedback").value.trim();
  if (!feedback) return alert("Please enter your feedback.");
  fetch("https://techoftheworld.great-site.net/send-feedback.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "feedback=" + encodeURIComponent(feedback)
  }).then(() => {
    alert("Thanks for your feedback!");
    document.getElementById("feedback-form").style.display = "none";
  });
}
