import React, { Component } from "react";
import { motion } from "framer-motion";

class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };

    this.sectionRef = React.createRef();
  }

  componentDidMount() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        this.setState({ isVisible: entry.isIntersecting });
      },
      { threshold: 0.4 }
    );

    if (this.sectionRef.current) {
      observer.observe(this.sectionRef.current);
    }
  }

  render() {
    let sectionName, skills;

    if (this.props.sharedSkills && this.props.resumeBasicInfo) {
      sectionName = this.props.resumeBasicInfo.section_name.skills;

      skills = this.props.sharedSkills.icons.map((skill, i) => {
        return (
          <motion.li
            className="list-inline-item mx-3"
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={
              this.state.isVisible
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 40 }
            }
            transition={{ duration: 0.5, delay: i * 0.05 }}
            whileHover={{ scale: 1.2 }}
          >
            <span>
              <div className="text-center skills-tile" style={{ marginBottom: "20px" }}>
                <i className={skill.class} style={{ fontSize: "220%" }}>
                  <p
                    className="text-center"
                    style={{ 
                        fontSize: "30%", 
                        marginTop: "10px", 
                        color: "white", 
                        fontFamily: "sans-serif" 
                    }}
                  >
                    {skill.name}
                  </p>
                </i>
              </div>
            </span>
          </motion.li>
        );
      });
    }

    return (
      <section 
        id="skills" 
        ref={this.sectionRef} 
        style={{ 
            background: "#121212", 
            padding: "100px 0", // Increased padding for better spacing
            margin: "0"
        }}
      >
        <div className="col-md-12">
          
          <motion.h1
            className="section-title"
            style={{ 
              color: "white", 
              fontSize: "2.2rem", // Increased font size here
              fontWeight: "500", // Makes it bold to match your header
              textAlign: "center" 
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={
              this.state.isVisible
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 40 }
            }
            transition={{ duration: 0.6 }}
          >
            <span>{sectionName}</span>
          </motion.h1>

          <div className="col-md-12 text-center" style={{ marginTop: "60px" }}>
            <ul className="list-inline mx-auto skill-icon">
              {skills}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

export default Skills;