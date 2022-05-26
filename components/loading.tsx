import React from 'react'
import { ActivityIndicator, View, useWindowDimensions } from 'react-native'

export const LoadingView = ({ style }: { style?: any }) => {
  const { width } = useWindowDimensions()
  return (
    <View
      style={[
        {
          flex: 1,
          width,
          height: 400,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}>
      <ActivityIndicator size={'large'} />
    </View>
  )
}
