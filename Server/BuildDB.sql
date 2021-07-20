-- sql init script to make tables
--   run heroku pg:psql --app YOUR_HEROKU_APP_NAME < PGinit.sql to run the script
CREATE TABLE thing (
    ID SERIAL PRIMARY KEY,
    title VARCHAR,
    description VARCHAR
);
