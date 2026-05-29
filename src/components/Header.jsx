import { Bell, Bot, Sparkles } from "lucide-react";

export default function Header({ onOpenMessages }) {
  return (
    <header className="header">
      <div className="status-bar">
        <span>9:41</span>
        <span className="status-icons">●●●  Wi-Fi  ▰</span>
      </div>

      <div className="title-row">
        <div>
          <h1>港深通勤租房助手</h1>
          <div className="route-pill">
            <Sparkles size={15} />
            <span>香港 → 深圳通勤</span>
          </div>
        </div>

        <div className="header-actions" aria-label="AI assistant">
          <button
            className="icon-button notification"
            type="button"
            onClick={onOpenMessages}
            aria-label="打开消息列表"
          >
            <Bell size={19} />
            <span>3</span>
          </button>
          <div className="bot-avatar">
            <Bot size={22} />
          </div>
        </div>
      </div>
    </header>
  );
}
