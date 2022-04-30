# Three.js Journey

## Topics Covered

- Various kinds of textures (Metal, ROughness, Alpha, AmbienceOcculsion etc)
- PBR

  - https://marmoset.co/posts/basic-theory-of-physically-based-rendering/
  - https://marmoset.co/posts/physically-based-rendering-and-you-can-too/

- How to load texture
  - Manual
  - Texture Loader, textureLoader Callbacks
  - LoadingManager
- UV Unwrapping
- Transformation
- Filtering and mipmapping
- Texture Format and Optimizing 1:02:38

  - Size Should be power of 2, e.g. 1024x1024, 512x512, 8x8
  - jpg or png.. Normals usually png

- Where to find texture
  - some website link
  - Create: Photoshop, Substance Designer

## Setup

Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

```bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```
