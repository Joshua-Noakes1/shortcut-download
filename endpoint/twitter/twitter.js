const express = require('express');
const router = express.Router();
const twitter = require('./get-video-url');

router.post('/download', async (req, res, next) => {
    // get video urls
    var twt_videos = await twitter.get_url(req.body.post_url);

    // if video doesnt exist we respond with a 404 not found 
    if (twt_videos.type != "video" || twt_videos.found == false) {
        res.status(404).json({
            message: "❌ Not Found ❌"
        });
        return;
    }

    // Working out what the largest video is
    if (twt_videos.dimensionsAvailable > 1) {
        const video_meta = []
        let largest_video
        var i 
        for (i = 0; i < twt_videos.dimensionsAvailable; i++) {
            var width = Number(twt_videos.download[i].width);
            var height = Number(twt_videos.download[i].height);
            var combined_size = width * height;
            video_meta.push(combined_size);
        }
        largest_video = Math.max.apply(Math, video_meta);
        console.log(video_meta.indexOf(largest_video));
    }

    res.status(200).json(twt_videos);
});

module.exports = router;