import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

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
