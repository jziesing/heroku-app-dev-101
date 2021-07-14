const { Client } = require('pg');


let currclient = new Client({
    connectionString: process.env.DATABASE_URL_,
    ssl: {
        rejectUnauthorized: false
      }
});

currclient.connect();

currclient.query('CREATE TABLE things (ID SERIAL PRIMARY KEY, title VARCHAR, description VARCHAR);', [],(err, res) => {
    if (err){
        return console.error('error with PostgreSQL database', err);
    }

    return console.error('Success!!');
});
currclient.end();
