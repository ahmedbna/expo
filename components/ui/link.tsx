import { Text } from '@/components/ui/text';
import { Link as ERLink, Href, useRouter } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Linking, Platform } from 'react-native';

type Props = Omit<ComponentProps<typeof ERLink>, 'href'> & {
  href: Href;
  browser?: 'in-app' | 'external';
  children: React.ReactNode;
};

// Helper function to determine if URL is external
const isExternalUrl = (href: Href): boolean => {
  // If href is an object, it's always internal navigation
  if (typeof href === 'object') {
    return false;
  }

  // Check if string href is external
  return (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  );
};

// Helper function to convert href to string for external links
const getHrefString = (href: Href): string => {
  if (typeof href === 'string') {
    return href;
  }

  // For object hrefs, we shouldn't convert to string for external use
  // This should only be called for external URLs (which are always strings)
  throw new Error('Cannot convert object href to string for external use');
};

export function Link({ href, children, browser = 'in-app', ...rest }: Props) {
  const router = useRouter();
  const isExternal = isExternalUrl(href);

  const handlePress = async (event: any) => {
    if (isExternal) {
      // Always prevent default for external links
      event.preventDefault();

      const hrefString = getHrefString(href);

      if (Platform.OS !== 'web') {
        if (browser === 'external') {
          // Open the link in external browser
          await Linking.openURL(hrefString);
        } else {
          // Open the link in in-app browser (default)
          await openBrowserAsync(hrefString);
        }
      } else {
        // On web, open in new tab
        window.open(hrefString, '_blank');
      }
    }
    // For internal navigation, don't prevent default - let ERLink handle it
  };

  // For external links, use a custom approach to avoid conflicts
  if (isExternal) {
    return (
      <ERLink
        asChild={typeof children === 'string' ? false : true}
        href={href}
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

  // For internal links, use ERLink directly without custom onPress
  return (
    <ERLink
      asChild={typeof children === 'string' ? false : true}
      href={href}
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
