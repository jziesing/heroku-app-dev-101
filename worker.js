let throng = require('throng');
let Queue = require("bull");
var { Client } = require('pg');
var randomCountry = require('random-country');
var randomGen = require('random-world');
const format = require('pg-format');

// Connect to a local redis instance locally, and the Heroku-provided URL in production
const REDIS_URL = process.env.REDIS_URL;


// Spin up multiple processes to handle jobs to take advantage of more CPU cores
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
let workers = process.env.WEB_CONCURRENCY || 1;

// The maximum number of jobs each worker should process at once. This will need
// to be tuned for your application. If each job is mostly waiting on network
// responses it can be much higher. If each job is CPU-intensive, it might need
// to be much lower.
let maxJobsPerWorker = 1;


function start() {
  // Connect to the named work queue


  console.log('worker job startered');

  let workQueue = new Queue('makethings', {
                                  redis: {
                                      port: Number(REDIS_URL.split(':')[3]),
                                      host: REDIS_URL.split(':')[2].split('@')[1],
                                      password: REDIS_URL.split(':')[2].split('@')[0],
                                      tls: {
                                          rejectUnauthorized: false
                                      }
                                  }});

  workQueue.process(maxJobsPerWorker, async (job) => {

    // This is an example job that just slowly reports on progress
    // while doing no work. Replace this with your own job logic.
    // let progress = 0;

    // throw an error 5% of the time
    // if (Math.random() < 0.05) {
    //   throw new Error("This job failed!")
    // }
    var titles = ['Continent', 'Country', 'City'];
    var continents = ['North America', 'South America', 'Australia', 'Asia', 'Africa', 'Antartica', 'Europe'];
    var newThings =  [];
    for(var i=0; i<15; i++) {

        let newTitle = titles[getRandomInt(3)];
        console.log('newTitle :: ' + newTitle);
        switch (newTitle) {
            case 'City':
                newThings.push(['City',  randomGen.city() ]);
                break;
            case 'Country':
                newThings.push(['Country',  randomCountry({ full: true }) ]);
                break;
            case 'Continent':
                newThings.push(['Continent',  continents[getRandomInt(7)] ]);
                break;
        }

    }

    console.log('made data');
    console.log(newThings[0]);

    let currclient = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
              }
        });

    currclient.connect();

    let query1 = format('INSERT INTO thing (title, description) VALUES %L returning id', newThings);

    currclient.query(query1, (err, res) => {
        if (err){
            console.log('db error');
            return { value: "error inserting  data" };
        }
        currclient.end();
        console.log('db success');
        return { value: "inserted data" };
    });



    // A job can return values that will be stored in Redis as JSON
    // This return value is unused in this demo application.
    console.log('jobbb DoNNN');
    // progress += 100;
    job.progress(progress);
    return { value: "jobbb  donnn" };
  });
}

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ workers, start });
