"use client";

import { useState, useEffect } from 'react';
import Parse from 'parse';
import { Message, Project, User } from '@lib';

interface ChatProps {
  project: Project;
  user: User;
}

export const Chat = ({ project, user }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    const fetchMessages = async () => {
      const query = new Parse.Query(Message);
      query.equalTo('project', project);
      query.ascending('createdAt');
      const results = await query.find();
      setMessages(results);
    };
    fetchMessages();
  }, [project]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      // Create a new message in the Parse Message class
      const message = new Message();
      message.content = newMessage;
      message.sender = user;
      message.senderName = user.get('username');
      message.project = project;

      await message.save();

      // Update the chat message list with the new message
      setMessages([...messages, message]);
      setNewMessage(""); // Clear the input field
    }
  };

  return (
    <div>
      <ul className="space-y-4 mb-4">
        {messages.map((msg, index) => (
          <li key={index} className={`p-4 rounded-lg shadow ${msg.get('sender') === user ? "bg-blue-100" : "bg-gray-100"}`}>
            <p>{msg.get('content')}</p>
            <p className="text-sm text-gray-500">Sent by {msg.get('senderName')} at {msg.get('createdAt').toLocaleString()}</p>
          </li>
        ))}
      </ul>

      <textarea
        className="w-full p-2 border rounded"
        rows={2}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg">
        Send Message
      </button>
    </div>
  );
};
