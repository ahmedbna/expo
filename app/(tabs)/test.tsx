import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
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
import { Separator } from '@/components/ui/seperator';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { useModeToggle } from '@/hooks/useModeToggle';
import { Camera } from 'lucide-react-native';
import { useState } from 'react';

export default function TestScreen() {
  const { toggleMode } = useModeToggle();

  const [checked, setChecked] = useState(false);

  return (
    <ThemedView
      style={{
        flex: 1,
        gap: 16,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ThemedText>Hello</ThemedText>
      <Button>Hello</Button>

      <ThemedView style={{ width: '100%', padding: 16 }}>
        <Skeleton />
      </ThemedView>

      <ModeToggle />

      <Icon IconComponent={Camera} size={48} />

      <Avatar>
        <AvatarImage
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
        />

        <AvatarFallback>
          <ThemedText>AB</ThemedText>
        </AvatarFallback>
      </Avatar>

      <Badge>Hello</Badge>

      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <ThemedText>This is a card content area.</ThemedText>
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

      <ThemedView>
        <Label>Input</Label>
        <Input placeholder='Enter text here' />
      </ThemedView>

      {/* <Progress value={50} /> */}

      <Separator />

      <Switch />
    </ThemedView>
  );
}
