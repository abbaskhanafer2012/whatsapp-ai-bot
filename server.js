const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const VERIFY_TOKEN = "verify_token_123";

/* الصفحة الرئيسية */
app.get("/", (req, res) => {
res.send("WhatsApp AI Bot Running");
});

/* التحقق من واتساب (الأهم) */
app.get("/webhook", (req, res) => {

```
const mode = req.query["hub.mode"];
const token = req.query["hub.verify_token"];
const challenge = req.query["hub.challenge"];

console.log("MODE:", mode);
console.log("TOKEN FROM META:", token);
console.log("MY TOKEN:", VERIFY_TOKEN);

if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WEBHOOK VERIFIED");
    res.status(200).send(challenge);
} else {
    res.sendStatus(403);
}
```

});

/* استقبال الرسائل */
app.post("/webhook", (req, res) => {
console.log("Incoming message:", JSON.stringify(req.body, null, 2));
res.sendStatus(200);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running on port", PORT));
