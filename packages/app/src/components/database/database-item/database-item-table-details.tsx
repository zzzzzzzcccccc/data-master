import React from 'react'
import { useGetDatabaseTableDetails } from '../../../hooks'
import styles from './database-item.module.scss'

function DatabaseItemTableDetails() {
  const { tableDetailWidth } = useGetDatabaseTableDetails()

  return (
    <div className={styles.dbItemTableDetails} style={{ width: tableDetailWidth }}>
      table details
    </div>
  )
}

export default DatabaseItemTableDetails
