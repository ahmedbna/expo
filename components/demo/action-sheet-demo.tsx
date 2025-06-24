// registry/examples/action-sheet-demo-screen.tsx
import { useActionSheet } from '@/components/ui/action-sheet';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import {
  Camera,
  Copy,
  Download,
  Edit,
  FileText,
  Heart,
  Image,
  LogOut,
  MessageCircle,
  Settings,
  Share,
  Star,
  Trash2,
  User,
} from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function ActionSheetDemoScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({}, 'textMuted');

  // Basic ActionSheet
  const basicActionSheet = useActionSheet();

  // With Icons ActionSheet
  const iconActionSheet = useActionSheet();

  // With Destructive ActionSheet
  const destructiveActionSheet = useActionSheet();

  // With Disabled Options ActionSheet
  const disabledActionSheet = useActionSheet();

  // Long Options ActionSheet
  const longOptionsActionSheet = useActionSheet();

  // Photo Options ActionSheet
  const photoActionSheet = useActionSheet();

  // Settings ActionSheet
  const settingsActionSheet = useActionSheet();

  // Social Actions ActionSheet
  const socialActionSheet = useActionSheet();

  const showBasicActionSheet = () => {
    basicActionSheet.show({
      title: 'Select an option',
      message: 'Choose one of the following actions',
      options: [
        {
          title: 'Option 1',
          onPress: () => console.log('Option 1 pressed'),
        },
        {
          title: 'Option 2',
          onPress: () => console.log('Option 2 pressed'),
        },
        {
          title: 'Option 3',
          onPress: () => console.log('Option 3 pressed'),
        },
      ],
    });
  };

  const showIconActionSheet = () => {
    iconActionSheet.show({
      title: 'Document Actions',
      options: [
        {
          title: 'Edit',
          icon: <Edit size={20} color={textColor} />,
          onPress: () => console.log('Edit pressed'),
        },
        {
          title: 'Share',
          icon: <Share size={20} color={textColor} />,
          onPress: () => console.log('Share pressed'),
        },
        {
          title: 'Copy',
          icon: <Copy size={20} color={textColor} />,
          onPress: () => console.log('Copy pressed'),
        },
        {
          title: 'Download',
          icon: <Download size={20} color={textColor} />,
          onPress: () => console.log('Download pressed'),
        },
      ],
    });
  };

  const showDestructiveActionSheet = () => {
    destructiveActionSheet.show({
      title: 'Delete Item',
      message: 'This action cannot be undone',
      options: [
        {
          title: 'Edit',
          icon: <Edit size={20} color={textColor} />,
          onPress: () => console.log('Edit pressed'),
        },
        {
          title: 'Share',
          icon: <Share size={20} color={textColor} />,
          onPress: () => console.log('Share pressed'),
        },
        {
          title: 'Delete',
          icon: <Trash2 size={20} color='#FF3B30' />,
          destructive: true,
          onPress: () => console.log('Delete pressed'),
        },
      ],
    });
  };

  const showDisabledActionSheet = () => {
    disabledActionSheet.show({
      title: 'File Options',
      message: 'Some options may not be available',
      options: [
        {
          title: 'View',
          onPress: () => console.log('View pressed'),
        },
        {
          title: 'Edit',
          disabled: true,
          onPress: () => console.log('Edit pressed'),
        },
        {
          title: 'Share',
          onPress: () => console.log('Share pressed'),
        },
        {
          title: 'Delete',
          disabled: true,
          destructive: true,
          onPress: () => console.log('Delete pressed'),
        },
      ],
    });
  };

  const showLongOptionsActionSheet = () => {
    longOptionsActionSheet.show({
      title: 'All Available Actions',
      message: 'Scroll to see all options',
      options: [
        { title: 'Action 1', onPress: () => console.log('Action 1') },
        { title: 'Action 2', onPress: () => console.log('Action 2') },
        { title: 'Action 3', onPress: () => console.log('Action 3') },
        { title: 'Action 4', onPress: () => console.log('Action 4') },
        { title: 'Action 5', onPress: () => console.log('Action 5') },
        { title: 'Action 6', onPress: () => console.log('Action 6') },
        { title: 'Action 7', onPress: () => console.log('Action 7') },
        { title: 'Action 8', onPress: () => console.log('Action 8') },
        { title: 'Action 9', onPress: () => console.log('Action 9') },
        { title: 'Action 10', onPress: () => console.log('Action 10') },
        { title: 'Action 11', onPress: () => console.log('Action 11') },
        { title: 'Action 12', onPress: () => console.log('Action 12') },
      ],
    });
  };

  const showPhotoActionSheet = () => {
    photoActionSheet.show({
      title: 'Add Photo',
      options: [
        {
          title: 'Take Photo',
          icon: <Camera size={20} color={textColor} />,
          onPress: () => console.log('Take Photo pressed'),
        },
        {
          title: 'Choose from Library',
          icon: <Image size={20} color={textColor} />,
          onPress: () => console.log('Choose from Library pressed'),
        },
        {
          title: 'Browse Files',
          icon: <FileText size={20} color={textColor} />,
          onPress: () => console.log('Browse Files pressed'),
        },
      ],
    });
  };

  const showSettingsActionSheet = () => {
    settingsActionSheet.show({
      title: 'Account Settings',
      options: [
        {
          title: 'Edit Profile',
          icon: <User size={20} color={textColor} />,
          onPress: () => console.log('Edit Profile pressed'),
        },
        {
          title: 'Settings',
          icon: <Settings size={20} color={textColor} />,
          onPress: () => console.log('Settings pressed'),
        },
        {
          title: 'Sign Out',
          icon: <LogOut size={20} color='#FF3B30' />,
          destructive: true,
          onPress: () => console.log('Sign Out pressed'),
        },
      ],
    });
  };

  const showSocialActionSheet = () => {
    socialActionSheet.show({
      title: 'Post Actions',
      options: [
        {
          title: 'Like',
          icon: <Heart size={20} color='#FF3B30' />,
          onPress: () => console.log('Like pressed'),
        },
        {
          title: 'Comment',
          icon: <MessageCircle size={20} color={textColor} />,
          onPress: () => console.log('Comment pressed'),
        },
        {
          title: 'Save',
          icon: <Star size={20} color='#FFD60A' />,
          onPress: () => console.log('Save pressed'),
        },
        {
          title: 'Share',
          icon: <Share size={20} color={textColor} />,
          onPress: () => console.log('Share pressed'),
        },
      ],
    });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text variant='heading' style={styles.title}>
          ActionSheet Examples
        </Text>
        <Text variant='caption' style={styles.subtitle}>
          Tap any button to see different ActionSheet configurations
        </Text>
      </View>

      <View
        style={[styles.section, { backgroundColor: cardColor, borderColor }]}
      >
        <Text variant='subtitle' style={styles.sectionTitle}>
          Basic Examples
        </Text>

        <Button
          variant='outline'
          onPress={showBasicActionSheet}
          style={styles.button}
        >
          Basic ActionSheet
        </Button>

        <Button
          variant='outline'
          onPress={showIconActionSheet}
          style={styles.button}
        >
          With Icons
        </Button>

        <Button
          variant='outline'
          onPress={showDestructiveActionSheet}
          style={styles.button}
        >
          With Destructive Action
        </Button>

        <Button
          variant='outline'
          onPress={showDisabledActionSheet}
          style={styles.button}
        >
          With Disabled Options
        </Button>
      </View>

      <View
        style={[styles.section, { backgroundColor: cardColor, borderColor }]}
      >
        <Text variant='subtitle' style={styles.sectionTitle}>
          Advanced Examples
        </Text>

        <Button
          variant='outline'
          onPress={showLongOptionsActionSheet}
          style={styles.button}
        >
          Long Options List
        </Button>

        <Button
          variant='outline'
          onPress={showPhotoActionSheet}
          style={styles.button}
        >
          Photo Options
        </Button>

        <Button
          variant='outline'
          onPress={showSettingsActionSheet}
          style={styles.button}
        >
          Settings Menu
        </Button>

        <Button
          variant='outline'
          onPress={showSocialActionSheet}
          style={styles.button}
        >
          Social Actions
        </Button>
      </View>

      {/* Render all ActionSheet components */}
      {basicActionSheet.ActionSheet}
      {iconActionSheet.ActionSheet}
      {destructiveActionSheet.ActionSheet}
      {disabledActionSheet.ActionSheet}
      {longOptionsActionSheet.ActionSheet}
      {photoActionSheet.ActionSheet}
      {settingsActionSheet.ActionSheet}
      {socialActionSheet.ActionSheet}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  sectionTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    marginBottom: 12,
  },
});
