import React, { useState } from "react";
import { Btn } from "../../components/Button/Button.styles";
import Heading from "../../components/Heading/Heading";
import {
  Content,
  ContentItem,
  ContentWrap,
  ImgWrap,
  Text,
  Wrapper,
  Form,
} from "./Home.styles";
import Playlist from "../../assets/images/Playlist.png";
import Records from "../../components/Records/Records";
import Spinner from "../../components/Spinner/Spinner"
const HomePage = () => {
  
  const [value, setValue ] = useState("");
  const [audioFile,setAudioFile] = useState("")
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setLoading(true)
    setAudioFile("")
    // Server to Heroku
    // https://stormy-taiga-19539.herokuapp.com/api/v1/youtubeUrl

    // Server to Netlify
    // /.netlify/functions/youtubeUrl
    const data = await fetch("https://stormy-taiga-19539.herokuapp.com/api/v1/youtubeUrl", 
    {
      method: "POST",
      body: JSON.stringify({url:value}),
      headers: {'Content-Type': 'application/json'}
    }
    );
    const results = await data.blob()
    const  blobUrl = URL.createObjectURL(results);
    setAudioFile(blobUrl)
    setLoading(false)
    setValue("")
  };
  return (
    <Wrapper>
      <ContentWrap>
        <Content>
          <ContentItem>
            <Heading tag="h2" text={"Online Music to 432Hz converter"} />
            <Text>
              Use this tool to convert music to <b>432hz</b> (Hertz). 432hz
              music is well known to increase well-being, is often said to sound
              better, be more harmonic, and have transcendental powers.
            </Text>
            <Form onSubmit={(e)=> handleSubmit(e)}>
              <label>Remote URL</label>
              <input
                type="text"
                placeholder="https://"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <p className="input-info">
                Example: https://www.youtube.com/watch?v=-_T9okcdgtw
              </p>
              <Btn children="Start conversion" primary={true} type={"submit"} />
            </Form>
            {loading ? <Spinner /> : null}
            {audioFile && (
            <audio controls style={{margin:"15px 0"}}>
              <source src={`${audioFile}`} type="audio/mpeg"/>
                Your browser does not support the audio element.
            </audio>
            )}
          </ContentItem>
          <ContentItem>
            <Heading
              tag="h2"
              text={"Audio recorded music to 432Hz converter"}
            />
            <Text>
              Use this tool to convert music to 432hz (Hertz). 432hz music is
              well known to increase well-being, is often said to sound better,
              be more harmonic, and have transcendental powers.
            </Text>
            <Records />
          </ContentItem>
        </Content>
        <Content className="content-img">
          <ImgWrap>
            <img src={Playlist} alt={"sound"} />
          </ImgWrap>
        </Content>
      </ContentWrap>
    </Wrapper>
  );
};

export default HomePage;
