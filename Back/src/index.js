const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
require('./database.js');

app.use('/api', require('./routes/user.js'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal en el servidor');
  });

app.listen(3000);
console.log('Server running on port', 3000);

