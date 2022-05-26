import React, { useEffect } from 'react'
import { View, Image, StyleSheet, ScrollView, ImageStyle } from 'react-native'
import { Card, Header } from '@rneui/base'
import { Block, Text, LoadingView } from '@@/components'
import { useSelector, useDispatch } from 'react-redux'
import * as articleActions from '@@/actions/article'
import { RootState } from '@@/types'
import _ from 'lodash'

export const ArticleListScreen = () => {
  const {
    article: { loading, articles },
  } = useSelector<RootState, RootState>(state => state)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!loading && !articles) {
      dispatch(articleActions.loadFirst())
    }
  }, [])

  console.log('===article', JSON.stringify(articles))

  return (
    <ScrollView style={styles.container}>
      <Header
        backgroundImageStyle={{}}
        barStyle="default"
        centerComponent={{
          text: 'ARTICLES',
          style: { color: '#fff' },
        }}
        centerContainerStyle={{}}
        leftContainerStyle={{}}
        linearGradientProps={{}}
        placement="center"
        rightComponent={{ icon: 'home', color: '#fff' }}
        rightContainerStyle={{}}
        statusBarProps={{}}
      />
      {loading && <LoadingView />}
      {!loading &&
        articles &&
        _.map(articles, article => (
          <View key={article.slug} style={styles.card}>
            {article.author && (
              <Image
                style={styles.cardThumbnail as ImageStyle}
                resizeMode="cover"
                source={{
                  uri: article.author?.image,
                }}
              />
            )}
            <View style={styles.cardContent}>
              <Text h5 bold>
                {article.title}
              </Text>
              <Card.Divider />
              <Text>{article.description}</Text>
            </View>
          </View>
        ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {},
  card: Block.create().row().card().box().shadow().mh(10).mv(10).value,
  cardThumbnail: Block.create()
    .width(70)
    .height(70)
    .mr(10)
    .backgroundColor('#f00').value,
  cardContent: Block.create().flex(1).value,
})
