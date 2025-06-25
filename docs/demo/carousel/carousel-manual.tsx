// registry/examples/carousel-manual.tsx
import { Button } from '@/components/ui/button';
import { Carousel, CarouselItem, useCarousel } from '@/components/ui/carousel';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react-native';
import React from 'react';

export function CarouselManual() {
  const totalSlides = 4;
  const { currentIndex, goToSlide, goToNext, goToPrevious } =
    useCarousel(totalSlides);

  const lessons = [
    {
      title: 'Introduction to React Native',
      progress: 100,
      duration: '15 min',
      color: '#3b82f6',
      bg: '#dbeafe',
    },
    {
      title: 'Component Architecture',
      progress: 75,
      duration: '20 min',
      color: '#10b981',
      bg: '#d1fae5',
    },
    {
      title: 'State Management',
      progress: 45,
      duration: '25 min',
      color: '#f59e0b',
      bg: '#fef3c7',
    },
    {
      title: 'Navigation Patterns',
      progress: 0,
      duration: '18 min',
      color: '#8b5cf6',
      bg: '#f3e8ff',
    },
  ];

  return (
    <View>
      {/* External Controls */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          paddingHorizontal: 4,
        }}
      >
        <Button
          variant='outline'
          size='sm'
          onPress={goToPrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={16} />
          <Text>Previous</Text>
        </Button>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <Button
              key={index}
              variant={currentIndex === index ? 'default' : 'outline'}
              size='sm'
              onPress={() => goToSlide(index)}
              style={{ minWidth: 40 }}
            >
              <Text>{index + 1}</Text>
            </Button>
          ))}
        </View>

        <Button
          variant='outline'
          size='sm'
          onPress={goToNext}
          disabled={currentIndex === totalSlides - 1}
        >
          <Text>Next</Text>
          <ChevronRight size={16} />
        </Button>
      </View>

      {/* Carousel */}
      <Carousel
        showIndicators={false}
        onIndexChange={(index) => goToSlide(index)}
      >
        {lessons.map((lesson, index) => (
          <CarouselItem key={index}>
            <View
              style={{
                backgroundColor: lesson.bg,
                padding: 24,
                minHeight: 200,
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text
                  variant='title'
                  style={{
                    color: lesson.color,
                    fontSize: 20,
                    marginBottom: 12,
                  }}
                >
                  {lesson.title}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 16,
                  }}
                >
                  <Text style={{ color: lesson.color, fontSize: 14 }}>
                    {lesson.duration}
                  </Text>
                  <View
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: lesson.color,
                      opacity: 0.5,
                    }}
                  />
                  <Text style={{ color: lesson.color, fontSize: 14 }}>
                    {lesson.progress}% complete
                  </Text>
                </View>
              </View>

              {/* Progress Bar */}
              <View>
                <View
                  style={{
                    height: 8,
                    backgroundColor: 'white',
                    borderRadius: 4,
                    overflow: 'hidden',
                    marginBottom: 16,
                  }}
                >
                  <View
                    style={{
                      height: '100%',
                      width: `${lesson.progress}%`,
                      backgroundColor: lesson.color,
                      borderRadius: 4,
                    }}
                  />
                </View>

                <Text
                  style={{
                    color: lesson.color,
                    fontSize: 14,
                    textAlign: 'center',
                    opacity: 0.8,
                  }}
                >
                  Lesson {index + 1} of {totalSlides}
                </Text>
              </View>
            </View>
          </CarouselItem>
        ))}
      </Carousel>

      {/* Reset Button */}
      <View style={{ alignItems: 'center', marginTop: 16 }}>
        <Button variant='ghost' size='sm' onPress={() => goToSlide(0)}>
          <RotateCcw size={16} />
          <Text>Reset to Start</Text>
        </Button>
      </View>
    </View>
  );
}
