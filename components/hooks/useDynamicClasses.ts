import useTheme from "./useTheme";

export default function useDynamicClasses() {
  const theme = useTheme();
  function dynamicClasses(dark_classes: string, light_classes: string) {
    return theme.mode === "dark" ? dark_classes : light_classes;
  }

  return { theme, dynamicClasses };
}
