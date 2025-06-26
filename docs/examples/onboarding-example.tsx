import React, { useState } from 'react';
import { View } from '@/components/ui/view';
import { OnboardingDemo } from '@/docs/demo/onboarding/onboarding-demo';
import { OnboardingImages } from '@/docs/demo/onboarding/onboarding-images';
import { OnboardingStyled } from '@/docs/demo/onboarding/onboarding-styled';
import { OnboardingNoSkip } from '@/docs/demo/onboarding/onboarding-no-skip';
import { OnboardingNoSwipe } from '@/docs/demo/onboarding/onboarding-no-swipe';
import { OnboardingCustomButtons } from '@/docs/demo/onboarding/onboarding-custom-buttons';
import { OnboardingHook } from '@/docs/demo/onboarding/onboarding-hook';

type DemoType =
  | 'default'
  | 'images'
  | 'styled'
  | 'no-skip'
  | 'no-swipe'
  | 'custom-buttons'
  | 'hook';

const demoOptions = [
  { key: 'default', component: OnboardingDemo },
  { key: 'images', component: OnboardingImages },
  { key: 'styled', component: OnboardingStyled },
  { key: 'no-skip', component: OnboardingNoSkip },
  { key: 'no-swipe', component: OnboardingNoSwipe },
  { key: 'custom-buttons', component: OnboardingCustomButtons },
  { key: 'hook', component: OnboardingHook },
];

export function OnboardingExample() {
  return (
    <View>
      <OnboardingDemo />
    </View>
  );
}
