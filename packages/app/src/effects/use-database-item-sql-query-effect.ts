import { useAppSelector, useAppDispatch } from '../hooks'
import { setSqlRunCode } from '../store'
import { useParams } from 'react-router-dom'

function useDatabaseItemSqlQueryEffect() {
  const { databaseId = '' } = useParams<{ databaseId: string }>()
  const { wh, sqlRunCodes } = useAppSelector((state) => state.container)
  const dispatch = useAppDispatch()

  const code = sqlRunCodes[databaseId] || ''

  const handleOnCodeChanged = (target = '') => {
    dispatch(setSqlRunCode({ id: databaseId, code: target }))
  }

  return {
    wh,
    code,
    handleOnCodeChanged,
  }
}

export default useDatabaseItemSqlQueryEffect
