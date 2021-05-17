const puppeteer = require('puppeteer');
const delay = require('delay');

async function redditSave(reddit_url) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
            ignoreDefaultArgs: ['--disable-extensions'],
            args: [
                '--start-maximized',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--use-fake-ui-for-media-stream'
            ]
        });

        const page = await browser.newPage();
        const navPromise = page.waitForNavigation();

        await page.goto('https://redditsave.com/');
        await navPromise;
        console.log('[INFO] Navigated to reddit save');

        // click eu accept button
        await page.waitForSelector('#accept-choices');
        await page.click('#accept-choices');
        console.log('[INFO] Accepted eu tracking');

        // enter url
        await page.waitForSelector('#url');
        await page.type('#url', reddit_url, {
            delay: 5
        });

        // click submit btn
        await delay(250);
        await page.click('#download');
        console.log('[INFO] Submitted url');


        // wait for download page to load
        await navPromise;
        await page.waitForSelector('a.downloadbutton');

        // get download url
        var url = await page.evaluate('document.querySelector("a.downloadbutton").getAttribute("href")');
        console.log('[INFO] Found href url');

        // close browser
        browser.close();

        // if imgur just send link
        if (url.includes('imgur.com')) {
            return {
                "url": url
            }
        }

        // add the download url onto the link if its a gif
        if (url.includes('/d/') && !url.includes('redditsave.com')) {
            return {
                "url": `https://ds.redditsave.com${url}`
            }
        }

        // checking to see if the url is good
        if (!url.includes('redditsave.com')) {
            return {
                "url": "ERROR"
            }
        }

        // return download url
        return {
            "url": url
        }
    } catch (error) {
        console.log(error);
        return {
            "url": "ERROR"
        }
    }
}

module.exports = {
    redditSave
}