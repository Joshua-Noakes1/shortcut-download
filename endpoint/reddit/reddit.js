const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const url = require('url');

router.post('/download', async (req, res, next) => {
    const reddit = await fetch(`${req.body.url}.json`);
    const reddit_json = await reddit.json();

    const split_url_regex = '/(http[s]?:\/\/)?([^\/\s]+\/)(.*)/';

    const fallback_url = `${reddit_json[0].data.children[0].data.secure_media.reddit_video.fallback_url}`;

    let parsed_url
    parsed_url = url.parse(fallback_url);
    parsed_url = parsed_url.pathname.toString().match(/.+?(?=D)/)[0];
    parsed_url = parsed_url.toString().replace(/\//g, '');
    console.log(parsed_url);

    res.status(200).json({
        url: `${reddit_json[0].data.children[0].data.secure_media.reddit_video.fallback_url}`
    });
});

module.exports = router;