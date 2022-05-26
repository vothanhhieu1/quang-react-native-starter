import React, { FC, useState } from 'react'
import { View, Platform, StyleSheet, ScrollView } from 'react-native'
import { Divider, Button, Card, Text } from '@rneui/base'
import { Block, TextStyleFactory, TextInput } from '@@/components'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { useForm } from 'react-hook-form'

export const LoginScreen = () => {

  const navigation = useNavigation()
  const { control, handleSubmit } = useForm()

  const onNext = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      }),
    )
  }

  const onSubmit = (value: any) => {
    //TODO Login
  }

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title>WELCOME TO NEXPANDO</Card.Title>
        <Card.Divider />
        <View>
          <View>
            <Text style={styles.description}>
              Please login with username & password
            </Text>
          </View>
          <View>
            <TextInput
              placeholder={'Mã thiết bị'}
              control={control}
              name="deviceId"
              rules={{ required: 'Vui lòng nhập mã thiết bị' }}
            />
            <TextInput
              placeholder={'Mã Nhân viên'}
              control={control}
              name="employeeCode"
            />
            <Button
              onPress={handleSubmit(onSubmit)}
            >
              {'ĐĂNG NHẬP'}
            </Button>
            <Divider />
          </View>
        </View>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {},
  card: Block.create().mt(100).value,
  description: TextStyleFactory.create().center().bold().value,
})
