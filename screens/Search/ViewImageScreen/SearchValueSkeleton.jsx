import { Skeleton } from 'moti/skeleton'
import React from 'react'
import { View } from 'react-native'

const SearchValueSkeleton = ({ total }) => {
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
            padding: 4,
            paddingHorizontal: 16,
            borderColor: '#D4D4D4',
          }}
        >
          <Skeleton
            show
            height={400}
            width={'95%'}
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

export default SearchValueSkeleton

