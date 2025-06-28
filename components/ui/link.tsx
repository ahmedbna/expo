import { Text } from '@/components/ui/text';
import { Link as ERLink, Href, useRouter } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Linking, Platform } from 'react-native';

type Props = Omit<ComponentProps<typeof ERLink>, 'href'> & {
  href: Href | string;
  browser?: 'in-app' | 'external';
  children: React.ReactNode;
};

// Helper function to determine if URL is external
const isExternalUrl = (url: string): boolean => {
  return (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('mailto:') ||
    url.startsWith('tel:')
  );
};

export function Link({ href, children, browser = 'in-app', ...rest }: Props) {
  const router = useRouter();

  const hrefString = typeof href === 'string' ? href : href.toString();
  const isExternal = isExternalUrl(hrefString);

  const handlePress = async (event: any) => {
    if (isExternal) {
      if (Platform.OS !== 'web') {
        // Prevent the default behavior on native platforms
        event.preventDefault();

        if (browser === 'external') {
          // Open the link in external browser
          await Linking.openURL(hrefString);
        } else {
          // Open the link in in-app browser (default)
          await openBrowserAsync(hrefString);
        }
      } else {
        // On web, open external links in new tab
        window.open(hrefString, '_blank');
      }
    } else {
      router.navigate(hrefString as Href);
    }
  };

  return (
    <ERLink
      asChild={typeof children === 'string' ? false : true}
      href={href as Href}
      onPress={handlePress}
      {...rest}
    >
      {typeof children === 'string' ? (
        <Text variant='link'>{children}</Text>
      ) : (
        children
      )}
    </ERLink>
  );
}
