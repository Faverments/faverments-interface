import { ApolloError } from '@apollo/client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ZAPPER_WEB_API } from 'services/config'
import { zapperClient } from 'services/zapper/apollo/client'
import { nftUsersCollections, nftUsersTokens } from 'services/zapper/apollo/queries'
import useSWRInfinite from 'swr/infinite'

import { EdgeUserCollection, EdgeUserToken, NftUsersCollections, NftUsersTokens } from '../apollo/types'
import { Network } from '../types/models'

export function useGetNftUsersCollections({
  address,
  network,
  minCollectionValueUsd = 0,
  first = 24,
  collections = [],
  search = '',
  after = '',
}: {
  address: string
  network: keyof typeof Network
  minCollectionValueUsd?: number
  first?: number
  collections?: string[]
  search?: string
  after?: string
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ApolloError>()
  const [data, setData] = useState<EdgeUserCollection[]>([])
  const fetchRef = useRef(0)

  useEffect(() => {
    fetchRef.current = ++fetchRef.current
    if (fetchRef.current === 2) return
    const variables: any = {
      owners: [address],
      network: network,
      minCollectionValueUsd,
      first,
      collections,
      search,
    }
    if (after) {
      variables['after'] = after
    }
    const fetcher = async () => {
      setError(undefined)
      setIsLoading(true)
      const result = await zapperClient.query<NftUsersCollections>({
        query: nftUsersCollections,
        variables: variables,
      })
      setData(pre => [...pre, ...result.data.nftUsersCollections.edges])
      setIsLoading(false)
      if (result.error) {
        setError(result.error)
      }
    }
    fetcher()
  }, [address, network, minCollectionValueUsd, first, JSON.stringify(collections), search, after])
  return useMemo(() => ({ isLoading, data, error, setData }), [isLoading, error, data])
}

export function useGetNftUsersCollectionsNormal({
  address,
  network,
  minCollectionValueUsd = 0,
  first = 24,
  collections = [],
  search = '',
  after = '',
}: {
  address: string
  network: keyof typeof Network
  minCollectionValueUsd?: number
  first?: number
  collections?: string[]
  search?: string
  after?: string
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ApolloError>()
  const [data, setData] = useState<EdgeUserCollection[]>([])
  useEffect(() => {
    const variables: any = {
      owners: [address],
      network: network,
      minCollectionValueUsd,
      first,
      collections,
      search,
    }
    if (after) {
      variables['after'] = after
    }
    const fetcher = async () => {
      setError(undefined)
      setIsLoading(true)
      const result = await zapperClient.query<NftUsersCollections>({
        query: nftUsersCollections,
        variables: variables,
      })
      setData(result.data.nftUsersCollections.edges)
      setIsLoading(false)
      if (result.error) {
        setError(result.error)
      }
    }
    fetcher()
  }, [address, network, minCollectionValueUsd, first, JSON.stringify(collections), search, after])
  return useMemo(() => ({ isLoading, data, error }), [isLoading, error, data])
}

export function useGetNftUsersTokens({
  address,
  network,
  minEstimatedValueUsd = 0,
  first = 24,
  after = '',
  collections = [],
}: {
  address: string
  network: keyof typeof Network
  minEstimatedValueUsd?: number
  first?: number
  after?: string
  collections?: string[]
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ApolloError>()
  const [data, setData] = useState<EdgeUserToken[]>([])
  const fetchRef = useRef(0)

  useEffect(() => {
    fetchRef.current = ++fetchRef.current
    if (fetchRef.current === 2) return
    const variables: any = {
      owners: [address],
      network: network,
      minEstimatedValueUsd,
      first,
      collections,
    }
    if (after) {
      variables.after = after
    }
    const fetcher = async () => {
      try {
        setError(undefined)
        setIsLoading(true)
        // const result = await zapperClient.query<NftUsersTokens>({
        //   query: nftUsersTokens,
        //   variables: variables,
        // })
        const result: {
          data: NftUsersTokens
        } = await fetch(`${ZAPPER_WEB_API}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: nftUsersTokens.loc?.source.body,
            variables: variables,
          }),
        }).then(res => res.json())
        setData(pre => [...pre, ...result.data.nftUsersTokens.edges])
        setIsLoading(false)
      } catch (error) {
        setError(error)
      }
    }
    fetcher()
  }, [address, network, minEstimatedValueUsd, first, after, JSON.stringify(collections)])
  return useMemo(() => ({ isLoading, data, error, setData }), [isLoading, error, data])
}

export function useGetNftUsersTokensNormal({
  address,
  network,
  minEstimatedValueUsd = 0,
  first = 24,
  after = '',
  collections = [],
}: {
  address: string
  network: keyof typeof Network
  minEstimatedValueUsd?: number
  first?: number
  after?: string
  collections?: string[]
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ApolloError>()
  const [data, setData] = useState<EdgeUserToken[]>([])
  useEffect(() => {
    const variables: any = {
      owners: [address],
      network: network,
      minEstimatedValueUsd,
      first,
      collections,
    }
    if (after) {
      variables.after = after
    }
    const fetcher = async () => {
      setError(undefined)
      setIsLoading(true)
      // const result = await zapperClient.query<NftUsersTokens>({
      //   query: nftUsersTokens,
      //   variables: variables,
      // })
      const result: any = await fetch(`${ZAPPER_WEB_API}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: nftUsersTokens.loc?.source.body,
          variables: variables,
        }),
      }).then(res => res.json())
      setData(result.data.nftUsersTokens.edges)
      setIsLoading(false)
      if (result.error) {
        setError(result.error)
      }
    }
    fetcher()
  }, [address, network, minEstimatedValueUsd, first, after, JSON.stringify(collections)])
  return useMemo(() => ({ isLoading, data, error }), [isLoading, error, data])
}

export function useGetNftUsersTokensSwrInfinite({
  address,
  network,
  minEstimatedValueUsd = 0,
  first = 24,
  after = '',
  collections = [],
}: {
  address: string
  network: keyof typeof Network
  minEstimatedValueUsd?: number
  first?: number
  after?: string
  collections?: string[]
}) {
  const variables: any = {
    owners: [address],
    network: network,
    minEstimatedValueUsd,
    first,
    collections,
  }
  // if (after) {
  //   variables.after = after
  // }

  const body = {
    query: nftUsersTokens.loc?.source.body,
    variables: variables,
  }

  const fetcher = async (stringBody: any) => {
    return await fetch(`${ZAPPER_WEB_API}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: stringBody,
    })
      .then(res => res.json())
      .then(result => result.data.nftUsersTokens.edges)
  }

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null // reached the end

    // first page, we don't have `previousPageData`
    if (pageIndex === 0) return JSON.stringify(body)

    // add the cursor to the API endpoint
    body.variables.after = previousPageData[previousPageData.length - 1].cursor
    return JSON.stringify(body)
  }

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher)

  const PAGE_SIZE = first

  const issues = data ? [].concat(...data) : []
  const isLoadingInitialData = !data && !error
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)
  const isRefreshing = isValidating && data && data.length === size
  return {
    data: issues as EdgeUserToken[],
    size,
    setSize,
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
  }
}

export function useGetNftUsersCollectionsSwrInfinite({
  address,
  network,
  minCollectionValueUsd = 0,
  first = 24,
  collections = [],
  search = '',
  after = '',
}: {
  address: string
  network: keyof typeof Network
  minCollectionValueUsd?: number
  first?: number
  collections?: string[]
  search?: string
  after?: string
}) {
  const variables: any = {
    owners: [address],
    network: network,
    minCollectionValueUsd,
    first,
    collections,
    search,
  }

  const body = {
    query: nftUsersCollections.loc?.source.body,
    variables: variables,
  }

  const fetcher = async (stringBody: any) => {
    return await fetch(`${ZAPPER_WEB_API}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: stringBody,
    })
      .then(res => res.json())
      .then(result => result.data.nftUsersCollections.edges)
  }

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null // reached the end

    // first page, we don't have `previousPageData`
    if (pageIndex === 0) return JSON.stringify(body)

    // add the cursor to the API endpoint
    body.variables.after = previousPageData[previousPageData.length - 1].cursor
    return JSON.stringify(body)
  }

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher)

  const PAGE_SIZE = first

  const issues = data ? [].concat(...data) : []
  const isLoadingInitialData = !data && !error
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)
  const isRefreshing = isValidating && data && data.length === size
  return {
    data: issues as EdgeUserCollection[],
    size,
    setSize,
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
  }
}
