import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { BORDER_RADIUS } from '@/theme/globals';

export function ViewDemo() {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        width: 200,
        borderRadius: BORDER_RADIUS,
      }}
    >
      <Text>View</Text>
    </View>
  );
}
