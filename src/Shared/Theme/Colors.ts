import type { SimplePaletteColorOptions } from "@mui/material";
export const Colors = {
  Primary: "#c20870",
  Primary75: "#D6579E",
  Primary50: "#DF7FB5",
  Primary25: "#E9A6CC",
  Primary10: "#F3CEE2",

  Secondary: "#009CEA",
  Secondary75: "#52BCF1",
  Secondary50: "#7ACCF4",
  Secondary25: "#A3DBF7",
  Secondary10: "#CCEBFB",

  Success: "#90CC11",
  Success75: "#B4DC5D",
  Success50: "#C5E483",
  Success25: "#D7EDA9",

  Warning: "#FACC15",
  Warning75: "#FCDC60",
  Warning50: "#FCE485",
  Warning25: "#FDEDAB",

  Danger: "#E01A49",
  Danger75: "#EA6383",
  Danger50: "#EF88A0",
  Danger25: "#F4ADBD",

  MonoChrome50: "#F8FAFC",
  MonoChrome100: "#DADCDE",
  MonoChrome200: "#BCBEC0",
  MonoChrome300: "#9EA0A2",
  MonoChrome400: "#818284",
  MonoChrome500: "#636365",
  MonoChrome600: "#454547",
  MonoChrome700: "#272729",
  MonoChrome800: "#141419",

  White: "#FFFFFF",

  Black: "#09090B",
  Black75: "#5D6370",
  Black50: "#838891",
  Black25: "#838891",

  Pink: "#E174C2",
  Pink75: "#E790CE",
  Pink50: "#EDACDA",
  Pink25: "#F3C7E7",

  Grey: "#878787",
  Grey75: "#9F9F9F",
  Grey50: "#B7B7B7",
  Grey25: "#CFCFCF",

  Yellow: "#E4BD00",
  Yellow75: "#E9CA33",
  Yellow50: "#EFD766",
  Yellow25: "#F4E599",

  Orange: "#F97316",
  Orange75: "#FBA061",
  Orange50: "#FCB686",
  Orange25: "#FDCDAB",

  Blue: "#3565DC",
  Blue75: "#5D84E3",
  Blue50: "#86A3EA",
  Blue25: "#AEC1F1",

  Purple: "#A855F7",
  Purple75: "#C48BFA",
  Purple50: "#D2A7FB",
  Purple25: "#E0C2FC",

  Teal: "#0286C0",
  Teal75: "#359ECD",
  Teal50: "#67B6D9",
  Teal25: "#9ACFE6",

  Gold: "#CAB642",
  Gold75: "#C9B764",
  Gold50: "#D6C98B",
  Gold25: "#E4DBB1",

  Magenta: "#FF168A",
  Magenta75: "#FF45A1",
  Magenta50: "#FF73B9",
  Magenta25: "#FFA2D0",

  Comodities: "#CAB642",
  Comodities75: "#C9B764",
  Comodities50: "#D6C98B",
  Comodities25: "#E4DBB1",

  Label: "#233145",
} as const;

