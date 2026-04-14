import React, { Component } from "react";

class Footer extends Component {
  render() {
    if (this.props.sharedBasicInfo) {
      var networks = this.props.sharedBasicInfo.social.map(function (network) {
        return (
          <span key={network.name} className="m-4">
            <a 
              href={network.url} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: "white", 
                fontSize: "30px", 
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", 
                display: "inline-block"
              }}
              onMouseEnter={(e) => {
                const iconClass = network.class.toLowerCase();
                e.currentTarget.style.transform = "scale(1.3) translateY(-5px)";
                
                // Specific Hover Colors for LinkedIn and GitHub
                if (iconClass.includes("linkedin")) {
                  e.currentTarget.style.color = "#0077B5"; // LinkedIn Blue
                } else if (iconClass.includes("github")) {
                  e.currentTarget.style.color = "#6e5494"; // GitHub Purple (or choose #fafafa for bright white)
                } else {
                  e.currentTarget.style.color = "#AE944F"; // Default Gold for others
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "white";
                e.currentTarget.style.transform = "scale(1) translateY(0)";
              }}
            >
              <i className={network.class}></i>
            </a>
          </span>
        );
      });
    }

    return (
      <footer id="contact" style={{ 
        background: "#121212", 
        padding: "80px 0 50px 0", 
        marginTop: "0px",
        borderTop: "1px solid rgba(174,148,79, 0.1)" // Added subtle border for depth
      }}>
        <div className="col-md-12 text-center">
          <h2 style={{ 
            color: "white", 
            marginBottom: "40px", 
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontSize: "1.5rem"
          }}>
            Get In Touch
          </h2>

          <div className="social-links" style={{ textAlign: "center", marginBottom: "50px" }}>
            {networks}
          </div>

          <div className="copyright py-4 text-center">
            <div className="container">
              <small style={{ 
                color: "white", 
                opacity: 0.5, 
                fontSize: "14px"
              }}>
                Copyright &copy;{" "}
                {this.props.sharedBasicInfo
                  ? this.props.sharedBasicInfo.name
                  : "???"}
              </small>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;