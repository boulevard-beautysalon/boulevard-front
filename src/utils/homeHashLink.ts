import type { MouseEvent } from "react";

/**
 * Клік по посиланню на `/#…` з головної: якщо URL уже містить той самий hash,
 * браузер не скролить повторно — робимо scrollIntoView і replaceState.
 */
export function handleHomeHashAnchorClick(
  e: MouseEvent<HTMLAnchorElement>,
  currentPathname: string,
): void {
  const href = e.currentTarget.getAttribute("href");
  if (!href?.includes("#")) return;

  let url: URL;
  try {
    url = new URL(
      href,
      typeof window !== "undefined" ? window.location.origin : "http://localhost",
    );
  } catch {
    return;
  }

  const targetPath = url.pathname === "" ? "/" : url.pathname;
  const hash = url.hash;
  if (!hash) return;

  const isHome = currentPathname === "/" || currentPathname === "";
  const targetsHome = targetPath === "/";
  if (!isHome || !targetsHome) return;

  e.preventDefault();

  const id = decodeURIComponent(hash.slice(1));
  if (!id) return;

  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  window.history.replaceState(null, "", `/${hash}`);
}
