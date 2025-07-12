const chatBox = document.getElementById("chat-box");

function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  chatBox.innerHTML += `<div><b>You:</b> ${message}</div>`;
  input.value = "";

  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    })
  })
  .then(res => res.json())
  .then(data => {
    const reply = data.choices?.[0]?.message?.content || "Sorry, I didn't understand.";
    chatBox.innerHTML += `<div><b>TechBot:</b> ${reply}</div>`;
    document.getElementById("feedback-form").style.display = "block";
  })
  .catch(err => {
    chatBox.innerHTML += `<div><b>TechBot:</b> Error talking to server.</div>`;
  });
}

function submitFeedback() {
  const feedback = document.getElementById("feedback").value.trim();
  if (!feedback) return alert("Please enter your feedback.");
  fetch("https://techoftheworld.great-site.net/send-feedback.php", {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: "feedback=" + encodeURIComponent(feedback)
  }).then(() => {
    alert("Thanks for your feedback!");
    document.getElementById("feedback-form").style.display = "none";
  });
}
