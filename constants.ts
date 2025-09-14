
import type { AspectRatio, LightingStyle, CameraPerspective } from './types';

export const ASPECT_RATIOS: AspectRatio[] = [
  { id: '1:1', label: '1:1', value: '1:1' },
  { id: '3:4', label: '3:4', value: '3:4' },
  { id: '4:3', label: '4:3', value: '4:3' },
  { id: '16:9', label: '16:9', value: '16:9' },
  { id: '9:16', label: '9:16', value: '9:16' },
];

export const LIGHTING_STYLES: LightingStyle[] = [
  { id: 'soft_studio', label: 'Soft Studio', description: 'Bright, soft, even studio lighting with minimal shadows, ideal for clear product showcases.' },
  { id: 'dramatic', label: 'Dramatic', description: 'High-contrast lighting with deep shadows and bright highlights to create a moody, cinematic feel.' },
  { id: 'natural_daylight', label: 'Natural Daylight', description: 'Warm, gentle light mimicking a sunny day, often with soft-focus backgrounds.' },
  { id: 'vibrant_commercial', label: 'Vibrant & Commercial', description: 'Bold, colorful, and glossy lighting with sharp focus, as seen in high-end advertisements.' },
  { id: 'backlit_glow', label: 'Backlit Glow', description: 'The primary light source is behind the product, creating a halo effect or silhouette that emphasizes its shape.' },
];

export const CAMERA_PERSPECTIVES: CameraPerspective[] = [
  { id: 'front_on', label: 'Front-On', description: 'A direct, eye-level shot straight on at the product.' },
  { id: 'high_angle', label: 'High Angle', description: 'Shot from above, looking down on the product, providing a top-down view.' },
  { id: 'low_angle', label: 'Low Angle', description: 'Shot from below, looking up at the product, making it appear larger and more imposing.' },
  { id: 'dutch_angle', label: 'Dutch Angle', description: 'The camera is tilted, creating a sense of unease, dynamism, or disorientation.' },
  { id: 'macro_close_up', label: 'Macro Close-Up', description: 'An extreme close-up shot that highlights small details and textures of the product.' },
];
