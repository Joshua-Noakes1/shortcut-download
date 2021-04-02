const express = require('express');
const router = express.Router();
const twitterGetUrl = require("twitter-url-direct");

router.post('/download', async (req, res, next) => {
    // get video urls
    var twt_videos = await twitterGetUrl(req.body.url);
    var response = {}

    // if video doesnt exist we respond with a 404 not found 
    if (twt_videos.type != "video" || twt_videos.found == false) {
        res.status(404).json({
            message: "❌ Not Found ❌"
        });
        return;
    }

    // We need to workout which video is the larges if theres more than one 
    if (twt_videos.dimensionsAvailable > 1) {
        const resolution = []
        let largest_video
        var i

        // for loop to do math to workout video the width x height and push it into an array
        for (i = 0; i < twt_videos.dimensionsAvailable; i++) {
            var width = Number(twt_videos.download[i].width);
            var height = Number(twt_videos.download[i].height);
            var combined_size = width * height;
            resolution.push(combined_size);
        }

        // math to workout which video is the largest in the array
        largest_video = Math.max.apply(Math, resolution);
        largest_video = resolution.indexOf(largest_video);

        // json response
        response.url = twt_videos.download[largest_video].url;
    } else {
        // just reply with the first video if only one quality option is there
        response.url = twt_videos.download[0].url;
    }

    res.status(200).json(response);
});

module.exports = router;