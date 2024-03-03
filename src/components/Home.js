const Home = () => {
  return (
    <div className="App">
      <div>
        <span
          style={{
            marginLeft: "5%",
            marginRight: "50%",
            fontSize: "150%",
            marginTop: "20px",
          }}
        >
          Upload your notes or lectures here
        </span>
        <input
          style={{
            width: "75%",
            height: "375px",
            textalign: "center",
            fontSize: "100px",
          }}
          type="File"
          placeholder="Select File"
        />
      </div>

      {/* {RenderCards()} */}
    </div>
  );
};

export default Home;
