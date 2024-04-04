import React from 'react'

export interface SliderMenuProps {
  title: React.ReactNode
  icon: string
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  content?: React.ReactNode
}
