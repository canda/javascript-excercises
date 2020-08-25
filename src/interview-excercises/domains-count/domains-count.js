// Display Ad Clicks
// You are in charge of a display advertising program. Your ads are displayed on websites all over the internet.
// You have some CSV input data that counts how many times that users have clicked on an ad on each individual domain.
// Every line consists of a click count and a domain name, like this:

var counts = [
  '900,google.com',
  '60,mail.yahoo.com',
  '10,mobile.sports.yahoo.com',
  '40,sports.yahoo.com',
  '300,yahoo.com',
  '10,stackoverflow.com',
  '2,en.wikipedia.org',
  '1,es.wikipedia.org',
  '1,mobile.sports',
  '1,google.co.uk',
];
// Write a function that takes this input as a parameter and returns a data structure containing the number of clicks
// that were recorded on each domain AND each subdomain under it. For example, a click on “mail.yahoo.com” counts toward the totals for
// “mail.yahoo.com”, “yahoo.com”, and “com”. (Subdomains are added to the left of their parent domain. So “mail” and “mail.yahoo”
// are not valid domains. Note that “mobile.sports” appears as a separate domain near the bottom of the input.)

// The output look
// calculateClicksByDomain(counts)

const clickCounts = (counts) => {
  const result = {};

  counts.forEach((countString) => {
    const [count, fullDomain] = countString.split(',');

    const domains = fullDomain
      .split('.')
      .map((subdomain, index) =>
        [
          subdomain,
          ...fullDomain
            .split('.')
            .filter((_otherSubdomains, otherIndex) => otherIndex > index),
          ,
        ].join('.'),
      );

    domains.forEach((domain) => {
      result[domain] = (result[domain] || 0) + parseInt(count);
    });
  });
  return result;
};

console.log('result', clickCounts(counts));

// 1320 com
// 900 google.com
// 410 yahoo.com
// 60 mail.yahoo.com
// 10 mobile.sports.yahoo.com
// 50 sports.yahoo.com
// 10 stackoverflow.com
// 3 org
// 3 wikipedia.org
// 2 en.wikipedia.org
// 1 es.wikipedia.org
// 1 mobile.sports
// 1 sports
// 1 uk
// 1 co.uk
// 1 google.co.uk
