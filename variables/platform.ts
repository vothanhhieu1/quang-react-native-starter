import { Platform, StyleSheet } from 'react-native'

const COLORS = {
  STATUS_OFF: '#9ea7ad',
  STATUS_STANDBY: '#2dccff',
  STATUS_NORMAL: '#56f000',
  STATUS_CAUTION: '#fce83a',
  STATUS_SERIOUS: '#ffb302',
  STATUS_CRITICAL: '#ffb302',
  WHITE: '#FFF',
  BACKGROUND: '#f8f8f8',
  BLACK: '#000000',
  GREY: '#898989',
  THEME: '#264e97',
  PRIMARY: '#00A599',
  INFO: '#0084ff',
  ERROR: '#f7956f',
  WARNING: '#ffe891',
  SUCCESS: '#69ca9c',
  TRANSPARENT: 'transparent',
  INPUT: '#dfdfdf',
  ROOM_CARD_BORDER: '#f3f2f2',
  PLACEHOLDER: '#9FA5AA',
  TEXT_COLOR: '#363739',
  NAV_BAR: '#F9F9F9',
  BLOCK: '#eeeeee',
  BLOCK_SHADOW: '#ffffff',
  MUTED: '#6d7174',
  NEUTRAL: 'rgba(255,255,255, 0.65)',
  FACEBOOK: '#3B5998',
  TWITTER: '#5BC0DE',
  DRIBBBLE: '#EA4C89',
  ERROR_BACKGROUND: '#faf3e8',
  WARNING_BACKGROUND: '#faf8e8',
  SUCCESS_BACKGROUND: '#f6fcf1',
  ICON: '#000000',
  MENU_ITEM_BORDER: '#cdd5db',
  ROOM_EXPIRY_TIMES: (time: number) => {
    if (time > 30) {
      return '#aaa'
    } else if (time > 0) {
      return '#f7956f'
    } else if (time <= 0) {
      return '#69ca9c'
    }
  },
  ORANGE: '#ED6C50',
}

const SIZES = {
  BASE: 16,
  FONT: 14,
  OPACITY: 0.8,
  IMAGE_BORDER_RADIUS: 5,
}

const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0

const colorOptions = StyleSheet.create({
  primaryColor: {
    color: COLORS.PRIMARY,
  },
  activeTintColorColor: {
    color: COLORS.PRIMARY,
  },
  themeColor: {
    color: COLORS.THEME,
  },
  infoColor: {
    color: COLORS.INFO,
  },
  errorColor: {
    color: COLORS.ERROR,
  },
  blackColor: {
    color: COLORS.BLACK,
  },
  whiteColor: {
    color: COLORS.WHITE,
  },
  grayColor: {
    color: COLORS.GREY,
  },
  warningColor: {
    color: COLORS.WARNING,
  },
  successColor: {
    color: COLORS.SUCCESS,
  },
  transparentColor: {
    color: COLORS.TRANSPARENT,
  },
})

export { SIZES, COLORS, keyboardVerticalOffset, colorOptions }
