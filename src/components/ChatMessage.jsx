export default function ChatMessage({ role, content }) {
  return (
    <div
      className={`my-2 p-3 rounded-xl max-w-[80%] ${
        role === "user"
          ? "ml-auto bg-blue-100 text-blue-900"
          : "mr-auto bg-gray-200 text-gray-900"
      }`}
    >
      {content}
    </div>
  );
}
