const express = require('express');
const app = express();

app.use(express.json());

const VERIFY_TOKEN = "verify_token_123";

/* Webhook verification (Meta) */
app.get('/webhook', (req, res) => {

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    console.log("MODE:", mode);
    console.log("TOKEN:", token);
    console.log("CHALLENGE:", challenge);

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("WEBHOOK VERIFIED");
        return res.status(200).send(challenge);
    } 
    else {
        console.log("VERIFICATION FAILED");
        return res.sendStatus(403);
    }
});

/* Receive messages */
app.post('/webhook', (req, res) => {
    console.log("MESSAGE RECEIVED:");
    console.log(JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

/* Test route */
app.get('/', (req, res) => {
    res.send("WhatsApp AI Bot Running");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
