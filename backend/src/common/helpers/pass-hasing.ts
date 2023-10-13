import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const passwordHashing = async (password: string): Promise<string> => {
  const result = await bcrypt.hash(password, SALT_ROUNDS);
  return result;
};

const passwordCompare = async (
  password: string,
  passwordHash: string
): Promise<boolean> => {
  const matched = await bcrypt.compare(password, passwordHash);

  return matched;
};

export { passwordHashing, passwordCompare };
