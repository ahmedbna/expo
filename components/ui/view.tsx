import { View as RNView, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type Props = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function View({ style, lightColor, darkColor, ...otherProps }: Props) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return <RNView style={[{ backgroundColor }, style]} {...otherProps} />;
}
