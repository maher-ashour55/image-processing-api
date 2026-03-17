# Image Processing API

A RESTful API built with Node.js, Express, and TypeScript that resizes images on-the-fly using the Sharp library.

## Features

- Resize images by specifying width and height via query parameters
- Caches resized images to avoid redundant processing
- Built with TypeScript for type safety
- Tested with Jasmine

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
npm install
```

### Build

```bash
npm run build
```

### Run

```bash
npm start
```

The server will start on `http://localhost:3000`

### Development (with hot reload)

```bash
npm run dev
```

## API Usage

### Resize an Image

```
GET /api/images?filename={name}&width={w}&height={h}
```

**Parameters:**

| Parameter  | Type   | Description                  |
| ---------- | ------ | ---------------------------- |
| `filename` | string | Image name without extension |
| `width`    | number | Desired width in pixels      |
| `height`   | number | Desired height in pixels     |

**Example:**

```
http://localhost:3000/api/images?filename=fjord&width=300&height=300
```

**Responses:**

- `200` — Returns the resized image
- `400` — Missing parameters
- `404` — Image not found
- `500` — Processing error

## Available Images

Place `.jpg` images in the `images/full/` directory. Resized versions are automatically saved to `images/thumb/`.

## Scripts

| Command          | Description                      |
| ---------------- | -------------------------------- |
| `npm run build`  | Compile TypeScript to JavaScript |
| `npm start`      | Start the production server      |
| `npm run dev`    | Start development server         |
| `npm test`       | Run Jasmine tests                |
| `npm run lint`   | Run ESLint                       |
| `npm run format` | Format code with Prettier        |

## Testing

```bash
npm test
```

Expected output:

```
2 specs, 0 failures
```

## Project Structure

```
image-processing-api/
├── src/
│   ├── index.ts              # Express server entry point
│   ├── routes/
│   │   └── images.ts         # Image resize route
│   ├── utilities/
│   │   └── resize.ts         # Sharp image processing logic
│   ├── helpers/
│   │   └── ts-node-helper.mjs
│   └── tests/
│       ├── resizeSpec.ts     # Unit tests for resize function
│       └── serverSpec.ts     # API endpoint tests
├── images/
│   ├── full/                 # Original images
│   └── thumb/                # Cached resized images
├── dist/                     # Compiled JavaScript output
├── jasmine.json
├── tsconfig.json
└── package.json
```

## Built With

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sharp](https://sharp.pixelplumbing.com/)
- [Jasmine](https://jasmine.github.io/)
