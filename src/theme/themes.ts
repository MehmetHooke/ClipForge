import { AppTheme } from "./theme.types";

export const darkTheme: AppTheme = {
  mode: "dark",
  colors: {
    background: "#0B1020",
    surface: "#12182B",
    card: "#12182B",
    border: "#202842",
    text: "#F5F7FF",
    muted: "#9AA4C7",
    primary: "#7C5CFF",
    danger: "#FF6B6B",
    inputBackground: "#0F1527",
  },
};

export const lightTheme: AppTheme = {
  mode: "light",
  colors: {
    background: "#F7F8FC",
    surface: "#FFFFFF",
    card: "#FFFFFF",
    border: "#D9DFEF",
    text: "#111827",
    muted: "#667085",
    primary: "#6D4CFF",
    danger: "#E5484D",
    inputBackground: "#F2F4F8",
  },
};
