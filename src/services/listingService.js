import { listings } from "../data/listings.js";

export function getListings() {
  return listings;
}

export function getAllTags(listingsData) {
  const uniqueTags = new Set();

  listingsData.forEach((listing) => {
    listing.tags.forEach((tag) => uniqueTags.add(tag));
  });

  return ["全部", ...Array.from(uniqueTags)];
}

export function filterListingsByTag(listingsData, selectedTag) {
  if (selectedTag === "全部") {
    return listingsData;
  }

  return listingsData.filter((listing) => listing.tags.includes(selectedTag));
}

export function getCommuteMinutes(listing, selectedPortId) {
  return listing.commuteMinutes?.[selectedPortId] ?? null;
}

export function getRecommendedListings({
  listingsData,
  selectedPortId,
  selectedCommuteLimit,
  selectedTag,
  selectedSchoolArea,
  dismissedListingIds = []
}) {
  return filterListingsByTag(listingsData, selectedTag)
    .filter((listing) => !dismissedListingIds.includes(listing.id))
    .filter((listing) => getCommuteMinutes(listing, selectedPortId) !== null)
    .filter((listing) => {
      if (selectedCommuteLimit === null) return true;
      return getCommuteMinutes(listing, selectedPortId) <= selectedCommuteLimit;
    })
    .sort((a, b) => {
      const aExact = a.nearbyPort === selectedPortId ? 1 : 0;
      const bExact = b.nearbyPort === selectedPortId ? 1 : 0;
      if (aExact !== bExact) return bExact - aExact;

      const aCommute = getCommuteMinutes(a, selectedPortId);
      const bCommute = getCommuteMinutes(b, selectedPortId);
      if (aCommute !== bCommute) return aCommute - bCommute;

      if (a.matchScore !== b.matchScore) return b.matchScore - a.matchScore;

      const aFeatured = a.featured ? 1 : 0;
      const bFeatured = b.featured ? 1 : 0;
      if (aFeatured !== bFeatured) return bFeatured - aFeatured;

      const aSchoolArea = matchesSchoolArea(a, selectedSchoolArea) ? 1 : 0;
      const bSchoolArea = matchesSchoolArea(b, selectedSchoolArea) ? 1 : 0;
      return bSchoolArea - aSchoolArea;
    });
}

function matchesSchoolArea(listing, schoolArea) {
  if (!schoolArea || listing.city !== "香港") return false;
  if (schoolArea === "港岛区") return listing.district.includes("港岛");
  if (schoolArea === "九龙区") return listing.district.includes("九龙");
  if (schoolArea === "新界区") return listing.district.includes("新界");
  return false;
}
