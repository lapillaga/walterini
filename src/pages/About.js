import { Helmet } from "react-helmet";
import axios from "axios";
import FsLightbox from "fslightbox-react";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import ProgressiveImage from "react-progressive-image";
import Slider from "react-slick";
import Layout from "../components/Layout";
import Sectiontitle from "../components/Sectiontitle";
import Service from "../components/Service";
import Testimonial from "../components/Testimonial";

function About() {
  const [toggler, setToggler] = useState(false);
  const [information, setInformation] = useState("");
  const [courses, setCourses] = useState([]);
  const [writers, setWriters] = useState([]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleToggler = (event) => {
    setToggler({
      toggler: !toggler,
    });
  };

  useEffect(() => {
    axios.get("/api/information").then((response) => {
      setInformation(response.data);
    });
    axios.get("/api/writers").then((response) => {
      setWriters(response.data);
    });
    axios.get('/api/courses').then((response) => {
      setCourses(response.data);
    })
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Acerca de - Walterini</title>
        <meta
          name="description"
          content="Acerca de - Walterini"
        />
      </Helmet>
      <div className="mi-about-area mi-section mi-padding-top">
        <div className="container">
          <Sectiontitle title="Acerca de mí" />
          <div className="row">
            <div className="col-lg-6">
              <div className="mi-about-image">
                <ProgressiveImage
                  src={information.aboutImage}
                  placeholder="/images/about-image-placeholder.png"
                >
                  {(src) => (
                    <img
                      src={src}
                      alt="aboutimage"
                      onClick={() => handleToggler(!toggler)}
                    />
                  )}
                </ProgressiveImage>
                <span className="mi-about-image-icon">
                  <Icon.ZoomIn />
                </span>
                <FsLightbox
                  toggler={toggler}
                  sources={[information.aboutImageLg]}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mi-about-content">
                <h3>
                  Soy <span className="color-theme">{information.name}</span>
                </h3>
                <p>
                  Ser introvertido en mi niñez hasta iniciar mi adultez sirvió mucho para encontrar mis habilidades y aptitudes como; la música, el dibujo, la fotografía, la lectura, el haber escogido la psicología clínica como mi carrera de profesión y lo más importante “la necesidad de escribir”.
                </p>
                <ul>
                  {!information.name ? null : (
                    <li>
                      <b>Nombres</b> {information.name}
                    </li>
                  )}
                  {!information.age ? null : (
                    <li>
                      <b>Edad</b> {information.age} Years
                    </li>
                  )}
                  {!information.phone ? null : (
                    <li>
                      <b>Celular</b> {information.phone}
                    </li>
                  )}
                  {!information.nationality ? null : (
                    <li>
                      <b>Nacionalidad</b> {information.nationality}
                    </li>
                  )}
                  {!information.language ? null : (
                    <li>
                      <b>Idiomas</b> {information.language}
                    </li>
                  )}
                  {!information.email ? null : (
                    <li>
                      <b>Correo</b> {information.email}
                    </li>
                  )}
                  {!information.address ? null : (
                    <li>
                      <b>Dirección</b> {information.address}
                    </li>
                  )}
                  {!information.freelanceStatus ? null : (
                    <li>
                      <b>Freelance</b> {information.freelanceStatus}
                    </li>
                  )}
                </ul>
                <a href={information.cvfile} className="mi-button">
                  Descargar CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mi-service-area mi-section mi-padding-top">
        <div className="container">
          <Sectiontitle title="Mi inspiración" />
          <div className="mi-service-wrapper">
            <div className="row mt-30-reverse">
              {writers.map((writer) => (
                <div
                  className="col-lg-4 col-md-6 col-12 mt-30"
                  key={writer.title}
                >
                  <Service content={writer} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mi-review-area mi-section mi-padding-top mi-padding-bottom">
        <div className="container">
          <Sectiontitle title="Cursos" />
          <div className="row justify-content-center">
            <div className="col-12">
              <Slider className="mi-testimonial-slider" {...sliderSettings}>
                {courses.map((course) => (
                  <Testimonial key={course.id} content={course} />
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default About;
