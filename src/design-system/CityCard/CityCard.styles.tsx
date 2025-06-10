import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;
  width: 168px;
  height: 168px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.coreRadiusL};
  overflow: hidden;

  a {
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
`;

export const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1/1;
  border-radius: ${({ theme }) => theme.radii.coreRadiusL};
`;

export const Content = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 0 ${({ theme }) => theme.space.coreSpacing04}
    ${({ theme }) => theme.space.coreSpacing05}
    ${({ theme }) => theme.space.coreSpacing04};
  text-align: center;
  gap: 10px;
  transition: padding-bottom 150ms ease-out;

  &:hover {
    padding-bottom: ${({ theme }) => theme.space.coreSpacing06};
  }

  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
  border-radius: ${({ theme }) => theme.radii.coreRadiusL};

  a {
    color: ${({ theme }) => theme.colors.semanticColorsTextPrimaryInverse};
    text-decoration: none;
  }
`;

export const Name = styled.span``;
