import React from 'react'
import { type ConnectionConfiguration } from '@dm/core'

export interface ConnectionItemProps {
  item: ConnectionConfiguration
  active?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
