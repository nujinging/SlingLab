// 위로 올리기
import {useEffect} from "react";
import {useLocation} from "react-router-dom";

export const commonEvent = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// 스크롤 상단
export const useTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

};
