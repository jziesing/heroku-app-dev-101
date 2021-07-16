let throng = require('throng');
let Queue = require("bull");
var { Client } = require('pg');
var randomCountry = require('random-country');
var randomGen = require('random-world');

// Connect to a local redis instance locally, and the Heroku-provided URL in production
let REDIS_URL = process.env.REDIS_URL;


// Spin up multiple processes to handle jobs to take advantage of more CPU cores
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
let workers = process.env.WEB_CONCURRENCY || 2;

// The maximum number of jobs each worker should process at once. This will need
// to be tuned for your application. If each job is mostly waiting on network
// responses it can be much higher. If each job is CPU-intensive, it might need
// to be much lower.
let maxJobsPerWorker = 50;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function start() {
  // Connect to the named work queue

  let workQueue = new Queue('makethings', {
                                  redis: {
                                      port: Number(REDIS_URL.split(':')[3]),
                                      host: REDIS_URL.split(':')[2].split('@')[1],
                                      password: REDIS_URL.split(':')[2].split('@')[0],
                                      tls: {
                                          servername: REDIS_URL.split(':')[2].split('@')[1]
                                      }
                                  }});

  workQueue.process(maxJobsPerWorker, async (job) => {
    // This is an example job that just slowly reports on progress
    // while doing no work. Replace this with your own job logic.
    let progress = 0;

    // throw an error 5% of the time
    // if (Math.random() < 0.05) {
    //   throw new Error("This job failed!")
    // }
    let titles = ['Continent', 'Country', 'City'];
    let continents = ['North America', 'South America', 'Australia', 'Asia', 'Africa', 'Antartica', 'Europe'];
    let newThings =  [];
    for(let i=0; i<1500; i++) {

        let newTitle = titles[getRandomInt(3)];
        switch (newTitle) {
            case 'City':
                for(let i=0; i<1500; i++)  {
                    newThings.push({title: 'City', description: randomGen.city()})
                }
                break;
            case 'Country':
                for(let i=0; i<1500; i++)  {
                    newThings.push({title: 'Country', description: randomCountry({ full: true })})
                }
                break;
            case 'Continent':
                for(let i=0; i<1500; i++)  {
                    newThings.push({title: 'Continent', description: continents[getRandomInt(7)]});
                }
                break;
        }
        progress += 1;
        job.progress(progress)
    }

    let currclient = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
              }
        });

    currclient.connect();

    currclient.query('INSERT INTO thing(title, description) VALUES($1, $2) RETURNING ID;', newThings,(err, res) => {
        if (err){
            return { value: "error inserting  data" };
        }
        currclient.end();
        return { value: "inserted data" };
    });



    // A job can return values that will be stored in Redis as JSON
    // This return value is unused in this demo application.

  });
}

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ workers, start });
