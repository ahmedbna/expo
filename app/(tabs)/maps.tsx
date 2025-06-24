import { View } from '@/components/ui/view';
// import { ActionSheetExammple } from '@/docs/examples/action-sheet-example';
import { AlertExample } from '@/docs/examples/alert-example';

export default function MapsScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
        gap: 24,
      }}
    >
      <AlertExample />
      {/* <ActionSheetExammple /> */}
    </View>
  );
}
