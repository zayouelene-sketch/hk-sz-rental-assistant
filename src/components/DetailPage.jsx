import {
  ArrowLeft,
  Heart,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  Route,
  Send,
  ShieldCheck
} from "lucide-react";

function formatRent(listing) {
  return `${listing.currency} ${listing.rent.toLocaleString()} /月`;
}

export default function DetailPage({
  listing,
  selectedSchool,
  selectedPort,
  isFavorite,
  isMatched,
  onBack,
  onToggleFavorite
}) {
  const selectedCommute = listing.commuteMinutes?.[selectedPort.id] ?? listing.commuteTime;

  return (
    <main className="app-shell">
      <div className="phone-frame detail-frame">
        <div className="detail-topbar">
          <button className="back-button" type="button" onClick={onBack} aria-label="返回">
            <ArrowLeft size={20} />
          </button>
          <span>房源详情</span>
          <button
            className={`icon-button detail-heart ${isFavorite ? "active" : ""}`}
            type="button"
            onClick={onToggleFavorite}
            aria-label={isFavorite ? "取消收藏" : "收藏房源"}
          >
            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>

        <section className="detail-gallery" aria-label="房间图片">
          <img className="hero-photo" src={listing.images[0]} alt={listing.title} />
          <div className="thumb-grid">
            {listing.images.slice(1, 4).map((image) => (
              <img src={image} alt={`${listing.title} 图片`} key={image} />
            ))}
          </div>
        </section>

        <section className="detail-content">
          <div className="detail-title">
            <div>
              <h1>{listing.title}</h1>
              <p>
                <MapPin size={15} />
                {listing.address}
              </p>
            </div>
            <strong>{formatRent(listing)}</strong>
          </div>

          {isMatched && <div className="matched-banner">已 Match · AI 已为你保留这套推荐</div>}

          <div className="detail-tags">
            {listing.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div className="detail-section route-card">
            <div className="section-heading">
              <Route size={18} />
              <h2>通勤路线</h2>
            </div>
            <p>
              从{selectedSchool.name}出发，前往{selectedPort.name}，预计通勤 {selectedCommute} 分钟。
              {listing.mtr}
            </p>
            <div className="route-metrics">
              <span>到{selectedPort.name}</span>
              <strong>{selectedCommute} 分钟</strong>
              <small>起点：{selectedSchool.shortName} · {selectedSchool.area}</small>
            </div>
          </div>

          <div className="detail-section">
            <div className="section-heading">
              <Home size={18} />
              <h2>房屋信息</h2>
            </div>
            <div className="detail-grid">
              <span>地区</span>
              <strong>{listing.district} · {listing.location}</strong>
              <span>面积</span>
              <strong>{listing.areaSqft} {listing.areaUnit}</strong>
              <span>户型</span>
              <strong>{listing.layout}</strong>
              <span>入住</span>
              <strong>{listing.moveInDate}</strong>
            </div>
            <p className="description">{listing.description}</p>
          </div>

          <div className="detail-section">
            <div className="section-heading">
              <ShieldCheck size={18} />
              <h2>房屋亮点</h2>
            </div>
            <ul className="detail-list">
              {listing.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h2>注意事项</h2>
            <ul className="detail-list muted">
              {listing.notes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="contact-panel">
            <div>
              <span>房东</span>
              <strong>
                {listing.landlord.name}
                {listing.landlord.verified ? " · 已认证" : ""}
              </strong>
              <small>回复率 {listing.landlord.responseRate}</small>
            </div>
            <div className="contact-actions">
              <a href={`https://wa.me/${listing.landlordWhatsapp.replace(/[^\d]/g, "")}`}>
                <MessageCircle size={16} />
                WhatsApp
              </a>
              <a href={`weixin://dl/chat?${listing.landlordWechat}`}>
                <Send size={16} />
                WeChat
              </a>
              <a href={`tel:${listing.landlordPhone}`}>
                <Phone size={16} />
                Phone
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
