import jwt from 'jsonwebtoken';

const JWT_SECRET = 'asdfIuasdf98asdf19ISDFofarnkasdlfs';

interface JWTPayload {
  sub: string;
  user: string;
  role: string;
  exp: number;
}

export function generateJWTToken(): string {
  const now = Math.floor(Date.now() / 1000);
  const expirationTime = now + (24 * 60 * 60); // Token valid for 24 hours

  const payload: JWTPayload = {
    sub: 'test@sentient.internal',
    user: 'test@sentient.internal',
    role: 'sentapp',
    exp: expirationTime,
  };

  return jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256' });
}
