export const generateImage = async (prompt) => {
  const encodedPrompt = encodeURIComponent(prompt);
  const seed = Math.floor(Math.random() * 1000);
  const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?model=flux&width=1280&height=720&seed=${seed}&nologo=true&enhance=true`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Error generating image");
  }
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};
