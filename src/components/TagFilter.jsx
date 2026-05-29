export default function TagFilter({ tags, selectedTag, onSelectTag, resultCount }) {
  const noun = selectedTag === "全部" ? "港深通勤" : selectedTag;

  return (
    <section className="tag-filter">
      <div className="tag-heading">
        <span>AI 匹配标签</span>
        <small>已为你找到 {resultCount} 个{noun}房源</small>
      </div>

      <div className="chip-row" role="listbox" aria-label="按标签筛选">
        {tags.map((tag) => (
          <button
            className={`tag-chip ${selectedTag === tag ? "active" : ""}`}
            key={tag}
            type="button"
            onClick={() => onSelectTag(tag)}
            aria-selected={selectedTag === tag}
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
}
