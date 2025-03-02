import CryptoJS from "crypto-js";

export default function encrypt(text?: string, secret?: string) {
  const password = secret || "enteryoursecretj23jh9023jnsdpasswordforencrypted";
  if (!text || !password) return "Text and password are required";

  // Encrypt the string using AES encryption and the password
  return CryptoJS.AES.encrypt(text, password).toString();
}
