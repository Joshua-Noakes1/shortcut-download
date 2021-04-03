const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const url = require('url');

router.post('/download', async (req, res, next) => {
    // checking the domain url
    const parsed_raw_url = url.parse(req.body.url);
    if (parsed_raw_url.hostname != 'www.reddit.com') {
        res.status(404).json({
            message: '❌ Not Found ❌'
        });
        return;
    }

    // remove the ?utm that reddit adds from the share button
    const post_url = req.body.url.toString().match(/.+?(?=\?)/);

    // get json from reddit about post
    const reddit = await fetch(`${post_url}.json`);
    const reddit_json = await reddit.json();

    // find the fallback video url in the json
    const fallback_url = `${reddit_json[0].data.children[0].data.secure_media.reddit_video.fallback_url}`;

    // do some regex to get just the id from the fallback url | https://v.redd.it/0sft9w7j8sq61/DASH_720.mp4?source=fallback > 0sft9w7j8sq61
    let parsed_url
    parsed_url = url.parse(fallback_url);
    parsed_url = parsed_url.pathname.toString().match(/.+?(?=D)/)[0];
    parsed_url = parsed_url.toString().replace(/\//g, '');

    // use vred.rip api to get combined audio and video 
    const vred = await fetch(`https://vred.rip/api/vreddit/${parsed_url}`);
    const vred_json = await vred.json();

    res.status(200).json({
        url: `${vred_json.source}`
    });
});

module.exports = router;