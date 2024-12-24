
const puppeteer =require('puppeteer')
const fs=require('fs/promises')
const cron=require('node-cron')
async function start() {
    const browser = await puppeteer.launch() //await - waiting for browser to launch
    const page=await browser.newPage() //waiting to open for new tab or page
    await page.goto("https://learnwebcode.github.io/practice-requests/")
    //await page.screenshot({path: "screenshot.png",fullPage:true})    //taking a screenshot of the page
    const names= await page.evaluate(() =>{    //saving html elements to text file
     return Array.from(document.querySelectorAll(".info strong")).map(x => x.textContent) 
    })
    await fs.writeFile("names.txt", names.join("\r\n"))
    ten below

     await page.click("#clickme") 
     const clickedData = await page.$eval("#data", a => a.textContent)
     console.log(clickedData)
    
   
    const photos=await page.$$eval ("img",(imgs) => {   
        return imgs.map(x => x.src)    
      
    })

  
    await page.type("#ourfield", "blue")
    await Promise.all([page.click("#ourform button"),page.waitForNavigation()]) 
    const info= await page.$eval("#message",b =>b.textContent)
    console.log(info)

    for (const photo of photos) {
        const imagepage=await page.goto(photo) 
        await fs.writeFile(photo.split("/").pop(),await imagepage.buffer()) 

        

    }
    await browser.close() //closing function

    
}
//setInterval(start,5000) //It will start executing in each 5000 millisecond interval

cron.schedule("*/5*****",start) //

// https://learnwebcode.github.io/practice-requests/
