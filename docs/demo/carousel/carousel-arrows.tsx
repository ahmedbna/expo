// registry/examples/carousel-arrows.tsx
import { Carousel, CarouselItem } from '@/components/ui/carousel';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { Award, Heart, Star, Zap } from 'lucide-react-native';
import React from 'react';

export function CarouselArrows() {
  const slides = [
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Built with the highest standards and attention to detail.',
      color: '#f59e0b',
      bg: '#fef3c7',
    },
    {
      icon: Heart,
      title: 'Loved by Users',
      description: 'Thousands of happy customers worldwide trust our products.',
      color: '#ef4444',
      bg: '#fee2e2',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for performance with smooth animations.',
      color: '#8b5cf6',
      bg: '#f3e8ff',
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized for excellence in design and functionality.',
      color: '#10b981',
      bg: '#d1fae5',
    },
  ];

  return (
    <Carousel showArrows showIndicators loop>
      {slides.map((slide, index) => {
        const name = slide.icon;
        return (
          <CarouselItem key={index}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 220,
                backgroundColor: slide.bg,
                padding: 20,
              }}
            >
              <name size={48} color={slide.color} />
              <Text
                variant='title'
                style={{
                  color: slide.color,
                  marginTop: 16,
                  marginBottom: 8,
                }}
              >
                {slide.title}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: slide.color,
                  fontSize: 14,
                  lineHeight: 20,
                }}
              >
                {slide.description}
              </Text>
            </View>
          </CarouselItem>
        );
      })}
    </Carousel>
  );
}
