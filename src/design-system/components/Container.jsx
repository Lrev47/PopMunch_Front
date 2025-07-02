import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  width: 100%;
  max-width: ${({ maxWidth }) => {
    switch (maxWidth) {
      case 'sm':
        return '640px';
      case 'md':
        return '768px';
      case 'lg':
        return '1024px';
      case 'xl':
        return '1280px';
      case '2xl':
        return '1536px';
      case 'full':
        return '100%';
      default:
        return '1280px';
    }
  }};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  
  ${({ theme }) => theme.media.sm} {
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }
  
  ${({ theme }) => theme.media.lg} {
    padding: 0 ${({ theme }) => theme.spacing.xl};
  }
`;

export const Section = styled(motion.section)`
  padding: ${({ theme, spacing }) => theme.spacing[spacing || '3xl']} 0;
  
  ${({ theme }) => theme.media.md} {
    padding: ${({ theme, spacing }) => theme.spacing[spacing || '4xl']} 0;
  }
  
  ${({ theme }) => theme.media.lg} {
    padding: ${({ theme, spacing }) => theme.spacing[spacing || '5xl']} 0;
  }
`;

export const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${({ minWidth }) => minWidth || '300px'}, 1fr));
  gap: ${({ theme, gap }) => theme.spacing[gap || 'lg']};
  
  ${({ columns }) =>
    columns &&
    `
    grid-template-columns: repeat(${columns}, 1fr);
    
    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  `}
`;

export const Flex = styled(motion.div)`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  align-items: ${({ align }) => align || 'stretch'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  gap: ${({ theme, gap }) => (gap ? theme.spacing[gap] : 0)};
  flex-wrap: ${({ wrap }) => (wrap ? 'wrap' : 'nowrap')};
  
  ${({ responsive }) =>
    responsive &&
    `
    @media (max-width: 768px) {
      flex-direction: column;
    }
  `}
`;

export const Box = styled(motion.div)`
  padding: ${({ theme, p }) => (p ? theme.spacing[p] : 0)};
  padding-top: ${({ theme, pt }) => (pt ? theme.spacing[pt] : undefined)};
  padding-right: ${({ theme, pr }) => (pr ? theme.spacing[pr] : undefined)};
  padding-bottom: ${({ theme, pb }) => (pb ? theme.spacing[pb] : undefined)};
  padding-left: ${({ theme, pl }) => (pl ? theme.spacing[pl] : undefined)};
  
  margin: ${({ theme, m }) => (m ? theme.spacing[m] : 0)};
  margin-top: ${({ theme, mt }) => (mt ? theme.spacing[mt] : undefined)};
  margin-right: ${({ theme, mr }) => (mr ? theme.spacing[mr] : undefined)};
  margin-bottom: ${({ theme, mb }) => (mb ? theme.spacing[mb] : undefined)};
  margin-left: ${({ theme, ml }) => (ml ? theme.spacing[ml] : undefined)};
  
  background: ${({ bg, theme }) => (bg ? theme.colors.background[bg] : 'transparent')};
  border-radius: ${({ radius, theme }) => (radius ? theme.borderRadius[radius] : 0)};
`;

export default Container;