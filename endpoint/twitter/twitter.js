const express = require('express');
const router = express.Router();
const twitter = require('./get-video-url');

router.post('/download', async (req, res, next) => {
    // get video urls
    var twt_videos = await twitter.get_url(req.body.post_url);
    res.status(200).json(twt_videos);
});

module.exports = router;