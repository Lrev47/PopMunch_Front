import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { toggleSidebar } from "../StateManagment/websiteSlice";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 14, 26, 0.7);
  backdrop-filter: blur(${({ theme }) => theme.blur.sm});
  z-index: ${({ theme }) => theme.zIndex.modalBackdrop};
`;

const SidebarContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-left: 1px solid ${({ theme }) => theme.colors.background.tertiary};
  z-index: ${({ theme }) => theme.zIndex.modal};
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.shadows['2xl']};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 85%;
    max-width: 320px;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.background.tertiary};
  background: ${({ theme }) => theme.colors.background.primary};
`;

const SidebarTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  background: ${({ theme }) => theme.colors.accent.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CloseButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.text.muted}33;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.duration.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.accent.error};
    border-color: transparent;
    color: ${({ theme }) => theme.colors.text.primary};
    transform: rotate(90deg);
  }
`;

const Nav = styled.nav`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.duration.base};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: ${({ theme }) => theme.colors.accent.primary.gradient};
    transform: translateX(-100%);
    transition: transform ${({ theme }) => theme.transitions.duration.base};
  }
  
  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
    color: ${({ theme }) => theme.colors.text.primary};
    padding-left: ${({ theme }) => theme.spacing.xl};
    
    &::before {
      transform: translateX(0);
    }
  }
`;

const NavIcon = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  width: 24px;
  text-align: center;
`;

const Section = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.background.tertiary};
`;

const SectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CategoryLink = styled(NavItem)`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const SignInSection = styled(Section)`
  padding-top: ${({ theme }) => theme.spacing['2xl']};
  padding-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  closed: {
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

const overlayVariants = {
  open: { opacity: 1 },
  closed: { opacity: 0 }
};

function Sidebar() {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state) => state.ui);

  const closeSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          <Overlay
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={closeSidebar}
          />
          
          <SidebarContainer
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <SidebarHeader>
              <SidebarTitle>PopMunch</SidebarTitle>
              <CloseButton
                onClick={closeSidebar}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </CloseButton>
            </SidebarHeader>

            <Nav>
              <NavItem to="/" onClick={closeSidebar}>
                <NavIcon>🏠</NavIcon>
                Home
              </NavItem>
              <NavItem to="/movies" onClick={closeSidebar}>
                <NavIcon>🎬</NavIcon>
                Movies
              </NavItem>
              <NavItem to="/tv" onClick={closeSidebar}>
                <NavIcon>📺</NavIcon>
                TV Shows
              </NavItem>
              <NavItem to="/logIn" onClick={closeSidebar}>
                <NavIcon>👤</NavIcon>
                Profile
              </NavItem>
            </Nav>
            
            <Section>
              <SectionTitle>Categories</SectionTitle>
              <CategoryLink to="/movies?genre=action" onClick={closeSidebar}>
                Action
              </CategoryLink>
              <CategoryLink to="/movies?genre=comedy" onClick={closeSidebar}>
                Comedy
              </CategoryLink>
              <CategoryLink to="/movies?genre=drama" onClick={closeSidebar}>
                Drama
              </CategoryLink>
              <CategoryLink to="/movies?genre=horror" onClick={closeSidebar}>
                Horror
              </CategoryLink>
              <CategoryLink to="/movies?genre=scifi" onClick={closeSidebar}>
                Sci-Fi
              </CategoryLink>
            </Section>
          </SidebarContainer>
        </>
      )}
    </AnimatePresence>
  );
}

export default Sidebar;