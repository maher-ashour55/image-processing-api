import sharp from "sharp";
import path from "path";
import fs from "fs";

const resizeImage = async (
  filename: string,
  width: number,
  height: number,
): Promise<string> => {
  const inputPath = path.resolve("images/full", `${filename}.jpg`);
  const outputPath = path.resolve(
    "images/thumb",
    `${filename}_${width}_${height}.jpg`,
  );

  if (!fs.existsSync(outputPath)) {
    await sharp(inputPath).resize(width, height).toFile(outputPath);
  }

  return outputPath;
};

export default resizeImage;
