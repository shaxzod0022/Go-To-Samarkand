export function getOrCreateVisitorId() {
  const cookieName = "visitor_id";
  const match = document.cookie.match(
    new RegExp("(^| )" + cookieName + "=([^;]+)")
  );

  if (match) {
    return match[2];
  } else {
    const newId = crypto.randomUUID(); // Yangi UUID
    document.cookie = `${cookieName}=${newId}; path=/; max-age=${
      60 * 60 * 24 * 365
    }`; // 1 yil
    return newId;
  }
}
