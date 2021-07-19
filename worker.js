// let throng = require('throng');
let Queue = require("bull");
var { Client } = require('pg');

// var randomCountry = require('random-country');
// var randomGen = require('random-world');
// const format = require('pg-format');


let workers = process.env.WEB_CONCURRENCY || 1;
// The maximum number of jobs each worker should process at once. This will need
// to be tuned for your application. If each job is mostly waiting on network
// responses it can be much higher. If each job is CPU-intensive, it might need
// to be much lower.
let maxJobsPerWorker = 1;

console.log('worker job startered');

let workQueue = new Queue('makethings', process.env.REDIS_URL);

workQueue.process((job, done) => {

  console.log('making data');
  console.log(job);
  // let newThings = await makeLotsOfThings();

  let titles = ['Continent', 'Country', 'City'];
  let continents = ['North America', 'South America', 'Australia', 'Asia', 'Africa', 'Antartica', 'Europe'];
  let newThings =  [];
  console.log(continents);
  for(let i=0; i<15; i++) {

	  let newTitle = titles[0];
	  console.log('newTitle :: ' + newTitle);
	  switch (newTitle) {
		  // case 'City':
		  //     newThings.push(['City',  randomGen.city() ]);
		  //     break;
		  // case 'Country':
		  //     newThings.push(['Country',  randomCountry({ full: true }) ]);
		  //     break;
		  case 'Continent':
			  newThings.push([{'Continent':  continents[getRandomInt(6)]} ]);
			  break;
		  default:
			 break;
	  }

  }

  console.log('madeee data');
  console.log(newThings);

  // A job can return values that will be stored in Redis as JSON
  // This return value is unused in this demo application.
  console.log('jobbb DoNNNeee');
  // progress += 100;
  job.progress(100);
  done(true);
  // return { value: "jobbb  donnn" };
});


// function makeLotsOfThings() {
//     console.log('makeLotsOfThings STARTED');
//   return new Promise((resolve, reject) => {
//
//       var titles = ['Continent', 'Country', 'City'];
//       var continents = ['North America', 'South America', 'Australia', 'Asia', 'Africa', 'Antartica', 'Europe'];
//       var newThings =  [];
//       for(var i=0; i<15; i++) {
//
//           let newTitle = titles[getRandomInt(3)];
//           console.log('newTitle :: ' + newTitle);
//           switch (newTitle) {
//               // case 'City':
//               //     newThings.push(['City',  randomGen.city() ]);
//               //     break;
//               // case 'Country':
//               //     newThings.push(['Country',  randomCountry({ full: true }) ]);
//               //     break;
//               case 'Continent':
//                   newThings.push(['Continent',  continents[getRandomInt(7)] ]);
//                   break;
//               default:
//                  break;
//           }
//
//       }
//
//       console.log('madeee data');
//       console.log(newThings);
//       let currclient = new Client({
//               connectionString: process.env.DATABASE_URL,
//               ssl: {
//                   rejectUnauthorized: false
//                 }
//           });
//
//       currclient.connect();
//
//       let query1 = format('INSERT INTO thing (title, description) VALUES %L returning id', newThings);
//
//       currclient.query(query1, (err, res) => {
//           if (err){
//               console.log('db error');
//               // return { value: "error inserting  data" };
//               resolve(err);
//           }
//           currclient.end();
//           console.log('db success');
//           resolve("inserted data");
//           // return { value: "inserted data" };
//       });
//
//   });
// }

// function start() {
//   // Connect to the named work queue
//
//
//   console.log('worker job startered');
//
//   let workQueue = new Queue('makethings', process.env.REDIS_URL);
//
//   workQueue.process(maxJobsPerWorker, (job, done) => {
//
//     // This is an example job that just slowly reports on progress
//     // while doing no work. Replace this with your own job logic.
//     // let progress = 0;
//
//     // throw an error 5% of the time
//     // if (Math.random() < 0.05) {
//     //   throw new Error("This job failed!")
//     // }
//     console.log('making data');
//     // let newThings = await makeLotsOfThings();
//
//     var titles = ['Continent', 'Country', 'City'];
//     var continents = ['North America', 'South America', 'Australia', 'Asia', 'Africa', 'Antartica', 'Europe'];
//     var newThings =  [];
//     for(var i=0; i<15; i++) {
//
//         let newTitle = titles[getRandomInt(3)];
//         console.log('newTitle :: ' + newTitle);
//         switch (newTitle) {
//             // case 'City':
//             //     newThings.push(['City',  randomGen.city() ]);
//             //     break;
//             // case 'Country':
//             //     newThings.push(['Country',  randomCountry({ full: true }) ]);
//             //     break;
//             case 'Continent':
//                 newThings.push(['Continent',  continents[getRandomInt(7)] ]);
//                 break;
//             default:
//                break;
//         }
//
//     }
//
//     console.log('madeee data');
//     console.log(newThings);
//
//     // A job can return values that will be stored in Redis as JSON
//     // This return value is unused in this demo application.
//     console.log('jobbb DoNNNeee');
//     // progress += 100;
//     job.progress(100);
//     done();
//     // return { value: "jobbb  donnn" };
//   });
// }

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
// throng({ workers, start });
