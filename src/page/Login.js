import React from 'react';
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";

export default function Login() {
  console.log()

  return (
    <div>
      <GoogleOAuthProvider clientId="">
        <GoogleLogin
          buttonText="Google로 로그인"
          onSuccess={(res) => {
            console.log(res)
          }}
          onError={()=> {
            console.log('실패');
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
}

