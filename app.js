const statusTime = document.querySelector("#statusTime");
const routeButton = document.querySelector("#routeButton");
const routeText = document.querySelector("#routeText");
const dots = [...document.querySelectorAll("#photoDots button")];
const photoCount = document.querySelector("#photoCount");
const heartButton = document.querySelector("#heartButton");
const dislikeButton = document.querySelector("#dislikeButton");
const matchButton = document.querySelector("#matchButton");
const listingCard = document.querySelector("#listingCard");
const toast = document.querySelector("#toast");
const navButtons = [...document.querySelectorAll(".bottom-nav button[data-tab]")];

let toastTimer;
let activePhoto = 0;

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 1600);
}

function updateTime() {
  const now = new Date();
  statusTime.textContent = now.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}

function setPhoto(index) {
  activePhoto = index;
  dots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === activePhoto));
  photoCount.textContent = `${activePhoto + 1}/12`;
}

updateTime();
window.setInterval(updateTime, 30000);

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => setPhoto(index));
});

routeButton.addEventListener("click", () => {
  const isReverse = routeText.textContent.includes("深圳 → 香港");
  routeText.textContent = isReverse ? "香港 → 深圳通勤" : "深圳 → 香港通勤";
  showToast(isReverse ? "已切换为香港出发" : "已切换为深圳出发");
});

heartButton.addEventListener("click", () => {
  heartButton.classList.toggle("saved");
  const icon = heartButton.querySelector("i");
  const saved = heartButton.classList.contains("saved");
  icon.className = saved ? "ph-fill ph-heart" : "ph ph-heart";
  showToast(saved ? "已收藏这套房源" : "已取消收藏");
});

dislikeButton.addEventListener("click", () => {
  listingCard.classList.add("swipe-left");
  showToast("已跳过，将为你寻找下一套");
  window.setTimeout(() => listingCard.classList.remove("swipe-left"), 420);
});

matchButton.addEventListener("click", () => {
  listingCard.classList.add("matched");
  showToast("Match 成功，可查看房东联系方式");
  window.setTimeout(() => listingCard.classList.remove("matched"), 520);
});

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    navButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    showToast(`已切换到${button.dataset.tab}`);
  });
});
