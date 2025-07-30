# Express Proxy Server

Лёгкий прокси-сервер на Node.js с гибкой настройкой через `.env`.  
Предназначен для переадресации HTTP-запросов в локальной среде разработки, помогает обходить ограничения CORS и удобно маршрутизировать API-запросы.

---

## 🚀 Установка

```bash
git clone https://github.com/your-username/your-proxy-repo.git
cd your-proxy-repo
npm install
```

---

## ⚙️ Конфигурация

Создай файл `.env` в корне проекта и укажи параметры:

```env
PROXY_ROUTE=/proxyendpoint
PROXY_TARGET=https://api.targetservice.dev
PATH_REWRITE_FROM=^/proxyendpoint/local
PATH_REWRITE_TO=/proxyendpoint/remote.service.dev
```

**Пояснение параметров:**

- `PROXY_ROUTE` — базовый маршрут, передаваемый в `app.use`
- `PROXY_TARGET` — URL целевого API
- `PATH_REWRITE_FROM` — входящий путь (регулярное выражение)
- `PATH_REWRITE_TO` — путь назначения

---

## ▶️ Запуск сервера

```bash
node server.js
```

После запуска:

- Прокси-сервер слушает на `http://localhost:3000`

---

## 📦 Пример запроса

**Запрос на:**

```
http://localhost:3000/proxyendpoint/local/api/v1/example
```

**Будет перенаправлен на:**

```
https://api.targetservice.dev/proxyendpoint/remote.service.dev/api/v1/example
```

---

## 🛠 Используемые технологии

- [Express](https://expressjs.com/)
- [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)
- [dotenv](https://github.com/motdotla/dotenv)
- [cors](https://github.com/expressjs/cors)