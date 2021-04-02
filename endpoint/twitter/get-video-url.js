const twitterGetUrl = require("twitter-url-direct"); // https://www.npmjs.com/package/twitter-url-direct

// function to get urls then return all videos 
async function get_url(twt_url) {
    var response = await twitterGetUrl(twt_url);
    return response;
}

module.exports = {
    get_url
};