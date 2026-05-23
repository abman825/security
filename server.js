const express = require('express');
const path = require('path');
const cors = require('cors'); // ይህ ለደህንነት አስፈላጊ ነው
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// ለጊዜው ዳታቤዝ ስለሌለን ብሩን እዚህ እናስቀምጠዋለን (ሰርቨሩ ሲጠፋ ይጠፋል)
// ለወደፊቱ ከ MongoDB ጋር ማገናኘት ትችላለህ
let userBalance = 0;

// ብር እንዲጨምር የሚያደርግ Route
app.post('/update-balance', (req, res) => {
    const { amount } = req.body;
    if (typeof amount === 'number') {
        userBalance += amount;
        return res.json({ success: true, balance: userBalance });
    }
    res.status(400).json({ success: false, message: "Invalid amount" });
});

// ያለውን ብር ለጌሙ የሚነግር Route
app.get('/get-balance', (req, res) => {
    res.json({ balance: userBalance });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});