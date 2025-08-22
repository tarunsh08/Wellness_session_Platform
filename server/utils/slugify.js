export default function slugify(input) {
    const base = (input || "")
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    const rand = Math.random().toString(36).slice(2, 7);
    return `${base}-${rand}`;
  }
  