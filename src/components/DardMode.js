
export default function DarkMode({darkModeCheck}) {
  return (
    <div className="dark_mode_box">
      <input type="checkbox" id="toggle" onChange={darkModeCheck}/>
      <label htmlFor="toggle" className="dark_mode_switch" >
        <div className="circle"></div>
      </label>
    </div>
  )
}
