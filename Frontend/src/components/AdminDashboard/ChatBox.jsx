import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  X,
  MoreVertical,
  MessageCircle,
  Send,
} from "lucide-react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { getConversation } from "../../API's/employee";

const ChatBox = ({ user, onClose }) => {
  const currentUser = useSelector((store) => store.user);
  const textRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const socketRef = useRef(null);

  const addMessageOnce = (message) => {
    setMessages((previousMessages) => {
      if (previousMessages.some((item) => item._id === message._id)) {
        return previousMessages;
      }
      return [...previousMessages, message].sort(
        (first, second) => new Date(first.createdAt) - new Date(second.createdAt)
      );
    });
  };

  // Socket Connection
  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_URL, {
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    const loadConversation = async () => {
      try {
        const response = await getConversation(user._id);
        const previousMessages = response.data.data.messages;
        setMessages((currentMessages) => {
          const allMessages = [...currentMessages, ...previousMessages];
          const uniqueMessages = allMessages.filter(
            (message, index, list) =>
              list.findIndex((item) => item._id === message._id) === index
          );
          return uniqueMessages.sort(
            (first, second) => new Date(first.createdAt) - new Date(second.createdAt)
          );
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "Could not load messages");
      }
    };

    loadConversation();

    const handleReceiveMessage = (data) => {
      if (data.sender?._id !== user._id) return;
      addMessageOnce(data);
    };

    socket.on("rec-msg", handleReceiveMessage);

    return () => {
      socket.off("rec-msg", handleReceiveMessage);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [user._id]);

  // Event handle Frontend
  const handleSendMessage = () => {
    const message = text.trim();

    if (!message) {
      toast.error("Please enter some message..");
      return;
    }

    if (!socketRef.current?.connected) {
      toast.error("Chat connection is not ready. Please try again.");
      return;
    }

    socketRef.current.emit("send-msg", {
      msg: message,
      receiverId: user._id,
    }, (response) => {
      if (!response?.success) {
        toast.error(response?.message || "Message could not be sent");
        return;
      }

      addMessageOnce(response.message);
      setText("");
      textRef.current?.focus();
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/20 p-4 backdrop-blur-[2px]">

      {/* Chat Container */}
      <div className="flex h-[min(720px,88vh)] w-[min(600px,92vw)] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.22)]">

        {/* ================= HEADER ================= */}
        <div className="flex shrink-0 items-center justify-between bg-slate-950 px-5 py-4">

          <div className="flex min-w-0 items-center gap-3">

            {/* Avatar */}
            <div className="relative shrink-0">

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br ${
                  user.avatar || "from-slate-600 to-slate-900"
                } text-sm font-bold text-white`}
              >
                {user.initials ||
                  user.name?.charAt(0)?.toUpperCase()}
              </div>

            </div>

            {/* User Info */}
            <div className="min-w-0">

              <h3 className="truncate text-sm font-semibold text-white">
                {user.name}
              </h3>

              <p className="mt-1 text-xs capitalize text-slate-400">
                {user.role} | {user.email}
              </p>

            </div>

          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-1">

            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <MoreVertical className="h-4 w-4" />
            </button>

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

          </div>

        </div>

        {/* ================= MESSAGES ================= */}
        <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50">

          <div className="flex min-h-full flex-col px-5 py-6">

            {messages.length === 0 ? (

              <div className="flex flex-1 flex-col items-center justify-center text-center">

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">

                  <MessageCircle className="h-6 w-6 text-slate-400" />

                </div>

                <h2 className="text-base font-semibold text-slate-800">
                  Start a conversation
                </h2>

                <p className="mt-1.5 max-w-xs text-xs leading-5 text-slate-400">
                  Send a message to start chatting with {user.name}.
                </p>

              </div>

            ) : (

              <div className="mt-auto flex flex-col gap-3">

                {messages.map((message) => {
                  const senderId =
                    typeof message.sender === "object"
                      ? message.sender?._id
                      : message.sender;
                  const isMyMessage =
                    String(senderId) === String(currentUser?._id);

                  return (
                    <div
                      key={message._id}
                      className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-5 shadow-sm ${
                          isMyMessage
                            ? "rounded-br-md bg-blue-600 text-white"
                            : "rounded-bl-md bg-slate-200 text-slate-800"
                        }`}
                      >
                        {message.message}
                      </div>
                    </div>
                  );
                })}

              </div>

            )}

          </div>

        </div>

        {/* ================= INPUT ================= */}
        <div className="shrink-0 border-t border-slate-200 bg-white p-4">

          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 transition focus-within:border-slate-300 focus-within:bg-white">

            <input
              ref={textRef}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${user.name}...`}
              className="min-w-0 flex-1 bg-transparent px-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />

            <button
              onClick={handleSendMessage}
              disabled={!text.trim()}
              className="flex cursor-pointer h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white transition hover:bg-slate-800"
            >
              <Send className="h-4 w-4" />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ChatBox;
