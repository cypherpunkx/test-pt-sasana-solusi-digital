import speakyeasy from "speakeasy";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

function generateSecretOTP() {
  const secret = speakyeasy.generateSecret({
    length: 20,
  });
  const otpTokens = speakyeasy.totp({
    secret: secret.base32,
    encoding: "base32",
    digits: 6,
  });

  return {
    secret: secret.base32,
    otp: otpTokens,
  };
}

function verifySecretOTP(secret: string, otp: string) {
  const isValid = speakyeasy.totp.verify({
    secret,
    encoding: "base32",
    token: otp,
    window: 6,
  });

  return isValid;
}

export { generateOTP, generateSecretOTP, verifySecretOTP };
