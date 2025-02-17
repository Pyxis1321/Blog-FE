import type {} from "@mui/lab/themeAugmentation";
import type { PaletteMode, PaletteOptions, Theme } from "@mui/material";
import { type ThemeOptions, createTheme } from "@mui/material/styles";
import { Colors, DarkModeColors, type ColorsType } from "./Colors";
import type { GetThemeFunctionType } from "./ColorSchemeProvider";

export const SimplePaletteColors = [
  "primary",
  "secondary",
  "success",
  "error",
  "info",
  "warning",
  "comodities",
] as const;

export type SimplePaletteColorsType = (typeof SimplePaletteColors)[number];

const theme = (color: ColorsType, variant: PaletteMode): Theme => {
  const spacing = 10;
  const borderRadius = "5px";
  const palette = {
    mode: variant,
    primary: {
      light: color.Primary25,
      main: color.Primary,
      dark: color.Primary75,
      contrastText: color.White,
    },
    secondary: {
      light: color.Secondary25,
      main: color.Secondary,
      dark: color.Secondary75,
      contrastText: color.Black,
    },
    text: {
      primary: color.Black,
      secondary: color.MonoChrome500,
      disabled: color.MonoChrome400,
    },
    error: {
      light: color.Danger25,
      main: color.Danger,
      dark: color.Danger75,
      contrastText: color.White,
    },
    success: {
      light: color.Success25,
      main: color.Success,
      dark: color.Success75,
      contrastText: color.White,
    },
    info: {
      main: color.Secondary,
      light: color.Secondary50,
      dark: color.Secondary50,
      contrastText: color.White,
    },
    background: {
      default: color.White,
    },
    common: {
      black: color.Black,
      white: color.White,
    },
    warning: {
      light: color.Warning25,
      main: color.Warning,
      dark: color.Warning75,
    },
    grey: {
      50: color.MonoChrome50,
      100: color.MonoChrome100,
      200: color.MonoChrome200,
      300: color.MonoChrome300,
      400: color.MonoChrome400,
      500: color.MonoChrome500,
      600: color.MonoChrome600,
      700: color.MonoChrome700,
      800: color.MonoChrome800,
      900: color.Black,
    },
    comodities: {
      light: color.Comodities25,
      main: color.Comodities,
      dark: color.Comodities75,
      contrastText: color.White,
    },
    blue: {
      light: color.Blue25,
      main: color.Blue,
      dark: color.Blue75,
      contrastText: color.White,
    },
    pink: {
      light: color.Pink25,
      main: color.Pink,
      dark: color.Pink75,
      contrastText: color.White,
    },
    orange: {
      light: color.Orange25,
      main: color.Orange,
      dark: color.Orange75,
      contrastText: color.White,
    },
    purple: {
      light: color.Purple25,
      main: color.Purple,
      dark: color.Purple75,
      contrastText: color.White,
    },
    magenta: {
      light: color.Magenta25,
      main: color.Magenta,
      dark: color.Magenta75,
      contrastText: color.White,
    },
    divider: color.MonoChrome300,
  } as const satisfies PaletteOptions;

  const theme: ThemeOptions = {
    palette,
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 1050,
        lg: 1200,
        xl: 1536,
      },
    },
    spacing,
    shape: {
      borderRadius: 4,
    },
    typography: {
      fontSize: 14,
      fontFamily: "'Inter', sans-serif",
      body1: {
        fontSize: "12px",
        fontWeight: 400,
        letterSpacing: "0.2px",
        bold: {
          fontWeight: 600,
        },
      },
      body2: {
        color: color.Black,
        fontWeight: 500,
        fontSize: "12px",
        letterSpacing: "0.2px",
      },
      h1: {
        color: color.Black,
        fontWeight: 300,
        fontSize: "32px",
        lineHeight: "35px",
      },
      h2: {
        color: color.Black,
        fontWeight: 300,
        fontSize: "24px",
        lineHeight: "26px",
        letterSpacing: "0.2px",
      },
      h3: {
        color: color.Black,
        fontWeight: 600,
        fontSize: "16px",
        lineHeight: "17px",
        letterSpacing: "0.2px",
      },
      h4: {
        color: color.Black,
        fontWeight: 700,
        fontSize: "24px",
      },
      h5: {
        fontSize: "24px",
      },
      h6: {
        fontSize: "20px",
      },
      subtitle1: {
        fontWeight: 400,
        color: color.Black,
        fontSize: "16px",
        lineHeight: 1.4,
        letterSpacing: "0.2px",
      },
      subtitle2: {
        fontWeight: 300,
        color: color.MonoChrome600,
        fontSize: "10px",
        lineHeight: "14px",
        letterSpacing: "0.2px",
      },
      button: {
        fontSize: "12px",
        fontWeight: 500,
      },
      caption: {
        fontSize: "12px",
        fontWeight: 400,
        letterSpacing: "0.2px",
        lineHeight: "15.6px",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            width: "100%",
            height: "100%",
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
            backgroundColor: color.White,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: variant === "dark" ? color.Black : color.White,
          },
        },
      },
    },
    colors: {
      placeholder: color.MonoChrome400,
      border: {
        main: color.MonoChrome300,
        hover: color.MonoChrome400,
        active: color.Primary,
      },
    },
    shadow: {
      primary: "none",
      primaryHover: "0px 0px 15px 0px rgba(0, 0, 0, 0.15) inset",
    },
    borderRadius,
    transition: {
      fast: "0.2s ease",
      slow: "0.45s ease",
    },
    vh: (val: number) => {
      return `calc(var(--vh, 1vh) * ${val})`;
    },
    timeline: {
      height: {
        small: "40px",
        medium: "48px",
        large: "68px",
      },
    },
  };

  return createTheme(theme);
};
export const getTheme: GetThemeFunctionType = (variant) => {
  const colorPalette = variant === "dark" ? DarkModeColors : Colors;
  return theme(colorPalette, variant);
};
