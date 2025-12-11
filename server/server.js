const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const User = sequelize.define('user', {
  username: {
    type: DataTypes.STRING
  },
  fullName: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.ENUM('regular-user', 'power-user')
  }
});

const app = express();
app.use(cors());
app.use(express.json());

// CREATE SAMPLE DATA
app.get('/sync', async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });

    const sampleData = [
      { username: 'first-user', fullName: 'john doe', type: 'regular-user' },
      { username: 'second-user', fullName: 'jane doe', type: 'regular-user' },
      { username: 'third-user', fullName: 'alice doe', type: 'power-user' }
    ];

    for (const item of sampleData) {
      await User.create(item);
    }

    res.status(201).json({ message: 'sample db created' });
  } catch (err) {
    next(err);
  }
});

// GET USERS
app.get('/users', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

// ADD USER
app.post('/users', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// ERROR HANDLER
app.use(cors({
  origin: "https://app-react-gui.onrender.com"
}));

// PORT for Render (mandatory)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
