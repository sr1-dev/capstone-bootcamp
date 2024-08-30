import React, { useState } from "react";
import styles from "../styles/ImageGenerator.module.css";
import Header from "./Header";
import InputForm from "./InputForm";
import ImageGrid from "./ImageGrid";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateClick = (newPrompt) => {
    if (!newPrompt || isGenerating) return;
    setPrompt(newPrompt);
    setIsGenerating(true);
  };

  const handleGenerationComplete = () => {
    setIsGenerating(false);
  };

  return (
    <>
      <div className={styles.backgroundContainer}></div>
      <div className={styles.container}>
        <Header />
        <InputForm
          onGenerate={handleGenerateClick}
          isGenerating={isGenerating}
        />
        <ImageGrid
          prompt={prompt}
          isGenerating={isGenerating}
          onGenerationComplete={handleGenerationComplete}
        />
      </div>
    </>
  );
};

export default ImageGenerator;
