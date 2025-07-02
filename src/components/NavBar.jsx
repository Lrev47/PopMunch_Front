import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { toggleSidebar } from "../StateManagment/websiteSlice";

const glowAnimation = keyframes`
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
`;

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ $isScrolled, theme }) => 
    $isScrolled 
      ? `${theme.colors.background.primary}ee` 
      : 'transparent'
  };
  backdrop-filter: ${({ $isScrolled }) => $isScrolled ? 'blur(12px)' : 'none'};
  transition: all ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.timing.ease};
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.accent.primary.gradient};
    opacity: ${({ $isScrolled }) => $isScrolled ? 0.3 : 0};
    transition: opacity ${({ theme }) => theme.transitions.duration.base};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  }
`;

const Logo = styled.img`
  height: 72px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.timing.ease};
  filter: drop-shadow(0 0 10px rgba(220, 38, 38, 0.3));
  
  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 20px rgba(220, 38, 38, 0.5));
  }

  ${({ theme }) => theme.media.md} {
    height: 80px;
  }
`;

const NavLinks = styled.div`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  
  ${({ theme }) => theme.media.lg} {
    display: flex;
  }
`;

const NavLink = styled(Link)`
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  position: relative;
  transition: color ${({ theme }) => theme.transitions.duration.base};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent.primary.gradient};
    transition: width ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.timing.ease};
  }
  
  &:hover, &.active {
    color: ${({ theme }) => theme.colors.text.primary};
    
    &::after {
      width: 100%;
    }
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: none;
  
  ${({ theme }) => theme.media.md} {
    display: block;
  }
`;

const SearchBar = styled.input`
  width: 240px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  padding-left: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.glass};
  border: 1px solid ${({ theme }) => theme.colors.text.muted}33;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  backdrop-filter: blur(${({ theme }) => theme.blur.sm});
  transition: all ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.timing.ease};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
  
  &:focus {
    outline: none;
    width: 300px;
    border-color: ${({ theme }) => theme.colors.accent.primary.start}66;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accent.primary.start}1A;
  }
  
  &::before {
    content: '🔍';
    position: absolute;
    left: ${({ theme }) => theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text.tertiary};
  pointer-events: none;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const HamburgerMenu = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  
  ${({ theme }) => theme.media.lg} {
    display: none;
  }
`;

const HamburgerLine = styled.span`
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: all ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.timing.ease};
  
  ${HamburgerMenu}:hover & {
    background: ${({ theme }) => theme.colors.accent.primary.end};
  }
`;

const navVariants = {
  hidden: { y: -100 },
  visible: { 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

function TopNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleSideBar = () => {
    dispatch(toggleSidebar());
  };

  const returnHomeOnClick = () => {
    navigate("/");
  };

  return (
    <NavContainer
      $isScrolled={isScrolled}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <Logo
        onClick={returnHomeOnClick}
        alt="PopMunch Logo"
        src="https://imagizer.imageshack.com/img922/3152/npjpsD.png"
      />
      
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/tv">TV Shows</NavLink>
      </NavLinks>
      
      <HamburgerMenu onClick={handleToggleSideBar}>
        <HamburgerLine />
        <HamburgerLine />
        <HamburgerLine />
      </HamburgerMenu>
    </NavContainer>
  );
}

export default TopNav;