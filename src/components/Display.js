import { useNavigate } from "react-router-dom";

const Display = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("login");
  };
  const handleSignUp = () => {
    navigate("signup");
  };
  return (
    <div>
      <div
        className="title"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <button className="button signup-button" onClick={handleSignUp}>
            Signup
          </button>
          <button className="button login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
      <div>
        <h2>
          HoloFlash is an online tool to help you turn your notes or lectures
          into flashcards. You can practice these flashcards on the website or
          on the HoloLens
        </h2>
      </div>
    </div>
  );
};

export default Display;
