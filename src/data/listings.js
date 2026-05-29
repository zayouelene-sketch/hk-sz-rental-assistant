import { portTagMap } from "./ports.js";

const imagePool = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=85"
];

const rawListings = [
  ["太古城 · 海景服务式公寓", "港岛东", "香港", "太古", 18800, "HKD", 380, "开放式", "即日入住", "太古站", 5, "apartment", "futian", { futian: 38, shenzhen_bay: 55, luohu: 48, huanggang: 45, liantang: 62 }, ["可短租", "海景", "服务式公寓"], 96, true, true],
  ["鲗鱼涌 · 高层一房公寓", "港岛东", "香港", "鲗鱼涌", 16800, "HKD", 330, "一房一厅", "一周内可入住", "鲗鱼涌站", 4, "apartment", "futian", { futian: 42, shenzhen_bay: 58, luohu: 50, huanggang: 47, liantang: 57 }, ["拎包入住", "通勤友好"], 93, false, true],
  ["西湾河 · 河景开放式", "港岛东", "香港", "西湾河", 14200, "HKD", 285, "开放式", "月底可入住", "西湾河站", 6, "apartment", "liantang", { futian: 55, shenzhen_bay: 66, luohu: 44, huanggang: 53, liantang: 39 }, ["预算友好", "安静"], 88, false, true],
  ["坚尼地城 · 港大学生套房", "港岛西", "香港", "坚尼地城", 13800, "HKD", 260, "套房", "即日入住", "坚尼地城站", 3, "apartment", "shenzhen_bay", { futian: 50, shenzhen_bay: 43, luohu: 58, huanggang: 51, liantang: 72 }, ["适合学生", "近港大"], 91, false, false],
  ["西营盘 · 明亮一房一厅", "港岛西", "香港", "西营盘", 16500, "HKD", 320, "一房一厅", "两周内可入住", "西营盘站", 4, "apartment", "futian", { futian: 45, shenzhen_bay: 52, luohu: 55, huanggang: 49, liantang: 68 }, ["拎包入住", "适合学生"], 90, false, false],
  ["香港大学 · 静巷Studio", "港岛西", "香港", "香港大学附近", 12800, "HKD", 245, "开放式", "即日入住", "香港大学站", 5, "apartment", "shenzhen_bay", { futian: 52, shenzhen_bay: 45, luohu: 60, huanggang: 54, liantang: 75 }, ["预算友好", "适合学生"], 87, false, true],
  ["红磡 · 海滨服务式公寓", "九龙", "香港", "红磡", 19800, "HKD", 410, "一房一厅", "一周内可入住", "红磡站", 7, "apartment", "futian", { futian: 34, shenzhen_bay: 50, luohu: 39, huanggang: 40, liantang: 55 }, ["服务式公寓", "海景"], 95, true, false],
  ["九龙塘 · 校园通勤两房", "九龙", "香港", "九龙塘", 21800, "HKD", 520, "两房一厅", "月底可入住", "九龙塘站", 6, "apartment", "luohu", { futian: 40, shenzhen_bay: 55, luohu: 32, huanggang: 44, liantang: 46 }, ["空间大", "适合学生"], 92, false, true],
  ["旺角 · 预算友好套房", "九龙", "香港", "旺角", 9800, "HKD", 210, "套房", "即日入住", "旺角站", 4, "apartment", "luohu", { futian: 42, shenzhen_bay: 57, luohu: 34, huanggang: 45, liantang: 49 }, ["预算友好", "生活便利"], 85, false, true],
  ["佐敦 · 家具齐全一房", "九龙", "香港", "佐敦", 15500, "HKD", 310, "一房一厅", "三周内可入住", "佐敦站", 5, "apartment", "huanggang", { futian: 37, shenzhen_bay: 48, luohu: 42, huanggang: 35, liantang: 54 }, ["拎包入住", "通勤灵活"], 89, false, false],
  ["尖沙咀 · 高层海景Studio", "九龙", "香港", "尖沙咀", 18500, "HKD", 300, "开放式", "即日入住", "尖沙咀站", 6, "apartment", "huanggang", { futian: 39, shenzhen_bay: 45, luohu: 44, huanggang: 36, liantang: 57 }, ["海景", "可短租"], 90, true, true],
  ["沙田 · 东铁线通勤两房", "新界", "香港", "沙田", 17200, "HKD", 480, "两房一厅", "一周内可入住", "沙田站", 8, "apartment", "luohu", { futian: 28, shenzhen_bay: 50, luohu: 26, huanggang: 34, liantang: 38 }, ["东铁线", "空间大"], 94, true, false],
  ["大埔 · 安静学生套间", "新界", "香港", "大埔", 9200, "HKD", 260, "套间", "即日入住", "大埔墟站", 9, "village", "luohu", { futian: 35, shenzhen_bay: 58, luohu: 29, huanggang: 40, liantang: 36 }, ["预算友好", "安静"], 86, false, true],
  ["粉岭 · 近站村屋一房", "新界", "香港", "粉岭", 8800, "HKD", 360, "一房一厅", "即日入住", "粉岭站", 7, "village", "luohu", { futian: 22, shenzhen_bay: 62, luohu: 20, huanggang: 30, liantang: 32 }, ["民房", "预算友好"], 93, true, true],
  ["上水 · 口岸通勤套房", "新界", "香港", "上水", 8500, "HKD", 300, "套房", "一周内可入住", "上水站", 5, "village", "futian", { futian: 16, shenzhen_bay: 68, luohu: 18, huanggang: 24, liantang: 37 }, ["民房", "可短租"], 97, true, false],
  ["屯门 · 深圳湾通勤村屋", "新界", "香港", "屯门", 7800, "HKD", 420, "套间", "即日入住", "屯门站", 10, "village", "shenzhen_bay", { futian: 60, shenzhen_bay: 30, luohu: 66, huanggang: 55, liantang: 78 }, ["民房", "预算友好"], 92, false, true],
  ["元朗 · 西铁沿线两房", "新界", "香港", "元朗", 10800, "HKD", 500, "两房一厅", "三周内可入住", "朗屏站", 8, "village", "shenzhen_bay", { futian: 48, shenzhen_bay: 35, luohu: 55, huanggang: 45, liantang: 70 }, ["空间大", "可议价"], 89, false, true],
  ["太古 · 轻奢开放式公寓", "港岛东", "香港", "太古", 20500, "HKD", 390, "开放式", "即日入住", "太古站", 3, "apartment", "liantang", { futian: 52, shenzhen_bay: 64, luohu: 42, huanggang: 50, liantang: 36 }, ["海景", "服务式公寓"], 90, true, false],
  ["西营盘 · 港大旁精品Studio", "港岛西", "香港", "西营盘", 15200, "HKD", 285, "开放式", "一周内可入住", "西营盘站", 3, "apartment", "shenzhen_bay", { futian: 49, shenzhen_bay: 42, luohu: 58, huanggang: 50, liantang: 73 }, ["适合学生", "拎包入住"], 88, false, true],
  ["九龙塘 · 宽敞家庭两房", "九龙", "香港", "九龙塘", 26000, "HKD", 650, "两房两厅", "月底可入住", "九龙塘站", 5, "apartment", "futian", { futian: 36, shenzhen_bay: 54, luohu: 35, huanggang: 41, liantang: 48 }, ["空间大", "校区友好"], 91, true, false],
  ["福田口岸 · 精装一房", "福田", "深圳", "福田口岸", 6800, "RMB", 45, "一房一厅", "即日入住", "福田口岸站", 7, "apartment", "futian", { futian: 8, shenzhen_bay: 32, luohu: 20, huanggang: 14, liantang: 38 }, ["拎包入住", "预算友好"], 98, true, false],
  ["皇岗 · 夜间通关公寓", "福田", "深圳", "皇岗", 6200, "RMB", 42, "一房一厅", "一周内可入住", "皇岗口岸站", 6, "apartment", "huanggang", { futian: 15, shenzhen_bay: 34, luohu: 24, huanggang: 7, liantang: 42 }, ["可短租", "夜间通关"], 97, true, true],
  ["岗厦 · 都市白领Studio", "福田", "深圳", "岗厦", 7200, "RMB", 38, "开放式", "即日入住", "岗厦站", 4, "apartment", "futian", { futian: 12, shenzhen_bay: 28, luohu: 24, huanggang: 16, liantang: 40 }, ["近地铁", "通勤友好"], 94, false, true],
  ["车公庙 · 商圈服务式公寓", "福田", "深圳", "车公庙", 8800, "RMB", 55, "一房一厅", "两周内可入住", "车公庙站", 3, "apartment", "huanggang", { futian: 18, shenzhen_bay: 24, luohu: 30, huanggang: 16, liantang: 45 }, ["服务式公寓", "通勤灵活"], 92, true, false],
  ["石厦 · 安静一房", "福田", "深圳", "石厦", 5800, "RMB", 40, "一房一厅", "即日入住", "石厦站", 5, "apartment", "futian", { futian: 10, shenzhen_bay: 30, luohu: 26, huanggang: 13, liantang: 44 }, ["预算友好", "安静"], 91, false, true],
  ["深圳湾 · 海景公寓", "南山", "深圳", "深圳湾", 9800, "RMB", 62, "一房一厅", "即日入住", "深圳湾公园站", 8, "apartment", "shenzhen_bay", { futian: 32, shenzhen_bay: 9, luohu: 46, huanggang: 31, liantang: 62 }, ["海景", "科技园友好"], 98, true, false],
  ["后海 · 高端一房", "南山", "深圳", "后海", 9200, "RMB", 58, "一房一厅", "一周内可入住", "后海站", 5, "apartment", "shenzhen_bay", { futian: 30, shenzhen_bay: 12, luohu: 45, huanggang: 29, liantang: 60 }, ["拎包入住", "南山通勤"], 96, true, true],
  ["科技园 · 通勤友好公寓", "南山", "深圳", "科技园", 7500, "RMB", 52, "一房一厅", "一周内可入住", "高新园站", 6, "apartment", "shenzhen_bay", { futian: 34, shenzhen_bay: 25, luohu: 50, huanggang: 35, liantang: 65 }, ["近地铁", "科技园友好"], 94, false, false],
  ["粤海 · 预算友好Studio", "南山", "深圳", "粤海", 5600, "RMB", 36, "开放式", "即日入住", "深大站", 7, "apartment", "shenzhen_bay", { futian: 38, shenzhen_bay: 22, luohu: 54, huanggang: 39, liantang: 68 }, ["预算友好", "适合学生"], 89, false, true],
  ["蛇口 · 安静海边一房", "南山", "深圳", "蛇口", 6400, "RMB", 45, "一房一厅", "月底可入住", "海上世界站", 8, "apartment", "shenzhen_bay", { futian: 44, shenzhen_bay: 24, luohu: 58, huanggang: 45, liantang: 72 }, ["安静", "海景"], 88, false, true],
  ["罗湖口岸 · 精装Studio", "罗湖", "深圳", "罗湖口岸", 5200, "RMB", 34, "开放式", "即日入住", "罗湖站", 4, "apartment", "luohu", { futian: 20, shenzhen_bay: 48, luohu: 6, huanggang: 22, liantang: 26 }, ["预算友好", "生活便利"], 97, true, true],
  ["国贸 · 成熟商圈一房", "罗湖", "深圳", "国贸", 6000, "RMB", 42, "一房一厅", "一周内可入住", "国贸站", 5, "apartment", "luohu", { futian: 22, shenzhen_bay: 50, luohu: 10, huanggang: 25, liantang: 24 }, ["生活便利", "近地铁"], 94, false, false],
  ["黄贝岭 · 东部通勤套房", "罗湖", "深圳", "黄贝岭", 4600, "RMB", 32, "套房", "即日入住", "黄贝岭站", 3, "apartment", "liantang", { futian: 30, shenzhen_bay: 58, luohu: 18, huanggang: 33, liantang: 14 }, ["预算友好", "东部通勤"], 93, false, true],
  ["莲塘 · 安静一房公寓", "罗湖", "深圳", "莲塘", 4800, "RMB", 38, "一房一厅", "两周内可入住", "莲塘口岸站", 6, "apartment", "liantang", { futian: 36, shenzhen_bay: 64, luohu: 24, huanggang: 38, liantang: 7 }, ["安静", "生活便利"], 96, true, false],
  ["民治 · 深圳北通勤Studio", "龙华", "深圳", "民治", 4200, "RMB", 35, "开放式", "即日入住", "民治站", 7, "apartment", "futian", { futian: 28, shenzhen_bay: 46, luohu: 42, huanggang: 30, liantang: 55 }, ["预算友好", "近地铁"], 86, false, true],
  ["深圳北站 · 高铁通勤公寓", "龙华", "深圳", "深圳北站", 5800, "RMB", 45, "一房一厅", "一周内可入住", "深圳北站", 5, "apartment", "huanggang", { futian: 30, shenzhen_bay: 48, luohu: 44, huanggang: 32, liantang: 58 }, ["交通成熟", "通勤灵活"], 87, false, false],
  ["白石龙 · 安静两房", "龙华", "深圳", "白石龙", 6800, "RMB", 68, "两房一厅", "月底可入住", "白石龙站", 6, "apartment", "futian", { futian: 32, shenzhen_bay: 50, luohu: 46, huanggang: 34, liantang: 60 }, ["空间大", "安静"], 85, false, true],
  ["福田口岸 · 学生合租套间", "福田", "深圳", "福田口岸", 3200, "RMB", 22, "合租套间", "即日入住", "福田口岸站", 5, "apartment", "futian", { futian: 6, shenzhen_bay: 34, luohu: 18, huanggang: 13, liantang: 36 }, ["适合学生", "预算友好"], 95, true, true],
  ["岗厦北 · 新装一房", "福田", "深圳", "岗厦", 7600, "RMB", 48, "一房一厅", "三周内可入住", "岗厦北站", 4, "apartment", "huanggang", { futian: 14, shenzhen_bay: 29, luohu: 25, huanggang: 12, liantang: 42 }, ["拎包入住", "近地铁"], 91, false, true],
  ["后海 · 科技园女生公寓", "南山", "深圳", "后海", 5300, "RMB", 30, "合租套间", "即日入住", "后海站", 7, "apartment", "shenzhen_bay", { futian: 31, shenzhen_bay: 13, luohu: 47, huanggang: 31, liantang: 62 }, ["适合学生", "科技园友好"], 90, false, false],
  ["蛇口 · 短租服务公寓", "南山", "深圳", "蛇口", 7800, "RMB", 46, "开放式", "即日入住", "水湾站", 6, "apartment", "shenzhen_bay", { futian: 46, shenzhen_bay: 27, luohu: 60, huanggang: 47, liantang: 75 }, ["可短租", "服务式公寓"], 88, true, true],
  ["国贸 · 老牌口岸通勤房", "罗湖", "深圳", "国贸", 3900, "RMB", 28, "套房", "即日入住", "国贸站", 5, "apartment", "luohu", { futian: 24, shenzhen_bay: 52, luohu: 9, huanggang: 26, liantang: 25 }, ["预算友好", "交通成熟"], 92, false, true],
  ["莲塘 · 东部安静Studio", "罗湖", "深圳", "莲塘", 3600, "RMB", 26, "开放式", "一周内可入住", "莲塘站", 8, "apartment", "liantang", { futian: 38, shenzhen_bay: 66, luohu: 26, huanggang: 40, liantang: 9 }, ["安静", "预算友好"], 94, false, true],
  ["黄贝岭 · 精装两房", "罗湖", "深圳", "黄贝岭", 7200, "RMB", 65, "两房一厅", "月底可入住", "黄贝岭站", 6, "apartment", "liantang", { futian: 32, shenzhen_bay: 60, luohu: 20, huanggang: 35, liantang: 16 }, ["空间大", "东部通勤"], 89, false, false],
  ["车公庙 · 高分匹配一房", "福田", "深圳", "车公庙", 8200, "RMB", 50, "一房一厅", "即日入住", "车公庙站", 4, "apartment", "futian", { futian: 16, shenzhen_bay: 22, luohu: 28, huanggang: 18, liantang: 43 }, ["通勤友好", "近地铁"], 93, true, false],
  ["石厦 · 轻奢Studio", "福田", "深圳", "石厦", 6500, "RMB", 39, "开放式", "一周内可入住", "石厦站", 4, "apartment", "huanggang", { futian: 11, shenzhen_bay: 31, luohu: 25, huanggang: 11, liantang: 43 }, ["可短租", "拎包入住"], 90, false, true],
  ["上水 · 东铁线学生房", "新界", "香港", "上水", 9600, "HKD", 330, "套房", "即日入住", "上水站", 5, "village", "luohu", { futian: 17, shenzhen_bay: 69, luohu: 16, huanggang: 25, liantang: 34 }, ["适合学生", "东铁线"], 96, true, true],
  ["粉岭 · 安静大套间", "新界", "香港", "粉岭", 10300, "HKD", 390, "套房", "两周内可入住", "粉岭站", 8, "village", "liantang", { futian: 24, shenzhen_bay: 64, luohu: 22, huanggang: 31, liantang: 28 }, ["民房", "安静"], 89, false, false],
  ["沙田 · CUHK通勤一房", "新界", "香港", "沙田", 15800, "HKD", 360, "一房一厅", "即日入住", "大学站", 6, "apartment", "luohu", { futian: 27, shenzhen_bay: 52, luohu: 25, huanggang: 35, liantang: 37 }, ["适合学生", "通勤友好"], 95, true, false],
  ["元朗 · 深圳湾短租两房", "新界", "香港", "元朗", 11800, "HKD", 520, "两房一厅", "一周内可入住", "元朗站", 9, "village", "shenzhen_bay", { futian: 46, shenzhen_bay: 33, luohu: 56, huanggang: 43, liantang: 71 }, ["可短租", "空间大"], 91, false, true]
];

