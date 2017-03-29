# Simple Web Crawler

2.5 hour challenge to make a Web Crawler
Text based crawler that takes URL & depth of search parameters and returns phone numbers and a list of sites.

### To Run Project:
1. Clone repo.
2. run `npm install`
3. run `npm start` while in the root directory

### Description

We want to crawl specific parts of the world wide web to discover available phone number data. Can you come up with a prototype to show the engineering team?

The most basic requirements for the crawler should include:
- Take a list of input urls
- Make an http GET request to retrieve the content of the page
- Parse the content on the page
- Stores any phone number data present on the page.
- Add any parsed out links found on the page to the list of input urls to crawl.
- Repeat the process until the list of urls to visit, the “horizon”, is empty.

The project is open ended and purposefully so. We want you to impress us with your skills and your particular talents. The minimum goal is to get something working that covers all the basic bullet points. If you have additional time, spend it however you see fit that puts the project in the best light. Aim to impress. Be prepared to defend your decisions.

Project prototypes often evolve into real world solutions that need to be robust and scalable. We don’t expect you to build a robust and scalable solution in 2.5 hours. But we do expect you to give it some consideration and for it to inform your prototype.
