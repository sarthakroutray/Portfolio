import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";

import { cn } from "../lib/utils";

const DEFAULT_BUTTON_SIZES = {
  sm: "w-10 h-10",
  md: "w-12 h-12",
  lg: "w-16 h-16",
};

const DEFAULT_FONT_SIZES = {
  sm: "text-2xl md:text-3xl",
  md: "text-3xl md:text-4xl",
  lg: "text-4xl md:text-5xl",
  xl: "text-5xl md:text-6xl",
  "2xl": "text-6xl md:text-7xl",
};

export const HamburgerMenuOverlay = ({
  items = [],
  buttonTop = "60px",
  buttonLeft = "60px",
  buttonSize = "md",
  buttonPosition = "fixed",
  buttonColor,
  overlayBackground,
  textColor,
  fontSize = "md",
  fontFamily,
  fontWeight = "bold",
  animationDuration = 1.5,
  staggerDelay = 0.1,
  menuAlignment = "left",
  className,
  buttonClassName,
  menuItemClassName,
  keepOpenOnItemClick = false,
  customButton,
  ariaLabel = "Navigation menu",
  onOpen,
  onClose,
  menuDirection = "vertical",
  enableBlur = false,
  zIndex = 1000,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  const [anchor, setAnchor] = useState({ x: buttonLeft, y: buttonTop });

  const overlayId = useMemo(() => `navigation-menu-${zIndex}`, [zIndex]);

  const toggleMenu = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) onOpen?.();
      else onClose?.();
      return next;
    });
  };

  const handleItemClick = (item) => {
    if (item?.onClick) item.onClick();
    else if (item?.href) window.location.href = item.href;

    if (!keepOpenOnItemClick) {
      setIsOpen(false);
      onClose?.();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (buttonPosition !== "inline") {
      setAnchor({ x: buttonLeft, y: buttonTop });
      return;
    }

    let rafId = 0;

    const updateAnchor = () => {
      const el = buttonRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      setAnchor({ x: `${x}px`, y: `${y}px` });
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateAnchor);
    };

    updateAnchor();
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
    };
  }, [buttonLeft, buttonPosition, buttonTop]);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        "--hamburger-x": anchor.x,
        "--hamburger-y": anchor.y,
      }}
    >
      <style>
        {`
          .hamburger-overlay-${zIndex} {
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: start;
            align-items: center;
            z-index: ${zIndex};
            clip-path: circle(0px at var(--hamburger-x) var(--hamburger-y));
            transition: clip-path ${animationDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            pointer-events: none;
          }

          .hamburger-overlay-${zIndex}.open {
            clip-path: circle(150% at var(--hamburger-x) var(--hamburger-y));
            pointer-events: auto;
          }

          .hamburger-button-${zIndex} {
            position: ${buttonPosition === "inline" ? "relative" : "fixed"};
            left: ${buttonPosition === "inline" ? "auto" : "var(--hamburger-x)"};
            top: ${buttonPosition === "inline" ? "auto" : "var(--hamburger-y)"};
            transform: ${buttonPosition === "inline" ? "none" : "translate(-50%, -50%)"};
            border-radius: 9999px;
            z-index: ${zIndex + 1};
            border: none;
            cursor: pointer;
            transition: transform 0.3s ease;
            pointer-events: auto;
          }

          .hamburger-button-${zIndex}:hover {
            transform: ${buttonPosition === "inline" ? "scale(1.08)" : "translate(-50%, -50%) scale(1.08)"};
          }

          .hamburger-button-${zIndex}:focus {
            outline: 2px solid ${textColor || "#ffffff"};
            outline-offset: 2px;
          }

          .menu-items-${zIndex} {
            ${menuDirection === "horizontal" ? "display: flex; flex-wrap: wrap; gap: 1rem;" : ""}
            ${menuAlignment === "center" ? "text-align: center;" : ""}
            ${menuAlignment === "right" ? "text-align: right;" : ""}
          }

          .menu-item-${zIndex} {
            position: relative;
            list-style: none;
            padding: 0.5rem 0;
            cursor: pointer;
            transform: translateX(-200px);
            opacity: 0;
            transition: all 0.3s ease;
            font-family: ${fontFamily ? fontFamily : "inherit"};
            font-weight: ${fontWeight};
            color: ${textColor ? textColor : "inherit"};
            ${menuDirection === "horizontal" ? "display: inline-block; margin: 0 1rem;" : ""}
          }

          .menu-item-${zIndex}.visible {
            transform: translateX(0);
            opacity: 1;
          }

          .menu-item-${zIndex}::before {
            content: "";
            position: absolute;
            left: -20%;
            top: 50%;
            transform: translate(-50%, -50%) translateX(-50%);
            width: 25%;
            height: 8px;
            border-radius: 10px;
            background: ${textColor || "#ffffff"};
            opacity: 0;
            transition: all 0.25s ease;
            pointer-events: none;
          }

          .menu-item-${zIndex}:hover::before {
            opacity: 1;
            transform: translate(-50%, -50%) translateX(0);
          }

          .menu-item-${zIndex} span {
            opacity: 0.7;
            transition: opacity 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .menu-item-${zIndex}:hover span {
            opacity: 1;
          }

          .menu-item-${zIndex}:focus {
            outline: 2px solid ${textColor || "#ffffff"};
            outline-offset: 2px;
            border-radius: 6px;
          }

          @media (max-width: 768px) {
            .menu-items-${zIndex} {
              padding: 1rem;
              max-height: 80vh;
              overflow-y: auto;
            }

            .menu-item-${zIndex} {
              padding: 1rem 0;
            }
          }

          @media (max-width: 480px) {
            .menu-items-${zIndex} {
              ${menuDirection === "horizontal" ? "flex-direction: column; gap: 0;" : ""}
            }

            .menu-item-${zIndex} {
              ${menuDirection === "horizontal" ? "display: block; margin: 0;" : ""}
            }
          }
        `}
      </style>

      {/* Hamburger Button (inline or fixed) */}
      <button
        ref={buttonRef}
        className={cn(
          `hamburger-button-${zIndex}`,
          DEFAULT_BUTTON_SIZES[buttonSize],
          !buttonColor && buttonPosition !== "inline" && "bg-primary/70 border border-white/10 shadow-xl",
          buttonClassName
        )}
        style={buttonColor ? { background: buttonColor } : undefined}
        onClick={toggleMenu}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-controls={overlayId}
        type="button"
      >
        {customButton || (
          <div className="relative w-full h-full flex items-center justify-center">
            <Menu
              className={cn(
                "absolute transition-all duration-300",
                isOpen ? "opacity-0 rotate-45 scale-0" : "opacity-100 rotate-0 scale-100"
              )}
              size={buttonSize === "sm" ? 16 : buttonSize === "md" ? 20 : 24}
              color={textColor || "#ffffff"}
            />
            <X
              className={cn(
                "absolute transition-all duration-300",
                isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-45 scale-0"
              )}
              size={buttonSize === "sm" ? 16 : buttonSize === "md" ? 20 : 24}
              color={textColor || "#ffffff"}
            />
          </div>
        )}
      </button>

      {/* Navigation Overlay (portaled so it covers full viewport) */}
      {(typeof document !== "undefined" && document?.body)
        ? createPortal(
            <div
              id={overlayId}
              className={cn(
                `flex flex-col items-center justify-center h-full hamburger-overlay-${zIndex}`,
                isOpen && "open",
                enableBlur && "backdrop-blur-md",
                !overlayBackground && "bg-primary",
                overlayBackground && "",
              )}
              style={{
                ...(overlayBackground ? { background: overlayBackground } : null),
                "--hamburger-x": anchor.x,
                "--hamburger-y": anchor.y,
              }}
              aria-hidden={!isOpen}
            >
              {isOpen && (
                <button
                  type="button"
                  onClick={toggleMenu}
                  aria-label="Close navigation menu"
                  className={cn(
                    "fixed top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center",
                    "bg-primary/70 border border-white/10 shadow-xl"
                  )}
                  style={{ zIndex: zIndex + 2 }}
                >
                  <X size={24} color={textColor || "#ffffff"} />
                </button>
              )}
              <ul className={cn(`mt-20 menu-items-${zIndex}`, menuDirection === "horizontal" && "flex flex-wrap")}>
                {items.map((item, index) => (
                  <li
                    key={`${item.label}-${index}`}
                    className={cn(
                      `menu-item-${zIndex}`,
                      DEFAULT_FONT_SIZES[fontSize],
                      isOpen && "visible",
                      menuItemClassName
                    )}
                    style={{ transitionDelay: isOpen ? `${index * staggerDelay}s` : "0s" }}
                    onClick={() => handleItemClick(item)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleItemClick(item);
                      }
                    }}
                    tabIndex={isOpen ? 0 : -1}
                    role="button"
                    aria-label={`Navigate to ${item.label}`}
                  >
                    <span>
                      {item.icon && <span className="menu-icon">{item.icon}</span>}
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>,
            document.body
          )
        : null}
    </div>
  );
};

export default HamburgerMenuOverlay;
