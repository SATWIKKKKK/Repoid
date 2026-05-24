import { createApp } from '../server.js';

const appPromise = createApp({ listen: false });

function rewriteRequestUrl(request: any) {
  const url = new URL(request.url ?? '/', 'https://repoid.vercel.app');
  const pathSegments = url.searchParams.getAll('path');
  const joinedPath = pathSegments.join('/').replace(/^\/+/, '');
  if (!joinedPath) return;

  url.searchParams.delete('path');
  const pathname = `/api/${joinedPath}`;
  const search = url.searchParams.toString();
  request.url = `${pathname}${search ? `?${search}` : ''}`;
}

export default async function handler(request: any, response: any) {
  rewriteRequestUrl(request);
  const app = await appPromise;
  return app(request, response);
}
