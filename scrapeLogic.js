const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
    const browser = await puppeteer.launch({
        args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote"
        ],
        executablePath: process.env.NODE_ENV === 'production' 
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath()
    });

    try {
        const page = await browser.newPage();
        await page.emulate(puppeteer.devices['iPhone 6']);
        await page.goto(
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&q=%22myobvi.com%22&sort_data%5Bdirection%5D=desc&sort_data%5Bmode%5D=relevancy_monthly_grouped&search_type=keyword_exact_phrase&media_type=all',
            { waitUntil: 'networkidle0' , timeout:0 }
            );
        
        // Function to scroll to the bottom of the page
        async function autoScroll(page){
            await page.evaluate(async () => {
                await new Promise((resolve, reject) => {
                    var totalHeight = 0;
                    var distance = 100;
                    var timer = setInterval(() => {
                        var scrollHeight = document.body.scrollHeight;
                        window.scrollBy(0, distance);
                        totalHeight += distance;

                        if(totalHeight >= scrollHeight){
                            clearInterval(timer);
                            resolve();
                        }
                    }, 100);
                });
            });
        }

        // Scroll to the bottom of the page
        await autoScroll(page);
        
        const imageBuffer  = await page.screenshot({fullPage: true, type: 'png',});
        const img = Buffer.from(imageBuffer, 'base64');
        
        
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
          });
          res.end(img); 

    } catch (e){
        console.error(e);
        res.send(`something went wrong y'all : ${e}`);

    } finally {
        await browser.close();

    }
    
};

module.exports = {scrapeLogic};
