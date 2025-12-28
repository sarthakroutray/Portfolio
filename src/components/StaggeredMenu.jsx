import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

const DEFAULT_COLORS = ["#151030", "#050816"];

/**
 * StaggeredMenu
 * - Renders an inline toggle button (for Navbar)
 * - Animates fixed sliding panel + background layers via GSAP
 */
export const StaggeredMenu = ({
  position = "right",
  colors = DEFAULT_COLORS,
  items = [],
  socialItems = [],
  displaySocials = false,
  displayItemNumbering = true,
  theme = "dark",
  className,
  menuButtonColor = "#fff",
  openMenuButtonColor = "#fff",
  changeMenuColorOnOpen = true,
  isFixed = true,
  accentColor = "#5227FF",
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const [overlayMounted, setOverlayMounted] = useState(false);

  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);

  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);

  const textInnerRef = useRef(null);
  const [textLines, setTextLines] = useState(["Menu", "Close"]);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const colorTweenRef = useRef(null);

  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);
  const openAnimStartedRef = useRef(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!plusH || !plusV || !icon || !textInner) return;

      gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0 });
      gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      gsap.set(textInner, { yPercent: 0 });

      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });

      // IMPORTANT: overlay is portaled + conditionally mounted.
      // We must re-initialize panel/layers every time the overlay mounts,
      // otherwise they can flash at xPercent=0 for a frame.
      if (!overlayMounted) return;

      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      if (!panel) return;

      let preLayers = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll(".sm-prelayer"));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });
    });

    return () => ctx.revert();
  }, [menuButtonColor, position, overlayMounted]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }

    const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
    const numberEls = Array.from(panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"));
    const socialTitle = panel.querySelector(".sm-socials-title");
    const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link"));

    const layerStates = layers.map((el) => ({ el, start: Number(gsap.getProperty(el, "xPercent")) }));
    const panelStart = Number(gsap.getProperty(panel, "xPercent"));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { ["--sm-num-opacity"]: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: "power4.out" }, i * 0.07);
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(panel, { xPercent: panelStart }, { xPercent: 0, duration: panelDuration, ease: "power4.out" }, panelInsertTime);

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

      tl.to(
        itemEls,
        { yPercent: 0, rotate: 0, duration: 1, ease: "power4.out", stagger: { each: 0.1, from: "start" } },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: "power2.out",
            ["--sm-num-opacity"]: 1,
            stagger: { each: 0.08, from: "start" },
          },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: "power2.out" }, socialsStart);
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: { each: 0.08, from: "start" },
            onComplete: () => gsap.set(socialLinks, { clearProps: "opacity" }),
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;

    const tl = buildOpenTimeline();
    if (!tl) {
      busyRef.current = false;
      return;
    }

    tl.eventCallback("onComplete", () => {
      busyRef.current = false;
    });

    tl.play(0);
  }, [buildOpenTimeline]);

  useLayoutEffect(() => {
    if (!overlayMounted || !open) return;
    if (openAnimStartedRef.current) return;
    openAnimStartedRef.current = true;

    // Run after commit so portaled DOM refs exist.
    requestAnimationFrame(() => {
      playOpen();
    });
  }, [overlayMounted, open, playOpen]);

  const playClose = useCallback(
    (onComplete) => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === "left" ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

        const numberEls = Array.from(panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"));
        if (numberEls.length) gsap.set(numberEls, { ["--sm-num-opacity"]: 0 });

        const socialTitle = panel.querySelector(".sm-socials-title");
        const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link"));
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        busyRef.current = false;
        onComplete?.();
      },
    });
    },
    [position]
  );

  const animateIcon = useCallback((opening) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power3.inOut" } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateColor = useCallback(
    (opening) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;

      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  React.useEffect(() => {
    if (!toggleBtnRef.current) return;

    if (changeMenuColorOnOpen) {
      const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
      gsap.set(toggleBtnRef.current, { color: targetColor });
    } else {
      gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((opening) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? "Menu" : "Close";
    const targetLabel = opening ? "Close" : "Menu";
    const cycles = 3;

    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === "Menu" ? "Close" : "Menu";
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);

    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: "power4.out",
    });
  }, []);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;

    openRef.current = false;
    setOpen(false);
    openAnimStartedRef.current = false;
    onMenuClose?.();
    playClose(() => setOverlayMounted(false));
    animateIcon(false);
    animateColor(false);
    animateText(false);
  }, [animateColor, animateIcon, animateText, onMenuClose, playClose]);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      setOverlayMounted(true);
      openAnimStartedRef.current = false;
      onMenuOpen?.();
    } else {
      openAnimStartedRef.current = false;
      onMenuClose?.();
      playClose(() => setOverlayMounted(false));
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [animateColor, animateIcon, animateText, onMenuClose, onMenuOpen, playClose, playOpen]);

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  const handleItemActivate = (item) => {
    if (!item) return;

    if (typeof item.onClick === "function") item.onClick();
    else if (item.link) window.location.href = item.link;

    closeMenu();
  };

  const raw = colors && colors.length ? colors.slice(0, 4) : DEFAULT_COLORS;
  const layerColors = (() => {
    const arr = [...raw];
    if (arr.length >= 3) {
      const mid = Math.floor(arr.length / 2);
      arr.splice(mid, 1);
    }
    return arr;
  })();

  const overlayPositionStyle = isFixed
    ? { position: "fixed", inset: 0 }
    : { position: "absolute", inset: 0 };

  const sideStyle = position === "left" ? { left: 0 } : { right: 0 };

  const isDark = theme === "dark";
  const panelBg = isDark ? "rgba(5, 8, 22, 0.92)" : "rgba(255, 255, 255, 0.92)";
  const panelText = isDark ? "#ffffff" : "#111111";
  const panelMuted = isDark ? "rgba(255,255,255,0.72)" : "rgba(17,17,17,0.72)";

  const overlay = (
    <div
      className="sm-overlayRoot"
      style={{
        ...overlayPositionStyle,
        zIndex: 200,
        pointerEvents: "auto",
      }}
      aria-hidden={!open}
    >
      {/* Layers */}
      <div
        ref={preLayersRef}
        className="sm-prelayers pointer-events-none z-[5]"
        aria-hidden="true"
        style={{ position: "absolute", top: 0, bottom: 0, width: "clamp(260px, 38vw, 420px)", ...sideStyle }}
      >
        {layerColors.map((c, i) => (
          <div key={i} className="sm-prelayer absolute top-0 h-full w-full" style={{ background: c, ...sideStyle }} />
        ))}
      </div>

      {/* Panel */}
      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="staggered-menu-panel pointer-events-auto flex flex-col overflow-y-auto z-10"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "clamp(260px, 38vw, 420px)",
          padding: "6em 2em 2em 2em",
          WebkitBackdropFilter: "blur(12px)",
          backdropFilter: "blur(12px)",
          background: panelBg,
          ...sideStyle,
        }}
      >
        <div className="sm-panel-inner flex-1 flex flex-col gap-5">
          <ul
            className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2"
            role="list"
            data-numbering={displayItemNumbering || undefined}
          >
            {items && items.length ? (
              items.map((it, idx) => (
                <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={`${it.label}-${idx}`}>
                  <button
                      className="sm-panel-item relative font-semibold text-4xl sm:text-5xl md:text-6xl cursor-pointer leading-none tracking-[-1px] md:tracking-[-2px] uppercase transition-[color] duration-150 ease-linear inline-block text-left bg-transparent border-0 p-0 pr-[1.4em]"
                    type="button"
                    aria-label={it.ariaLabel || it.label}
                    data-index={idx + 1}
                    onClick={() => handleItemActivate(it)}
                      style={{ color: panelText }}
                  >
                    <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                      {it.label}
                    </span>
                  </button>
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap relative overflow-hidden leading-none" aria-hidden="true">
                <span className="sm-panel-item relative font-semibold text-4xl sm:text-5xl md:text-6xl leading-none tracking-[-1px] md:tracking-[-2px] uppercase inline-block pr-[1.4em]" style={{ color: panelText }}>
                  <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                    No items
                  </span>
                </span>
              </li>
            )}
          </ul>

          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="sm-socials mt-auto pt-8 flex flex-col gap-3" aria-label="Social links">
              <h3 className="sm-socials-title m-0 text-base font-medium" style={{ color: "var(--sm-accent, #ff0000)" }}>
                Socials
              </h3>
              <ul className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap" role="list">
                {socialItems.map((s, i) => (
                  <li key={`${s.label}-${i}`} className="sm-socials-item">
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                        className="sm-socials-link text-[1.2rem] font-medium no-underline relative inline-block py-[2px] transition-[color,opacity] duration-300 ease-linear"
                        style={{ color: panelMuted }}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );

  return (
    <div
      className={(className ? `${className} ` : "") + "sm-scope relative inline-flex items-center"}
      style={accentColor ? { ["--sm-accent"]: accentColor } : undefined}
      data-position={position}
      data-open={open || undefined}
    >
      {/* Toggle (inline, stays inside Navbar flow) */}
      <button
        ref={toggleBtnRef}
        className="sm-toggle pointer-events-auto relative inline-flex items-center gap-[0.5rem] bg-transparent border-0 cursor-pointer text-[#e9e9ef] font-medium leading-none overflow-visible"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="staggered-menu-panel"
        onClick={toggleMenu}
        type="button"
      >
        <span className="sm-toggle-textWrap relative inline-block h-[1em] overflow-hidden whitespace-nowrap">
          <span ref={textInnerRef} className="sm-toggle-textInner flex flex-col leading-none">
            {textLines.map((l, i) => (
              <span className="sm-toggle-line block h-[1em] leading-none" key={i}>
                {l}
              </span>
            ))}
          </span>
        </span>

        <span
          ref={iconRef}
          className="sm-icon relative w-[16px] h-[16px] shrink-0 inline-flex items-center justify-center [will-change:transform]"
          aria-hidden="true"
        >
          <span
            ref={plusHRef}
            className="sm-icon-line absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"
          />
          <span
            ref={plusVRef}
            className="sm-icon-line sm-icon-line-v absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"
          />
        </span>
      </button>

      {/* Portal overlay to <body> so Navbar transform can't break fixed positioning */}
      {overlayMounted && typeof document !== "undefined" ? createPortal(overlay, document.body) : null}

      <style>{`
        .sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; z-index: 40; pointer-events: none; }
        .sm-scope .sm-toggle:focus-visible { outline: 2px solid #ffffffaa; outline-offset: 4px; border-radius: 9999px; }

        .sm-scope .staggered-menu-panel { box-shadow: 0 20px 60px rgba(0,0,0,0.45); }
        .sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }

        .sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
        .sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after {
          counter-increment: smItem;
          content: counter(smItem, decimal-leading-zero);
          position: absolute;
          top: 0.1em;
          right: 3.2em;
          font-size: 18px;
          font-weight: 400;
          color: var(--sm-accent, #ff0000);
          letter-spacing: 0;
          pointer-events: none;
          user-select: none;
          opacity: var(--sm-num-opacity, 0);
        }

        .sm-scope .sm-panel-item:hover { color: var(--sm-accent, #ff0000); }

        @media (max-width: 1024px) {
          .sm-scope .staggered-menu-panel { width: 100% !important; left: 0 !important; right: 0 !important; }
          .sm-scope .sm-prelayers { width: 100% !important; left: 0 !important; right: 0 !important; }
        }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
