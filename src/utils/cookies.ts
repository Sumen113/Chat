export const setUserCookie = (name: string) => {
  document.cookie = `userName=${encodeURIComponent(name)};path=/;max-age=${
    30 * 24 * 60 * 60
  }`; // 30 days
};

export const getUserFromCookie = (): string | null => {
  const match = document.cookie.match(/userName=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};
