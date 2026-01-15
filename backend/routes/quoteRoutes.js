const express = require('express');
const router = express.Router();
const Quote = require('../database/models/Quote');
const verifyToken = require('../middleware/auth');
const axios = require('axios');

router.post('/quotes', verifyToken, async (req, res) => {
    try {
        const { text, author, language } = req.body;
        const quote = await Quote.create({
            text,
            author,
            language,
            userId: req.userId
        });
        res.status(201).json(quote);
    } catch (err) {
        res.status(500).json({ message: 'Eroare server', error: err.message });
    }
});

router.get('/quotes', verifyToken, async (req, res) => {
    try {
        const quotes = await Quote.findAll({ where: { userId: req.userId } });
        res.status(200).json(quotes);
    } catch (err) {
        res.status(500).json({ message: 'Eroare server', error: err.message });
    }
});

router.put('/quotes/:id', verifyToken, async (req, res) => {
    try {
        const quote = await Quote.findOne({ where: { id: req.params.id, userId: req.userId } });
        
        if (!quote) {
            return res.status(404).json({ message: 'Citatul nu a fost gasit' });
        }

        await quote.update(req.body);
        res.status(200).json({ message: 'Citat actualizat' });
    } catch (err) {
        res.status(500).json({ message: 'Eroare server', error: err.message });
    }
});

router.delete('/quotes/:id', verifyToken, async (req, res) => {
    try {
        const quote = await Quote.findOne({ where: { id: req.params.id, userId: req.userId } });
        
        if (!quote) {
            return res.status(404).json({ message: 'Citatul nu a fost gasit' });
        }

        await quote.destroy();
        res.status(200).json({ message: 'Citat sters' });
    } catch (err) {
        res.status(500).json({ message: 'Eroare server', error: err.message });
    }
});

router.get('/quotes/:id/translate', verifyToken, async (req, res) => {
    try {
        const quote = await Quote.findOne({ where: { id: req.params.id } });
        
        if (!quote) {
            return res.status(404).json({ message: 'Citatul nu a fost gasit' });
        }

        const targetLang = req.query.lang || 'ro';
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(quote.text)}&langpair=en|${targetLang}`;
        
        const response = await axios.get(url);
        const translatedText = response.data.responseData.translatedText;

        res.status(200).json({ 
            original: quote.text, 
            translated: translatedText, 
            lang: targetLang 
        });

    } catch (err) {
        res.status(500).json({ message: 'Eroare traducere', error: err.message });
    }
});

module.exports = router;