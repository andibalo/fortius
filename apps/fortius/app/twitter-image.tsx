// Twitter requires its own route — reuse the same OG image output.
// Next.js needs `runtime` to be exported directly (not re-exported) for builds.
import opengraphImage, { alt, contentType, size } from './opengraph-image';

export const runtime = 'edge';

export { alt, contentType, size };
export default opengraphImage;
