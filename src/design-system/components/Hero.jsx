import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Container, Button } from './index';

const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 700px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackgroundImage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(10, 14, 26, 0.3) 0%,
      rgba(10, 14, 26, 0.5) 50%,
      rgba(10, 14, 26, 0.8) 80%,
      rgba(10, 14, 26, 0.95) 100%
    );
  }
`;

const BackgroundImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 900px;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  
  ${({ theme }) => theme.media.md} {
    text-align: left;
  }
`;

const GenreTag = styled(motion.span)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.glass};
  backdrop-filter: blur(${({ theme }) => theme.blur.md});
  border: 1px solid ${({ theme }) => theme.colors.text.muted}33;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const HeroTitle = styled(motion.h1)`
  font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.text.primary} 0%,
    ${({ theme }) => theme.colors.text.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 40px rgba(255, 255, 255, 0.1);
  
  ${({ theme }) => theme.media.md} {
    font-size: ${({ theme }) => theme.typography.fontSize['7xl']};
  }
  
  ${({ theme }) => theme.media.lg} {
    font-size: ${({ theme }) => theme.typography.fontSize['8xl']};
  }
`;

const HeroDescription = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  ${({ theme }) => theme.media.md} {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    margin-left: 0;
    margin-right: 0;
  }
`;

const HeroMeta = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
  
  ${({ theme }) => theme.media.md} {
    justify-content: flex-start;
  }
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Rating = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.accent.gold};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  
  ${({ theme }) => theme.media.sm} {
    flex-direction: row;
    justify-content: center;
  }
  
  ${({ theme }) => theme.media.md} {
    justify-content: flex-start;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.xl};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  z-index: 2;
`;

const ScrollMouse = styled(motion.div)`
  width: 24px;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.colors.text.tertiary};
  border-radius: 12px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 3px;
    height: 8px;
    background: ${({ theme }) => theme.colors.text.tertiary};
    border-radius: 2px;
    animation: scroll 2s ease-in-out infinite;
  }
  
  @keyframes scroll {
    0%, 100% {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    50% {
      transform: translateX(-50%) translateY(10px);
      opacity: 0;
    }
  }
`;

const contentVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.43, 0.13, 0.23, 0.96],
      staggerChildren: 0.2
    }
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const Hero = ({
  backgroundImage,
  genre,
  title,
  description,
  rating,
  year,
  runtime,
  onPlayClick,
  onInfoClick,
  showScrollIndicator = true
}) => {
  const { scrollY } = useScroll();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  return (
    <HeroContainer ref={ref}>
      <BackgroundImage
        style={{ y }}
      >
        <BackgroundImg 
          src={backgroundImage} 
          alt={title}
          loading="eager"
        />
      </BackgroundImage>
      
      <Container maxWidth="xl">
        <HeroContent
          variants={contentVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {genre && (
            <GenreTag variants={childVariants}>
              {genre}
            </GenreTag>
          )}
          
          <HeroTitle variants={childVariants}>
            {title}
          </HeroTitle>
          
          <HeroDescription variants={childVariants}>
            {description}
          </HeroDescription>
          
          <HeroMeta variants={childVariants}>
            {rating && (
              <Rating>
                <span>★</span>
                <span>{rating}/10</span>
              </Rating>
            )}
            {year && <MetaItem>{year}</MetaItem>}
            {runtime && <MetaItem>{runtime}</MetaItem>}
          </HeroMeta>
          
          <ButtonGroup variants={childVariants}>
            {onPlayClick && (
              <Button
                size="lg"
                variant="primary"
                onClick={onPlayClick}
                leftIcon={<span>ℹ️</span>}
              >
                More Info
              </Button>
            )}
          </ButtonGroup>
        </HeroContent>
      </Container>
      
      {showScrollIndicator && (
        <ScrollIndicator
          style={{ opacity }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ScrollMouse />
          <span>Scroll to explore</span>
        </ScrollIndicator>
      )}
    </HeroContainer>
  );
};

export default Hero;