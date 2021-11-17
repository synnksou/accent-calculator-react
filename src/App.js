import "./App.css";
import { useState } from "react";
import { getColorPalette } from "./utils/index";

const App = () => {
  const [color, setColor] = useState("");
  const [palette, setPalette] = useState([]);
  const handleChangeColor = (event) => setColor(event.target.value);

  const handleBuildPalette = async () => {
    setPalette(getColorPalette(color));
  };
  return (
    <div className="App">
      <div
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <label>Color in HEX : </label>
        <input type="text" value={color} onChange={handleChangeColor} />
        <button type="button" onClick={handleBuildPalette}>
          GO
        </button>
      </div>
      <div
        style={{
          float: "left",
          /* width: 50%; */
          display: "flex",
          flex: "50%",
          flexDirection: "row",
        }}
      >
        Palette :
        {palette?.map((colorHex, index) => (
          <div>
            {console.log(colorHex, index)}
            <div
              style={{
                background: colorHex[index * 100],
                width: "100%",
                paddingTop: "75%",
                minHeight: 97,
                minWidth: 127,
              }}
            ></div>
            <label>{colorHex[index * 100]}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
