# AI Hong Kong-Shenzhen Commuting Rental Assistant

中文名：港深通勤租房助手

这是一个 AI 港深通勤租房助手 mobile web prototype，用于根据通勤需求和房源标签快速匹配租房选择。项目使用 React + Vite 开发，面向手机浏览器展示，适合作为简历、作品集和面试演示项目。

## 核心功能

- 移动端高保真 iOS 风格 UI
- 房源卡片浏览
- 基于房源 `tags` 自动生成的标签筛选
- 图片轮播，支持左右按钮和滑动切换
- Dislike 切换到当前筛选结果中的下一个房源
- Match 查看房源详情和房东联系方式
- 收藏状态前端切换
- 本地 JSON 模拟数据库
- 预留真实数据库接入结构

## 如何本地运行

```bash
npm install
npm run dev
```

默认本地地址通常是：

```bash
http://localhost:5173
```

## 如何手机访问

1. 电脑和手机连接同一个 Wi-Fi。
2. 在项目目录运行：

```bash
npm run dev -- --host 0.0.0.0
```

3. 查看终端显示的 Network 地址，例如：

```bash
http://192.168.x.x:5173
```

4. 用手机浏览器打开该地址。

## 如何部署到 Vercel

1. 上传项目到 GitHub。
2. 登录 Vercel。
3. 点击 Import Project。
4. 选择该 repository。
5. Framework 选择 Vite。
6. Build command 填写：

```bash
npm run build
```

7. Output directory 填写：

```bash
dist
```

8. Deploy 后会生成公网 URL，可以放到简历上。

## 未来数据库扩展

当前版本使用 `src/data/listings.json` 模拟数据库。数据访问逻辑集中在 `src/services/listingService.js`：

- `getListings()`
- `getAllTags(listings)`
- `filterListingsByTag(listings, selectedTag)`

未来接入 Supabase、Firebase 或 MongoDB 时，可以优先替换 service 层里的查询实现，组件层不需要大幅改动。

## 项目结构

```text
src/
  App.jsx
  main.jsx
  data/
    listings.json
  services/
    listingService.js
  components/
    Header.jsx
    FilterBar.jsx
    TagFilter.jsx
    ListingCard.jsx
    ImageCarousel.jsx
    DetailPage.jsx
    EmptyState.jsx
  styles/
    global.css
```
