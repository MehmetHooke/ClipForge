export type ThemeMode = "dark" | "light";

export type AppTheme = {
  mode: ThemeMode;
  colors: {
    background: string;
    surface: string;
    card: string;
    border: string;
    text: string;
    muted: string;
    primary: string;
    danger: string;
    inputBackground: string;
  };
};
