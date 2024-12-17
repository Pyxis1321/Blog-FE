import { type PaletteMode, type Theme, ThemeProvider } from "@mui/material";
import {
	type ReactNode,
	createContext,
	useContext,
	useMemo,
	useState,
} from "react";

export type ThemeModeContextProps = {
	mode: PaletteMode;
	setMode: (variant: PaletteMode) => void;
};

const storageColorSchemeKey = "prefers-color-scheme";

const getPreferredTheme = (): PaletteMode => {
	if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
		const storageValue = localStorage.getItem(storageColorSchemeKey);
		if (storageValue) return storageValue === "dark" ? "dark" : "light";
		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	}
	// Default to 'light' if window or localStorage is not available
	return "light";
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const ThemeModeContext = createContext<ThemeModeContextProps>({} as any);

export type GetThemeFunctionType = (variant: PaletteMode) => Theme;

const ColorSchemeProvider = ({
	children,
	getTheme,
}: { children: ReactNode; getTheme: GetThemeFunctionType }) => {
	const [mode, setMode] = useState<PaletteMode>(getPreferredTheme());

	const setColorScheme = (variant: PaletteMode) => {
		localStorage.setItem(storageColorSchemeKey, variant);
		setMode(variant);
	};

	const theme = useMemo(() => getTheme(mode), [mode, getTheme]);

	return (
		<ThemeModeContext.Provider value={{ mode, setMode: setColorScheme }}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ThemeModeContext.Provider>
	);
};

export default ColorSchemeProvider;

export const useColorScheme = () => useContext(ThemeModeContext);
