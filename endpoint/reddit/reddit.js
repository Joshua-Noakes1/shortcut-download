const express = require('express');
const router = express.Router();
const redditsave = require('./redditsave');
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

    // get reddit save
    const reddit = await redditsave.redditSave(req.body.url);

    res.status(200).json({
        url: `${reddit.url}`
    });
});

module.exports = router;