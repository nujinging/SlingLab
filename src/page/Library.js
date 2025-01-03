import './../scss/library.scss'
import HomeFooter from "../components/HomeFooter";
import Title from "../components/Title";
import {memebookApi} from "../util/memebookApi";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {debounce} from 'lodash';

export default function Word() {
  const [pageNumber, setPageNumber] = useState(1);
  const [libraryData, setLibraryData] = useState();

  useEffect(() => {
    async function libraryList() {
      try {
        const libraryApi = await memebookApi.wordList('ALL', pageNumber);
        setLibraryData(libraryApi.data.data.content);
        console.log(libraryData);
      } catch (error) {
        console.log(error)
      }
    }
    libraryList();
  }, []);


  const pageMore = debounce(() => {
    const nextPage = pageNumber + 1;
    const PageData = async () => {
      try {
        const libraryApi = await memebookApi.wordList('KOR', nextPage);
        setLibraryData((prevLibraryData) => [...prevLibraryData, ...libraryApi.data.data.content]);
      } catch (error) {
        console.log(error)
      }
    };
    setPageNumber(nextPage);
    PageData();
  }, 500);


  return (
    <div className="library_wrap">
      <div className="word_tab">
        <div className="tab_item active">줄임말</div>
        <div className="tab_item">자주쓰는</div>
      </div>
      <div className="word_wrap">
        <ul className="word_list">
          {
            libraryData?.map((item, idx) => {
              return (
                <li>
                  <Link to={`/word/${item.wordIdx}`} className="item" key={idx}>{item.wordContent}</Link>
                </li>
              )
            })
          }
        </ul>
        <button type="button" onClick={pageMore}>더보기</button>
      </div>

      <HomeFooter></HomeFooter>
    </div>
  );
}

