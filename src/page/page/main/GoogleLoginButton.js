import React from 'react';
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import axios from "axios";

const GoogleLoginButton = () => {
  const clientId = "";

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={credentialResponse => {
            const userIdx = credentialResponse.credential;
            const loinRequest = async () => {
              try {
                const response = await axios.post('https://memebook.co.kr/auth/login', {
                  "code": userIdx
                });
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("memberIdx", response.data.memberIdx);
                window.location.replace("/")

              } catch (error) {
                console.error(error);
              }
            };
            loinRequest();
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
}

export default GoogleLoginButton;