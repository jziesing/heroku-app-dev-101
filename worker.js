let throng = require('throng');
let Queue = require("bull");

// Connect to a local redis instance locally, and the Heroku-provided URL in production
let redisURL = process.env.REDIS_URL;
// var { Client } = require('pg');
// var randomCountry = require('random-country');
// var randomGen = require('random-world');
// const format = require('pg-format');

// Connect to a local redis instance locally, and the Heroku-provided URL in production


// Spin up multiple processes to handle jobs to take advantage of more CPU cores
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
let workers = process.env.WEB_CONCURRENCY || 1;

// The maximum number of jobs each worker should process at once. This will need
// to be tuned for your application. If each job is mostly waiting on network
// responses it can be much higher. If each job is CPU-intensive, it might need
// to be much lower.
let maxJobsPerWorker = 50;


function start() {
  // Connect to the named work queue
  let workQueue = new Queue('makethings', {
	  redis: {
		  port: Number(redisURL.split(':')[3]),
		  host: redisURL.split(':')[2].split('@')[1],
		  password: redisURL.split(':')[2].split('@')[0],
		  tls: {
			  rejectUnauthorized: false
		  }
	  }
  });

  workQueue.process(maxJobsPerWorker, (job) => {
    // This is an example job that just slowly reports on progress
    // while doing no work. Replace this with your own job logic.
    let progress = 0;

	var titles = ['Continent', 'Country', 'City'];
	var continents = ['North America', 'South America', 'Australia', 'Asia', 'Africa', 'Antartica', 'Europe'];
	var newThings =  [];
	for(var i=0; i<15; i++) {

		switch (titles[getRandomInt(3)]) {
			case 'Continent':
				newThings.push(['Continent',  continents[getRandomInt(7)] ]);
				break;
			default:
			   break;
		}

	}
	console.log('job made data');
	console.log(newThings);

    // A job can return values that will be stored in Redis as JSON
    // This return value is unused in this demo application.
    return { value: "This will be stored" };
  });
}


// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ workers, start });
