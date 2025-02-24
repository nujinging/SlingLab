import React from "react";
import Layout from "./page/Layout";
import {Route, Routes} from 'react-router-dom';
import Login from "./page/main/GoogleLoginButton";
import Main from "./page/main/Main";
import WordAdd from "./page/vocabulary/WordAdd";
import WordInfo from "./page/vocabulary/WordInfo";
import Vocabulary from "./page/vocabulary/Vocabulary";
import Community from "./page/community/Community";
import PostAdd from "./page/community/PostAdd";
import Profile from "./page/profile/Profile";
import PostInfo from "./page/community/PostInfo";
import MyAddList from "./page/profile/MyAddList";
import MyScrapeList from "./page/profile/MyScrapeList";
import MyPostList from "./page/profile/MyPostList";
import MyCommentList from "./page/profile/MyCommentList";
import './scss/common/common.scss';
import './scss/common/reset.scss';
import Intro from "./page/intro/Intro";


function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Main/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="/vocabulary/wordAdd/:id?/:word?" element={<WordAdd/>}/>
        <Route path="/vocabulary/wordInfo/:id" element={<WordInfo/>}/>
        <Route path="/vocabulary" element={<Vocabulary/>}/>
        <Route path="/community" element={<Community/>}/>
        <Route path="/community/postAdd/:id?" element={<PostAdd/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/community/postDetail/:id" element={<PostInfo/>}/>
        <Route path="/profile/myWordList" element={<MyAddList/>}/>
        <Route path="/profile/scrapList" element={<MyScrapeList/>}/>
        <Route path="/profile/myPostList" element={<MyPostList/>}/>
        <Route path="/profile/myCommentList" element={<MyCommentList/>}/>
      </Route>
      <Route path="/intro" element={<Intro/>}/>
    </Routes>
  );
}

export default App;

