let throng = require('throng');
let Queue = require("bull");
var { Client } = require('pg');

var randomCountry = require('random-country');
var randomGen = require('random-world');
const format = require('pg-format');


let workers = process.env.WEB_CONCURRENCY || 1;
// The maximum number of jobs each worker should process at once. This will need
// to be tuned for your application. If each job is mostly waiting on network
// responses it can be much higher. If each job is CPU-intensive, it might need
// to be much lower.
let maxJobsPerWorker = 1;

console.log('worker job startered');

function insertData(newData) {
    return new Promise((resolve, reject) => {
        let currclient = new Client({
              connectionString: process.env.DATABASE_URL,
              ssl: {
                  rejectUnauthorized: false
                }
          });

        currclient.connect();

        let query1 = format('INSERT INTO thing (title, description) VALUES %L returning id', newData);

        currclient.query(query1, (err, res) => {
          if (err){
              console.log('db error');
              resolve(err);
          }
          currclient.end();
          console.log('db success');
          resolve("inserted data");
        });
    });
}



function start() {
  console.log('worker job startered');

  let workQueue = new Queue('makethings', process.env.REDIS_URL);

  workQueue.process(maxJobsPerWorker, async (job, done) => {

      console.log('making data');
      console.log(job.num_things);
      let num_things = job.num_things;

      let titles = ['Continent', 'Country', 'City'];
      let continents = ['North America', 'South America', 'Australia', 'Asia', 'Africa', 'Antartica', 'Europe'];
      let newThings =  [];
      console.log(continents);
      for(let i=0; i<20; i++) {
    	  let newTitle = titles[Math.floor(Math.random() * 3)];
    	  switch (newTitle) {
    		  case 'City':
                  // console.log('hit City case');
                  newThings.push(['City',  randomGen.city() ]);
    		      break;
    		  case 'Country':
                  // console.log('hit Country case');
                  newThings.push(['Country',  randomCountry({ full: true })]);
    		      break;
    		  case 'Continent':
                  // console.log('hit continent case');
    			  newThings.push(['Continent',  continents[Math.floor(Math.random() * 7)]]);
    			  break;
    		  default:
    			 break;
    	  }
          i++;
      }
      console.log('madeee data');
      console.log(newThings);
      let dbstuff = await insertData(newThings);

      console.log('jobbb DoNNNeee');
      job.progress(100);
      done();
      // return { value: "jobbb  donnn" };
  });
}

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ workers, start });
