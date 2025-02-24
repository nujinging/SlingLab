import '../scss/components/layerHeader.scss'

function LayerHeader() {
  return (
    <div className="layer_header">
      <a href="" className="btn_back">
        <span className="blind">뒤로가기</span>
      </a>
      <h1 className="tit">단어 등록</h1>
    </div>
  );
}

export default LayerHeader;
