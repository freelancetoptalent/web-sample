const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path')
function createVideo(url) {

  // const videoName = `video.mp4`
  const videoPath = path.join(__dirname, '../build/asd.mp4')
  ytdl(`${url}`)
  .pipe(fs.createWriteStream(videoPath));
  
  return videoPath
}

exports.handler = async function(event, context) {

  if(event.body) {
      const {url} = JSON.parse(event.body)
      const videoPath = await createVideo(url)
      console.log(videoPath)
     
    return {
      statusCode:200,
      body: JSON.stringify({url})
    }
  }
}
