import { rgba } from 'polished'
import styled from 'styled-components/macro'

export const Wrapper = styled.div`
  width: 100%;
`
export const LayoutWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 16px;
  flex-grow: 1;
  min-height: 0;
  min-width: 0;
  @media screen and (max-width: 1028px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media screen and (max-width: 848px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 568px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 8px;
  border: ${({ theme }) => `1px solid ${rgba(theme.border, 0.1)}`};
  min-width: 0;
  min-height: 0;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const BannerImageWrapper = styled.div`
  width: 100%;
  height: 187px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    &:hover {
      transform: scale(1.1);
      transition-duration: 0.5s;
    }
  }
`
export const LogoImageWrapper = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    &:hover {
      transform: rotate(360deg);
      transition-duration: 0.5s;
    }
  }
`

export const FilterBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`
