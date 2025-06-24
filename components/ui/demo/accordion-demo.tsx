// registry/examples/accordion-demo.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';
import { ScrollView } from 'react-native';

export function AccordionDemo() {
  return (
    <Accordion type='single' collapsible defaultValue='item-1'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          <Text>Yes. It adheres to the WAI-ARIA design pattern.</Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          <Text>
            Yes. It comes with default styles that matches the other components'
            aesthetic.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          <Text>
            Yes. It's animated by default, but you can disable it if you prefer.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// registry/examples/accordion-single.tsx
export function AccordionSingle() {
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger>What is React Native?</AccordionTrigger>
        <AccordionContent>
          <Text>
            React Native is a framework for building native mobile applications
            using React. It allows you to create mobile apps for iOS and Android
            using JavaScript and React components.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>What is Expo?</AccordionTrigger>
        <AccordionContent>
          <Text>
            Expo is a platform for making universal native apps that run on
            Android, iOS, and the web. It provides a set of tools and services
            built around React Native.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>What is TypeScript?</AccordionTrigger>
        <AccordionContent>
          <Text>
            TypeScript is a programming language developed by Microsoft. It is a
            strict syntactical superset of JavaScript and adds optional static
            type checking to the language.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// registry/examples/accordion-multiple.tsx
export function AccordionMultiple() {
  return (
    <Accordion type='multiple' defaultValue={['item-1', 'item-2']}>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Frontend Technologies</AccordionTrigger>
        <AccordionContent>
          <Text>
            Modern frontend development includes React, Vue, Angular, and many
            other frameworks that help build interactive user interfaces.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>Backend Technologies</AccordionTrigger>
        <AccordionContent>
          <Text>
            Backend development involves server-side technologies like Node.js,
            Python, Java, and databases to handle data and business logic.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>Mobile Development</AccordionTrigger>
        <AccordionContent>
          <Text>
            Mobile development can be done natively with Swift/Kotlin or with
            cross-platform solutions like React Native, Flutter, or Xamarin.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-4'>
        <AccordionTrigger>DevOps & Cloud</AccordionTrigger>
        <AccordionContent>
          <Text>
            DevOps practices and cloud platforms like AWS, Azure, and GCP help
            deploy, scale, and maintain applications efficiently.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// registry/examples/accordion-controlled.tsx
export function AccordionControlled() {
  const [value, setValue] = React.useState<string | string[]>('');

  return (
    <View>
      <Text variant='caption' style={{ marginBottom: 12 }}>
        Currently open: {value || 'None'}
      </Text>
      <Accordion
        type='single'
        collapsible
        value={value}
        onValueChange={setValue}
      >
        <AccordionItem value='settings'>
          <AccordionTrigger>Settings</AccordionTrigger>
          <AccordionContent>
            <Text>
              Configure your application preferences, notifications, and account
              settings here.
            </Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='privacy'>
          <AccordionTrigger>Privacy</AccordionTrigger>
          <AccordionContent>
            <Text>
              Manage your privacy settings, data sharing preferences, and
              visibility controls.
            </Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='security'>
          <AccordionTrigger>Security</AccordionTrigger>
          <AccordionContent>
            <Text>
              Set up two-factor authentication, change passwords, and review
              security logs.
            </Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
}
// registry/examples/accordion-faq.tsx
export function AccordionFAQ() {
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='shipping'>
        <AccordionTrigger>How long does shipping take?</AccordionTrigger>
        <AccordionContent>
          <Text>
            Standard shipping typically takes 3-5 business days. Express
            shipping is available for 1-2 business days delivery.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='returns'>
        <AccordionTrigger>What is your return policy?</AccordionTrigger>
        <AccordionContent>
          <Text>
            We offer a 30-day return policy for all items in original condition.
            Return shipping is free for defective items.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='warranty'>
        <AccordionTrigger>Do you offer warranty?</AccordionTrigger>
        <AccordionContent>
          <Text>
            Yes, all products come with a 1-year manufacturer warranty. Extended
            warranty options are available at checkout.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='support'>
        <AccordionTrigger>How can I contact support?</AccordionTrigger>
        <AccordionContent>
          <Text>
            You can reach our support team via email at support@example.com or
            through our live chat feature available 24/7.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// registry/examples/accordion-non-collapsible.tsx
export function AccordionNonCollapsible() {
  return (
    <Accordion type='single' defaultValue='step-1'>
      <AccordionItem value='step-1'>
        <AccordionTrigger>Step 1: Planning</AccordionTrigger>
        <AccordionContent>
          <Text>
            Start by defining your project requirements and creating a detailed
            plan. This includes wireframing and technical specifications.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='step-2'>
        <AccordionTrigger>Step 2: Development</AccordionTrigger>
        <AccordionContent>
          <Text>
            Begin the development process by setting up your environment and
            implementing the core features according to your plan.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='step-3'>
        <AccordionTrigger>Step 3: Testing</AccordionTrigger>
        <AccordionContent>
          <Text>
            Thoroughly test your application across different devices and
            scenarios to ensure it works as expected.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='step-4'>
        <AccordionTrigger>Step 4: Deployment</AccordionTrigger>
        <AccordionContent>
          <Text>
            Deploy your application to production and monitor its performance.
            Set up analytics and error tracking.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// registry/examples/accordion-styled.tsx
export function AccordionStyled() {
  return (
    <View
      style={{
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e9ecef',
      }}
    >
      <Accordion type='single' collapsible>
        <AccordionItem value='features'>
          <AccordionTrigger>🚀 Features</AccordionTrigger>
          <AccordionContent style={{ paddingLeft: 8 }}>
            <Text>
              • Cross-platform compatibility{'\n'}• TypeScript support{'\n'}•
              Theme system integration{'\n'}• Customizable animations
            </Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='performance'>
          <AccordionTrigger>⚡ Performance</AccordionTrigger>
          <AccordionContent style={{ paddingLeft: 8 }}>
            <Text>
              • Optimized rendering{'\n'}• Minimal re-renders{'\n'}• Smooth
              animations{'\n'}• Memory efficient
            </Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='accessibility'>
          <AccordionTrigger>♿ Accessibility</AccordionTrigger>
          <AccordionContent style={{ paddingLeft: 8 }}>
            <Text>
              • Screen reader support{'\n'}• Keyboard navigation{'\n'}• Focus
              management{'\n'}• ARIA attributes
            </Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
}

// Main demo screen combining all examples
export function AccordionDemoScreen() {
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <View style={{ gap: 32 }}>
        <View>
          <Text variant='heading' style={{ marginBottom: 16 }}>
            Accordion Examples
          </Text>

          <View style={{ gap: 24 }}>
            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Default (Single, Collapsible)
              </Text>
              <AccordionDemo />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Multiple Selection
              </Text>
              <AccordionMultiple />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Controlled State
              </Text>
              <AccordionControlled />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                FAQ Style
              </Text>
              <AccordionFAQ />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Non-Collapsible (Always One Open)
              </Text>
              <AccordionNonCollapsible />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Custom Styled
              </Text>
              <AccordionStyled />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
