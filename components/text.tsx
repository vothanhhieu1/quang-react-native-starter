import React from 'react'
import { Text as RNText } from 'react-native'
import normalize from '@@/libs/normalize'
import { colorOptions, COLORS, SIZES } from '@@/variables/platform'
import _ from 'lodash'

type TextProps = {
  children: any
  style?: any
  h1?: boolean
  h2?: boolean
  uppercase?: boolean
  h3?: boolean
  h4?: boolean
  h5?: boolean
  p?: boolean
  size?: number
  color?: string
  muted?: boolean
  bold?: boolean
  italic?: boolean
  center?: boolean
  numberOfLines?: number
  strikeThrough?: boolean
}

export const Text = (props: TextProps) => {
  const {
    style,
    h1,
    h2,
    h3,
    h4,
    h5,
    p,
    muted,
    size,
    uppercase,
    color,
    bold,
    italic,
    center,
    children,
    strikeThrough,
    ...rest
  } = props

  const colorStyle = (colorOptions as any)[`${color}Color`]
  const cacheStyle = React.useMemo(
    () => [
      { fontSize: SIZES.FONT },
      { color: COLORS.TEXT_COLOR },
      h1 && { fontSize: normalize(44), marginBottom: normalize(44) / 4 },
      h2 && { fontSize: normalize(38), marginBottom: normalize(38) / 4 },
      h3 && { fontSize: normalize(30), marginBottom: normalize(30) / 4 },
      h4 && { fontSize: normalize(24), marginBottom: normalize(24) / 4 },
      h5 && { fontSize: normalize(18), marginBottom: normalize(18) / 4 },
      p && { fontSize: normalize(14), marginBottom: normalize(14) / 4 },
      muted && { color: COLORS.MUTED },
      size && { fontSize: size },
      color && colorStyle,
      italic && { fontStyle: 'italic' },
      bold && { fontWeight: 'bold' },
      center && { textAlign: 'center' },
      style && style,
      strikeThrough && { textDecorationLine: 'line-through' },
    ],
    [],
  )

  return (
    <RNText style={cacheStyle} {...rest}>
      {_.isNumber(children) && String(children)}
      {_.isString(children) && uppercase && children.toUpperCase()}
      {_.isString(children) && !uppercase && children}
    </RNText>
  )
}
