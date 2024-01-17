const puppeteer = require("puppeteer");

const scrapeLogic = async (res) => {
    const browser = await puppeteer.launch();

    try {
        const page = await browser.newPage();
        await page.emulate(puppeteer.devices['iPhone 6']);
        await page.goto(
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&q=%22myobvi.com%22&sort_data%5Bdirection%5D=desc&sort_data%5Bmode%5D=relevancy_monthly_grouped&search_type=keyword_exact_phrase&media_type=all',
            { waitUntil: 'networkidle0' }
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
        
        await page.screenshot({path: 'full.png', fullPage: true});

        res.send("scraping done");

    } catch (e){
        console.error(e);
        res.send(`something went wrong y'all : ${e}`);

    } finally {
        await browser.close();

    }
    
};

module.exports = {scrapeLogic};