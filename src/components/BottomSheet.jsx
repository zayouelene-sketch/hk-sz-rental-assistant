import { Check, X } from "lucide-react";

export default function BottomSheet({ title, subtitle, options, selectedId, onSelect, onClose }) {
  return (
    <div className="sheet-overlay" onClick={onClose}>
      <section className="bottom-sheet filter-sheet" onClick={(event) => event.stopPropagation()}>
        <button className="sheet-close" type="button" onClick={onClose} aria-label="关闭选择器">
          <X size={18} />
        </button>
        <div className="sheet-handle" />
        <h2>{title}</h2>
        {subtitle && <p className="filter-sheet-subtitle">{subtitle}</p>}

        <div className="filter-option-list">
          {options.map((option) => (
            <button
              className={`filter-option ${option.id === selectedId ? "active" : ""}`}
              key={option.id}
              type="button"
              onClick={() => onSelect(option)}
            >
              <span>
                <strong>{option.name || option.label}</strong>
                {option.description && <small>{option.description}</small>}
              </span>
              {option.id === selectedId && <Check size={19} />}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
