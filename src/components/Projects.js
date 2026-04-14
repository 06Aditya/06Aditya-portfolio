import React, { Component } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { motion } from "framer-motion";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: {},
      detailsModalShow: false,
      isVisible: false
    };
    this.sectionRef = React.createRef();
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        this.setState({ isVisible: entry.isIntersecting });
      },
      { threshold: 0.6 } // Improved trigger sensitivity
    );
    if (this.sectionRef.current) {
      this.observer.observe(this.sectionRef.current);
    }
  }

  componentWillUnmount() {
    if (this.observer && this.sectionRef.current) {
      this.observer.unobserve(this.sectionRef.current);
    }
  }

  render() {
    let detailsModalShow = (data) => {
      this.setState({ detailsModalShow: true, deps: data });
    };
    let detailsModalClose = () => this.setState({ detailsModalShow: false });

    let sectionName, projects;

    if (this.props.resumeProjects && this.props.resumeBasicInfo) {
      sectionName = this.props.resumeBasicInfo.section_name.projects;

      projects = this.props.resumeProjects.map((projects, i) => {
        return (
          <motion.div
            className="col-sm-12 col-md-6 col-lg-4"
            key={projects.title}
            style={{ cursor: "pointer", padding: "10px 15px" }} 
            initial={{ opacity: 0, y: 20 }}
            animate={this.state.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
          >
            <div
              className="project-card-clean"
              onClick={() => detailsModalShow(projects)}
              style={{
                position: "relative",
                height: "100%",
                minHeight: "220px", 
                padding: "35px",
                borderRadius: "4px",
                backgroundColor: "var(--card-background)", 
                // Using a hint of theme gold for the border
                border: "1px solid rgba(174,148,79, 0.15)",
                transition: "all 0.4s ease",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.15)";
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.borderColor = "rgba(174,148,79, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(174,148,79, 0.15)";
              }}
            >
              <div>
                <span style={{ 
                    fontSize: '11px', 
                    fontWeight: '600', 
                    textTransform: 'uppercase', 
                    letterSpacing: '2px',
                    color: '#AE944F', 
                    display: 'block',
                    marginBottom: '12px'
                }}>
                    {projects.startDate}
                </span>

                <h2 style={{ 
                    fontSize: '24px', 
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: '300',
                    margin: '0 0 15px 0',
                    color: 'var(--header-text)',
                    transition: 'color 0.6s ease'
                }}>
                    {projects.title}
                </h2>

                <p style={{
                    fontSize: "14px",
                    lineHeight: "1.6",
                    color: "var(--text-color)",
                    opacity: 0.8,
                    margin: 0,
                    transition: 'color 0.6s ease'
                }}>
                    {projects.description}
                </p>
              </div>

              <div style={{ 
                  fontSize: '10px', 
                  fontWeight: '700', 
                  letterSpacing: '2px', 
                  textTransform: 'uppercase',
                  marginTop: '25px',
                  color: '#AE944F'
              }}>
                  View Project Details →
              </div>
            </div>
          </motion.div>
        );
      });
    }

    return (
      <section id="portfolio" ref={this.sectionRef} style={{ background: 'var(--body-background)', padding: '100px 0', transition: 'background-color 0.6s ease' }}>
        <div className="container-fluid" style={{ maxWidth: '1400px' }}>
          <div className="row">
            <div className="col-md-12">
              <motion.h1
                className="section-title"
                style={{ 
                    color: "var(--header-text)",
                    fontSize: "2.2rem",
                    fontWeight: "500",
                    textAlign: "center",
                    marginBottom: "70px",
                    transition: 'color 0.6s ease'
                }}
                initial={{ opacity: 0 }}
                animate={this.state.isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <span>{sectionName}</span>
              </motion.h1>
            </div>
          </div>

          <div className="row justify-content-center">
              {projects}
          </div>

          <ProjectDetailsModal
            show={this.state.detailsModalShow}
            onHide={detailsModalClose}
            data={this.state.deps}
          />
        </div>
      </section>
    );
  }
}

export default Projects;