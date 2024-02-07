import picture from "../IMG/dark.jpg";

export default function HeaderLogo() {
  return (
    <>
      <img src={picture} alt="logo" />
      <div className="social">
        <button
          onClick={() => {
            window.open("https://www.instagram.com/zimin.street/", "_blank");
          }}
        >
          Instagram
        </button>
        <button
          onClick={() => {
            window.open("https://www.facebook.com/zimin.box", "_blank");
          }}
        >
          Facebook
        </button>
        <button
          onClick={() => {
            window.open("https://www.youtube.com/@zimin8", "_blank");
          }}
        >
          Youtube
        </button>
        <button
          onClick={() => {
            window.open(
              "https://www.linkedin.com/in/iliya-zimin-790549138/",
              "_blank"
            );
          }}
        >
          linkedin
        </button>
      </div>
    </>
  );
}
