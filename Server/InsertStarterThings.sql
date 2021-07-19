-- sql init script to add default things
-- run heroku pg:psql --app YOUR_HEROKU_APP_NAME < PGinit.sql to run the script
-- heroku pg:psql --app app-dev-tester < Server/InsertStarterThings.sql
INSERT INTO thing (title, description) VALUES
    ('Continent', 'Asia'),
    ('Country', 'Mexico'),
    ('City', 'Nairobi');
