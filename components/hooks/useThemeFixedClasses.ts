import useTheme from "./useTheme";

export default function useThemeFixedClasses() {
  const theme = useTheme();
  function classes() {
    return theme.mode === "dark"
      ? "bg-gray-900 !text-gray-100"
      : "bg-gray-100 !text-gray-800";
  }

  return { classes, theme };
}
