import React from "react";
import "./styles.scss";
import { StaticQuery, graphql } from "gatsby";
import { Row, Col } from "react-bootstrap";
import Glitch from "components/glitch";
import Typewriter from "typewriter-effect";
import ThemeContext from "../../context";
import profile from "./profile.png";
import profileImg from "./profileImg.png";
class Hero extends React.Component {
  static contextType = ThemeContext;

  render() {
    return (
      <section
        id={`${this.props.id}`}
        className="hero"
        style={{ height: this.context.height }}
      >
        <Row>
          <Col md={6} className="content">
            <div className="content-text">
              <div className="line-text">
                <h4>Hello, I'm</h4>
              </div>
              <Glitch text="Jonas IZABAYO" />
              <Typewriter
                options={{
                  strings: ["Full stack Javascript Web Developer"],
                  autoStart: true,
                  loop: true,
                }}
              />
              <button className="hover-button">
                <span
                  onClick={() =>
                    window.open(
                      "https://drive.google.com/file/d/1zZayVI0LB1Pv11PPq4Tzr-DvCVFKFL_7/view?usp=sharing"
                    )
                  }
                >
                  View CV
                </span>
              </button>
            </div>
            {this.icons()}
          </Col>
          <Col md={6} className="img">
            <img src={profileImg} alt="person" />
          </Col>
        </Row>
      </section>
    );
  }

  icons() {
    return this.props.icons.edges.map((value, index) => {
      return (
        <img
          src={value.node.childImageSharp.fluid.src}
          className={`animated fadeIn move-${
            Math.floor(Math.random() * 10) % 2 === 0 ? "up" : "down"
          } float-image`}
          style={{
            left: `${index * 10}%`,
            bottom: `${
              Math.random() *
                (+(index % 2 === 0 ? 80 : 20) - +(index % 2 === 0 ? 70 : 10)) +
              +(index % 2 === 0 ? 70 : 10)
            }%`,
          }}
          alt="shape"
          key={index}
        />
      );
    });
  }
}

export default (props) => (
  <StaticQuery
    query={graphql`
      query {
        icons: allFile(
          filter: {
            extension: { regex: "/(png)/" }
            relativeDirectory: { eq: "icons" }
          }
        ) {
          edges {
            node {
              childImageSharp {
                fluid(maxWidth: 100) {
                  src
                }
              }
            }
          }
        }
        Img: file(relativePath: { eq: "person.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 2000) {
              src
            }
          }
        }
      }
    `}
    render={({ icons, Img }) => <Hero icons={icons} mainImg={Img} {...props} />}
  />
);
