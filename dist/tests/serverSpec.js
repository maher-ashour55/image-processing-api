import supertest from "supertest";
import app from "../index.js";
const request = supertest(app);
describe("GET /api/images", () => {
  it("should return 200 and an image for valid parameters", async () => {
    const response = await request.get(
      "/api/images?filename=fjord&width=200&height=200",
    );
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("image");
  });
  it("should return 400 when filename is missing", async () => {
    const response = await request.get("/api/images?width=200&height=200");
    expect(response.status).toBe(400);
  });
  it("should return 400 when width is missing", async () => {
    const response = await request.get("/api/images?filename=fjord&height=200");
    expect(response.status).toBe(400);
  });
  it("should return 400 when height is missing", async () => {
    const response = await request.get("/api/images?filename=fjord&width=200");
    expect(response.status).toBe(400);
  });
  it("should return 400 for invalid width (non-number)", async () => {
    const response = await request.get(
      "/api/images?filename=fjord&width=abc&height=200",
    );
    expect(response.status).toBe(400);
  });
  it("should return 400 for negative dimensions", async () => {
    const response = await request.get(
      "/api/images?filename=fjord&width=-100&height=200",
    );
    expect(response.status).toBe(400);
  });
  it("should return 404 for non-existent image", async () => {
    const response = await request.get(
      "/api/images?filename=nonexistent&width=200&height=200",
    );
    expect(response.status).toBe(404);
  });
});
