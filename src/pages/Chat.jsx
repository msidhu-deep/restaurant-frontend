// Chat page
import { useState } from "react";
import chatData from "../data/chatData";

function Chat() {
  // list of messages shown on screen
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! Ask me about specials, vegetarian meals, or desserts.",
    },
  ]);
  // what the user is typing
  const [input, setInput] = useState("");

  // find the answer that matches the user's message
  function getReply(text) {
    const lower = text.toLowerCase();

    for (const item of chatData) {
      // check if any keyword is in the message
      const found = item.keywords.some((word) => lower.includes(word));
      if (found) {
        return item.answer;
      }
    }

    // nothing matched
    return "Sorry, I don't know that one. Try asking about specials or vegetarian meals.";
  }

  function handleSend(e) {
    // stop the page from reloading
    e.preventDefault();

    // ignore empty messages
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    const botMessage = { sender: "bot", text: getReply(input) };

    // add both messages to the list
    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  }

  return (
    <div>
      <h1>Chat Assistant</h1>

      {/* show every message */}
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender === "user" ? "You" : "Assistant"}:</strong>{" "}
            {msg.text}
          </p>
        ))}
      </div>

      {/* message box and send button */}
      <form onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type your question"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
