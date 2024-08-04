import { Skeleton } from 'moti/skeleton'
import React from 'react'
import { View } from 'react-native'

const EventViewItemSkeleton = ({ total }) => {
  return (
    <>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            flex: 1,
            paddingHorizontal: 8,
            borderColor: '#D4D4D4',
          }}
        >
          <Skeleton
            show
            height={200}
            width={'98%'}
            colorMode='light'
            transition={{
              type: 'timing',
              duration: 4000,
            }}
            backgroundColor='#D4D4D4'
          />
        </View>
      ))}
    </>
  )
}

export default EventViewItemSkeleton

