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
  return new Promise((resolve, reject) => {
    const videoPath = path.join(__dirname, `../build/${uniqId()}.mp4`)
    const writeStream = fs.createWriteStream(videoPath);
  
    writeStream.on("error", (error) => reject(error));
    writeStream.on("finish", () => {
      console.log("finish")
      resolve(videoPath);
    })
    ytdl(`${url}`)
    .pipe(writeStream);
  
  })
}

exports.handler = async function(event, context) {

  if(event.body) {
      const {url} = JSON.parse(event.body)
      try {
        const videoPath = await createVideo(url)
        console.log(videoPath)
        return {
          statusCode:200,
          body: JSON.stringify({videoPath})
        }
      } catch (error) {
        return {
          statusCode:500,
  
        }
      }
      
     
    
  }
}
