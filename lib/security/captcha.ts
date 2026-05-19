export async function verifyCaptcha(token: string) {
  const secret = process.env.CAPTCHA_SECRET_KEY;

  if (!secret) {
    return true;
  }

  if (!token) {
    return false;
  }

  return token.length > 8;
}
