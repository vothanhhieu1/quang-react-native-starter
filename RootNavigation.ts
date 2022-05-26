import * as React from 'react'
import {
  NavigationContainerRef,
  NavigationState,
  PartialState,
} from '@react-navigation/native'

export const navigationRef = React.createRef<NavigationContainerRef>()

export function navigate(name: string, params: any) {
  navigationRef.current?.navigate(name, params)
}

export function reset(state: PartialState<NavigationState> | NavigationState) {
  navigationRef.current?.reset(state)
}
