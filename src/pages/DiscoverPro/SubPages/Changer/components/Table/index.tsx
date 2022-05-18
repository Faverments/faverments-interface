// import React from 'react'
// import { DiscoverProFilter, DiscoverProSortSettings } from 'pages/DiscoverPro/index'

// export default function Table({
//   filter,
//   setFilter,
//   sortSettings,
//   setSortSettings,
// }: {
//   filter: DiscoverProFilter
//   setFilter: React.Dispatch<React.SetStateAction<DiscoverProFilter>>
//   sortSettings: DiscoverProSortSettings
//   setSortSettings: React.Dispatch<React.SetStateAction<DiscoverProSortSettings>>
// }) {
//   return <h1>Table</h1>
// }
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'
import { Box, Flex, Text } from 'rebass'
import { ExternalLink } from 'theme'
import { ChevronRight, X } from 'react-feather'
import useTheme from 'hooks/useTheme'
import { rgba } from 'polished'
import DiscoverIconTriangle from 'assets/svg/discover_icon_triangle.svg'
import useTopTrendingSoonTokensInCurrentNetwork, {
  TOP_TRENDING_TOKENS_MAX_ITEMS,
} from 'pages/DiscoverPro/SubPages/Changer/components/Table/useTopTrendingSoonTokensInCurrentNetwork'
import TopTrendingSoonTokenItem from 'pages/DiscoverPro/SubPages/Changer/components/Table/TopTrendingSoonTokenItem'
import { useMedia } from 'react-use'
import { TextTooltip } from 'pages/TrueSight/styled'
import DiscoverIcon from 'components/Icons/DiscoverIcon'
import { MouseoverTooltip } from 'components/Tooltip'
import { useShowTopTrendingSoonTokens, useToggleTopTrendingTokens } from 'state/user/hooks'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/actions'
import Modal from 'components/Modal'
import TrendingSoonTokenDetail from 'pages/TrueSight/components/TrendingSoonLayout/TrendingSoonTokenDetail'
import { TrueSightTokenData } from 'pages/TrueSight/hooks/useGetTrendingSoonData'
import useGetCoinGeckoChartData from 'pages/TrueSight/hooks/useGetCoinGeckoChartData'
import { TrueSightChartCategory, TrueSightTimeframe } from 'pages/TrueSight'
import MobileChartModal from 'pages/TrueSight/components/TrendingSoonLayout/MobileChartModal'
import TrendingSoonTokenItem from 'pages/TrueSight/components/TrendingSoonLayout/TrendingSoonTokenItem'
import useMixpanel, { MIXPANEL_TYPE } from 'hooks/useMixpanel'
import useGetPredictedDatesHistory from 'pages/DiscoverPro/hooks/useGetPredictedDatesHistory'
import Delayed from 'pages/DiscoverPro/SubPages/Changer/components/Table/Delayed'

