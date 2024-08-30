import React, { useState, useEffect, useCallback } from "react";
import styles from "../styles/ImageComponent.module.css";
import { generateImage } from "../utils/api";

const ImageComponent = ({
  placeholder,
  prompt,
  isGenerating,
  onGenerationComplete,
}) => {
  const [image, setImage] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImage = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const newImage = await generateImage(prompt);
      setImage(newImage);
    } catch (err) {
      setError("Error in generating image");
    } finally {
      setIsLoading(false);
      onGenerationComplete();
    }
  }, [prompt, onGenerationComplete]);

  useEffect(() => {
    if (isGenerating) {
      fetchImage();
    }
  }, [isGenerating, fetchImage]);

  return (
    <div className={styles.imageWrapper}>
      {isLoading ? (
        <div className={styles.skeleton}></div>
      ) : (
        <>
          <img src={image} alt="Generated" className={styles.image} />
          {image !== placeholder && (
            <button
              className={styles.refetchButton}
              onClick={fetchImage}
              disabled={isLoading}
            >
              Refetch
            </button>
          )}
        </>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default ImageComponent;
