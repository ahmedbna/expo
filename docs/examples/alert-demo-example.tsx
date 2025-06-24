// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';

// import { ActionSheetDemo } from '@/docs/examples/action-sheet/action-sheet-demo';
import { ActionSheetDestructive } from '@/docs/demo/action-sheet/action-sheet-destructive';
// import { ActionSheetDisabled } from '@/docs/examples/action-sheet/action-sheet-disabled';
// import { ActionSheetHook } from '@/docs/examples/action-sheet/action-sheet-hook';
// import { ActionSheetIcons } from '@/docs/examples/action-sheet/action-sheet-icons';
// import { ActionSheetLong } from '@/docs/examples/action-sheet/action-sheet-long';
// import { ActionSheetStyled } from '@/docs/examples/action-sheet/action-sheet-styled';

// Main demo screen combining all examples
export function AlertExammple() {
  return (
    <View style={{ gap: 24 }}>
      {/* <View>
        <Text variant="title">Default</Text>
        <Text variant="caption" style={{ marginBottom: 16 }}>
          Basic action sheet with multiple options
        </Text>

        <ActionSheetDemo />
      </View> */}

      {/* <View>
        <Text variant="title">With Icons</Text>
        <Text variant="caption" style={{ marginBottom: 16 }}>
          Action sheet with icons for better visual hierarchy
        </Text>
        <ActionSheetIcons />
      </View> */}

      <View>
        <Text variant='title'>Destructive Actions</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Highlighting destructive actions with red styling
        </Text>
        <ActionSheetDestructive />
      </View>

      {/* <View>
        <Text variant="title">Disabled Options</Text>
        <Text variant="caption" style={{ marginBottom: 16 }}>
          Some options can be disabled based on context
        </Text>
        <ActionSheetDisabled />
      </View> */}

      {/* <View>
        <Text variant="title">Custom Styling</Text>
        <Text variant="caption" style={{ marginBottom: 16 }}>
          Customized appearance with different styling
        </Text>
        <ActionSheetStyled />
      </View> */}

      {/* <View>
        <Text variant="title">Long Options List</Text>
        <Text variant="caption" style={{ marginBottom: 16 }}>
          Scrollable list when there are many options
        </Text>
        <ActionSheetLong />
      </View> */}

      {/* <View>
        <Text variant="title">Using Hook</Text>
        <Text variant="caption" style={{ marginBottom: 16 }}>
          Simplified usage with the useActionSheet hook
        </Text>
        <ActionSheetHook />
      </View> */}
    </View>
  );
}
