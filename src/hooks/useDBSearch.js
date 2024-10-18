import useList from './useList'
import { commonSearch } from '@/api/db'

export default function useDBSearch(params = {
    tableName: '',
    search: {},
    sort: 'id',
    order: 'asc'
}) {
    const { tableName, search, sort, order } = params
    if (!tableName) {
        throw new Error('tableName is required')
    }
    return useList(commonSearch, {
        tableName,
        search,
        sort,
        order
    })
}
