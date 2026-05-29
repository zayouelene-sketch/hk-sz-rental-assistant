import {
  ArrowLeft,
  Banknote,
  Bell,
  Bot,
  ChevronRight,
  FileText,
  Gift,
  Inbox,
  Megaphone,
  MessageCircle,
  Settings,
  Trash2,
  X
} from "lucide-react";
import { useMemo, useRef, useState } from "react";

const tabs = [
  { key: "all", label: "全部" },
  { key: "trade", label: "交易" },
  { key: "system", label: "系统" },
  { key: "activity", label: "活动" },
  { key: "service", label: "服务" }
];

const initialMessages = [
  {
    id: 1,
    category: "system",
    title: "系统通知",
    content: "关于优化港深通勤租房助手服务的通知",
    time: "10:30",
    unread: true,
    icon: "bell"
  },
  {
    id: 2,
    category: "trade",
    title: "订单消息",
    content: "您的看房预约已确认",
    time: "昨天 18:45",
    unread: true,
    icon: "document"
  },
  {
    id: 3,
    category: "trade",
    title: "交易提醒",
    content: "您的押金支付已完成",
    time: "昨天 15:20",
    unread: true,
    icon: "money"
  },
  {
    id: 4,
    category: "service",
    title: "服务消息",
    content: "专属顾问为您推荐了新的房源",
    time: "昨天 10:05",
    unread: false,
    icon: "chat"
  },
  {
    id: 5,
    category: "activity",
    title: "活动消息",
    content: "新人专享福利｜最高可领 ¥300 优惠券",
    time: "5月24日",
    unread: false,
    icon: "gift"
  },
  {
    id: 6,
    category: "service",
    title: "AI助手",
    content: "为您找到 3 套符合通勤时间的房源",
    time: "5月23日",
    unread: false,
    icon: "robot"
  },
  {
    id: 7,
    category: "system",
    title: "平台公告",
    content: "端午节期间客服服务时间调整通知",
    time: "5月20日",
    unread: false,
    icon: "megaphone"
  }
];

const iconMap = {
  bell: Bell,
  document: FileText,
  money: Banknote,
  chat: MessageCircle,
  gift: Gift,
  robot: Bot,
  megaphone: Megaphone
};

function MessageIcon({ type }) {
  const Icon = iconMap[type] || Bell;

  return (
    <span className={`message-icon ${type}`}>
      <Icon size={25} />
    </span>
  );
}

function ToggleRow({ label, enabled, onToggle }) {
  return (
    <button className="setting-row" type="button" onClick={onToggle}>
      <span>{label}</span>
      <span className={`ios-switch ${enabled ? "on" : ""}`} aria-hidden="true">
        <span />
      </span>
    </button>
  );
}