function pickImages(index) {
  return [imagePool[index % imagePool.length], imagePool[(index + 1) % imagePool.length], imagePool[(index + 2) % imagePool.length]];
}

function uniqueTags(tags) {
  return Array.from(new Set(tags));
}

export const listings = rawListings.map((item, index) => {
  const [
    title,
    district,
    city,
    location,
    price,
    currency,
    areaSize,
    layout,
    available,
    nearestStation,
    walkMinutes,
    propertyType,
    nearbyPort,
    commuteMinutes,
    tags,
    matchScore,
    featured,
    negotiable
  ] = item;
  const areaUnit = city === "香港" ? "呎" : "平方米";
  const nearbyPortName = {
    futian: "福田口岸",
    shenzhen_bay: "深圳湾口岸",
    luohu: "罗湖口岸",
    huanggang: "皇岗口岸",
    liantang: "莲塘口岸"
  }[nearbyPort];

  return {
    id: index + 1,
    title,
    district,
    city,
    location,
    address: `${city}${district}${location}近${nearestStation}`,
    price,
    rent: price,
    currency,
    rentUnit: "月",
    areaSqft: areaSize,
    area: areaSize,
    areaUnit,
    layout,
    available,
    moveInDate: available,
    nearestStation,
    walkMinutes,
    image: pickImages(index)[0],
    images: pickImages(index),
    liked: false,
    matched: false,
    featured,
    negotiable,
    propertyType,
    type: propertyType === "village" ? "民房" : "公寓",
    nearbyPort,
    nearbyPortName,
    port: nearbyPortName,
    commuteTarget: nearbyPortName,
    commuteMinutes,
    commuteTime: commuteMinutes[nearbyPort],
    mtr: `步行 ${walkMinutes} 分钟到${nearestStation}，换乘前往${nearbyPortName}`,
    tags: uniqueTags([...tags, ...(portTagMap[nearbyPort] || [])]),
    matchScore,
    landlord: {
      name: ["Lily", "Eric", "Ms. Chan", "Kevin", "Amy", "Mr. Wong"][index % 6],
      verified: index % 3 !== 0,
      responseRate: `${92 + (index % 7)}%`
    },
    landlordName: ["Lily", "Eric", "Ms. Chan", "Kevin", "Amy", "Mr. Wong"][index % 6],
    landlordPhone: city === "香港" ? `+852 6${1200000 + index * 137}` : `+86 13${800000000 + index * 2031}`,
    landlordWechat: `hk_sz_home_${index + 1}`,
    landlordWhatsapp: city === "香港" ? `+852 6${1200000 + index * 137}` : `+86 13${800000000 + index * 2031}`,
    description: `${title}，适合港深通勤学生、实习生或跨境工作者。`,
    highlights: ["通勤路线清晰", "生活配套成熟", "可快速预约看房", `房东回复率 ${92 + (index % 7)}%`],
    notes: ["租金与入住日期以房东确认为准", "通勤时间会受过关高峰影响", "建议看房前确认付款方式"]
  };
});
