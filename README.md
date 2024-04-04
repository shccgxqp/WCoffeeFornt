<p align="center">
  <a href="" rel="noopener">
 <img width=300px height=200px src="https://github.com/shccgxqp/WCoffeeBack/blob/main/bg.jpg?raw=true" alt="Project logo"></a>
</p>

<h3 align="center">wc-coffee-front</h3>

<div align="center">


[![Status](https://img.shields.io/badge/status-Offline-red.svg)]()
[![GitHub commit activity](https://img.shields.io/github/commit-activity/y/shccgxqp/WCoffeeFront)]()
![GitHub followers](https://img.shields.io/github/followers/shccgxqp?logo=github)

</div>

---

WC-Coffee-Front 是一個使用Vite + React 建立的電子商務前端專案，主要配合[WC-Coffee-Back](<https://github.com/shccgxqp/WCoffeeBack>)後端專案，打造的咖啡店商網站。


## 📝 目錄
- [📝 目錄](#-目錄)
- [🎈 Initial - 專案介紹](#-initial---專案介紹)
- [🧐 Features - 專案功能](#-features---專案功能)
- [🛠️ 停止計畫](#️-停止計畫)
- [🗃️ Content - 專案內容](#️-content---專案內容)
- [⛏️ Built Using - 主要使用](#️-built-using---主要使用)
- [⚙️ Installing - 專案安裝流程](#️-installing---專案安裝流程)

## 🎈 Initial - 專案介紹 

隨著咖啡文化的興起和消費者對高品質咖啡的追求，建立一個完整的電商購物網站是創立咖啡豆品牌的必要步驟之一。這個網站將扮演著多重角色，不僅僅是一個銷售平台，還是品牌形象的展示窗口和顧客互動的重要渠道。

***核心功能***

* **管理庫存**： 使品牌能夠有效地追蹤咖啡豆的庫存狀況，包括進貨、銷售和庫存管理等。

* **前台購物車**： 顧客可以輕鬆地瀏覽和選購咖啡豆，並將它們添加到購物車中進行結算。

* **後台上架**： 管理員可以輕鬆地在後台管理系統中上架新的咖啡豆產品，設置價格、描述和*其他相關信息。

* **訂單追蹤**： 顧客可以追蹤他們的訂單狀態，包括付款確認、出貨通知和配送進度等。

* **金流串接**： 通過整合支付系統，顧客可以使用各種支付方式（如信用卡、PayPal 等）完成購買。


本專案的建立旨在幫助品牌專注於咖啡豆的研發和生產，同時提供給商家一個方便、輕鬆的網站伺服器。

## 🧐 Features - 專案功能

  * 知識展示 - 簡易產地咖啡資訊介紹
  * 帳號申請 - 發送請求前驗證資料是否落實，再加入第三方登入。
  * 商品展示 - 分類、單一商品詳細說明
  * 購物車功能 - 快速下單、金額計算、免登入使用購物車
  * 結帳功能 - 未登入導入登入畫面，登入後創建訂單。


## 🛠️ 停止計畫 
由於本專案是以簡單展示功能，以及測試後端API是否設計方便前端取用，故功能不會完整落實。

消費者介面
* 咖啡知識展示 - 產品的成功與否，有一部分建立在品牌的專業度，如果能用豐富的圖像與互動元件，使消費者學習到咖啡的知識，了解咖啡產品的優劣如何判斷，及品牌的定位的走向。

  * 地區產地 - 搭配地圖元件立體化，展示各地區產豆，以及冠軍豆種
  * 風味 - 透過視覺化圖表展示咖啡的風味特點，包括酸度、甜度、苦味等
  * 烘培技術 - 以動畫或影片呈現不同烘培技術對咖啡風味的影響，包括淺焙、中焙、深焙等
  * 手沖手法 - 展示各種手沖器具的使用方法，包括V60、Chemex等，以及如何控制水溫、水量和沖煮時間
  * 研磨程度 - 以圖表或文字說明不同研磨程度對咖啡風味的影響，包括粗磨、中磨、細磨等
  
* 視覺化訂單資訊 - 串接第三方金流、物流資訊畫面  
* 金流服務 - 整合第三方金流，完成付款畫面。
* ~~展示電子發票 - 整合財政部電子發票，開立發票畫面~~


管理者介面
* 商品管理、分類管理、訂單管理、用戶權限設定


## 🗃️ Content - 專案內容
  統整完整再補齊畫面。

  <img width=600px height=600px src="https://github.com/shccgxqp/WCoffeeBack/blob/main/picture/首頁.jpeg" alt="首頁照片">


## ⛏️ Built Using - 主要使用  

- [vite](https://vitejs.dev/) - 建構工具
- [React](https://react.dev/) - 前端框架
- [React Router DOM](https://reactrouter.com/en/main) - 前端路由管理
- [SWR](https://swr.vercel.app/) - 用於遠程數據提取的React Hooks庫
- [React Icons](https://react-icons.github.io/react-icons/) - 用於React應用程序的圖標組件庫
- [React Social](https://www.npmjs.com/package/react-social) 用於React的社交登錄按鈕組件
- [Tailwind CSS](https://tailwindcss.com/) - 快速構建自定義設計的實用CSS框架
- [ESLint](https://eslint.org/) - 用於JavaScript和JSX代碼的靜態代碼分析工具
- [Prettier](https://prettier.io/) - 用於代碼格式化和美化的工具
- [Prettier Plugin Tailwind CSS](https://www.npmjs.com/package/prettier-plugin-tailwindcss?activeTab=readme) - 用於Prettier的Tailwind CSS插件


## ⚙️ Installing - 專案安裝流程

1. 打開你的 terminal，Clone 此專案至本機電腦
   
```
git clone https://github.com/shccgxqp/WCoffeeFront
```
2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd WCoffeeFront
```

3. 安裝 npm 套件，下載專案相依套件

```
npm install
```

4. 環境變數設定

```
REACT_APP_API= 伺服器網址 Ex:http://localhost:3060
```

現在，可以開啟任一瀏覽器瀏覽器輸入 http://localhost:3060 開始查看囉！



```
管理者帳號
帳號 : wangcoffee@example.com
密碼 : 12345678

消費者帳號
帳號 : user1@example.com
密碼 : 12345678
```

