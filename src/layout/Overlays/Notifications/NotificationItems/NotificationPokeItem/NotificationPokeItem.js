import React from 'react'
import { Text } from '../../../../../components/ui/Text/Text'

export const NotificationPokeItem = ({sender_id: sender}) => {
  return (
    <Text>{`${sender.display_name} poked you!`}</Text>
  )
}
