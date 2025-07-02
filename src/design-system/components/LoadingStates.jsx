import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Spinner Loading Component
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ fullScreen }) => fullScreen ? '100vh' : '200px'};
`;

const Spinner = styled.div`
  width: ${({ size }) => {
    switch (size) {
      case 'sm': return '24px';
      case 'lg': return '48px';
      default: return '36px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'sm': return '24px';
      case 'lg': return '48px';
      default: return '36px';
    }
  }};
  border: 3px solid ${({ theme }) => theme.colors.background.tertiary};
  border-top: 3px solid ${({ theme }) => theme.colors.accent.primary.start};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const LoadingSpinner = ({ size = 'md', fullScreen = false }) => (
  <SpinnerContainer fullScreen={fullScreen}>
    <Spinner size={size} />
  </SpinnerContainer>
);

// Skeleton Loading Component
const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const SkeletonBase = styled.div`
  background: ${({ theme }) => theme.colors.background.tertiary};
  background-image: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.background.tertiary} 0%,
    ${({ theme }) => theme.colors.background.glass} 50%,
    ${({ theme }) => theme.colors.background.tertiary} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s linear infinite;
  border-radius: ${({ theme, radius }) => theme.borderRadius[radius || 'base']};
`;

export const SkeletonText = styled(SkeletonBase)`
  height: ${({ height }) => height || '1rem'};
  width: ${({ width }) => width || '100%'};
  margin-bottom: ${({ theme, mb }) => mb ? theme.spacing[mb] : 0};
`;

export const SkeletonBox = styled(SkeletonBase)`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100px'};
  aspect-ratio: ${({ aspectRatio }) => aspectRatio || 'auto'};
`;

export const SkeletonAvatar = styled(SkeletonBase)`
  width: ${({ size }) => size || '40px'};
  height: ${({ size }) => size || '40px'};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

// Card Skeleton Component
const SkeletonCardContainer = styled.div`
  width: 100%;
`;

const SkeletonCardImage = styled(SkeletonBox)`
  width: 100%;
  aspect-ratio: 2/3;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SkeletonCardContent = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.xs};
`;

export const SkeletonCard = () => (
  <SkeletonCardContainer>
    <SkeletonCardImage />
    <SkeletonCardContent>
      <SkeletonText height="1.5rem" width="80%" mb="sm" />
      <SkeletonText height="1rem" width="60%" mb="sm" />
      <SkeletonText height="1rem" width="40%" />
    </SkeletonCardContent>
  </SkeletonCardContainer>
);

// Skeleton Grid Component
const SkeletonGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${({ minWidth }) => minWidth || '200px'}, 1fr));
  gap: ${({ theme, gap }) => theme.spacing[gap || 'lg']};
`;

export const SkeletonGrid = ({ count = 10, minWidth = '200px', gap = 'lg' }) => (
  <SkeletonGridContainer minWidth={minWidth} gap={gap}>
    {Array.from({ length: count }).map((_, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.05 }}
      >
        <SkeletonCard />
      </motion.div>
    ))}
  </SkeletonGridContainer>
);

// Pulse Loading Component
const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const PulseContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: ${({ fullScreen }) => fullScreen ? '100vh' : '200px'};
`;

const PulseDot = styled.div`
  width: 12px;
  height: 12px;
  background: ${({ theme }) => theme.colors.accent.primary.start};
  border-radius: 50%;
  animation: ${pulse} 1.5s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay || '0s'};
`;

export const LoadingPulse = ({ fullScreen = false }) => (
  <PulseContainer fullScreen={fullScreen}>
    <PulseDot delay="0s" />
    <PulseDot delay="0.3s" />
    <PulseDot delay="0.6s" />
  </PulseContainer>
);

// Progress Bar Component
const ProgressContainer = styled.div`
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: ${({ theme }) => theme.colors.accent.primary.gradient};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

export const LoadingProgress = ({ progress = 0 }) => (
  <ProgressContainer>
    <ProgressBar
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    />
  </ProgressContainer>
);

// Content Loader Component for complex layouts
export const ContentLoader = ({ type = 'list', count = 5 }) => {
  switch (type) {
    case 'list':
      return (
        <div>
          {Array.from({ length: count }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}
            >
              <SkeletonAvatar size="60px" />
              <div style={{ flex: 1 }}>
                <SkeletonText height="1.25rem" width="60%" mb="sm" />
                <SkeletonText height="1rem" width="100%" mb="sm" />
                <SkeletonText height="1rem" width="80%" />
              </div>
            </motion.div>
          ))}
        </div>
      );
    
    case 'details':
      return (
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <SkeletonBox width="300px" height="450px" radius="lg" />
          <div style={{ flex: 1, minWidth: '300px' }}>
            <SkeletonText height="3rem" width="70%" mb="lg" />
            <SkeletonText height="1.5rem" width="40%" mb="xl" />
            <SkeletonText height="1rem" width="100%" mb="sm" />
            <SkeletonText height="1rem" width="100%" mb="sm" />
            <SkeletonText height="1rem" width="90%" mb="sm" />
            <SkeletonText height="1rem" width="75%" mb="xl" />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <SkeletonBox width="120px" height="48px" radius="full" />
              <SkeletonBox width="120px" height="48px" radius="full" />
            </div>
          </div>
        </div>
      );
    
    default:
      return <SkeletonGrid count={count} />;
  }
};