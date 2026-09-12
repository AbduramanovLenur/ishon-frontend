export const dataUrlToFile = (dataUrl: string, filename: string): File => {
  const [header, base64] = dataUrl.split(",");
  const mime = header.split(":")[1].split(";")[0];
  const binary = atob(base64);
  const array = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }

  return new File([new Blob([array], { type: mime })], filename, {
    type: mime,
  });
};
