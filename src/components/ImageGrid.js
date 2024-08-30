import React from "react";
import styles from "../styles/ImageGenerator.module.css";
import ImageComponent from "./ImageComponent";
import { placeholderImages } from "../utils/placeholders";

const ImageGrid = ({ prompt, isGenerating, onGenerationComplete }) => (
  <div className={styles.images}>
    {placeholderImages.map((placeholder, index) => (
      <ImageComponent
        key={index}
        placeholder={placeholder}
        prompt={prompt}
        isGenerating={isGenerating}
        onGenerationComplete={() => {
          if (index === placeholderImages.length - 1) {
            onGenerationComplete();
          }
        }}
      />
    ))}
  </div>
);

export default ImageGrid;
