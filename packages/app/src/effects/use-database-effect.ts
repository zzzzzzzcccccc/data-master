import { useParams } from 'react-router-dom'

function useDatabaseEffect() {
  const { databaseId = '' } = useParams<{ databaseId: string }>()

  return {
    databaseId,
  }
}

export default useDatabaseEffect
