import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = (props) => {
  const controls = useAnimation();
  const sectionRef = useRef(null); 
  const headingRef = useRef(null); // Added ref to lock the heading color
  const [inViewRef, inView] = useInView({ threshold: 0.2 });

  const setRefs = (node) => {
    sectionRef.current = node;
    inViewRef(node);
  };

  useEffect(() => {
    // Forces the background to stay dark
    if (sectionRef.current) {
      sectionRef.current.style.setProperty("background-color", "#121212", "important");
      sectionRef.current.style.setProperty("background", "#121212", "important");
    }

    // Forces the Heading (h1) to stay white like the footer
    if (headingRef.current) {
      headingRef.current.style.setProperty("color", "white", "important");
    }

    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  let sectionName, hello, about;
  if (props.resumeBasicInfo) {
    sectionName = props.resumeBasicInfo.section_name.about;
    hello = props.resumeBasicInfo.description_header;
    about = props.resumeBasicInfo.description;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section 
      id="about" 
      ref={setRefs} 
      style={{ 
        padding: "100px 0", 
        position: "relative", 
        overflow: "hidden", 
        backgroundColor: "#121212",
        color: "#FFFFFF"
      }}
    >
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(174,148,79,0.1) 0%, rgba(186,170,128,0) 70%)",
          filter: "blur(60px)",
          zIndex: 0
        }}
      />

      <div className="container">
        <motion.div 
          className="row"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <div className="col-md-12" style={{ zIndex: 1 }}>
            {/* Added ref={headingRef} to stop the theme from changing the color */}
            <motion.h1 
              ref={headingRef}
              variants={itemVariants}
              style={{ 
                textAlign: "center", 
                marginBottom: "60px", 
                fontWeight: "700", 
                letterSpacing: "3px", 
                textTransform: "uppercase", 
                color: "white" 
              }}
            >
              {sectionName}
            </motion.h1>
          </div>

          <div className="col-md-4 mb-5 d-flex justify-content-center" style={{ zIndex: 1 }}>
            <motion.div 
              variants={itemVariants}
              style={{ position: "relative", width: "280px", height: "320px" }}
            >
              <img
                src={process.env.PUBLIC_URL + "/images/myProfile.jpg"}
                alt="Aditya Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "20px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
                  border: "5px solid #212121", 
                  position: "relative",
                  zIndex: 2
                }}
              />
              <div style={{
                position: "absolute",
                top: "-10px", 
                left: "-10px",
                width: "calc(100% + 20px)",
                height: "calc(100% + 20px)",
                border: "2px solid #AE944F",
                borderRadius: "25px", 
                zIndex: 1
              }} />
            </motion.div>
          </div>

          <div className="col-md-8" style={{ zIndex: 1 }}>
            <motion.div 
              variants={itemVariants}
              style={{
                background: "#1e1e1e", 
                padding: "45px",
                borderRadius: "30px",
                border: "1px solid rgba(174,148,79, 0.2)",
                boxShadow: "0 15px 35px rgba(0,0,0,0.4)"
              }}
            >
              <h2 style={{ marginBottom: "25px", fontWeight: "600", color: "#AE944F" }}>
                {hello} 
                <motion.div 
                  animate={{ rotate: [0, 15, -15, 0] }} 
                  transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                  style={{ display: "inline-block", marginLeft: "10px" }}
                >
                  <span role="img" aria-label="waving hand">👋</span>
                </motion.div>
              </h2>
              <p style={{ 
                fontSize: "1.8rem", 
                lineHeight: "1.8", 
                color: "#e0e0e0", 
                textAlign: "justify",
                fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
              }}>
                {about}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;