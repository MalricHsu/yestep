const jsonServer = require('json-server');
const auth = require('json-server-auth');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, 'dist'), // 託管前端打包後的檔案
});

// 必須將資料庫實例綁定到 server 上，json-server-auth 才能運作
server.db = router.db;

const port = process.env.PORT || 3000;

// 1. 使用預設中介軟體 (logger, static, etc.)
server.use(middlewares);

// 2. 設定 Auth 規則 (如果需要自定義規則可以在這裡加)
// 這裡必須在 router 之前
server.use(auth);

// 3. 使用 router
server.use(router);

// 4. 支援前端 SPA 路由 (避免重新整理時 404)
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

server.listen(port, () => {
  console.log(`JSON Server with Auth is running on port ${port}`);
});
