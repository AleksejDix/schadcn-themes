import React from "react";
import { BrandTheme, ColorMode } from "./ThemeProvider";

interface ThemeSwitcherProps {
  brand: BrandTheme;
  mode: ColorMode;
  onBrandChange: (brand: BrandTheme) => void;
  onModeChange: (mode: ColorMode) => void;
}

/**
 * ThemeSwitcher component for application use
 * Allows toggling between different brands and light/dark modes
 */
export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  brand,
  mode,
  onBrandChange,
  onModeChange,
}) => {
  const brands: BrandTheme[] = ["default", "cocacola", "rolex", "medidata"];
  const modes: ColorMode[] = ["light", "dark"];

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Brand Theme</label>
        <div className="flex gap-2 flex-wrap">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => onBrandChange(b)}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                b === brand
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {b === "default"
                ? "Default"
                : b === "cocacola"
                ? "Coca Cola"
                : b === "rolex"
                ? "Rolex"
                : "Medidata"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Color Mode</label>
        <div className="flex gap-2">
          {modes.map((m) => (
            <button
              key={m}
              onClick={() => onModeChange(m)}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                m === mode
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {m === "light" ? "Light" : "Dark"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
