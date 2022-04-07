import { FeeAmount, computePoolAddress } from '@vutien/dmm-v3-sdk'
import { Currency } from '@vutien/sdk-core'
import { PRO_AMM_CORE_FACTORY_ADDRESSES, PRO_AMM_INIT_CODE_HASH } from 'constants/v2'
import { useActiveWeb3React } from 'hooks'

export function useProAmmPoolInfos(
  currencyA: Currency | undefined,
  currencyB: Currency | undefined,
  feeAmount: (FeeAmount | undefined)[]
): string[] {
  const { chainId } = useActiveWeb3React()
  const proAmmCoreFactoryAddress = chainId && PRO_AMM_CORE_FACTORY_ADDRESSES[chainId]
  return feeAmount.map(fee => {
    return proAmmCoreFactoryAddress && currencyA && currencyB && fee
      ? computePoolAddress({
          factoryAddress: proAmmCoreFactoryAddress,
          tokenA: currencyA?.wrapped,
          tokenB: currencyB?.wrapped,
          fee: fee,
          initCodeHashManualOverride: PRO_AMM_INIT_CODE_HASH
        })
      : ''
  })
}

export default function useProAmmPoolInfo(
  currencyA: Currency | undefined,
  currencyB: Currency | undefined,
  feeAmount: FeeAmount | undefined
): string {
  return useProAmmPoolInfos(currencyA, currencyB, [feeAmount])[0]
}