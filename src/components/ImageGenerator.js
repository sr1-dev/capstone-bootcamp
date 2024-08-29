import React, { useState } from "react";
import styles from "./styles/ImageGenerator.module.css";
import placeholder1 from "../assets/image1.jpg";
import placeholder2 from "../assets/image2.jpg";
import placeholder3 from "../assets/image3.jpg";
import placeholder4 from "../assets/image4.jpg";

function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([
    { isLoading: false, src: placeholder1 },
    { isLoading: false, src: placeholder2 },
    { isLoading: false, src: placeholder3 },
    { isLoading: false, src: placeholder4 },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleGenerateClick = async () => {
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setImages(images.map((img) => ({ ...img, isLoading: true })));

    const encodedPrompt = encodeURIComponent(prompt);
    const seeds = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 1000),
    );

    let imagesLoaded = 0;
    seeds.forEach((seed, index) => {
      fetch(
        `https://image.pollinations.ai/prompt/${encodedPrompt}?model=flux&width=1280&height=720&seed=${seed}&nologo=true&enhance=true`,
      )
        .then((response) => response.blob())
        .then((blob) => {
          const imageObjectURL = URL.createObjectURL(blob);
          setImages((currentImages) => {
            const newImages = [...currentImages];
            newImages[index] = { isLoading: false, src: imageObjectURL };
            return newImages;
          });
          imagesLoaded++;
          if (imagesLoaded === seeds.length) {
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
          setImages((currentImages) => {
            const newImages = [...currentImages];
            newImages[index] = {
              isLoading: false,
              src: currentImages[index].src,
            };
          });
          imagesLoaded++;
          if (imagesLoaded === seeds.length) {
            setIsLoading(false);
          }
        });
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>AI Image Generator</h1>
      <input
        className={styles.input}
        type="text"
        value={prompt}
        onChange={handleInputChange}
        placeholder="Type your prompt here..."
      />
      <button
        className={styles.button}
        onClick={handleGenerateClick}
        disabled={isLoading}
      >
        {isLoading ? "Crafting your masterpiece..." : "Generate Images"}
      </button>
      <div className={styles.images}>
        {images.map((img, index) => (
          <div key={index} className={styles.imageWrapper}>
            {img.isLoading ? (
              <div className={styles.skeleton}></div>
            ) : (
              <img src={img.src} alt="Generated" className={styles.image} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGenerator;
