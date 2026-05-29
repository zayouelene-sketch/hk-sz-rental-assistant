import { Sparkles } from "lucide-react";

export default function EmptyState({ title, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Sparkles size={26} />
      </div>
      <h2>{title}</h2>
      <p>你可以调整 AI 匹配标签，或重新浏览当前筛选下的房源。</p>
      {actionLabel && (
        <button type="button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
