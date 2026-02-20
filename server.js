import express from "express";

const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

// اختبار أن السيرفر يعمل
app.get("/", (req, res) => {
  res.send("WhatsApp AI Bot Running");
});


// ⭐⭐ هذا أهم جزء ⭐⭐
// Meta سيستدعيه عند Verify
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WEBHOOK VERIFIED");
    res.status(200).send(challenge); // أهم سطر
  } else {
    res.sendStatus(403);
  }
});

// استقبال الرسائل
app.post("/webhook", (req, res) => {
  console.log("MESSAGE RECEIVED:");
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started on port " + PORT));
