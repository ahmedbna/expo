// registry/examples/onboarding-images.tsx
import { Image } from '@/components/ui/image';
import { Onboarding, OnboardingStep } from '@/components/ui/onboarding';
import { BORDER_RADIUS } from '@/theme/globals';
import React from 'react';
import { View } from 'react-native';

const WelcomeImage = () => (
  <Image
    source={{
      uri: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=300&fit=crop',
    }}
    containerStyle={{ width: 400, height: 400, borderRadius: BORDER_RADIUS }}
    style={{ width: 400, height: 400, borderRadius: BORDER_RADIUS }}
  />
);

const FeaturesImage = () => (
  <Image
    source={{
      uri: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=300&fit=crop',
    }}
    containerStyle={{ width: 400, height: 400, borderRadius: BORDER_RADIUS }}
    style={{ width: 400, height: 400, borderRadius: BORDER_RADIUS }}
  />
);

const StartImage = () => (
  <Image
    source={{
      uri: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=300&fit=crop',
    }}
    containerStyle={{ width: 400, height: 400, borderRadius: BORDER_RADIUS }}
    style={{ width: 400, height: 400, borderRadius: BORDER_RADIUS }}
  />
);

export function OnboardingImages() {
  const steps: OnboardingStep[] = [
    {
      id: '1',
      title: 'Welcome to the Team',
      description:
        'Join thousands of users who have already discovered the power of our platform.',
      image: <WelcomeImage />,
    },
    {
      id: '2',
      title: 'Powerful Features',
      description:
        'Access advanced tools and features that will help you achieve your goals faster.',
      image: <FeaturesImage />,
    },
    {
      id: '3',
      title: 'Ready to Launch',
      description:
        "Everything is set up and ready. Let's start building something amazing together!",
      image: <StartImage />,
    },
  ];

  return (
    <Onboarding
      steps={steps}
      onComplete={() => console.log('Onboarding with images completed!')}
      onSkip={() => console.log('Onboarding with images skipped!')}
      primaryButtonText="Let's Go"
      nextButtonText='Continue'
    />
  );
}
