import { View as RNView, type ViewProps } from 'react-native';

export function View({ style, ...otherProps }: ViewProps) {
  return (
    <RNView
      style={[{ backgroundColor: 'transparent' }, style]}
      {...otherProps}
    />
  );
}
