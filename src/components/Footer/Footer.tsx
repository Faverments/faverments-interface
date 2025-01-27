import { Trans, t } from '@lingui/macro'
import { GitHub, Linkedin } from 'react-feather'
import { useMedia } from 'react-use'
import { Flex, Text } from 'rebass'
import styled from 'styled-components'

import ETHW from 'assets/images/faverments.png'
import { Telegram } from 'components/Icons'
import Facebook from 'components/Icons/Facebook'
import TwitterIcon from 'components/Icons/TwitterIcon'
import InfoHelper from 'components/InfoHelper'
import useTheme from 'hooks/useTheme'
import { useIsDarkMode } from 'state/user/hooks'
import { ExternalLink, ExternalLinkNoLineHeight } from 'theme'

const FooterWrapper = styled.div`
  background: ${({ theme }) => theme.buttonGray + '33'};
  width: 100%;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    margin-bottom: 4rem;
  `};
`

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  align-items: center;
  width: 100%;
  padding: 16px;
  flex-direction: column-reverse;

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    padding: 16px 16px;
  }

  @media only screen and (min-width: 1000px) {
    padding: 16px 32px;
  }

  @media only screen and (min-width: 1366px) {
    padding: 16px 215px;
  }

  @media only screen and (min-width: 1500px) {
    padding: 16px 252px;
  }
`

const InfoWrapper = styled.div`
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: ${({ theme }) => theme.subText + '33'};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 16px;
    gap: 24px;
  `};
`

const Separator = styled.div`
  width: 1px;
  background: ${({ theme }) => theme.border};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none
  `}
`

const Item = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.subText};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    gap: 12px;
  `};
`

export const FooterSocialLink = () => {
  const theme = useTheme()
  return (
    <Flex alignItems="center" justifyContent="center" sx={{ gap: '24px' }}>
      <ExternalLinkNoLineHeight href="https://t.me/vukhaihoan">
        <Telegram size={16} color={theme.subText} />
      </ExternalLinkNoLineHeight>
      <ExternalLinkNoLineHeight href="https://twitter.com/vukhaihoan_me">
        <TwitterIcon color={theme.subText} />
      </ExternalLinkNoLineHeight>
      <ExternalLinkNoLineHeight href="https://www.facebook.com/vukhaihoan.me">
        <Facebook size={16} color={theme.subText} />
      </ExternalLinkNoLineHeight>
      <ExternalLinkNoLineHeight href={`https://github.com/vukhaihoan`}>
        <GitHub size={16} color={theme.subText} />
      </ExternalLinkNoLineHeight>
      <ExternalLinkNoLineHeight href={`https://www.linkedin.com/in/vukhaihoan`}>
        <Linkedin size={16} color={theme.subText} />
      </ExternalLinkNoLineHeight>
    </Flex>
  )
}

function Footer() {
  const isDarkMode = useIsDarkMode()
  const above768 = useMedia('(min-width: 768px)')

  return (
    <FooterWrapper>
      <FooterContent>
        <InfoWrapper>
          <Item>
            <Text marginRight="6px">
              <Trans>Powered By</Trans>
            </Text>
            <ExternalLink href="https://github.com/Faverments/faverments-interface" style={{ display: 'flex' }}>
              {/* {isDarkMode ? <PoweredByIconDark width={48} /> : <PoweredByIconLight width={48} />} */}
              <img src={ETHW} alt="ETHW" height={30} />
            </ExternalLink>
          </Item>
          <Separator />

          <Item>
            <Text marginRight="6px" display="flex">
              <Trans>Audited By</Trans>
              {!above768 && <InfoHelper size={14} text={t`Covers smart-contracts`} placement="top" />}
            </Text>
            <ExternalLink href="#" style={{ display: 'flex' }}>
              <img
                src={
                  !isDarkMode
                    ? 'https://chainsecurity.com/wp-content/themes/chainsecurity-wp/resources/images/temp/logo.svg'
                    : require('../../assets/svg/chainsecurity.svg').default
                }
                alt=""
                width="98px"
              />
            </ExternalLink>
            {above768 && <InfoHelper size={14} text={t`Covers smart-contracts`} placement="top" />}
          </Item>
        </InfoWrapper>
        <FooterSocialLink />
      </FooterContent>
    </FooterWrapper>
  )
}

export default Footer
