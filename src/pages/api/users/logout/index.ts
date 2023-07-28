import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function logout(req: NextApiRequest, res: NextApiResponse) {

  try {
    if(req.method === 'GET'){
    // Clear the token from cookies
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(0),
    };

    res.setHeader('Set-Cookie', serialize('token', '', cookieOptions));

    // Clear the token from headers
    res.setHeader('Authorization', '');

    return res.status(200).json({
      status: 'success',
      message: 'Logout Success',
    });
}
  } catch (error) {
    return res.status(500).json({ status: 'error', error });
  }
}
