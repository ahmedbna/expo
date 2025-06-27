// registry/examples/toast-compact.tsx
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
import React from 'react';

export function ToastCompact() {
  const { toast } = useToast();

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
      <Button
        onPress={() =>
          toast({
            variant: 'success',
          })
        }
        variant='outline'
      >
        Success Icon Only
      </Button>

      <Button
        onPress={() =>
          toast({
            variant: 'error',
          })
        }
        variant='outline'
      >
        Error Icon Only
      </Button>

      <Button
        onPress={() =>
          toast({
            variant: 'warning',
          })
        }
        variant='outline'
      >
        Warning Icon Only
      </Button>

      <Button
        onPress={() =>
          toast({
            variant: 'info',
          })
        }
        variant='outline'
      >
        Info Icon Only
      </Button>

      <Button
        onPress={() =>
          toast({
            title: 'Title only',
          })
        }
        variant='outline'
      >
        Title Only
      </Button>
    </View>
  );
}
