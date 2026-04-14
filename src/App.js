import React, { Component } from "react";
import $ from "jquery";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { motion } from "framer-motion";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      foo: "bar",
      resumeData: {},
      sharedData: {},
      activeLanguage: window.$primaryLanguage,
      scrollProgress: 0,
      theme: "light" 
    };
  }

  // Updated to arrow function to fix "this" context and trigger correctly
  applyPickedLanguage = (pickedLanguage) => {
    this.setState({ activeLanguage: pickedLanguage }, () => {
      document.documentElement.lang = pickedLanguage;
      
      var resumePath =
        pickedLanguage === window.$primaryLanguage
          ? `res_primaryLanguage.json`
          : `res_secondaryLanguage.json`;
      
      this.loadResumeFromPath(resumePath);
    });
  }

  componentDidMount() {
    this.loadSharedData();
    this.applyPickedLanguage(window.$primaryLanguage);
    
    if (!document.body.getAttribute("data-theme")) {
      document.body.setAttribute("data-theme", "light");
    }
    
    this.setState({ theme: document.body.getAttribute("data-theme") });

    this.themeObserver = new MutationObserver(() => {
      const currentTheme = document.body.getAttribute("data-theme");
      if (currentTheme !== this.state.theme) {
        this.setState({ theme: currentTheme });
      }
    });

    this.themeObserver.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });

    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    if (this.themeObserver) {
      this.themeObserver.disconnect();
    }
  }

  handleScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    this.setState({ scrollProgress: scrolled });
  };

  loadResumeFromPath(path) {
    $.ajax({
      url: path,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error("Error:", err);
      },
    });
  }

  loadSharedData() {
    $.ajax({
      url: `portfolio_shared_data.json`,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ sharedData: data });
        document.title = data.basic_info.name;
      }.bind(this),
      error: function (xhr, status, err) {
        console.error("Error:", err);
      },
    });
  }

  render() {
    const isLight = this.state.theme === "light";
    const scrollColor = isLight ? "#9B7E36" : "#AE944F";

    return (
      <div style={{ background: "var(--body-background)", transition: "background 0.6s ease" }}>
        
        {/* Scroll Progress Bar */}
        <div className="progress-container" style={{
          position: "fixed",
          top: 0,
          zIndex: 9999,
          width: "100%",
          height: "5px",
          background: isLight ? "rgba(0,0,0,0.05)" : "transparent"
        }}>
          <div className="progress-bar" style={{
            height: "100%",
            background: scrollColor, 
            width: `${this.state.scrollProgress}%`,
            transition: "width 0.1s ease-out, background 0.3s ease",
            boxShadow: isLight ? "0px 2px 5px rgba(0,0,0,0.3)" : "0px 0px 10px rgba(174,148,79,0.5)"
          }} />
        </div>

        {/* Updated Header with necessary props for language switching */}
        <Header 
          sharedData={this.state.sharedData.basic_info} 
          applyPickedLanguage={this.applyPickedLanguage}
          activeLanguage={this.state.activeLanguage}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        
        {/* THE FLAG SECTION WAS REMOVED FROM HERE AS REQUESTED */}

        <About
          resumeBasicInfo={this.state.resumeData.basic_info}
          sharedBasicInfo={this.state.sharedData.basic_info}
        />
        <Projects
          resumeProjects={this.state.resumeData.projects}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Skills
          sharedSkills={this.state.sharedData.skills}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Experience
          resumeExperience={this.state.resumeData.experience}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Footer sharedBasicInfo={this.state.sharedData.basic_info} />
      </div>
    );
  }
}

export default App;