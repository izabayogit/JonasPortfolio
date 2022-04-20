import React from "react";
import Particles from "react-particles-js";
import Progress from "components/progress";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import ThemeContext from "../../context";
import upwork from "./upwork.jpg";
import "./styles.scss";

class Hero extends React.Component {
  static contextType = ThemeContext;

  render() {
    return (
      <section
        id={`${this.props.id}`}
        className="about"
        style={{ height: this.context.height }}
      >
        {this.particles()}
        <Row>
          <Col md={6} className="content">
            <div className="content-text">
              <div className="line-text">
                <h4>About Me</h4>
              </div>
              <h3>I'm a Full Stack web developer </h3>
              <div className="separator" />
              <p>
                I’m a passionate software Engineer with three years of
                experience in building web applications using Node.js/express,
                React.js/Redux, Vue.js, PostgreSQL, HTML5, SCSS, CSS3, MongoDB,
                Heroku deployment, and AWS. In fact, I can be part of any
                technical department working on both Backend and Frontend. I
                have experience in working in a team as my previous experience
                and I deliver quality work and values.
              </p>
              <div className="social social_icons">
                <FontAwesomeIcon
                  icon={faGithub}
                  className="social_icon"
                  onClick={() => window.open("https://github.com/izabayogit")}
                />
                <img
                  src={upwork}
                  className="upwork"
                  onClick={() =>
                    window.open(
                      "https://www.upwork.com/freelancers/~0113423d4302aa5246"
                    )
                  }
                />
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="social_icon"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/izabayo-jonas-9009971a6"
                    )
                  }
                />
              </div>
            </div>
          </Col>
          <Col md={6} className="skills">
            <div className="line-text">
              <h4>My Skills</h4>
            </div>
            <div className="skills-container">
              <Progress name="Web Design" value={90} delay={1100} />
              <Progress name="React" value={90} delay={1100} />
              <Progress name="Vue" value={70} delay={1100} />
              <Progress name="MongoDB" value={80} delay={1100} />
              <Progress name="PostgreSQL" value={80} delay={1100} />
              <Progress name="CSS" value={100} delay={1100} />
            </div>
          </Col>
        </Row>
      </section>
    );
  }

  particles() {
    return (
      <Particles
        className="particles"
        params={{
          particles: {
            number: {
              value: 50,
              density: {
                enable: false,
                value_area: 5000,
              },
            },
            line_linked: {
              enable: true,
              opacity: 0.5,
            },
            size: {
              value: 1,
            },
          },
          retina_detect: true,
        }}
      />
    );
  }
}

export default Hero;
