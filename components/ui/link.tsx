import { Text } from '@/components/ui/text';
import { Link as ERLink, Href } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform } from 'react-native';

type Props = Omit<ComponentProps<typeof ERLink>, 'href'> & {
  href: Href & string;
  children: React.ReactNode;
};

export function Link({ href, children, ...rest }: Props) {
  return (
    <ERLink
      target='_blank'
      {...rest}
      href={href}
      onPress={async (event) => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await openBrowserAsync(href);
        }
      }}
    >
      {typeof children === 'string' ? (
        <Text variant='link'>{children}</Text>
      ) : (
        children
      )}
    </ERLink>
  );
}
