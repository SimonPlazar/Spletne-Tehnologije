const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const PORT = 3000;

const {checkFingerprint, addFingerprint, resetDatabase} = require('./database');

// CORS
app.use(cors({
    origin: 'http://localhost',
    methods: ['GET'],
    allowedHeaders: ['Content-Type']
}));

//CSP headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            connectSrc: ["'self'"],
            imgSrc: ["'self'"]
        }
    }
}));


// Endpoint za preverjanje in dodajanje prstnega odtisa
app.get('/track', (req, res) => {
    const fingerprint = req.query.fingerprint;

    if (!fingerprint) {
        return res.status(400).send("Missing 'fingerprint' parameter");
    }

    checkFingerprint(fingerprint, (err, exists) => {
        if (err) {
            return res.status(500).send("Database error");
        }

        if (exists) {
            res.send('true');
        } else {
            addFingerprint(fingerprint, (err, duplicate) => {
                if (err) {
                    return res.status(500).send("Database error");
                }
                res.send(duplicate ? 'true' : 'false');
            });
        }
    });
});

// Endpoint za ponastavitev DB
app.get('/reset', (req, res) => {
    resetDatabase((err) => {
        if (err) {
            return res.status(500).send("Database error");
        }
        res.send("Database reset");
    });
});

// zapali server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
