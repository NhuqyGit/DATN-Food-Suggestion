import { View } from 'react-native'
import React from 'react'
import { Skeleton } from 'moti/skeleton'

const IngredientSkeletonItem = ({ total }) => {
  return (
    <View
      style={{
        gap: 8,
      }}
    >
      {Array.from({ length: total }).map((_, index) => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: 8,
            borderColor: '#D4D4D4',
          }}
        >
          <Skeleton
            show
            height={30}
            width={200}
            colorMode='light'
            transition={{
              type: 'timing',
              duration: 4000,
            }}
            backgroundColor='#D4D4D4'
          />

          <View
            style={{
              flexDirection: 'row',
              gap: 4,
            }}
          >
            <Skeleton
              show
              height={30}
              width={30}
              colorMode='light'
              transition={{
                type: 'timing',
                duration: 4000,
              }}
              backgroundColor='#D4D4D4'
            />
            <Skeleton
              show
              height={30}
              width={30}
              colorMode='light'
              transition={{
                type: 'timing',
                duration: 4000,
              }}
              backgroundColor='#D4D4D4'
            />
          </View>
        </View>
      ))}
    </View>
  )
}

export default IngredientSkeletonItem

