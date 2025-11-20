import jwt from 'jsonwebtoken';

const JWT_SECRET = 'asdfIuasdf98asdf19ISDFofarnkasdlfs';

interface JWTPayload {
  sub: string;
  user: string;
  role: string;
  exp: number;
}

export function generateJWTToken(): string {
  const payload: JWTPayload = {
    sub: 'test@sentient.internal',
    user: 'test@sentient.internal',
    role: 'sentapp',
    exp: 1763635868,
  };

  return jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256' });
}
