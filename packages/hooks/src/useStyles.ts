import { Style, ResolvedStyle, parsers } from '@morfeo/core';
import { useTheme } from './useTheme';

function parseStyles<K extends string>(styles: Record<K, Style>) {
  const styleKeys = Object.keys(styles);
  return styleKeys.reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: parsers.resolve(styles[curr]),
    }),
    {},
  ) as Record<K, ResolvedStyle>;
}

/**
 * useStyles
 * it returns the a record of styles that can be used as inline-style in your components.
 */
export function useStyles<K extends string>(styles: Record<K, Style>) {
  useTheme();

  return parseStyles(styles);
}

/**
 * useStyles
 * it returns the a style that can be used as inline-style in your components.
 */
export function useStyle(style: Style) {
  const { style: parsedStyle } = useStyles({ style });

  return parsedStyle;
}
