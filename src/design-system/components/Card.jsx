import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const cardVariants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  hover: {
    y: -8,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};

const CardContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.timing.ease};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.accent.primary.gradient};
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.duration.base};
    z-index: 1;
  }
  
  &:hover::before {
    opacity: 0.1;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows['2xl']};
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: ${({ aspectRatio }) => aspectRatio || '2/3'};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.duration.slow} ${({ theme }) => theme.transitions.timing.ease};
  
  ${CardContainer}:hover & {
    transform: scale(1.1);
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(
    to top,
    rgba(10, 14, 26, 0.95) 0%,
    rgba(10, 14, 26, 0.7) 50%,
    transparent 100%
  );
  transform: translateY(100%);
  transition: transform ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.timing.ease};
  
  ${CardContainer}:hover & {
    transform: translateY(0);
  }
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  position: relative;
  z-index: 2;
`;

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardBadge = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme, variant }) => {
    switch (variant) {
      case 'success':
        return theme.colors.accent.success;
      case 'warning':
        return theme.colors.accent.warning;
      case 'error':
        return theme.colors.accent.error;
      default:
        return theme.colors.background.primary;
    }
  }};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  backdrop-filter: blur(${({ theme }) => theme.blur.sm});
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: 3;
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const StarIcon = styled.span`
  color: ${({ theme }) => theme.colors.accent.gold};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
`;

const Rating = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Card = ({
  image,
  title,
  subtitle,
  description,
  rating,
  badge,
  badgeVariant = 'default',
  aspectRatio = '2/3',
  onClick,
  children,
  showOverlay = true,
  ...props
}) => {
  return (
    <CardContainer
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onClick={onClick}
      {...props}
    >
      {badge && (
        <CardBadge variant={badgeVariant}>{badge}</CardBadge>
      )}
      
      <ImageWrapper aspectRatio={aspectRatio}>
        <CardImage src={image} alt={title} loading="lazy" />
        {showOverlay && description && (
          <CardOverlay>
            <CardDescription>{description}</CardDescription>
          </CardOverlay>
        )}
      </ImageWrapper>
      
      <CardContent>
        <CardTitle>{title}</CardTitle>
        {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        {rating && (
          <RatingWrapper>
            <StarIcon>★</StarIcon>
            <Rating>{rating}</Rating>
          </RatingWrapper>
        )}
        {children}
      </CardContent>
    </CardContainer>
  );
};

export default Card;