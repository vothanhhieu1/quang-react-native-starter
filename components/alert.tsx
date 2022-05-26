import { Alert } from 'react-native'

interface ConfirmDialogParams {
  title: string
  content: string
  yes?: string
  no?: string
}

export const confirm = ({
  title,
  content,
  yes = 'Có',
  no = 'Không',
}: ConfirmDialogParams) =>
  new Promise(resolve => {
    Alert.alert(
      title,
      content,
      [
        {
          text: no,
          onPress: () => resolve(false),
          style: 'cancel',
        },
        { text: yes, onPress: () => resolve(true) },
      ],
      { cancelable: false },
    )
  })

interface AlertParams {
  title: string
  content: string
  ok?: string
}

export const alert = ({ title, content, ok = 'Ok' }: AlertParams) =>
  new Promise(resolve => {
    Alert.alert(title, content, [{ text: ok, onPress: () => resolve(true) }], {
      cancelable: false,
    })
  })
