const cp = require("child_process");
const ffmpeg = require('ffmpeg-static');
const fs = require('fs');
const id3 = require('node-id3');
const path = require('path');
const ytdl = require('ytdl-core');
// const convertMp3 = require('./convertMp3')
const utils = require("./utils/utils")



async function createVideo(videoURL) {
  // return new Promise((resolve, reject) => {
  //   const videoPath = path.join(__dirname, `../build/${uniqId()}.mp4`)
  //   const writeStream = fs.createWriteStream(videoPath);

  //   writeStream.on("error", (error) => reject(error));
  //   writeStream.on("finish", () => {
  //     console.log("finish")
      
  //     resolve(videoPath);
  //   })
  //   ytdl(`${url}`)
  //   .pipe(writeStream);
  
  // })

    // get video info using ytdl-core function
    let videoInfo;
    try {
        videoInfo = await ytdl.getInfo(videoURL, {quality: 'highestaudio'});
    } catch(error) {
        throw new Error(`An unexpected exception occurred during call to ytdl-core function "getInfo"\n\n${error.stack}`)
    };

    // attempt to extract song tags from ytdl info and ask user to input missing tags
    let songTags = {
        'title': utils.uniqId(),
    }

    if (Object.values(songTags).includes(undefined)) {
        console.log("Unable to extract all song tags from YouTube");
    };

    for (const tag in songTags) {
        if (songTags[tag] === undefined) {
            songTags[tag] = await utils.userInput(`Enter ${tag}: `);
        };
    };

    // generate filenames based on song tags
    let baseFileName = utils.formatSongTitle(songTags.title);
    let filePaths = {
        "audioFile": path.join(__dirname, `../build/${baseFileName}.mp3`),
        "videoFile": path.join(__dirname, `../build/${baseFileName}.mp4`)
    };

    // remove old files of the same names
    for (let file of Object.values(filePaths)) {
        if (fs.existsSync(file)) {
            fs.rmSync(file);
        };
    };

    // download video
    let stream = ytdl.downloadFromInfo(videoInfo, {quality: 'lowestaudio'})
        .pipe(fs.createWriteStream(filePaths.videoFile));
    
    await new Promise((resolve, reject) => {
        stream.on("finish", resolve);
        stream.on("error", (err) => {
            reject(err);
        });
    });

    // convert video to audio
    cp.execSync(`${ffmpeg} -loglevel 24 -i ${filePaths.videoFile} -vn -sn -c:a mp3 -ab 192k  ${filePaths.audioFile}`);
    fs.rmSync(filePaths.videoFile);


    id3.write(songTags, filePaths.audioFile);
    console.log(filePaths.audioFile,"filePaths.audioFile")
    return filePaths.audioFile;

}



exports.handler = async function(event, context) {

  if(event.body) {
      const {url} = JSON.parse(event.body)
      try {
        const videoPath = createVideo(url)
        // const mp3Path = await convertMp3(videoPath)
        return {
          statusCode:200,
          body: JSON.stringify({videoPath})
        }
      } catch (error) {
        console.log(error)
        return {
          statusCode:400,
  
        }
      }
      
     
    
  }
}
