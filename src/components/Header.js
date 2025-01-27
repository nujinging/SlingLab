import '../scss/components/header.scss'
import {Link, useLocation} from "react-router-dom";
import React, {useState} from "react";
import {wordSearchData} from "../util/action/searchAction";
import {useDispatch, useSelector} from "react-redux";
import {debounce} from 'lodash';
import HomeNav from "./HomeNav";

export default function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const wordSearch = useSelector(state => state.meme.wordSearch);
  const [searchState, setSearchState] = useState(false);

  // 단어 검색
  const wordSearchApi = debounce((event) => {
    if (event.target.value.length > 0) {
      setSearchState(true);
      dispatch(wordSearchData(event.target.value));
    } else {
      setSearchState(false);
    }
  }, 500)

  return (
    <header className="header">

        <div className="container">
            <Link to="/main" className="logo">
                <span className="blind">memebook</span>
            </Link>

            <HomeNav type="main"></HomeNav>
            {
              !location.pathname.startsWith('/main') && (
                <div className="search_box">
                  <input type="text" className="search_input" placeholder="단어를 검색해보세요" onChange={wordSearchApi}/>

                  {
                    searchState && (
                      <ul className="search_list">
                        {
                          wordSearch?.wordList.length === 0 && (
                            <li className="list_none">
                              <span>검색에 맞는 단어가 없어요</span>
                            </li>
                          )
                        }
                        {
                          wordSearch?.wordList.length > 0 && wordSearch?.wordList.map((item) => {
                            return (
                              <li>
                                <Link to={`/vocabulary/wordInfo/${item.wordIdx}`}>
                                  {item.wordName}
                                </Link>
                              </li>
                            )
                          })
                        }
                      </ul>
                    )
                  }
                </div>
              )
            }
        </div>

    </header>
  )
}