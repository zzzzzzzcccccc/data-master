import { useParams } from 'react-router-dom'

function useGetDatabaseTableName() {
  return useParams<{ table: string }>()?.table || ''
}

export default useGetDatabaseTableName
