// registry/examples/toast-variants.tsx
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
import React from 'react';

export function ToastVariants() {
  const { success, error, warning, info } = useToast();

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
      <Button
        onPress={() =>
          success('Success!', 'Your action was completed successfully.')
        }
        variant='outline'
      >
        Success
      </Button>

      <Button
        onPress={() =>
          error('Error!', 'Something went wrong. Please try again.')
        }
        variant='outline'
      >
        Error
      </Button>

      <Button
        onPress={() =>
          warning('Warning!', 'Please review your input before continuing.')
        }
        variant='outline'
      >
        Warning
      </Button>

      <Button
        onPress={() => info('Info', "Here's some helpful information for you.")}
        variant='outline'
      >
        Info
      </Button>
    </View>
  );
}
