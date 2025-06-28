// registry/examples/parallax-scrollview-product.tsx
import { ParallaxScrollView } from '@/components/ui/parallax-scrollview';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { Image } from 'expo-image';
import React from 'react';

export function ParallaxScrollViewProduct() {
  return (
    <ParallaxScrollView
      headerHeight={350}
      headerImage={
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop',
          }}
          style={{ width: '100%', height: '100%' }}
          contentFit='cover'
        />
      }
    >
      <View style={{ gap: 20 }}>
        <View style={{ gap: 8 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <View style={{ flex: 1 }}>
              <Text variant='heading'>Premium Running Shoes</Text>
              <Text style={{ color: '#6b7280', marginTop: 4 }}>
                Nike Air Zoom Series
              </Text>
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#dc2626',
              }}
            >
              $159.99
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={{ flexDirection: 'row', gap: 2 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Text key={star} style={{ color: '#fbbf24', fontSize: 16 }}>
                  ★
                </Text>
              ))}
            </View>
            <Text style={{ color: '#6b7280' }}>4.8 (2.1k reviews)</Text>
          </View>
        </View>

        <View style={{ gap: 8 }}>
          <Text variant='title'>Description</Text>
          <Text style={{ fontSize: 16, lineHeight: 24, color: '#4b5563' }}>
            Experience ultimate comfort and performance with these premium
            running shoes. Featuring advanced cushioning technology and
            breathable mesh construction for all-day comfort.
          </Text>
        </View>

        <View style={{ gap: 12 }}>
          <Text variant='title'>Available Sizes</Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            {['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'].map(
              (size) => (
                <View
                  key={size}
                  style={{
                    borderWidth: 1,
                    borderColor: '#d1d5db',
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 8,
                    minWidth: 50,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontWeight: '500' }}>US {size}</Text>
                </View>
              )
            )}
          </View>
        </View>

        <View style={{ gap: 12 }}>
          <Text variant='title'>Color Options</Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#1f2937',
                borderWidth: 2,
                borderColor: '#3b82f6',
              }}
            />
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#ffffff',
                borderWidth: 1,
                borderColor: '#d1d5db',
              }}
            />
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#dc2626',
              }}
            />
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#2563eb',
              }}
            />
          </View>
        </View>

        <View style={{ gap: 8 }}>
          <Text variant='title'>Features</Text>
          <View style={{ gap: 8 }}>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              <Text style={{ color: '#10b981' }}>✓</Text>
              <Text>Lightweight design for all-day wear</Text>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              <Text style={{ color: '#10b981' }}>✓</Text>
              <Text>Enhanced arch support</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#f9fafb',
            padding: 16,
            borderRadius: 8,
            gap: 12,
          }}
        >
          <Text variant='title'>Shipping & Returns</Text>
          <Text style={{ fontSize: 14, color: '#6b7280' }}>
            • Free shipping on orders over $100
          </Text>
          <Text style={{ fontSize: 14, color: '#6b7280' }}>
            • 30-day return policy
          </Text>
          <Text style={{ fontSize: 14, color: '#6b7280' }}>
            • 1-year manufacturer warranty
          </Text>
        </View>

        <View style={{ gap: 12, marginTop: 8 }}>
          <View
            style={{
              backgroundColor: '#3b82f6',
              paddingVertical: 16,
              paddingHorizontal: 24,
              borderRadius: 8,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
              Add to Cart
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#3b82f6',
              paddingVertical: 16,
              paddingHorizontal: 24,
              borderRadius: 8,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#3b82f6', fontSize: 16, fontWeight: '600' }}>
              Add to Wishlist
            </Text>
          </View>
        </View>
      </View>
    </ParallaxScrollView>
  );
}
