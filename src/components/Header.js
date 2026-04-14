import React, { Component, memo } from "react";
import Typical from "react-typical";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedTitles = memo(({ titles }) => {
  return <Typical className="title-styles" steps={titles} loop={Infinity} />;
}, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.titles) === JSON.stringify(nextProps.titles);
});

class Header extends Component {
  constructor() {
    super();
    this.state = { 
      checked: false,
      isScrolled: false 
    };
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  componentDidMount() {
    const currentTheme = document.body.getAttribute("data-theme");
    this.setState({ checked: currentTheme === "dark" });
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const isScrolled = window.scrollY > 50;
    if (isScrolled !== this.state.isScrolled) {
      this.setState({ isScrolled });
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.checked !== this.state.checked ||
      nextState.isScrolled !== this.state.isScrolled ||
      nextProps.sharedData !== this.props.sharedData ||
      nextProps.resumeBasicInfo !== this.props.resumeBasicInfo ||
      nextProps.activeLanguage !== this.props.activeLanguage
    );
  }

  toggleLanguage = () => {
    const { activeLanguage, applyPickedLanguage } = this.props;
    const newLang = activeLanguage === window.$primaryLanguage 
      ? window.$secondaryLanguage 
      : window.$primaryLanguage;
    applyPickedLanguage(newLang);
  };

  toggleTheme() {
    const newChecked = !this.state.checked;
    this.setState({ checked: newChecked }, () => {
      this.setTheme(newChecked);
    });
  }

  setTheme(checked) {
    const dataThemeAttribute = "data-theme";
    const body = document.body;
    const newTheme = checked ? "dark" : "light";
    body.setAttribute(dataThemeAttribute, newTheme);
  }

  scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center", 
      });
    }
  };

  render() {
    let name = "";
    let titles = [];
    const { isScrolled, checked } = this.state;
    const { activeLanguage } = this.props;

    const isHindi = activeLanguage === window.$secondaryLanguage;

    const contactName = this.props.resumeBasicInfo?.section_name?.contact || (isHindi ? "संपर्क" : "Contact");
    
    const navItems = [
      { id: "about", name: this.props.resumeBasicInfo?.section_name?.about || (isHindi ? "मेरे बारे में" : "About") },
      { id: "portfolio", name: this.props.resumeBasicInfo?.section_name?.projects || (isHindi ? "परियोजनाएं" : "Projects") },
      { id: "skills", name: this.props.resumeBasicInfo?.section_name?.skills || (isHindi ? "कौशल" : "Skills") },
      { id: "resume", name: this.props.resumeBasicInfo?.section_name?.experience || (isHindi ? "अनुभव" : "Experience") },
      { id: "contact", name: contactName }
    ];

    if (this.props.sharedData) {
      name = this.props.sharedData.name;
      titles = this.props.sharedData.titles.map(x => [x.toUpperCase(), 1500]).flat();
    }

    const containerVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }
      }
    };

    const childVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    };

    return (
      <header id="home" style={{ 
        height: '100vh', 
        minHeight: '600px',
        display: 'block',
        background: 'var(--body-background)',
        transition: 'background-color 0.6s ease',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Updated Github Corner with Motion to sync with Nav */}
        <motion.a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="github-corner"
          animate={{
            y: isScrolled ? 0 : 0,
            scale: isScrolled ? 0.9 : 1,
            opacity: 1
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 1001 }}
        >
          <svg 
            width="90" height="90" viewBox="0 0 250 250" 
            style={{ 
              fill: isScrolled ? '#1a1a1a' : '#AE944F', // Changes color to match dark nav on scroll
              color: '#fff', 
              border: 0, 
              transform: 'scaleX(-1)', 
              transition: 'fill 0.4s ease' 
            }}
          >
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          </svg>
        </motion.a>

        <motion.nav 
          initial={false}
          animate={{
            backgroundColor: isScrolled ? "rgba(10, 10, 10, 0.98)" : "rgba(0, 0, 0, 0)",
            padding: isScrolled ? "25px 80px" : "45px 80px",
            boxShadow: isScrolled ? "0 10px 30px rgba(0,0,0,0.5)" : "none",
            height: isScrolled ? "90px" : "120px" // Adjusted height to align better with github corner
          }}
          style={{
            position: "fixed", top: 0, right: 0, width: "100%", zIndex: 1000,
            display: "flex", justifyContent: "flex-end", alignItems: "center",
            backdropFilter: isScrolled ? "blur(15px)" : "none",
            transition: "all 0.4s ease"
          }}
        >
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={(e) => this.scrollToSection(e, item.id)}
              initial={false}
              animate={{
                color: checked ? "#FFFFFF" : (isScrolled ? "#FFFFFF" : "#000000")
              }}
              style={{
                background: "none", 
                border: "none", 
                cursor: "pointer",
                fontSize: isHindi ? "1.45rem" : "1.25rem", 
                fontWeight: isHindi ? "500" : "600",
                letterSpacing: isHindi ? "0.5px" : "2.5px", 
                lineHeight: isHindi ? "1.6" : "normal",
                margin: "0 22px", 
                padding: "12px 22px", 
                borderRadius: "10px"
              }}
              whileHover={{ color: "#AE944F", scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {item.name}
            </motion.button>
          ))}

          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '45px' }}>
            <motion.div 
              onClick={this.toggleLanguage}
              style={{ 
                cursor: 'pointer', fontSize: '34px', 
                marginRight: '38px', display: 'flex', alignItems: 'center',
                position: 'relative', width: '45px', height: '45px',
                justifyContent: 'center'
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeLanguage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  style={{ position: 'absolute' }}
                >
                  <span 
                    className="iconify" 
                    data-icon={activeLanguage === window.$primaryLanguage ? "twemoji:flag-united-kingdom" : "twemoji:flag-india"}
                  ></span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div 
              onClick={this.toggleTheme}
              style={{ 
                cursor: 'pointer', fontSize: '36px', 
                display: 'flex', alignItems: 'center', color: '#AE944F',
                position: 'relative', width: '45px', height: '45px',
                justifyContent: 'center'
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={checked ? "dark" : "light"}
                  initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ position: 'absolute' }}
                >
                  <span className="iconify" data-icon={checked ? "solar:sun-bold-duotone" : "solar:moon-bold-duotone"}></span>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.nav>

        {/* Background Glow */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", top: "30%", right: "15%", width: "500px", height: "500px",
            background: "radial-gradient(circle, #AE944F 0%, transparent 70%)",
            filter: "blur(100px)", zIndex: 0, pointerEvents: "none"
          }}
        />

        <div className="row aligner" style={{ height: '100%', margin: 0 }}>
          <motion.div 
            className="col-md-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{ zIndex: 1 }}
          >
            <div style={{ textAlign: 'center' }}>
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="iconify header-icon" data-icon="la:laptop-code" style={{ color: checked ? "#FFFFFF" : "var(--header-text)" }}></span>
              </motion.div>
              
              <br />

              <motion.h1 
                className="mb-0" 
                variants={childVariants}
                style={{ color: checked ? "#FFFFFF" : "var(--header-text)", fontWeight: '700', fontSize: '4rem' }}
              >
                {name}
              </motion.h1>

              <motion.div className="title-container" variants={childVariants} style={{ height: '40px' }}>
                {titles.length > 0 && (
                  <AnimatedTitles titles={titles} />
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {!isScrolled && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 2, duration: 2, repeat: Infinity }}
            style={{
              position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)",
              cursor: "pointer", color: "#AE944F", fontSize: "2.5rem", zIndex: 10
            }}
            onClick={(e) => this.scrollToSection(e, "about")}
          >
            <span className="iconify" data-icon="bi:chevron-double-down"></span>
          </motion.div>
        )}
      </header>
    );
  }
}

export default Header;