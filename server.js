require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();

app.use(cors());

const route = process.env.PROXY_ROUTE;
const target = process.env.PROXY_TARGET;
const pathRewriteFrom = process.env.PATH_REWRITE_FROM;
const pathRewriteTo = process.env.PATH_REWRITE_TO;

app.use(
  route,
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      [pathRewriteFrom]: pathRewriteTo,
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log("➡️ Запрос:", req.originalUrl);
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
      proxyRes.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
      proxyRes.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept, Authorization";
      console.log("✅ Ответ успешно проксирован.");
    },
    logLevel: "debug",
  })
);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🔁 Прокси-сервер слушает на http://localhost:${PORT}`);
});