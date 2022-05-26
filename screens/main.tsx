import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS } from '@@/variables/platform'
import { Icon } from '@rneui/base'
import { ArticleListScreen } from './article/list'

const Tab = createBottomTabNavigator()

export const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.GREY,
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Articles':
              return (
                <Icon size={size} type="feather" name="home" color={color} />
              )
            case 'About':
              return (
                <Icon
                  size={size}
                  type="feather"
                  name="pie-chart"
                  color={color}
                />
              )
            case 'Profile':
              return (
                <Icon size={size} type="feather" name="users" color={color} />
              )
            default:
              return null
          }
        },
      })}>
      <Tab.Screen name="Articles" component={ArticleListScreen} />
      <Tab.Screen name="About" component={ArticleListScreen} />
      <Tab.Screen name="Profile" component={ArticleListScreen} />
    </Tab.Navigator>
  )
}
