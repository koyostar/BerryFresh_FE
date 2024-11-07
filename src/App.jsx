import "./App.css";
import { Cloudinary } from "@cloudinary/url-gen";
import Shop from "./pages/Shop";

function App() {
  const cld = new Cloudinary({ cloud: { cloudName: "dxsr7tutn" } });

  return (
    <>
      <div>
        <h1>Berry Fresh</h1>
        <Shop />
      </div>
    </>
  );
}

export default App;
