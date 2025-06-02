import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { Icon } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';
import { ParallaxScrollView } from '@/components/ui/parallax-scrollview';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ChevronLeft } from 'lucide-react-native';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Icon IconComponent={ChevronLeft} size={28} color='#808080' />
      }
    >
      <View style={styles.titleContainer}>
        <Text>Explore</Text>
      </View>
      <Text>This app includes example code to help you get started.</Text>
      <Collapsible title='File-based routing'>
        <Text>
          This app has two screens: <Text>app/(tabs)/index.tsx</Text> and{' '}
          <Text>app/(tabs)/explore.tsx</Text>
        </Text>
        <Text>
          The layout file in <Text>app/(tabs)/_layout.tsx</Text> sets up the tab
          navigator.
        </Text>

        <Link href='https://docs.expo.dev/router/introduction'>
          <Text variant='link'>Learn more</Text>
        </Link>
      </Collapsible>
      <Collapsible title='Android, iOS, and web support'>
        <Text>
          You can open this project on Android, iOS, and the web. To open the
          web version, press <Text>w</Text> in the terminal running this
          project.
        </Text>
      </Collapsible>
      <Collapsible title='Images'>
        <Text>
          For static images, you can use the <Text>@2x</Text> and{' '}
          <Text>@3x</Text> suffixes to provide files for different screen
          densities
        </Text>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ alignSelf: 'center' }}
        />
        <Link href='https://reactnative.dev/docs/images'>
          <Text variant='link'>Learn more</Text>
        </Link>
      </Collapsible>
      <Collapsible title='Custom fonts'>
        <Text>
          Open <Text>app/_layout.tsx</Text> to see how to load{' '}
          <Text style={{ fontFamily: 'SpaceMono' }}>
            custom fonts such as this one.
          </Text>
        </Text>
        <Link href='https://docs.expo.dev/versions/latest/sdk/font'>
          <Text>Learn more</Text>
        </Link>
      </Collapsible>
      <Collapsible title='Light and dark mode components'>
        <Text>
          This template has light and dark mode support. The{' '}
          <Text>useColorScheme()</Text> hook lets you inspect what the
          user&apos;s current color scheme is, and so you can adjust UI colors
          accordingly.
        </Text>
        <Link href='https://docs.expo.dev/develop/user-interface/color-themes/'>
          <Text>Learn more</Text>
        </Link>
      </Collapsible>
      <Collapsible title='Animations'>
        <Text>
          This template includes an example of an animated component. The{' '}
          <Text>components/HelloWave.tsx</Text> component uses the powerful{' '}
          <Text>react-native-reanimated</Text> library to create a waving hand
          animation.
        </Text>
        {Platform.select({
          ios: (
            <Text>
              The <Text>components/ParallaxScrollView.tsx</Text> component
              provides a parallax effect for the header image.
            </Text>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