const TopTrendingSoonTokensInCurrentNetwork = () => {
  const theme = useTheme()
  const { mixpanelHandler } = useMixpanel()
  const {
    trendingSoonTokens: topTrendingSoonTokens,
    isTrendingSoon1dDataLoading,
  } = useTopTrendingSoonTokensInCurrentNetwork()
  // console.log(topTrendingSoonTokens)
  const above768 = useMedia('(min-width: 768px)')
  const isShowTopTrendingTokens = useShowTopTrendingSoonTokens()
  const toggleTopTrendingTokens = useToggleTopTrendingTokens()
  const isTrendingSoonTokenDetailModalOpen = useModalOpen(ApplicationModal.TRENDING_SOON_TOKEN_DETAIL)
  const toggleTrendingSoonTokenDetailModal = useToggleModal(ApplicationModal.TRENDING_SOON_TOKEN_DETAIL)
  const [selectedToken, setSelectedToken] = useState<TrueSightTokenData>()
  const [isOpenChartModal, setIsOpenChartModal] = useState(false)

  const onDismiss = () => {
    toggleTrendingSoonTokenDetailModal()
    setSelectedToken(undefined)
  }

  const [chartTimeframe, setChartTimeframe] = useState<TrueSightTimeframe>(TrueSightTimeframe.ONE_DAY)
  const [chartCategory, setChartCategory] = useState<TrueSightChartCategory>(TrueSightChartCategory.TRADING_VOLUME)
  const tokenNetwork = useMemo(
    () => (selectedToken ? selectedToken.platforms.keys().next().value ?? undefined : undefined),
    [selectedToken],
  )
  const tokenAddress = useMemo(
    () => (selectedToken && tokenNetwork ? selectedToken.platforms.get(tokenNetwork) : undefined),
    [selectedToken, tokenNetwork],
  )
  const { data: chartData, isLoading: isChartDataLoading } = useGetCoinGeckoChartData(
    tokenNetwork,
    tokenAddress,
    chartTimeframe,
  )

  if (!isShowTopTrendingTokens || topTrendingSoonTokens.length === 0) return null

  if (above768)
    return (
      <>
        <Modal isOpen={isTrendingSoonTokenDetailModalOpen} onDismiss={onDismiss} maxWidth="728px">
          {selectedToken && (
            <TrendingSoonTokenDetail
              tokenData={selectedToken}
              chartData={chartData}
              isChartDataLoading={isChartDataLoading}
              chartCategory={chartCategory}
              setChartCategory={setChartCategory}
              chartTimeframe={chartTimeframe}
              setChartTimeframe={setChartTimeframe}
              setFilter={undefined}
              style={{
                width: '728px',
                height: '570px',
                padding: '20px',
              }}
            />
          )}
        </Modal>
        {!isTrendingSoon1dDataLoading && (
          <TrendingSoonTokensAndNoteContainer>
            <TrendingSoonTokensContainer>
              <img
                src={DiscoverIconTriangle}
                alt="DiscoverIconTriangle"
                style={{ position: 'absolute', top: 0, left: 0, minWidth: '24px', minHeight: '24px' }}
              />
              <div></div>
              {topTrendingSoonTokens.map((listTokenByDate, indexDate) => (
                // <Delayed waitBeforeShow={indexDate * 100} key={indexDate}>
                <Flex
                  flexDirection="column"
                  justifyContent="flex-start"
                  key={indexDate}
                  style={{
                    gap: '16px',
                    backgroundColor: theme.bg10,
                    padding: '8px',
                    borderRadius: '8px',
                  }}
                >
                  {listTokenByDate.data.tokens.map((tokenData, index) => (
                    <TopTrendingSoonTokenItem
                      key={index}
                      tokenData={tokenData}
                      top={index}
                      setSelectedToken={setSelectedToken}
                    />
                  ))}
                </Flex>
                // </Delayed>
              ))}
            </TrendingSoonTokensContainer>
          </TrendingSoonTokensAndNoteContainer>
        )}
      </>
    )

  return (
    <>
      <Modal isOpen={isTrendingSoonTokenDetailModalOpen} onDismiss={onDismiss}>
        {selectedToken && (
          <Box width="100%">
            <TrendingSoonTokenItem
              isSelected={true}
              tokenIndex={undefined}
              tokenData={selectedToken}
              onSelect={undefined}
              setIsOpenChartModal={setIsOpenChartModal}
              setFilter={undefined}
              isShowMedal={false}
            />
          </Box>
        )}
      </Modal>
      <MobileChartModal
        isOpen={isOpenChartModal}
        setIsOpen={setIsOpenChartModal}
        chartData={chartData}
        isLoading={isChartDataLoading}
        chartCategory={chartCategory}
        setChartCategory={setChartCategory}
        chartTimeframe={chartTimeframe}
        setChartTimeframe={setChartTimeframe}
      />
      <TrendingSoonTokensMobileContainer>
        <Flex justifyContent="space-between" alignItems="center">
          <MouseoverTooltip text={t`Powered by TrueSight, our AI prediction model`}>
            <TextTooltip
              color={theme.subText}
              fontSize="14px"
              fontWeight={500}
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Text>
                <Trans>Trending Soon</Trans>
              </Text>
              <DiscoverIcon color={theme.subText} />
            </TextTooltip>
          </MouseoverTooltip>
          <Flex sx={{ cursor: 'pointer' }} role="button" onClick={toggleTopTrendingTokens}>
            <X size={20} />
          </Flex>
        </Flex>
        <Flex
          style={{
            gap: '12px',
            marginTop: '15px',
            overflow: 'auto',
            paddingTop: '6px' /* Show medal on mobile. */,
            paddingLeft: '6px' /* Show medal on mobile. */,
          }}
        >
          {/* {topTrendingSoonTokens.map((tokenData, index) => (
            <TopTrendingSoonTokenItem
              key={index}
              tokenData={tokenData}
              top={index}
              setSelectedToken={setSelectedToken}
            />
          ))} */}
        </Flex>
        <ExternalLink
          href={window.location.origin + '/#/discover?tab=trending_soon'}
          target="_blank"
          style={{
            fontSize: '10px',
            marginTop: '12px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Trans>Discover more</Trans>
          <ChevronRight color={theme.primary} size={16} />
        </ExternalLink>
      </TrendingSoonTokensMobileContainer>
    </>
  )
}

const TrendingSoonTokensAndNoteContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 8px;
  overflow: hidden;
`

const TrendingSoonTokensContainer = styled.div`
  display: flex;
  /* align-items: center; */
  // item to top
  justify-content: flex-start;
  gap: 32px;
  position: relative;
  padding: 8px 16px 8px 36px;
  background: ${({ theme }) => rgba(theme.background, 0.5)};
  border-radius: 8px;
  width: 100%;
  /* max-width: 1028px; */
  overflow: auto;
`

const TrendingSoonTokensMobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 12px;
  background: ${({ theme }) => rgba(theme.background, 0.5)};
  border-radius: 8px;
  width: 100%;
`

const TextNote = styled(Text)`
  color: ${({ theme }) => theme.subText};
  font-style: italic;
  font-size: 10px;
  font-weight: 500;
  width: 100%;
  max-width: 1028px;
  text-align: end;
`

export default TopTrendingSoonTokensInCurrentNetwork
