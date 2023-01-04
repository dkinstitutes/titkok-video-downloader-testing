const request = require('request');
const fs = require('fs');

const downloadVideo = (url, filename) => {
  request.get(url)
    .on('error', (err) => {
      console.log(err);
    })
    .pipe(fs.createWriteStream(filename));
};

// Replace 'TIKTOK_URL' with the URL of the TikTok video you want to download
const tiktokUrl = 'TIKTOK_URL';

// Send a GET request to the TikTok API to get the video URL
request.get(tiktokUrl, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    const json = JSON.parse(body);
    const videoUrl = json.videoUrl;

    // Replace 'FILENAME' with the desired name for the downloaded video file
    const filename = 'FILENAME.mp4';

    // Download the video
    downloadVideo(videoUrl, filename);
  } else {
    console.log(error);
  }
});
