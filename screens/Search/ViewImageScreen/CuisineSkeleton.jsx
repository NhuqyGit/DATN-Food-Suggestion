import { Skeleton } from 'moti/skeleton'
import React from 'react'
import { View } from 'react-native'

const CuisineSkeleton = ({ total }) => {
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
            height={60}
            width={'100%'}
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

export default CuisineSkeleton

