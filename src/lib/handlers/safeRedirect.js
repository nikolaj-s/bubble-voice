export const safeRedirect = (value) => {
    // prevent open redirects — only allow same-origin app paths
    if (!value || typeof value !== "string") return "/";
    if (!value.startsWith("/")) return "/";
    // optional: forbid auth routes to avoid loops
    if (value.startsWith("/login") || value.startsWith("/signup")) return "/";
    return value;
};

