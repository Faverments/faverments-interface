import React, { useState } from 'react'

import { Trans } from '@lingui/macro'
import { ReactNode } from 'react'
import { FeeAmount } from '@vutien/dmm-v3-sdk'
import { Flex, Text } from 'rebass'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'

const FEE_AMOUNT_DETAIL: { [key: string]: { label: string; description: ReactNode } } = {
  [FeeAmount.LOW]: {
    label: '0.05',
    description: <Trans>Best for stable pairs.</Trans>
  },
  [FeeAmount.MEDIUM]: {
    label: '0.3',
    description: <Trans>Best for most pairs.</Trans>
  },
  [FeeAmount.HIGH]: {
    label: '1',
    description: <Trans>Best for exotic pairs.</Trans>
  }
}

const Option = styled.div<{ active: boolean }>`
  padding: 0.75rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  border: 1px solid ${({ theme, active }) => (active ? theme.primary : theme.border)};
  overflow: hidden;

  :hover {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`

const TickBackground = styled.div`
  position: absolute;
  top: -1px;
  right: -1px;
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 0px 40px 40px 0px;
  border-color: transparent ${({ theme }) => theme.primary} transparent transparent;
`
const Tick = styled.div`
  font-size: 17px;
  position: absolute;
  top: 0;
  color: #3a3a3a;
  right: 4px;
`

const FeeOption = ({
  active,
  label,
  description,
  onClick
}: {
  onClick: () => void
  active: boolean
  label: string
  description: ReactNode
}) => {
  const theme = useTheme()
  return (
    <Option active={active} role="button" onClick={onClick}>
      <Text fontWeight={500} fontSize="14px">
        {label}%
      </Text>
      <Text color={theme.subText} marginTop="6px" fontSize="12px">
        {description}
      </Text>
      {active && (
        <>
          <TickBackground></TickBackground>
          <Tick>✓</Tick>
        </>
      )}
    </Option>
  )
}

const FeeSelectorWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`

function FeeSelector({ feeAmount, onChange }: { feeAmount?: FeeAmount; onChange: (fee: FeeAmount) => void }) {
  return (
    <FeeSelectorWrapper>
      {/* current 2 fee active [5, 30] with distances = [10, 60] */}
      {[FeeAmount.LOW, FeeAmount.MEDIUM].map(_feeAmount => {
        return (
          <FeeOption
            onClick={() => onChange(_feeAmount)}
            key={_feeAmount}
            active={feeAmount === _feeAmount}
            label={FEE_AMOUNT_DETAIL[_feeAmount].label}
            description={FEE_AMOUNT_DETAIL[_feeAmount].description}
          />
        )
      })}
    </FeeSelectorWrapper>
  )
}

export default FeeSelector
