import { View } from '@/components/ui/view';
import { OnboardingCustomButtons } from '@/docs/demo/onboarding/onboarding-custom-buttons';
import { OnboardingDemo } from '@/docs/demo/onboarding/onboarding-demo';
import { OnboardingHook } from '@/docs/demo/onboarding/onboarding-hook';
import { OnboardingImages } from '@/docs/demo/onboarding/onboarding-images';
import { OnboardingStyled } from '@/docs/demo/onboarding/onboarding-styled';
// import { ActionSheetExammple } from '@/docs/examples/action-sheet-example';
import { AlertExample } from '@/docs/examples/alert-example';

export default function MapsScreen() {
  return <OnboardingStyled />;
  // return <OnboardingCustomButtons />;
  // return <OnboardingStyled />;
  // return <OnboardingDemo />;
  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //       paddingHorizontal: 32,
  //       gap: 24,
  //     }}
  //   >
  //     <OnboardingStyled />
  //     {/* <ActionSheetExammple /> */}
  //   </View>
  // );
}
