import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { ScrollView } from '@/components/ui/scroll-view';
import { Select } from '@/components/ui/select';
import { Separator } from '@/components/ui/seperator';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { Camera } from 'lucide-react-native';
import { useState } from 'react';

export const Test = () => {
  // const basicSheet = useBottomSheet();
  // const multiSnapSheet = useBottomSheet();
  // const formSheet = useBottomSheet();

  const [checked, setChecked] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        gap: 16,
        paddingTop: 200,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Select
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
        ]}
      />

      <Skeleton width={60} height={60} style={{ borderRadius: 999 }} />

      <View>
        <Text variant='h1'>Hello</Text>
      </View>

      <Button>Hello</Button>

      {/* <Button onPress={basicSheet.open}>Open Basic Sheet</Button>

      <Button onPress={multiSnapSheet.open} variant='secondary'>
        Open Multi-Snap Sheet
      </Button>

      <Button onPress={formSheet.open} variant='outline'>
        Open Form Sheet
      </Button> */}

      {/* Basic Bottom Sheet */}
      {/* <BottomSheet
        isVisible={basicSheet.isVisible}
        onClose={basicSheet.close}
        snapPoints={['40%']}
      >
        <View style={{ padding: 16, alignItems: 'center' }}>
          <Text type='subtitle'>Basic Bottom Sheet</Text>
          <Text style={{ textAlign: 'center', marginVertical: 12 }}>
            This is a basic bottom sheet with a single snap point at 40% of
            screen height.
          </Text>
          <Button onPress={basicSheet.close} variant='outline'>
            Close Sheet
          </Button>
        </View>
      </BottomSheet> */}

      <ModeToggle />

      <Icon IconComponent={Camera} size={48} />

      <Avatar>
        <AvatarImage
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
        />

        <AvatarFallback>
          <Text>AB</Text>
        </AvatarFallback>
      </Avatar>

      <Badge>Hello</Badge>

      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <Text>This is a card content area.</Text>
          <CardDescription>This is a card description area.</CardDescription>
        </CardContent>
        <CardFooter>
          <Button variant='destructive'>Click Me</Button>
        </CardFooter>
      </Card>

      <Checkbox
        checked={checked}
        onCheckedChange={setChecked}
        disabled={false}
        label='Checkbox'
      />

      <View>
        <Label>Input</Label>
        <Input placeholder='Enter text here' />
      </View>

      {/* <Progress value={50} /> */}

      <Separator />

      <Switch />
    </ScrollView>
  );
};
