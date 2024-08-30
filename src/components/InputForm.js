import React, { useState } from "react";
import styles from "../styles/ImageGenerator.module.css";

const InputForm = ({ onGenerate, isGenerating }) => {
  const [inputPrompt, setInputPrompt] = useState("");

  const handleInputChange = (e) => {
    setInputPrompt(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(inputPrompt);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        type="text"
        value={inputPrompt}
        onChange={handleInputChange}
        placeholder="Type your prompt here..."
      />
      <button className={styles.button} type="submit" disabled={isGenerating}>
        {isGenerating ? "Crafting your masterpiece..." : "Generate Images"}
      </button>
    </form>
  );
};

export default InputForm;
