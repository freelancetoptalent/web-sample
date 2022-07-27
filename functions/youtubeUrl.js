const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path')


const uniqId = () => {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0,
			v = c === "x" ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}

function createVideo(url) {
  const videoPath = path.join(__dirname, `../build/${uniqId()}.mp4`)
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
