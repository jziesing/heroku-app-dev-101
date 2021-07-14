const pg = require('pg');
const connectionString = process.env.DATABASE_URL;


let currclient = new Client({
    connectionString: process.env.DATABASE_URL,
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
