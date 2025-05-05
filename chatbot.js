async function sendMessage() {
    const input = document.getElementById("userInput");
    const chat = document.getElementById("chatMessages");
  
    const userText = input.value.trim();
    if (!userText) return;
  
    chat.innerHTML += `<div><strong>Bạn:</strong> ${userText}</div>`;
    input.value = "";
  
    const apiKey = "YOUR_OPENAI_API_KEY"; // 🔐 Thay bằng API key thực tế
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userText }]
      })
    });
  
    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content || "Không có phản hồi.";
    chat.innerHTML += `<div><strong>AI:</strong> ${aiReply}</div>`;
  
    chat.scrollTop = chat.scrollHeight;
  }
  