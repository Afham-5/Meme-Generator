import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
export default function Main() {
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemes, setAllMemes] = useState([]);
  const memeRef = useRef();
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        setAllMemes(data.data.memes);
      });
  }, []);
  function handleChange(event) {
    const { value, name } = event.currentTarget;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }
  function downloadmeme() {
    const memeElement = memeRef.current;
    html2canvas(memeElement, {
      useCORS: true, // Enables cross-origin image loading
      allowTaint: false,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "meme.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }
  function getNewMeme() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    setMeme((prevMeme) => ({
      ...prevMeme,
      imageUrl: allMemes[randomNumber].url,
    }));
  }
  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder="One does not simply"
            name="topText"
            onChange={handleChange}
            value={meme.topText}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder="Walk into Mordor"
            name="bottomText"
            onChange={handleChange}
            value={meme.bottomText}
          />
        </label>
        <button onClick={getNewMeme}>Get a new meme image 🖼</button>
      </div>
      <div className="meme" ref={memeRef}>
        <img src={meme.imageUrl} crossOrigin="anonymous" />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
      <button onClick={downloadmeme}>Download Meme</button>
    </main>
  );
}
