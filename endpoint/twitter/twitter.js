const express = require('express');
const router = express.Router();
const twitterGetUrl = require("twitter-url-direct");
const url = require('url');

router.post('/download', async (req, res, next) => {
    // checking the domain url
    const parsed_raw_url = url.parse(req.body.url);
    if (parsed_raw_url.hostname != 'twitter.com') {
        res.status(404).json({
            message: '❌ Not Found ❌'
        });
        return;
    }

    // get video urls
    var twt_video = await twitterGetUrl(req.body.url);
    var response = {}

    // if video doesnt exist we respond with a 404 not found 
    if (req.body.url == "" || req.body.url == undefined || twt_video.type != "video" || twt_video.found == false) {
        res.status(404).json({
            message: "❌ Not Found ❌"
        });
        return;
    }

    // We need to workout which video is the larges if theres more than one 
    if (twt_video.dimensionsAvailable > 1) {
        const resolution = []
        let largest_video

        // for loop to do math to workout video resolution from the width x height and push the result to an array
        for (var i = 0; i < twt_video.dimensionsAvailable; i++) {
            var width = Number(twt_video.download[i].width);
            var height = Number(twt_video.download[i].height);
            var combined_wxh = width * height;
            resolution.push(combined_wxh);
        }

        // get the highest element in the array and store its number
        largest_video = Math.max.apply(Math, resolution);
        largest_video = resolution.indexOf(largest_video);

        // json response
        response.url = twt_video.download[largest_video].url;
    } else {
        // just reply with the first video if only one quality option is there
        response.url = twt_video.download[0].url;
    }

    res.status(200).json(response);
});

module.exports = router;