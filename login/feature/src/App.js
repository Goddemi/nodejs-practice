import "./App.css";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <form
        onSubmit={() => {
          const response = axios.post("/login", {
            id: "lee19hi",
            pwd: "1234",
          });
          console.log(response);
        }}
      >
        <div>
          <input name="id" />
        </div>
        <div>
          <input name="pwd" />
        </div>
        <button>버튼</button>
      </form>
    </div>
  );
}

export default App;
