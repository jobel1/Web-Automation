
const puppeteer =require('puppeteer')
const fs=require('fs/promises')
const cron=require('node-cron')
async function start() {
    const browser = await puppeteer.launch() //await - waiting for browser to launch
    const page=await browser.newPage() //waiting to open for new tab or page
    await page.goto("https://learnwebcode.github.io/practice-requests/")
    //await page.screenshot({path: "screenshot.png",fullPage:true})    //taking a screenshot of the page
    const names= await page.evaluate(() =>{    //saving html elements to text file
     return Array.from(document.querySelectorAll(".info strong")).map(x => x.textContent) //return is used because the code is to be returned in node js
    })
    await fs.writeFile("names.txt", names.join("\r\n"))
     //showing text that is behind the button. This code is written above photo looping code is that below code is searching for the image and it will show error when written below

     await page.click("#clickme") //click is puppeteer method this code simulates click event
     const clickedData = await page.$eval("#data", a => a.textContent)
     console.log(clickedData)
    
    //writefile is method inside fs  module.\r is return and \n is new line
    const photos=await page.$$eval ("img",(imgs) => {   //"img" is css selector first argument and second argument is a function
        return imgs.map(x => x.src)    //map function finds collection of data in "img" to function imgs
      //$$eval() is used for selecting mutiple elements
    })

  
    await page.type("#ourfield", "blue") // has 2 arguments one is the selector and other is the value that you want to insert into text field
    await Promise.all([page.click("#ourform button"),page.waitForNavigation()]) //we are using promise so to wait for the below to be executed
    const info= await page.$eval("#message",b =>b.textContent)
    console.log(info)

    for (const photo of photos) {
        const imagepage=await page.goto(photo) //navigating through photo url
        await fs.writeFile(photo.split("/").pop(),await imagepage.buffer())   //turning string of text into array, splitting

        

    }
    await browser.close() //closing function

    
}
//setInterval(start,5000) //It will start executing in each 5000 millisecond interval

cron.schedule("*/5*****",start) //

// https://learnwebcode.github.io/practice-requests/