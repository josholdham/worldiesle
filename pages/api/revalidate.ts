import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
  date: Date;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('Revalidating...', req.query.secret);
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.WORLDIESLE_SECRET) {
    return res
      .status(401)
      .json({ message: 'Invalid token', date: new Date() });
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate('/');
    return res.json({ message: 'Re-validated', date: new Date() });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.log('errror');
    console.log(err);
    return res
      .status(500)
      .send({ message: 'Error revalidating!', date: new Date() });
  }
}
