const ytdl = require('ytdl-core');
const fs = require('fs');

function createVideo(url) {

  
  const videoName = `video.mp4`
  ytdl(`${url}`)
  .pipe(fs.createWriteStream(videoName));
  
  return videoName
}

exports.handler = async function(event, context) {

  if(event.body) {
      const {url} = JSON.parse(event.body)
      const videoName = await createVideo(url)
      console.log(videoName)
     
    // return {
    //   statusCode:200,
    //   body: JSON.stringify({url})
    // }
  }
}