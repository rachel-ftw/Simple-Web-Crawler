"use strict"
const request = require('request');
const cheerio = require('cheerio')
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function intro() {
  process.stdout.write(`What URL would you like to crawl and the depth? 
  \n Please put in a full url & depth of search, space separated.
  \n example: $ http://www.google.com 2
  \n type 'help' for more infomration\n`)
}

intro()

rl.on('line', (line) => {
  let input = line.split(' ')
  //TODO: Add more edge cases for user interaction/catch bad entries.
  if(input.length === 1 && input[0].toLowerCase() === 'help') {
    process.stdout.write('\u001B[2J\u001B[0;0f')
    process.stdout.write(`HELP
      \n Please use a complete URL 
      \n 'depth of search' is the number of levels you'll crawl.
      \n 1 = just the page you're on
      \n 2 = the page you're on + all of the pages it links to.
      \n ... and so on.
      \n Beware, numbers above two are a little unruly.
      \n Type 'back' to get out\n`)
  }

  if(input.length === 1 && input[0].toLowerCase() === 'back') {
    process.stdout.write('\u001B[2J\u001B[0;0f')
    intro()
  }

  if(input.length === 2) {
    let url = input[0]
    let depth = input[1]
    let collector = []
    crawlToDepth(collector, parseInt(depth), url)
    rl.close()
  }
  
});

function crawlToDepth (collector, depth, url) {
  if(depth === 0) {return}
  depth -= 1

  request(url, (error, response, body) => {
    if(error) {
      console.error(error)
      return
    }

    let URLArray = []

    if(response.statusCode === 200) {
      let $ = cheerio.load(body.toString())
      $('a').each((i, element) => {
        let url = element.attribs.href
        if(url !== undefined && url.includes('mailto')) {return}
        if(url !== undefined && url.includes('http')) {
          URLArray.push(url)
          crawlToDepth(collector, depth, url)
        }
      })
    }
    
    collector.push({
      source: url, 
      phoneArray: findPhoneNumbers(response.body), 
      URLArray
    })
    console.log(collector)
    return collector
  })
}

function findPhoneNumbers(string) {
  let result = []
  let phoneNum = /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/
  let index = string.search(phoneNum)
  // TODO: Regex isn't quite pulling the numbers out right. Some false positives.
  // I think it's pulling up other serial/id numbers
  if (string[index] === '(') {
    result.push(string.slice(index, index + 14))
  }
  if (string[index] !== -1 && parseInt(string[index]) !== NaN) {
    result.push(string.slice(index, index + 12))
  }

  return result
}
