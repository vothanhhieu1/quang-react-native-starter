import React, { FC } from 'react'
import { useController, Control } from 'react-hook-form'
import { Input } from '@rneui/base'

export type TextInputProps = {
  control: Control
  name: string
  placeholder?: string
  rules?: Record<string, any>
}

export const TextInput: FC<TextInputProps> = ({
  control,
  name,
  placeholder,
  rules,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
  })
  return (
    <Input
      placeholder={placeholder}
      value={field.value}
      autoCapitalize="none"
      onChangeText={field.onChange}
      errorMessage={error?.message}
    />
  )
}
