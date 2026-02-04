"use client";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "manafkemo@gmail.com";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "Keemooit_609";
const SESSION_KEY = "movix_admin_session";

export const auth = {
  login: (email: string, password: string): { success: boolean; error?: string } => {
    // Normalizing emails to handle typos (like gmial vs gmail)
    const normalizedInput = email.toLowerCase().replace("gmial.com", "gmail.com");
    const normalizedAdmin = ADMIN_EMAIL.toLowerCase();

    if (normalizedInput === normalizedAdmin && password === ADMIN_PASSWORD) {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ email: normalizedAdmin, time: Date.now() }));
      return { success: true };
    }
    return { success: false, error: "Invalid credentials. Unauthorized access restricted." };
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  getSession: (): { email: string } | null => {
    if (typeof window === "undefined") return null;
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) return null;
    try {
        return JSON.parse(session);
    } catch {
        return null;
    }
  }
};
