export const ports = [
  {
    id: "futian",
    name: "福田口岸",
    area: "福田",
    tags: ["福田口岸", "近地铁", "港深通勤"]
  },
  {
    id: "shenzhen_bay",
    name: "深圳湾口岸",
    area: "南山",
    tags: ["深圳湾口岸", "南山通勤", "适合科技园"]
  },
  {
    id: "luohu",
    name: "罗湖口岸",
    area: "罗湖",
    tags: ["罗湖口岸", "老牌口岸", "交通成熟"]
  },
  {
    id: "huanggang",
    name: "皇岗口岸",
    area: "福田",
    tags: ["皇岗口岸", "夜间通关", "通勤灵活"]
  },
  {
    id: "liantang",
    name: "莲塘口岸",
    area: "罗湖",
    tags: ["莲塘口岸", "东部通勤", "安静居住"]
  }
];

export const commuteOptions = [
  { label: "≤ 45 分钟", value: 45 },
  { label: "≤ 60 分钟", value: 60 },
  { label: "≤ 75 分钟", value: 75 },
  { label: "不限", value: null }
];

export const portTagMap = {
  futian: ["近福田口岸", "港深通勤", "近地铁"],
  shenzhen_bay: ["近深圳湾口岸", "南山通勤", "科技园友好"],
  luohu: ["近罗湖口岸", "交通成熟", "生活便利"],
  huanggang: ["近皇岗口岸", "夜间通关", "通勤灵活"],
  liantang: ["近莲塘口岸", "东部通勤", "安静居住"]
};
