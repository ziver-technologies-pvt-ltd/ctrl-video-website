import { revalidateTag } from 'next/cache';
import { createHmac, timingSafeEqual } from 'crypto';

export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return Response.json({ error: 'REVALIDATE_SECRET not set' }, { status: 500 });
  }

  const body = await req.text();
  const signature = req.headers.get('x-hub-signature-256') || '';

  const hmac = createHmac('sha256', secret);
  const expectedSig = 'sha256=' + hmac.update(body).digest('hex');

  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSig);

  if (sigBuffer.length !== expectedBuffer.length || !timingSafeEqual(sigBuffer, expectedBuffer)) {
    return Response.json({ error: 'Invalid HMAC signature' }, { status: 401 });
  }

  try {
    const payload = JSON.parse(body);
    if (payload.action === 'published' || payload.action === 'released') {
      revalidateTag('release', { expire: 0 });
      return Response.json({
        revalidated: true,
        tag: payload.release?.tag_name,
        timestamp: Date.now(),
      });
    }
    return Response.json({ ignored: true, action: payload.action });
  } catch {
    return Response.json({ error: 'Failed to process webhook payload' }, { status: 400 });
  }
}
