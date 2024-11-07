import "./App.css";
import { Cloudinary } from "@cloudinary/url-gen";
import AddProduct from "./components/AddProduct";

function App() {
  const cld = new Cloudinary({ cloud: { cloudName: "dxsr7tutn" } });

  return (
    <>
      <div>
        <h1>Berry Fresh</h1>
        <AddProduct />
      </div>
    </>
  );
}

export default App;
