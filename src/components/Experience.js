import React, { Component } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Badge from "react-bootstrap/Badge";

class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshKey: 0,
    };
    this.sectionRef = React.createRef();
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.setState((prev) => ({
            refreshKey: prev.refreshKey + 1,
          }));
        }
      },
      { threshold: 0.3 }
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
    let sectionName, work;

    if (this.props.resumeExperience && this.props.resumeBasicInfo) {
      sectionName = this.props.resumeBasicInfo.section_name.experience;

      work = this.props.resumeExperience.map((work, i) => {
        const mainTech = work.mainTech.map((technology, i) => (
          <Badge pill className="main-badge mr-2 mb-2" key={i}>
            {technology}
          </Badge>
        ));

        const tech = work.technologies.map((technology, i) => (
          <Badge pill className="experience-badge mr-2 mb-2" key={i}>
            {technology}
          </Badge>
        ));

        return (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date={work.years}
            contentStyle={{
              background: "var(--card-background)",
              color: "var(--text-color)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              textAlign: "left",
              transition: "background 0.6s ease, color 0.6s ease"
            }}
            contentArrowStyle={{
              borderRight: "7px solid var(--card-background)",
              transition: "border-right 0.6s ease"
            }}
            dateClassName="experience-date-text" 
            iconStyle={{
              background: "#AE944F",
              color: "#fff",
              textAlign: "center",
            }}
            icon={<i className="fab fa-angular experience-icon"></i>}
            key={i}
          >
            <div style={{ textAlign: "left", marginBottom: "4px" }}>
              {mainTech}
            </div>

            <h3
              className="vertical-timeline-element-title"
              style={{ textAlign: "left", color: "var(--header-text)" }}
            >
              {work.title}
            </h3>

            <h4
              className="vertical-timeline-element-subtitle"
              style={{ textAlign: "left", color: "var(--text-color)", opacity: 0.8 }}
            >
              {work.company}
            </h4>

            <div style={{ textAlign: "left", marginTop: "15px" }}>
              {tech}
            </div>
          </VerticalTimelineElement>
        );
      });
    }

    return (
      <section 
        id="resume" 
        className="pb-5 pt-5" // Added pt-5 for better heading spacing
        ref={this.sectionRef} 
        style={{ background: "var(--body-background)", transition: "background 0.6s ease" }}
      >
        <div className="col-md-12 mx-auto">
          <div className="col-md-12">
            <h1 
              className="section-title" 
              style={{ 
                color: "var(--header-text)",
                fontSize: "2.2rem",    // Matches your Skills heading
                fontWeight: "500",   // Bold for visual impact
                textAlign: "center",
                marginBottom: "50px" // Space between heading and timeline
              }}
            >
              <span>{sectionName}</span>
            </h1>
          </div>
        </div>

        <div className="col-md-8 mx-auto">
          <VerticalTimeline 
            key={this.state.refreshKey} 
            lineColor={"#AE944F"} 
          >
            {work}

            <VerticalTimelineElement
              iconStyle={{
                background: "#AE944F",
                color: "#fff",
                textAlign: "center",
              }}
              icon={
                <i className="fas fa-hourglass-start mx-auto experience-icon"></i>
              }
            />
          </VerticalTimeline>
        </div>
      </section>
    );
  }
}

export default Experience;