const express = require('express');
const cors = require('cors');
const Sequelize = require('sequelize');

const app = express();

app.use(express.json());
app.use(cors());

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/database.sqlite',
    logging: false
});

module.exports = { sequelize };

const User = require('./database/models/User');
const Quote = require('./database/models/Quote');

User.hasMany(Quote, { foreignKey: 'userId' });
Quote.belongsTo(User, { foreignKey: 'userId' });

const userRoutes = require('./routes/userRoutes');
const quoteRoutes = require('./routes/quoteRoutes');

app.use('/api', userRoutes);
app.use('/api', quoteRoutes);

app.get('/sync', async (req, res) => {
    try {
        await sequelize.sync({ force: true });
        res.status(201).json({ message: 'Baza de date a fost creata/resetata' });
    } catch (err) {
        console.warn(err);
        res.status(500).json({ message: 'Eroare la crearea bazei de date' });
    }
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Serverul ruleaza pe http://localhost:${PORT}`);
});