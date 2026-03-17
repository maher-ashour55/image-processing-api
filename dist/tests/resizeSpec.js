import resizeImage from "../utilities/resize.js";
import fs from "fs";
import path from "path";
describe("Resize Function", () => {
  const thumbDir = path.resolve("images/thumb");
  // Clean up generated test images before each test
  beforeEach(() => {
    ["fjord_100_100.jpg", "fjord_200_150.jpg"].forEach((f) => {
      const p = path.join(thumbDir, f);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    });
  });
  it("should resize the image and save it to thumb folder", async () => {
    const output = await resizeImage("fjord", 100, 100);
    expect(fs.existsSync(output)).toBe(true);
  });
  it("should return correct output path", async () => {
    const output = await resizeImage("fjord", 100, 100);
    expect(output).toContain("fjord_100_100.jpg");
  });
  it("should resize with different dimensions", async () => {
    const output = await resizeImage("fjord", 200, 150);
    expect(fs.existsSync(output)).toBe(true);
    expect(output).toContain("fjord_200_150.jpg");
  });
  it("should use cached image if already exists", async () => {
    // First call creates the file
    const output1 = await resizeImage("fjord", 100, 100);
    const mtime1 = fs.statSync(output1).mtimeMs;
    // Second call should use cache (same mtime)
    const output2 = await resizeImage("fjord", 100, 100);
    const mtime2 = fs.statSync(output2).mtimeMs;
    expect(mtime1).toBe(mtime2);
  });
  it("should throw an error for non-existent image", async () => {
    await expectAsync(resizeImage("nonexistent", 100, 100)).toBeRejected();
  });
});
