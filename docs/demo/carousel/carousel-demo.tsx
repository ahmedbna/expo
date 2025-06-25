// registry/examples/carousel-demo.tsx
import { Carousel, CarouselItem } from '@/components/ui/carousel';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function CarouselDemo() {
  return (
    <Carousel autoPlay autoPlayInterval={4000} showIndicators>
      <CarouselItem>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 200,
            backgroundColor: '#f0f9ff',
          }}
        >
          <Text variant='title' style={{ color: '#0369a1' }}>
            Welcome to Slide 1
          </Text>
          <Text style={{ marginTop: 8, textAlign: 'center', color: '#0369a1' }}>
            This is a beautiful carousel component with auto-play enabled.
          </Text>
        </View>
      </CarouselItem>

      <CarouselItem>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 200,
            backgroundColor: '#f0fdf4',
          }}
        >
          <Text variant='title' style={{ color: '#166534' }}>
            Discover Slide 2
          </Text>
          <Text style={{ marginTop: 8, textAlign: 'center', color: '#166534' }}>
            Swipe left or right to navigate between slides manually.
          </Text>
        </View>
      </CarouselItem>

      <CarouselItem>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 200,
            backgroundColor: '#fefce8',
          }}
        >
          <Text variant='title' style={{ color: '#a16207' }}>
            Explore Slide 3
          </Text>
          <Text style={{ marginTop: 8, textAlign: 'center', color: '#a16207' }}>
            Touch the indicators below to jump to any slide.
          </Text>
        </View>
      </CarouselItem>
    </Carousel>
  );
}
