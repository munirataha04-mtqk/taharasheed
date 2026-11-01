import { cookies } from "next/headers";
import crypto from "crypto";

export const cookieName = "admin_session";

const secret = () => process.env.SESSION_SECRET || "";

function sign(value: string) {
  return crypto.createHmac("sha256", secret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

export function passwordConfigured() {
  return !!process.env.ADMIN_PASSWORD && !!process.env.SESSION_SECRET;
}

export function checkPassword(input: string) {
  const real = process.env.ADMIN_PASSWORD || "";
  return real.length > 0 && safeEqual(input, real);
}

export const passwordMatches = checkPassword;

export function makeToken() {
  const exp = String(Date.now() + 7 * 24 * 60 * 60 * 1000);
  return `${exp}.${sign(exp)}`;
}

export function validToken(token?: string) {
  if (!token || !secret()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !safeEqual(sig, sign(exp))) return false;
  return Number(exp) > Date.now();
}

export async function isAuthed() {
  const jar = await cookies();
  return validToken(jar.get(cookieName)?.value);
}