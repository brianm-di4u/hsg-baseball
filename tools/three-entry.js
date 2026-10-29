// Entry for the vendored three.js bundle (see tools/build-vendor.mjs). Only what the 3D view uses.
export * from 'three';
export { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
export { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';
export { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
