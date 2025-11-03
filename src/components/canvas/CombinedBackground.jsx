import { useState, useEffect } from "react";
import StarsCanvas from "./Stars";
import ThreeGalaxy from "./ThreeGalaxy";

const CombinedBackground = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsDark(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <ThreeGalaxy isDark={isDark} />
      <div className="absolute inset-0 z-10">
        <StarsCanvas />
      </div>
    </div>
  );
};

export default CombinedBackground;
