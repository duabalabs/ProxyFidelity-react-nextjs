"use client";

import { Message } from '@lib';
import { useState, useEffect } from 'react';
import Parse from "parse";

export const MessageList = ({ user }: { user: any }) => {
  const [unreadMessages, setUnreadMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      const query = new Parse.Query(Message);
      query.equalTo('receiver', user);
      query.equalTo('status', 'unread'); // Only fetch unread messages
      const results = await query.find();
      setUnreadMessages(results);
    };

    fetchUnreadMessages();
  }, [user]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">New Messages</h2>
      {unreadMessages.length === 0 ? (
        <p className="text-gray-500 text-center">No new messages</p>
      ) : (
        <ul className="space-y-4">
          {unreadMessages.map((message) => (
            <li key={message.id} className="bg-gray-100 p-4 rounded-lg shadow">
              <a href={`/messages/${message.id}`} className="block">
                <h3 className="text-lg font-semibold text-gray-700">{message.title}</h3>
                <p className="text-gray-500">{message.body}</p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
