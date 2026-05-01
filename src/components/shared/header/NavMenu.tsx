"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { handleHomeHashAnchorClick } from "@/utils/homeHashLink";

/**
 * Next.js інколи змінює hash без події hashchange. Додатково слухаємо popstate
 * і після кліку по посиланню з # перечитуємо hash у наступному кадрі.
 */
function subscribeToHash(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const notify = () => onStoreChange();
  const notifyAfterNav = () =>
    requestAnimationFrame(() => {
      onStoreChange();
    });
  window.addEventListener("hashchange", notify);
  window.addEventListener("popstate", notify);
  const onClickCapture = (e: MouseEvent) => {
    const a = (e.target as Element | null)?.closest?.("a");
    const href = a?.getAttribute("href");
    if (!href?.includes("#")) return;
    notifyAfterNav();
  };
  document.addEventListener("click", onClickCapture, true);
  return () => {
    window.removeEventListener("hashchange", notify);
    window.removeEventListener("popstate", notify);
    document.removeEventListener("click", onClickCapture, true);
  };
}

function getHashSnapshot() {
  return typeof window !== "undefined" ? window.location.hash : "";
}

export type NavSubmenuItem = {
  title: string;
  slug: string;
};

export type NavMenuItem = {
  title: string;
  slug?: string;
  submenu?: NavSubmenuItem[];
};

export const navMenuList: NavMenuItem[] = [
  { title: "Hjem", slug: "/#hero" },
  { title: "Services", slug: "/services" },
  { title: "Gavekort", slug: "/gavekort" },
  {
    title: "Åbningstider",
    slug: "/#opening-hours",
  },
  { title: "Om os", slug: "/#about" },
];

/** Визначає активний пункт десктоп-меню за pathname і hash (якорі як у `navMenuList` і `id` секцій). */
export function getActiveIndex(pathname: string, hash: string): number {
  if (pathname === "/services" || pathname.startsWith("/services/")) {
    return 1;
  }
  if (pathname === "/gavekort" || pathname.startsWith("/gavekort/")) {
    return 2;
  }
  if (pathname === "/" || pathname === "") {
    if (hash === "__PENDING_HASH__") return -1;
    const h = hash && !hash.startsWith("#") ? `#${hash}` : hash;
    if (h === "#opening-hours") return 3;
    if (h === "#about") return 4;
    return 0;
  }
  return 0;
}

export default function NavMenu() {
  const pathname = usePathname();
  const [isHashReady, setIsHashReady] = useState(false);
  const urlHash = useSyncExternalStore(
    subscribeToHash,
    getHashSnapshot,
    () => "",
  );
  useEffect(() => {
    setIsHashReady(true);
  }, []);
  const activeIndex = getActiveIndex(
    pathname,
    isHashReady ? urlHash : "__PENDING_HASH__",
  );
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pillActiveIndex = activeIndex;

  const prevPathname = useRef(pathname);
  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;
    queueMicrotask(() => setSolutionsOpen(false));
  }, [pathname]);

  useEffect(() => {
    if (!solutionsOpen) return;
    const close = () => setSolutionsOpen(false);
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        navRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      )
        return;
      close();
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [solutionsOpen]);

  const solutionsItem = navMenuList[2];
  const isSolutionsActive = pillActiveIndex === 2;

  return (
    <nav
      ref={navRef}
      className="hidden lg:flex relative my-2 p-2 rounded-full bg-[linear-gradient(270.67deg,_#F2F2F2_-9.58%,_#C7C7C7_103.45%)_1] backdrop-blur-[10px]"
    >
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "linear-gradient(270.67deg, #F2F2F2 -9.58%, #C7C7C7 103.45%)",
          padding: "1px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <ul className="relative z-10 flex items-center xl:gap-3 list-none">
        {navMenuList.map((item, i) => (
          <li
            key={item.title}
            className={`flex ${item.slug ? "relative z-20" : "relative z-10"}`}
          >
            {item.slug ? (
              <Link
                href={item.slug}
                onClick={(e) => {
                  setSolutionsOpen(false);
                  handleHomeHashAnchorClick(e, pathname);
                }}
                aria-current={pillActiveIndex === i ? "page" : undefined}
                className={`relative z-10 px-4.5 py-3 rounded-full font-montserrat text-[14px] font-normal leading-[120%] outline-none border border-transparent transition-[color,border,background-color] duration-300 ease-out focus:outline-none focus-visible:border-beige xl:hover:border-beige ${pillActiveIndex === i ? "bg-beige text-black" : "bg-transparent text-beige xl:hover:brightness-125"}`}
              >
                {item.title}
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setSolutionsOpen((prev) => !prev)}
                  className={`cursor-pointer relative z-10 flex items-center px-4.5 py-3 rounded-full text-[14px] font-medium leading-[120%] border border-transparent transition-[color,border,background-color] duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-transparent xl:hover:border-black text-black ${isSolutionsActive ? "bg-beige" : "bg-transparent"} ${!isSolutionsActive ? "xl:hover:brightness-125" : ""}`}
                  aria-expanded={solutionsOpen}
                  aria-haspopup="true"
                >
                  {item.title}
                </button>
                {/* Solutions dropdown */}
                <div
                  ref={dropdownRef}
                  className="absolute left-0 top-full mt-4 min-w-[220px] rounded-[18px] bg-[linear-gradient(90.95deg,rgba(231,231,231,0.8)_52.25%,rgba(255,255,255,0.8)_99.18%)] shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px] transition duration-200 ease-out z-50"
                  style={{
                    opacity: solutionsOpen ? 1 : 0,
                    transform: solutionsOpen
                      ? "translateY(0) scale(1)"
                      : "translateY(-8px) scale(0.98)",
                    pointerEvents: solutionsOpen ? "auto" : "none",
                    visibility: solutionsOpen ? "visible" : "hidden",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-[18px] pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(270.67deg, #F2F2F2 -9.58%, #C7C7C7 103.45%)",
                      padding: "1px",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />
                  <ul className="py-2">
                    {solutionsItem.submenu?.map((sub) => (
                      <li key={sub.slug}>
                        <Link
                          href={sub.slug}
                          onClick={(e) => {
                            setSolutionsOpen(false);
                            handleHomeHashAnchorClick(e, pathname);
                          }}
                          className="block px-5 py-2.5 text-sm font-medium transition-colors xl:hover:brightness-125 xl:hover:bg-black/5"
                        >
                          {sub.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
