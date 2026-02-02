# Node2Know — Express Middleware

A minimal Express app demonstrating **middleware** as “checkpoints” that run before your routes.

This repo includes:
- a `borderGuard` middleware (in its own file)
- early-exit responses (200 / 403)
- attaching data to `req`
- a follow-up middleware that redirects to `/customs` when required

---

## ✅ Prereqs

- **Node.js**
- **npm**

Check:

```bash
node -v
npm -v
```

---

## 📦 Install

```bash
npm install
```

---

## ▶️ Run

```bash
npm start
```

---

## 🧪 Try it (browser-friendly)

### 1) Immediate success
- `http://localhost:3000/?passport=multi-pass`

Returns 200 immediately:
- “Welcome, Leeloo Dallas.”

### 2) Access denied
- `http://localhost:3000/?passport=banned`

Returns 403 immediately:
- “Access Denied. Turn around.”

### 3) Customs inspection (redirect)
- `http://localhost:3000/`

BorderGuard sets:

```js
req.customsCheckRequired = true;
```

Then the next middleware redirects you to:

- `http://localhost:3000/customs`

---

## 👀 Watch mode

```bash
npm run watch
```

Stop with:
- `Ctrl + C`

---

## 🧠 Key ideas

### Middleware can end the request
If it sends a response, the request is done.

### Middleware can mutate `req`
You can attach data for later handlers (like a “sticker”):

```js
req.customsCheckRequired = true;
```

### Middleware can pass control forward
```js
next();
```

---

## 📁 Project Structure

```txt
.
├── app.js
├── package.json
└── middleware/
    └── borderGuard.js
```

---

## Repo

- https://github.com/ProfessorSolo/Node2Know-ExpressMiddleware.git

---

## License

**Node2Know-LEARN-1.0**
