//@ts-nocheck
import type { NextPage } from 'next'
import Script from 'next/script'

const Home: NextPage = () => {

  const apiKey = "TOKEN_HERE";

  const getJWT = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `ApiKey ${apiKey}`,
      },
    };
    const endpoint = "https://api-homolog.nxcd.app/auth-jwt";
    const response = await fetch(endpoint, requestOptions);
    const token = await response.json();

    return token.accessToken;
  }

  const success = (response) => {
    let payload = {
      isAlive: response.data.isAlive,
      imageData: response.base64
    };

    console.log(payload);
  }

  const error = (err) => {
    alert("B");
    console.log(err);
  }

  return (
    <>
      
      <div id="video-wrapper"></div>
      
      <Script
        src="./dist/v5.1/liveness.js"

        onLoad={async () => {
          const jwt = await getJWT();

          const config = {
            width: window.innerWidth / 1.9,
            token: jwt,
            isDebug: false,
            faceapiPath:
              "https://cdn.jsdelivr.net/gh/nextcodebr/liveness-sdk-web-sample/libs/",
            livenessUrlBase: "https://api-homolog.nxcd.app",
            livenessConfirmEndpoint: "",
            successCallback: success,
            errorCallback: error,
            isShowPreview: true,
            brightnessControl: 108,
            luminanceControl: 23,
          };

          const videoWrapper = document.getElementById('video-wrapper');
          
          window.liveness = new Liveness(videoWrapper, config);
          window.liveness.setFrameBoxesWidth(0.52, 0.78, 0.57);
          window.liveness.setEyesBoxHeight(100);
          
          window.liveness.start();

          console.log(videoWrapper);
        }}
        onError={(err) => {
          console.log(err);
        }}
      />
    </>
  )
}

export default Home
