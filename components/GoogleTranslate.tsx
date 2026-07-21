"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useApp } from "@/components/AppProvider";

declare global {
  interface Window {
    google?: { translate?: { TranslateElement: new (opts: object, id: string) => void } };
    googleTranslateElementInit?: () => void;
  }
}

// Google Translate rewrites text nodes directly in the DOM, which can race
// with React's own reconciliation (React tries to removeChild/insertBefore a
// node Google already moved) and crash the app. This is the standard guard:
// no-op instead of throwing when the node isn't actually where React expects.
function patchDomForGoogleTranslate() {
  if ((window as unknown as { __gtDomPatched?: boolean }).__gtDomPatched) return;
  (window as unknown as { __gtDomPatched?: boolean }).__gtDomPatched = true;

  const origRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (this: Node, child) {
    if (child.parentNode !== this) return child;
    return origRemoveChild.call(this, child);
  } as typeof Node.prototype.removeChild;

  const origInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (this: Node, newNode, refNode) {
    if (refNode && refNode.parentNode !== this) return newNode;
    return origInsertBefore.call(this, newNode, refNode);
  } as typeof Node.prototype.insertBefore;
}

function findCombo(): HTMLSelectElement | null {
  return document.querySelector<HTMLSelectElement>(".goog-te-combo");
}

// value "" restores the original (English) text, "ur" translates to Urdu
function applyTranslation(target: "en" | "ur"): boolean {
  const combo = findCombo();
  if (!combo) return false;
  combo.value = target === "ur" ? "ur" : "";
  combo.dispatchEvent(new Event("change"));
  return true;
}

export default function GoogleTranslate() {
  const { lang, hydrated } = useApp();
  const pathname = usePathname();
  const initedRef = useRef(false);

  // load the widget once
  useEffect(() => {
    patchDomForGoogleTranslate();
    if (initedRef.current || document.getElementById("google-translate-script")) return;
    initedRef.current = true;

    window.googleTranslateElementInit = () => {
      new window.google!.translate!.TranslateElement(
        { pageLanguage: "en", includedLanguages: "ur", autoDisplay: false },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // (re)apply translation whenever the language toggle or route changes —
  // the retry loop covers the widget not being ready yet on first load
  useEffect(() => {
    if (!hydrated) return;
    const target = lang === "ur" ? "ur" : "en";
    let tries = 0;
    const iv = setInterval(() => {
      if (applyTranslation(target) || ++tries > 30) clearInterval(iv);
    }, 200);
    return () => clearInterval(iv);
  }, [lang, hydrated, pathname]);

  return (
    <>
      <div id="google_translate_element" style={{ position: "fixed", top: -9999, left: -9999, height: 0, overflow: "hidden" }} />
      <style>{`
        .goog-te-banner-frame, .goog-te-gadget-icon, .goog-tooltip, .goog-tooltip:hover, .skiptranslate iframe { display: none !important; }
        body { top: 0 !important; }
        .goog-text-highlight { background: none !important; box-shadow: none !important; }
        font { font-family: inherit !important; }
      `}</style>
    </>
  );
}
