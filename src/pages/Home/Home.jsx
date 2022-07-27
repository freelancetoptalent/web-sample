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
const HomePage = () => {
 
  const [value, setValue ] = useState("");

  const handleSubmit = async (e) => {
    debugger
    e.preventDefault();
    debugger
    const data = await fetch("/.netlify/functions/youtubeUrl", 
    {
      method: "POST",
      body: JSON.stringify({url:value}),
    }
    );
    const results = await data.json()
    console.log(results)
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit․
              </p>
              <Btn children="Start conversion" primary={true} type={"submit"} />
            </Form>
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
