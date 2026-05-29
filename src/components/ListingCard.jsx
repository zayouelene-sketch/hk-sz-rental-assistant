import { Heart, MapPin, Ruler, Sparkles, ThumbsDown, TrainFront, CalendarDays } from "lucide-react";
import { useState } from "react";
import ImageCarousel from "./ImageCarousel.jsx";

function formatRent(listing) {
  return `${listing.currency} ${listing.rent.toLocaleString()} /月`;
}

export default function ListingCard({
  listing,
  selectedPort,
  isFavorite,
  onToggleFavorite,
  onDislike,
  onMatch
}) {
  const [isLeaving, setIsLeaving] = useState(false);
  const selectedCommute = listing.commuteMinutes?.[selectedPort.id] ?? listing.commuteTime;

  function handleDislikeClick() {
    setIsLeaving(true);
    window.setTimeout(onDislike, 220);
  }

  return (
    <article className={`listing-card ${isLeaving ? "leaving" : ""}`}>
      <div className="image-wrap">
        <ImageCarousel images={listing.images} title={listing.title} />
        <span className="featured-badge">{listing.featured ? "精选" : listing.type}</span>
        <button
          className={`favorite-button ${isFavorite ? "active" : ""}`}
          type="button"
          onClick={onToggleFavorite}
          aria-label={isFavorite ? "取消收藏" : "收藏房源"}
        >
          <Heart size={23} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="card-body">
        <div className="listing-title-row">
          <div>
            <h2>{listing.title}</h2>
            <p className="location-line">
              <MapPin size={14} />
              {listing.district} {listing.location}｜{listing.mtr.split("，")[0]}
            </p>
          </div>
          <div className="rent-block">
            <strong>{formatRent(listing)}</strong>
            {listing.negotiable && <span>可议价</span>}
          </div>
        </div>

        <div className="facts-grid">
          <div className="fact-card">
            <TrainFront size={20} />
            <span>到{selectedPort.name}</span>
            <strong>{selectedCommute} 分钟</strong>
            <small>{listing.nearbyPort === selectedPort.id ? "临近口岸" : "换乘可达"}</small>
          </div>
          <div className="fact-card">
            <Ruler size={20} />
            <span>实用面积</span>
            <strong>
              {listing.area} {listing.areaUnit}
            </strong>
            <small>{listing.layout}</small>
          </div>
          <div className="fact-card">
            <CalendarDays size={20} />
            <span>可入住</span>
            <strong>{listing.moveInDate}</strong>
            <small>{listing.negotiable ? "灵活起租" : "稳定长租"}</small>
          </div>
        </div>

        <div className="listing-tags">
          <span>匹配 {listing.matchScore}</span>
          <span>{selectedPort.tags[0]}</span>
          {listing.tags.slice(0, 6).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="action-row">
          <button className="secondary-action" type="button" onClick={handleDislikeClick}>
            <ThumbsDown size={19} />
            Dislike
          </button>
          <button className="primary-action" type="button" onClick={onMatch}>
            <Sparkles size={18} />
            Match
            <small>查看详情 & 联系房东</small>
          </button>
        </div>

        <p className="match-note">Match 后即可查看房东联系方式及房屋详情</p>
      </div>
    </article>
  );
}