export default function MessagePage({ onBack }) {
  const [messages, setMessages] = useState(initialMessages);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [toast, setToast] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [openDeleteId, setOpenDeleteId] = useState(null);
  const [pointerStartX, setPointerStartX] = useState(null);
  const toastTimerRef = useRef(null);
  const suppressClickRef = useRef(false);
  const [settings, setSettings] = useState({
    system: true,
    trade: true,
    activity: true
  });

  const filteredMessages = useMemo(() => {
    if (activeTab === "all") return messages;
    return messages.filter((message) => message.category === activeTab);
  }, [activeTab, messages]);

  function showToast(text) {
    setToast(text);
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(""), 1800);
  }

  function handleTabChange(tab) {
    setActiveTab(tab);
    setOpenDeleteId(null);
  }

  function handleReadAll() {
    setMessages((items) => items.map((item) => ({ ...item, unread: false })));
    showToast("已全部标记为已读");
  }

  function handleOpenMessage(message) {
    setSelectedMessage({ ...message, unread: false });
    setOpenDeleteId(null);

    if (message.unread) {
      setMessages((items) =>
        items.map((item) => (item.id === message.id ? { ...item, unread: false } : item))
      );
    }
  }

  function handleDelete(id) {
    setMessages((items) => items.filter((item) => item.id !== id));
    setOpenDeleteId(null);
    showToast("消息已删除");
  }

  function handlePointerUp(messageId, event) {
    if (pointerStartX === null) return;

    const deltaX = pointerStartX - event.clientX;
    if (deltaX > 34) {
      setOpenDeleteId(messageId);
      suppressClickRef.current = true;
    }
    if (deltaX < -24) {
      setOpenDeleteId(null);
      suppressClickRef.current = true;
    }
    setPointerStartX(null);
  }

  return (
    <main className="app-shell message-shell">
      <div className="phone-frame messages-frame">
        <div className="status-bar message-status">
          <span>9:41</span>
          <span className="status-icons">▮▮▮  Wi-Fi  ▰</span>
        </div>

        <header className="messages-header">
          <div className="messages-title-group">
            <button className="message-back-button" type="button" onClick={onBack} aria-label="返回主界面">
              <ArrowLeft size={21} />
            </button>
            <h1>消息</h1>
          </div>
          <div className="messages-actions">
            <button className="read-all-button" type="button" onClick={handleReadAll}>
              全部已读
            </button>
            <button
              className="message-settings-button"
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              aria-label="消息设置"
            >
              <Settings size={22} />
            </button>
          </div>
        </header>

        <nav className="message-tabs" aria-label="消息分类">
          {tabs.map((tab) => (
            <button
              className={activeTab === tab.key ? "active" : ""}
              key={tab.key}
              type="button"
              onClick={() => handleTabChange(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <section className="message-list" key={activeTab} aria-live="polite">
          {filteredMessages.length === 0 ? (
            <div className="message-empty">
              <Inbox size={34} />
              <strong>暂无相关消息</strong>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div
                className={`message-swipe-row ${openDeleteId === message.id ? "revealed" : ""}`}
                key={message.id}
              >
                <button
                  className="delete-action"
                  type="button"
                  onClick={() => handleDelete(message.id)}
                  aria-label={`删除${message.title}`}
                >
                  <Trash2 size={18} />
                  删除
                </button>
                <button
                  className={`message-card ${message.unread ? "unread" : "read"} ${
                    openDeleteId === message.id ? "swiped" : ""
                  }`}
                  type="button"
                  onClick={() => {
                    if (suppressClickRef.current) {
                      suppressClickRef.current = false;
                      return;
                    }
                    openDeleteId === message.id ? setOpenDeleteId(null) : handleOpenMessage(message);
                  }}
                  onPointerDown={(event) => setPointerStartX(event.clientX)}
                  onPointerUp={(event) => handlePointerUp(message.id, event)}
                >
                  {message.unread && <span className="unread-dot" />}
                  <MessageIcon type={message.icon} />
                  <span className="message-copy">
                    <strong>{message.title}</strong>
                    <span>{message.content}</span>
                  </span>
                  <span className="message-meta">
                    <time>{message.time}</time>
                    <ChevronRight size={20} />
                  </span>
                </button>
              </div>
            ))
          )}
        </section>

        <div className="home-indicator" />

        {selectedMessage && (
          <div className="sheet-overlay" onClick={() => setSelectedMessage(null)}>
            <section className="bottom-sheet" onClick={(event) => event.stopPropagation()}>
              <button
                className="sheet-close"
                type="button"
                onClick={() => setSelectedMessage(null)}
                aria-label="关闭详情"
              >
                <X size={18} />
              </button>
              <div className="sheet-handle" />
              <MessageIcon type={selectedMessage.icon} />
              <h2>{selectedMessage.title}</h2>
              <time>{selectedMessage.time}</time>
              <p>
                {selectedMessage.content}。您可以在房源详情页查看完整信息。如有疑问，可联系 AI
                助手或房东。
              </p>
            </section>
          </div>
        )}

        {isSettingsOpen && (
          <div className="sheet-overlay" onClick={() => setIsSettingsOpen(false)}>
            <section className="bottom-sheet settings-sheet" onClick={(event) => event.stopPropagation()}>
              <button
                className="sheet-close"
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                aria-label="关闭设置"
              >
                <X size={18} />
              </button>
              <div className="sheet-handle" />
              <h2>通知设置</h2>
              <ToggleRow
                label="接收系统通知"
                enabled={settings.system}
                onToggle={() => setSettings((state) => ({ ...state, system: !state.system }))}
              />
              <ToggleRow
                label="接收交易提醒"
                enabled={settings.trade}
                onToggle={() => setSettings((state) => ({ ...state, trade: !state.trade }))}
              />
              <ToggleRow
                label="接收活动消息"
                enabled={settings.activity}
                onToggle={() => setSettings((state) => ({ ...state, activity: !state.activity }))}
              />
            </section>
          </div>
        )}

        {toast && <div className="toast">{toast}</div>}
      </div>
    </main>
  );
}
