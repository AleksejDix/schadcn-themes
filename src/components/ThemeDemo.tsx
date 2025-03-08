import React, { useState } from "react";
import ThemeProvider, { BrandTheme, ColorMode } from "./ThemeProvider";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { ThemedButton } from "./themed-button";

/**
 * ThemeDemo - Example of using ThemeProvider and ThemeSwitcher in an application
 *
 * This demonstrates:
 * 1. How to maintain theme state in your application
 * 2. How to use ThemeProvider to apply themes
 * 3. How to use ThemeSwitcher as a UI control
 * 4. How themed components inherit the theme
 */
const ThemeDemo: React.FC = () => {
  // Application state for the current theme
  const [brand, setBrand] = useState<BrandTheme>("default");
  const [mode, setMode] = useState<ColorMode>("light");

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Theme System Demo</h1>

      {/* Theme controls - outside of any ThemeProvider */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Global Theme Controls</h2>
        <ThemeSwitcher
          brand={brand}
          mode={mode}
          onBrandChange={setBrand}
          onModeChange={setMode}
        />
        <p className="mt-4 text-sm text-muted-foreground">
          Note: These controls are outside any ThemeProvider, so they use the
          root theme.
        </p>
      </div>

      {/* Main themed section */}
      <ThemeProvider theme={{ brand, mode }}>
        <div className="p-6 border rounded-lg mb-10">
          <h2 className="text-lg font-semibold mb-4">Primary Theme Area</h2>
          <p className="mb-6">
            This section uses the theme selected above. All components inside
            inherit this theme.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <ThemedButton>Primary Button</ThemedButton>
            <ThemedButton variant="secondary">Secondary Button</ThemedButton>
            <ThemedButton variant="destructive">
              Destructive Button
            </ThemedButton>
            <ThemedButton variant="outline">Outline Button</ThemedButton>
          </div>

          {/* Nested theme example - Rolex */}
          <div className="mt-8">
            <h3 className="text-md font-semibold mb-4">
              Nested Theme Examples
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ThemeProvider theme={{ brand: "rolex", mode: "light" }}>
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-3">Rolex Theme (Light)</h4>
                  <div className="flex flex-wrap gap-2">
                    <ThemedButton size="sm">Button</ThemedButton>
                    <ThemedButton size="sm" variant="secondary">
                      Button
                    </ThemedButton>
                  </div>
                </div>
              </ThemeProvider>

              <ThemeProvider theme={{ brand: "medidata", mode: "dark" }}>
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-3">Medidata Theme (Dark)</h4>
                  <div className="flex flex-wrap gap-2">
                    <ThemedButton size="sm">Button</ThemedButton>
                    <ThemedButton size="sm" variant="secondary">
                      Button
                    </ThemedButton>
                  </div>
                </div>
              </ThemeProvider>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default ThemeDemo;
