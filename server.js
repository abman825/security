const express = require('express');
const path = require('path');
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ፋይሎቹ በሙሉ ውጭ (root) ላይ ስለሆኑ በቀጥታ እንዲያገለግል ያደርጋል
app.use(express.static(__dirname));

// ለጊዜው ዳታቤዝ ስለሌለን ብሩን እዚህ እናስቀምጣለን (ሰርቨሩ ሲጠፋ ይጠፋል)
let userBalance = 0;

// ብር እንዲጨመር የሚያደርግ Route
app.post('/update-balance', (req, res) => {
    const { amount } = req.body;
    if (typeof amount === 'number') {
        userBalance += amount;
        console.log(`Balance updated: ${userBalance}`);
        return res.json({ success: true, balance: userBalance });
    }
    res.status(400).json({ success: false, message: "Invalid amount" });
});

// ያለውን ብር ለጌሙ የሚነግር Route
app.get('/get-balance', (req, res) => {
    res.json({ balance: userBalance });
});

// ዋናውን index.html ፋይል ለመክፈት
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});