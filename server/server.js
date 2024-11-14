var http = require('http'), cors = require('cors'), app = require('./config/express');

app.use(cors({ origin: 'localhost' }));

http.createServer(app).listen(3000, function () {
    console.log('Servidor escutando na porta: ' + this.address().port);
});

