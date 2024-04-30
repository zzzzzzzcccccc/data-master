import React from 'react'
import { useGetDatabaseTableDetails } from '../../../hooks'
import styles from './database-item.module.scss'

function DatabaseItemTableDetails() {
  useGetDatabaseTableDetails()

  return <div className={styles.dbItemTableDetails}>table details</div>
}

export default DatabaseItemTableDetails
