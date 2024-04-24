import { useParams } from 'react-router-dom'

function useGetDatabaseId() {
  return useParams<{ databaseId: string }>()?.databaseId || ''
}

export default useGetDatabaseId
