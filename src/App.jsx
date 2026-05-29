import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import FilterBar from "./components/FilterBar.jsx";
import TagFilter from "./components/TagFilter.jsx";
import ListingCard from "./components/ListingCard.jsx";
import DetailPage from "./components/DetailPage.jsx";
import EmptyState from "./components/EmptyState.jsx";
import MessagePage from "./components/MessagePage.jsx";
import BottomSheet from "./components/BottomSheet.jsx";
import { schools } from "./data/schools.js";
import { commuteOptions, ports } from "./data/ports.js";
import {
  getAllTags,
  getListings,
  getRecommendedListings
} from "./services/listingService.js";

export default function App() {
  const [page, setPage] = useState("home");
  const [listings, setListings] = useState([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState("hku");
  const [selectedPortId, setSelectedPortId] = useState("futian");
  const [selectedCommuteLimit, setSelectedCommuteLimit] = useState(60);
  const [selectedTag, setSelectedTag] = useState("全部");
  const [currentListingIndex, setCurrentListingIndex] = useState(0);
  const [selectedListing, setSelectedListing] = useState(null);
  const [favoriteListingIds, setFavoriteListingIds] = useState([]);
  const [matchedListingIds, setMatchedListingIds] = useState([]);
  const [dismissedListingIds, setDismissedListingIds] = useState([]);
  const [activeSheet, setActiveSheet] = useState(null);

  useEffect(() => {
    setListings(getListings());
  }, []);

  const selectedSchool = schools.find((school) => school.id === selectedSchoolId) || schools[0];
  const selectedPort = ports.find((port) => port.id === selectedPortId) || ports[0];
  const commuteLabel =
    commuteOptions.find((option) => option.value === selectedCommuteLimit)?.label || "不限";

  const tags = useMemo(() => getAllTags(listings), [listings]);

  const filteredWithoutDismiss = useMemo(
    () =>
      getRecommendedListings({
        listingsData: listings,
        selectedPortId,
        selectedCommuteLimit,
        selectedTag,
        selectedSchoolArea: selectedSchool.area,
        dismissedListingIds: []
      }),
    [listings, selectedPortId, selectedCommuteLimit, selectedTag, selectedSchool.area]
  );

  const filteredListings = useMemo(
    () =>
      getRecommendedListings({
        listingsData: listings,
        selectedPortId,
        selectedCommuteLimit,
        selectedTag,
        selectedSchoolArea: selectedSchool.area,
        dismissedListingIds
      }),
    [listings, selectedPortId, selectedCommuteLimit, selectedTag, selectedSchool.area, dismissedListingIds]
  );

  const currentListing = filteredListings[currentListingIndex];

  function resetRecommendations() {
    setCurrentListingIndex(0);
    setDismissedListingIds([]);
  }

  function resetAfterFilterChange() {
    setCurrentListingIndex(0);
    setDismissedListingIds([]);
  }

  function handleTagChange(tag) {
    setSelectedTag(tag);
    setCurrentListingIndex(0);
    setDismissedListingIds([]);
  }

  function handleDislike() {
    if (!currentListing) return;
    setDismissedListingIds((ids) => [...ids, currentListing.id]);
  }

  function handleMatch(listing) {
    setMatchedListingIds((ids) => (ids.includes(listing.id) ? ids : [...ids, listing.id]));
    setSelectedListing(listing);
    setPage("detail");
  }

  function handleRelaxCommute() {
    setSelectedCommuteLimit(null);
    setCurrentListingIndex(0);
    setDismissedListingIds([]);
  }

  function toggleFavorite(id) {
    setFavoriteListingIds((ids) =>
      ids.includes(id) ? ids.filter((listingId) => listingId !== id) : [...ids, id]
    );
  }

  function getSheetConfig() {
    if (activeSheet === "school") {
      return {
        title: "选择起点学校",
        subtitle: "选择港校后，AI 会重新计算推荐顺序。",
        selectedId: selectedSchoolId,
        options: schools.map((school) => ({
          ...school,
          description: `${school.shortName} · ${school.area}`
        })),
        onSelect: (school) => {
          setSelectedSchoolId(school.id);
          resetAfterFilterChange();
          setActiveSheet(null);
        }
      };
    }

    if (activeSheet === "port") {
      return {
        title: "选择深圳口岸",
        subtitle: "房源会优先展示临近当前口岸的推荐。",
        selectedId: selectedPortId,
        options: ports.map((port) => ({
          ...port,
          description: `${port.area} · ${port.tags.join(" / ")}`
        })),
        onSelect: (port) => {
          setSelectedPortId(port.id);
          resetAfterFilterChange();
          setActiveSheet(null);
        }
      };
    }

    if (activeSheet === "commute") {
      return {
        title: "选择通勤时间",
        subtitle: `按到${selectedPort.name}的预计通勤时间筛选。`,
        selectedId: selectedCommuteLimit === null ? "unlimited" : String(selectedCommuteLimit),
        options: commuteOptions.map((option) => ({
          id: option.value === null ? "unlimited" : String(option.value),
          label: option.label,
          value: option.value,
          description: option.value === null ? "展示所有相关房源" : `只看 ${option.label} 可达房源`
        })),
        onSelect: (option) => {
          setSelectedCommuteLimit(option.value);
          resetRecommendations();
          setActiveSheet(null);
        }
      };
    }

    return null;
  }

  const sheetConfig = getSheetConfig();

  if (page === "messages") {
    return <MessagePage onBack={() => setPage("home")} />;
  }

  if (page === "detail" && selectedListing) {
    return (
      <DetailPage
        listing={selectedListing}
        selectedSchool={selectedSchool}
        selectedPort={selectedPort}
        isFavorite={favoriteListingIds.includes(selectedListing.id)}
        isMatched={matchedListingIds.includes(selectedListing.id)}
        onBack={() => setPage("home")}
        onToggleFavorite={() => toggleFavorite(selectedListing.id)}
      />
    );
  }

  return (
    <main className="app-shell">
      <div className="phone-frame">
        <Header onOpenMessages={() => setPage("messages")} />
        <FilterBar
          selectedSchool={selectedSchool}
          selectedPort={selectedPort}
          commuteLabel={commuteLabel}
          onOpenFilter={setActiveSheet}
        />
        <TagFilter
          tags={tags}
          selectedTag={selectedTag}
          onSelectTag={handleTagChange}
          resultCount={filteredListings.length}
        />

        <section className="listing-stage" aria-live="polite">
          {filteredWithoutDismiss.length === 0 ? (
            <EmptyState
              title="暂无符合当前通勤条件的房源"
              actionLabel="放宽通勤时间"
              onAction={handleRelaxCommute}
            />
          ) : !currentListing ? (
            <EmptyState
              title="当前条件下暂无更多推荐房源"
              actionLabel="重置推荐"
              onAction={resetRecommendations}
            />
          ) : (
            <ListingCard
              key={`${currentListing.id}-${selectedPortId}`}
              listing={currentListing}
              selectedPort={selectedPort}
              isFavorite={favoriteListingIds.includes(currentListing.id)}
              onToggleFavorite={() => toggleFavorite(currentListing.id)}
              onDislike={handleDislike}
              onMatch={() => handleMatch(currentListing)}
            />
          )}
        </section>

        {sheetConfig && (
          <BottomSheet
            title={sheetConfig.title}
            subtitle={sheetConfig.subtitle}
            options={sheetConfig.options}
            selectedId={sheetConfig.selectedId}
            onSelect={sheetConfig.onSelect}
            onClose={() => setActiveSheet(null)}
          />
        )}
      </div>
    </main>
  );
}
