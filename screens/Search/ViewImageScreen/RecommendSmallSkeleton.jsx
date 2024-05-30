import { Skeleton } from 'moti/skeleton'
import React from 'react'
import { View } from 'react-native'

const RecommendSmallSkeleton = ({ total }) => {
  return (
    <>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 8,
            alignItems: 'flex-start',
            flex: 1,
            paddingHorizontal: 8,
            borderColor: '#D4D4D4',
          }}
        >
          <Skeleton
            show
            height={140}
            width={140}
            colorMode='light'
            transition={{
              type: 'timing',
              duration: 4000,
            }}
            backgroundColor='#D4D4D4'
          />

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 8,
            }}
          >
            <Skeleton
              show
              height={20}
              width={40}
              colorMode='light'
              transition={{
                type: 'timing',
                duration: 4000,
              }}
              backgroundColor='#D4D4D4'
            />
            <Skeleton
              show
              height={20}
              width={40}
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
    </>
  )
}

export default RecommendSmallSkeleton

