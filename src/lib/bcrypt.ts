import bcrypt from "bcrypt";

async function hashString(input: string) {
  return await bcrypt.hash(input, 10);
}

function hashPassword(password: string) {
  password = password.trim();
  return bcrypt.hashSync(password, 10);
}

function verifyPassword(userPassword: string, password: string) {
  password = password.trim();
  return bcrypt.compareSync(password, userPassword);
}

export { hashString, hashPassword, verifyPassword };
