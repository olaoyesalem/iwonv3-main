import CryptoJS from "crypto-js";

export default function descrypt(encrypted?: string, secret?: string) {
  const password = secret || "enteryoursecretj23jh9023jnsdpasswordforencrypted";
  if (!encrypted || !password)
    return "Encrypted data and password are required.";

  // Decrypt the string using AES decryption and the password
  const bytes = CryptoJS.AES.decrypt(encrypted, password);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);

  if (!decrypted) {
    throw new Error("Decryption failed");
  }

  return decrypted;
}
