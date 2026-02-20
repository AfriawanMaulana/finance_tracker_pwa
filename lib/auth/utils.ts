import crypto from "crypto";

const SESSION_COOKIE = "terfinance_session";

function sha256(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function generateToken() {
  return crypto.randomBytes(32).toString("base64url");
}

export { SESSION_COOKIE, sha256, generateToken };
