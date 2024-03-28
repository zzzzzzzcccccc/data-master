import React from 'react'
import AntdIcon from '@ant-design/icons'
import { IconProps } from './types'

function Icon(props: IconProps) {
  const { style, className, target, mode = 'svg' } = props

  if (mode === 'svg') {
    return (
      <AntdIcon style={style} className={className}>
        <use xlinkHref={`#${target}`} />
      </AntdIcon>
    )
  }

  return <img className={className} style={style} src={target} alt="icon" />
}

export default Icon
