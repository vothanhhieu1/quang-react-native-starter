import { StyleSheet, Dimensions, ViewStyle, TextStyle } from 'react-native'
import { colorOptions, COLORS, SIZES } from '@@/variables/platform'
import normalize from '@@/libs/normalize'

export class Block {
  value = {} as ViewStyle
  static create() {
    return new Block()
  }

  row() {
    this.value.flexDirection = 'column'
    return this
  }

  flex(flex: number) {
    this.value.flex = flex
    return this
  }

  center() {
    this.value.alignItems = 'center'
    this.value.alignSelf = 'center'
    return this
  }

  middle() {
    this.value.alignItems = 'center'
    this.value.justifyContent = 'center'
    return this
  }

  top() {
    this.value.alignItems = 'flex-start'
    this.value.alignSelf = 'flex-start'
    return this
  }

  bottom() {
    this.value.alignItems = 'flex-end'
    this.value.alignSelf = 'flex-end'
    return this
  }

  right() {
    this.value.alignItems = 'flex-end'
    return this
  }

  left() {
    this.value.alignItems = 'flex-start'
    return this
  }

  shadow() {
    this.value.backgroundColor = COLORS.WHITE
    this.value.shadowOffset = {
      width: 0,
      height: 2,
    }
    this.value.shadowRadius = 4
    this.value.marginBottom = 16
    this.value.shadowOpacity = 0.1
    this.value.elevation = 1
    return this
  }

  space(space: string) {
    this.value.justifyContent = `space-${space}` as any
    return this
  }

  fluid() {
    this.value.width = 'auto'
    return this
  }

  height(height: number) {
    this.value.height = height
    return this
  }

  mv(mv: number) {
    this.value.marginVertical = mv
    return this
  }

  mh(mh: number) {
    this.value.marginHorizontal = mh
    return this
  }

  ml(ml: number | string) {
    this.value.marginLeft = ml
    return this
  }

  mr(mr: number | string) {
    this.value.marginRight = mr
    return this
  }

  mt(mt: number | string) {
    this.value.marginTop = mt
    return this
  }

  mb(mb: number | string) {
    this.value.marginBottom = mb
    return this
  }

  pv(pv: number) {
    this.value.paddingVertical = pv
    return this
  }

  ph(ph: number) {
    this.value.paddingHorizontal = ph
    return this
  }

  pl(pl: number | string) {
    this.value.paddingLeft = pl
    return this
  }

  pr(pr: number | string) {
    this.value.paddingRight = pr
    return this
  }

  pt(pt: number | string) {
    this.value.paddingTop = pt
    return this
  }

  pb(pb: number | string) {
    this.value.paddingBottom = pb
    return this
  }

  shadowColor(shadowColor: string) {
    this.value.shadowColor = shadowColor
    return this
  }

  borderBottom() {
    this.value.borderBottomWidth = 1
    this.value.borderColor = COLORS.INPUT
    this.value.marginBottom = 10
    this.value.paddingBottom = 10
    return this
  }

  card() {
    this.value.borderWidth = SIZES.BASE * 0.05
    this.value.borderColor = COLORS.BLOCK
    this.value.borderRadius = 10
    return this
  }

  width(width: number | string) {
    this.value.width = width
    return this
  }

  grid() {
    this.value.flexDirection = 'row'
    this.value.flexWrap = 'wrap'
    return this
  }

  box() {
    this.value.padding = 16
    return this
  }

  shadowBottom() {
    this.value.padding = SIZES.BASE
    this.value.backgroundColor = COLORS.WHITE
    this.value.shadowOffset = {
      width: 0,
      height: 10,
    }
    this.value.shadowRadius = 6
    this.value.shadowOpacity = 0.1
    this.value.elevation = 4
    return this
  }

  backgroundColor(backgroundColor: string) {
    this.value.backgroundColor = backgroundColor
    return this
  }

  p(padding: number) {
    this.value.padding = padding
    return this
  }

  m(margin: number) {
    this.value.margin = margin
    return this
  }

  style(style: ViewStyle) {
    this.value = {
      ...this.value,
      ...style,
    }
    return this
  }
}

export class TextStyleFactory {
  value = {} as TextStyle
  static create() {
    return new TextStyleFactory()
  }

  h1() {
    const size = normalize(44)
    this.value.fontSize = size
    this.value.marginBottom = size / 4
    return this
  }

  h2() {
    const size = normalize(38)
    this.value.fontSize = size
    this.value.marginBottom = size / 4
    return this
  }

  h3() {
    const size = normalize(30)
    this.value.fontSize = size
    this.value.marginBottom = size / 4
    return this
  }

  h4() {
    const size = normalize(24)
    this.value.fontSize = size
    this.value.marginBottom = size / 4
    return this
  }

  h5() {
    const size = normalize(18)
    this.value.fontSize = size
    this.value.marginBottom = size / 4
    return this
  }

  p() {
    const size = normalize(14)
    this.value.fontSize = size
    this.value.marginBottom = size / 4
    return this
  }

  muted() {
    this.value.color = COLORS.MUTED
    return this
  }

  size(size: number) {
    this.value.fontSize = size
    return this
  }

  color(color: string) {
    this.value.color = (colorOptions as any)[`${color}Color`]
    return this
  }

  italic() {
    this.value.fontStyle = 'italic'
    return this
  }

  bold() {
    this.value.fontWeight = 'bold'
    return this
  }

  center() {
    this.value.textAlign = 'center'
    return this
  }

  strikeThrough() {
    this.value.textDecorationLine = 'line-through'
    return this
  }

  uppercase() {
    this.value.textTransform = 'uppercase'
    return this
  }

  style(style: TextStyle) {
    this.value = {
      ...this.value,
      ...style,
    }
    return this
  }
}
