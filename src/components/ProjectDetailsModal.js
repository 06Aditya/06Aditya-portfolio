import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class ProjectDetailsModal extends Component {
  render() {
    if (this.props.data) {
      const technologies = this.props.data.technologies;
      var title = this.props.data.title;
      var description = this.props.data.description;
      var url = this.props.data.url;

      if (this.props.data.technologies) {
        var tech = technologies.map((icons, i) => {
          return (
            <li className="list-inline-item mx-3" key={i}>
              <span>
                <div className="text-center">
                  <i className={icons.class} style={{ fontSize: "250%", color: "var(--header-text)" }}>
                    <p className="text-center" style={{ fontSize: "30%", marginTop: "10px", fontFamily: "sans-serif" }}>
                      {icons.name}
                    </p>
                  </i>
                </div>
              </span>
            </li>
          );
        });
      }
    }

    return (
      <Modal
        {...this.props}
        size="xl" // Changed from "lg" to "xl" for a bigger card
        aria-labelledby="contained-modal-title-vcenter"
        centered // Keeps the modal perfectly centered
        className="project-details-modal"
        contentClassName="custom-modal-content"
      >
        <div style={{ 
          background: "var(--card-background)", 
          borderRadius: "8px", 
          padding: "40px 20px", // Increased vertical padding for a more spacious feel
          border: "1px solid rgba(174,148,79, 0.2)",
          transition: "all 0.4s ease",
          minHeight: "50vh" // Ensures the card has a significant presence
        }}>
          <span onClick={this.props.onHide} className="modal-close" style={{ cursor: "pointer", position: "absolute", right: "25px", top: "20px" }}>
            <i className="fas fa-times fa-2x close-icon" style={{ color: "var(--header-text)" }}></i>
          </span>

          <div className="col-md-12">
            {/* Window buttons - Kept for that "clean" dev look */}
            <div className="col-md-11 mx-auto" style={{ paddingBottom: "20px", textAlign: "left" }}>
              <div className="slider-tab">
                <span className="iconify" data-icon="emojione:red-circle"></span> &nbsp;
                <span className="iconify" data-icon="twemoji:yellow-circle"></span> &nbsp;
                <span className="iconify" data-icon="twemoji:green-circle"></span>
              </div>
            </div>

            <div className="col-md-11 mx-auto"> {/* Adjusted to col-md-11 for wider content alignment */}
              <h3 style={{ 
                padding: "5px", 
                color: "var(--header-text)", 
                fontSize: "2.5rem", // Slightly larger title for the bigger modal
                fontWeight: "600"
              }}>
                {title}
                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-href"
                    style={{ color: "#AE944F", marginLeft: "15px" }}
                  >
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                ) : null}
              </h3>

              <p style={{ 
                color: "var(--text-color)", 
                fontSize: "1.5rem", // Slightly larger text for readability in the big modal
                lineHeight: "1.8",
                marginTop: "30px"
              }}>
                {description}
              </p>

              <div className="col-md-12 text-center" style={{ marginTop: "50px", paddingBottom: "20px" }}>
                <ul className="list-inline mx-auto">{tech}</ul>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ProjectDetailsModal;