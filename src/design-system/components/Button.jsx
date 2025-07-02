import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const sizeStyles = {
  sm: css`
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    border-radius: ${({ theme }) => theme.borderRadius.base};
  `,
  md: css`
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    border-radius: ${({ theme }) => theme.borderRadius.md};
  `,
  lg: css`
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  `,
};

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.accent.primary.gradient};
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        45deg,
        transparent 30%,
        rgba(255, 255, 255, 0.2) 50%,
        transparent 70%
      );
      transform: translateX(-100%);
      transition: transform 0.6s;
    }
    
    &:hover::before {
      transform: translateX(100%);
    }
    
    &:hover {
      box-shadow: ${({ theme }) => theme.shadows.glow};
    }
  `,
  
  secondary: css`
    background: ${({ theme }) => theme.colors.background.tertiary};
    color: ${({ theme }) => theme.colors.text.primary};
    border: 2px solid transparent;
    background-clip: padding-box;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      margin: -2px;
      border-radius: inherit;
      background: ${({ theme }) => theme.colors.accent.primary.gradient};
    }
    
    &:hover {
      color: ${({ theme }) => theme.colors.text.primary};
      box-shadow: ${({ theme }) => theme.shadows.lg};
    }
  `,
  
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text.secondary};
    border: 1px solid ${({ theme }) => theme.colors.text.muted};
    
    &:hover {
      background: ${({ theme }) => theme.colors.background.glass};
      color: ${({ theme }) => theme.colors.text.primary};
      border-color: ${({ theme }) => theme.colors.text.tertiary};
      backdrop-filter: blur(${({ theme }) => theme.blur.sm});
    }
  `,
  
  text: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text.secondary};
    padding: 0;
    
    &:hover {
      color: ${({ theme }) => theme.colors.text.primary};
    }
  `,
};

const StyledButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;
  border: none;
  transition: all ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.timing.ease};
  position: relative;
  
  ${({ size }) => sizeStyles[size]}
  ${({ variant }) => variantStyles[variant]}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
  
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
  
  ${({ loading }) =>
    loading &&
    css`
      color: transparent;
      
      &::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        top: 50%;
        left: 50%;
        margin-left: -8px;
        margin-top: -8px;
        border: 2px solid ${({ theme }) => theme.colors.text.primary};
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear infinite;
      }
    `}
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 1.2em;
`;

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  onClick,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      loading={loading}
      disabled={disabled || loading}
      onClick={onClick}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
      {children}
      {rightIcon && <IconWrapper>{rightIcon}</IconWrapper>}
    </StyledButton>
  );
};

export default Button;