export const DarkModeColors = {
  Primary: "#c20870",
  Primary75: "#D6579E",
  Primary50: "#DF7FB5",
  Primary25: "#E9A6CC",
  Primary10: "#F3CEE2",

  Secondary: "#009CEA",
  Secondary75: "#52BCF1",
  Secondary50: "#7ACCF4",
  Secondary25: "#A3DBF7",
  Secondary10: "#CCEBFB",

  Success: "#16a34a",
  Success75: "#B4DC5D",
  Success50: "#C5E483",
  Success25: "#D7EDA9",

  Warning: "#FACC15",
  Warning75: "#FCDC60",
  Warning50: "#FCE485",
  Warning25: "#FDEDAB",

  Danger: "#E01A49",
  Danger75: "#EA6383",
  Danger50: "#EF88A0",
  Danger25: "#F4ADBD",

  MonoChrome50: "#141419",
  MonoChrome100: "#272729",
  MonoChrome200: "#454547",
  MonoChrome300: "#636365",
  MonoChrome400: "#818284",
  MonoChrome500: "#9EA0A2",
  MonoChrome600: "#BCBEC0",
  MonoChrome700: "#DADCDE",
  MonoChrome800: "#F8FAFC",

  White: "#09090B",

  Black: "#FFFFFF",
  Black75: "#5D6370",
  Black50: "#838891",
  Black25: "#838891",

  Pink: "#E174C2",
  Pink75: "#E790CE",
  Pink50: "#EDACDA",
  Pink25: "#F3C7E7",

  Grey: "#878787",
  Grey75: "#9F9F9F",
  Grey50: "#B7B7B7",
  Grey25: "#CFCFCF",

  Yellow: "#E4BD00",
  Yellow75: "#E9CA33",
  Yellow50: "#EFD766",
  Yellow25: "#F4E599",

  Orange: "#F97316",
  Orange75: "#FBA061",
  Orange50: "#FCB686",
  Orange25: "#FDCDAB",

  Blue: "#3565DC",
  Blue75: "#5D84E3",
  Blue50: "#86A3EA",
  Blue25: "#AEC1F1",

  Purple: "#A855F7",
  Purple75: "#C48BFA",
  Purple50: "#D2A7FB",
  Purple25: "#E0C2FC",

  Teal: "#0286C0",
  Teal75: "#359ECD",
  Teal50: "#67B6D9",
  Teal25: "#9ACFE6",

  Gold: "#CAB642",
  Gold75: "#C9B764",
  Gold50: "#D6C98B",
  Gold25: "#E4DBB1",

  Magenta: "#FF168A",
  Magenta75: "#FF45A1",
  Magenta50: "#FF73B9",
  Magenta25: "#FFA2D0",

  Comodities: "#CAB642",
  Comodities75: "#C9B764",
  Comodities50: "#D6C98B",
  Comodities25: "#E4DBB1",

  Label: "#233145",
} as const;

export type ColorsType = typeof Colors | typeof DarkModeColors;

interface PropsColorOverrides {
  comodities: true;
}

interface PropsBadgeColorOverrides {
  transparent: true;
}

type ThemeExtendedProps = {
  colors: {
    border: {
      main: string;
      hover: string;
      active: string;
    };
    placeholder: string;
  };
  shadow: {
    primary: string;
    primaryHover: string;
  };
  transition: {
    fast: string;
    slow: string;
  };
  borderRadius: string;
  vh: (value: number) => string;
  timeline: {
    height: {
      small: string;
      medium: string;
      large: string;
    };
  };
};

declare module "@mui/material" {
  interface ButtonPropsColorOverrides extends PropsColorOverrides {}
  interface IconButtonPropsColorOverrides extends PropsColorOverrides {}
  interface CheckboxPropsColorOverrides extends PropsColorOverrides {}
  interface ButtonPropsColorOverrides extends PropsColorOverrides {}
  interface ChipPropsColorOverrides extends PropsColorOverrides {}
  interface BadgePropsColorOverrides extends PropsBadgeColorOverrides {}
  interface PaletteOptions {
    comodities: PaletteOptions["primary"];
    blue: PaletteOptions["primary"];
    pink: PaletteOptions["primary"];
    orange: PaletteOptions["primary"];
    purple: PaletteOptions["primary"];
    magenta: PaletteOptions["primary"];
  }
  interface Palette {
    comodities: SimplePaletteColorOptions;
    blue: SimplePaletteColorOptions;
    pink: SimplePaletteColorOptions;
    orange: SimplePaletteColorOptions;
    purple: SimplePaletteColorOptions;
    magenta: SimplePaletteColorOptions;
  }
  interface ThemeOptions extends ThemeExtendedProps {}
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    subtitle3: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    subtitle3?: React.CSSProperties;
  }
  interface Theme extends ThemeExtendedProps {}
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    subtitle3: true;
  }
}
