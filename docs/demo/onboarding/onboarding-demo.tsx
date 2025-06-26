// registry/examples/onboarding-demo.tsx
import { Onboarding, OnboardingStep } from '@/components/ui/onboarding';
import { HeartHandshake, Rocket, Stars } from 'lucide-react-native';
import React from 'react';

export function OnboardingDemo() {
  const steps: OnboardingStep[] = [
    {
      id: '1',
      title: 'Welcome to Our App',
      description:
        "Discover amazing features and start your journey with us. We're excited to have you on board!",
      icon: <HeartHandshake />,
    },
    {
      id: '2',
      title: 'Explore Features',
      description:
        'Take advantage of our powerful tools designed to make your life easier and more productive.',
      icon: <Rocket />,
    },
    {
      id: '3',
      title: 'Get Started',
      description:
        "You're all set! Let's begin your journey and make the most of what we have to offer.",
      icon: <Stars />,
    },
  ];

  return (
    <Onboarding
      steps={steps}
      onComplete={() => console.log('Onboarding completed!')}
      onSkip={() => console.log('Onboarding skipped!')}
    />
  );
}
