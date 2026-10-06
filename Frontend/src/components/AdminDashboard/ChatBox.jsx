import React, { useEffect, useRef, useState } from "react";
import {
  X,
  MoreVertical,
  MessageCircle,
  Send,
} from "lucide-react";
import toast from 'react-hot-toast'
import { io } from "socket.io-client";

const ChatBox = ({ user, onClose }) => {
  const textRef = useRef(null)
  const [messages, setMessages] = useState([])

  // Socket Connection
  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_URL);

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex h-150 w-100 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

      {/* Chat Header */}
      <div className="flex items-center justify-between bg-slate-950 px-5 py-4">

        <div className="flex items-center gap-3">

          <div className="relative">

            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br ${user.avatar} text-sm font-bold text-white`}
            >
              {user.initials}
            </div>

            <span
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-950 ${
                user.online
                  ? "bg-emerald-500"
                  : "bg-slate-400"
              }`}
            />

          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              {user.name}
            </h3>

            <p className="text-xs text-slate-400">
              {user.online ? "Online" : "Offline"}
            </p>
          </div>

        </div>

        <div className="flex items-center gap-1">

          <button className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white">
            <MoreVertical className="h-4 w-4" />
          </button>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>

        </div>

      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-slate-50 p-5">

        <div className="flex h-full flex-col items-center justify-center text-center">

          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-200">
            <MessageCircle className="h-5 w-5 text-slate-500" />
          </div>

          <p className="text-sm font-medium text-slate-700">
            No messages yet
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Start a conversation with {user.name}.
          </p>

        </div>

      </div>

      {/* Message Input */}
      <div className="border-t border-slate-200 bg-white p-4">

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2">

          <input
            ref={textRef}
            type="text"
            placeholder={`Message ${user.name}...`}
            className="min-w-0 flex-1 bg-transparent px-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />

          <button
            onClick={() => {
              if(!messages){
                toast.error("Please enter some messages..")
                return
              }
              setMessages([...messages, textRef.current.value])
             
            }}
            className="flex cursor-pointer h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-white"
          >
            <Send className="h-4 w-4" />
          </button>

        </div>

      </div>

    </div>
  );
};

export default ChatBox;
