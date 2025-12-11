// Simple demo chat UI.
// Phase 1: chỉ mô phỏng hội thoại và UI, chưa gọi API OpenAI.

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatWindow = document.getElementById("chat-window");

function appendMessage(role, text) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("message", role);

    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.textContent = text;

    wrapper.appendChild(bubble);
    chatWindow.appendChild(wrapper);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    appendMessage("user", text);
    chatInput.value = "";

    // Demo response – tạm thời giả lập assistant trả lời.
    setTimeout(() => {
        appendMessage(
            "bot",
            "Đây là phản hồi demo trên frontend. Sau này phần này sẽ gọi API tới backend " +
            "của bạn (Python/Node, v.v.) để truy vấn OpenAI và trả kết quả thật."
        );
    }, 500);
});

/*
 * Gợi ý cho Phase 2 – Kết nối API OpenAI qua backend:
 *
 * 1. Bạn triển khai một endpoint backend, ví dụ: POST https://your-backend.com/chat
 *    Backend sẽ nhận { messages: [...] } và dùng OpenAI API để trả lời.
 *
 * 2. Tại đây, bạn thay đoạn setTimeout(...) bằng fetch tới endpoint của backend:
 *
 *    fetch("https://your-backend.com/chat", {
 *      method: "POST",
 *      headers: { "Content-Type": "application/json" },
 *      body: JSON.stringify({ message: text })
 *    })
 *    .then(res => res.json())
 *    .then(data => {
 *        appendMessage("bot", data.reply);
 *    })
 *    .catch(err => {
 *        console.error(err);
 *        appendMessage("bot", "Có lỗi xảy ra khi gọi API backend.");
 *    });
 *
 * 3. Tuyệt đối KHÔNG nhúng trực tiếp API key OpenAI trong file JS này.
 *    API key phải nằm ở server/backend (environment variable).
 */
