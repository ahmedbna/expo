import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BottomSheet, useBottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { ScrollView } from '@/components/ui/scroll-view';
import { Select } from '@/components/ui/select';
import { Separator } from '@/components/ui/seperator';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Camera } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import { Toggle } from './ui/toggle';

export const Test = () => {
  const bottomSheet = useBottomSheet();
  const settingsSheet = useBottomSheet();
  const bottom = useBottomTabBarHeight();

  const [checked, setChecked] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [progress, setProgress] = useState(50);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<Date | undefined>();
  const [selectedDateTime, setSelectedDateTime] = useState<Date | undefined>();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        paddingTop: 100,
        paddingBottom: bottom + 20, // Add bottom padding for better spacing
      }}
    >
      <View
        style={{
          gap: 16,
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100%', // Use minHeight instead of flex: 1
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
          <Text variant='heading'>Hello</Text>
        </View>

        {/* Date only picker */}
        <View style={{ gap: 8 }}>
          <Text variant='subtitle'>Date Picker</Text>
          <DatePicker
            mode='date'
            value={selectedDate}
            onChange={setSelectedDate}
            placeholder='Select a date'
          />
          {selectedDate && (
            <Text variant='caption'>
              Selected: {selectedDate.toLocaleDateString()}
            </Text>
          )}
        </View>

        {/* Time only picker */}
        <View style={{ gap: 8 }}>
          <Text variant='subtitle'>Time Picker</Text>
          <DatePicker
            mode='time'
            value={selectedTime}
            onChange={setSelectedTime}
            placeholder='Select a time'
          />
          {selectedTime && (
            <Text variant='caption'>
              Selected:{' '}
              {selectedTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          )}
        </View>

        {/* Date and time picker */}
        <View style={{ gap: 8 }}>
          <Text variant='subtitle'>Date & Time Picker</Text>
          <DatePicker
            mode='datetime'
            value={selectedDateTime}
            onChange={setSelectedDateTime}
            placeholder='Select date and time'
          />
          {selectedDateTime && (
            <Text variant='caption'>
              Selected: {selectedDateTime.toLocaleDateString()} at{' '}
              {selectedDateTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          )}
        </View>

        {/* Disabled picker */}
        <View style={{ gap: 8 }}>
          <Text variant='subtitle'>Disabled Picker</Text>
          <DatePicker
            mode='date'
            disabled
            placeholder='This picker is disabled'
          />
        </View>

        {/* With minimum and maximum dates */}
        <View style={{ gap: 8 }}>
          <Text variant='subtitle'>With Date Constraints</Text>
          <DatePicker
            mode='date'
            value={selectedDate}
            onChange={setSelectedDate}
            placeholder='Only future dates allowed'
            minimumDate={new Date()}
            maximumDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)} // 1 year from now
          />
        </View>

        <View style={{ gap: 16 }}>
          <Button onPress={bottomSheet.open}>Open Simple Bottom Sheet</Button>

          <Button onPress={settingsSheet.open} variant='outline'>
            Open Settings Sheet
          </Button>
        </View>

        {/* Simple Bottom Sheet */}
        <BottomSheet
          isVisible={bottomSheet.isVisible}
          onClose={bottomSheet.close}
          title='Simple Bottom Sheet'
          snapPoints={[0.3, 0.6]}
        >
          <View style={{ gap: 16 }}>
            <Text variant='subtitle'>Welcome to the bottom sheet!</Text>
            <Text>
              This is a simple bottom sheet with some content. You can drag it
              up and down to resize it, or swipe down to dismiss it.
            </Text>
            <Button onPress={bottomSheet.close}>Close Sheet</Button>
          </View>
        </BottomSheet>

        {/* Settings Bottom Sheet */}
        <BottomSheet
          isVisible={settingsSheet.isVisible}
          onClose={settingsSheet.close}
          title='Settings'
          snapPoints={[0.4, 0.7, 0.9]}
          enableBackdropDismiss={false}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ gap: 16 }}>
              <Text variant='subtitle'>Appearance</Text>
              <View style={{ gap: 12 }}>
                <Button variant='outline'>Light Mode</Button>
                <Button variant='outline'>Dark Mode</Button>
                <Button variant='outline'>System</Button>
              </View>

              <Text variant='subtitle' style={{ marginTop: 24 }}>
                Notifications
              </Text>
              <View style={{ gap: 12 }}>
                <Button variant='outline'>Push Notifications</Button>
                <Button variant='outline'>Email Notifications</Button>
                <Button variant='outline'>SMS Notifications</Button>
              </View>

              <Text variant='subtitle' style={{ marginTop: 24 }}>
                Account
              </Text>
              <View style={{ gap: 12 }}>
                <Button variant='outline'>Profile Settings</Button>
                <Button variant='outline'>Privacy Settings</Button>
                <Button variant='destructive'>Sign Out</Button>
              </View>

              <Button onPress={settingsSheet.close} style={{ marginTop: 24 }}>
                Done
              </Button>
            </View>
          </ScrollView>
        </BottomSheet>

        <Button>Hello</Button>

        <View style={{ width: '100%' }}>
          <Tabs defaultValue='overview' style={{ flex: 1 }}>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='analytics'>Analytics</TabsTrigger>
              <TabsTrigger value='reports'>Reports</TabsTrigger>
              <TabsTrigger value='notifications' disabled>
                Notifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value='overview'>
              <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: 16 }}>
                  <Text variant='title' style={{ marginBottom: 12 }}>
                    Dashboard Overview
                  </Text>
                  <Text variant='body' style={{ marginBottom: 16 }}>
                    Welcome to your dashboard! Here's a quick overview of your
                    recent activity.
                  </Text>

                  <View
                    style={{
                      padding: 16,
                      borderRadius: 8,
                      marginBottom: 16,
                    }}
                  >
                    <Text variant='subtitle' style={{ marginBottom: 8 }}>
                      Quick Stats
                    </Text>
                    <Text variant='body'>• 24 new messages</Text>
                    <Text variant='body'>• 3 pending tasks</Text>
                    <Text variant='body'>• 12 completed projects</Text>
                  </View>

                  <Button>View Details</Button>
                </View>
              </ScrollView>
            </TabsContent>

            <TabsContent value='analytics'>
              <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: 16 }}>
                  <Text variant='title' style={{ marginBottom: 12 }}>
                    Analytics Dashboard
                  </Text>
                  <Text variant='body' style={{ marginBottom: 16 }}>
                    Track your performance metrics and insights.
                  </Text>

                  <View
                    style={{
                      padding: 16,
                      borderRadius: 8,
                      marginBottom: 16,
                    }}
                  >
                    <Text variant='subtitle' style={{ marginBottom: 8 }}>
                      This Month
                    </Text>
                    <Text variant='body'>• 1,234 page views</Text>
                    <Text variant='body'>• 456 unique visitors</Text>
                    <Text variant='body'>• 78% engagement rate</Text>
                  </View>

                  <Button variant='outline'>Export Data</Button>
                </View>
              </ScrollView>
            </TabsContent>

            <TabsContent value='reports'>
              <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: 16 }}>
                  <Text variant='title' style={{ marginBottom: 12 }}>
                    Reports Center
                  </Text>
                  <Text variant='body' style={{ marginBottom: 16 }}>
                    Generate and download your reports here.
                  </Text>

                  <View
                    style={{
                      backgroundColor: '#fef3c7',
                      padding: 16,
                      borderRadius: 8,
                      marginBottom: 16,
                    }}
                  >
                    <Text variant='subtitle' style={{ marginBottom: 8 }}>
                      Available Reports
                    </Text>
                    <Text variant='body'>• Weekly Summary</Text>
                    <Text variant='body'>• Monthly Analytics</Text>
                    <Text variant='body'>• Quarterly Review</Text>
                  </View>

                  <Button variant='secondary'>Generate Report</Button>
                </View>
              </ScrollView>
            </TabsContent>
          </Tabs>
        </View>

        <Alert>
          <AlertTitle>Alert Title</AlertTitle>
          <AlertDescription>
            Our flagship product combines cutting-edge technology with sleek
            design. Built with premium materials, it offers unparalleled
            performance and reliability.
          </AlertDescription>
        </Alert>

        <Accordion type='single' collapsible defaultValue='item-1'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Product Information</AccordionTrigger>
            <AccordionContent>
              <Text variant='body'>
                Our flagship product combines cutting-edge technology with sleek
                design. Built with premium materials, it offers unparalleled
                performance and reliability.
              </Text>
              <Text variant='body' style={{ marginTop: 12 }}>
                Key features include advanced processing capabilities, and an
                intuitive user interface designed for both beginners and
                experts.
              </Text>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-2'>
            <AccordionTrigger>Shipping Details</AccordionTrigger>
            <AccordionContent>
              <Text variant='body'>
                We offer worldwide shipping through trusted courier partners.
                Standard delivery takes 3-5 business days, while express
                shipping ensures delivery within 1-2 business days.
              </Text>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-3'>
            <AccordionTrigger>Return Policy</AccordionTrigger>
            <AccordionContent>
              <Text variant='body'>
                We stand behind our products with a comprehensive 30-day return
                policy. If you're not completely satisfied, simply return the
                item in its original condition.
              </Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <ModeToggle />

        <Icon IconComponent={Camera} size={48} />

        <Toggle variant='outline'>B</Toggle>

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

        <Textarea />

        <Progress
          value={progress}
          interactive={true}
          onValueChange={setProgress}
          style={{ width: 200 }}
        />

        <Badge>Badge</Badge>

        <Card>
          <CardHeader>
            <Text variant='title'>Card Title</Text>
          </CardHeader>
          <CardContent>
            <Text>This is a card content area.</Text>
            <Text variant='caption'>This is a card description area.</Text>
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

        <View style={{ width: '100%' }}>
          <Label>Input</Label>
          <Input placeholder='Enter text here' />
        </View>

        <Separator />

        <Switch value={switchValue} onValueChange={setSwitchValue} />
      </View>
    </ScrollView>
  );
};
