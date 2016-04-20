import React, { Component } from 'react'
import { Grid, Row, Col, Carousel, CarouselItem, Button } from 'react-bootstrap'
import styles from './styles'

class Home extends Component {
  render() {
    return (
      <Grid fluid >
        <Carousel className={styles.carousel}>
          <CarouselItem className={styles.carouselItem}>
            <img width="100%" height="500px"  alt="900x500" src="/img/firstSlide.jpg" />
            <div className="carousel-caption">
              <h3>Qurator</h3>
              <p>For when you want art, <br />but dont know where to start.</p>
              <div className={styles.buttonsGroup}>
                <div >
                <p>Click here to use our <br />algorithm and find <br />the perfect art for you!</p>
                <Button bsStyle="primary" className={styles.btnYellow}><span className={styles.arrowBtn}></span>Qurate</Button>
                </div>
                <div>
                <Button bsStyle="primary" className={styles.btnBlack}>Shop Now</Button>
              </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className={styles.carouselItem}>
            <img width="100%" height="500px" alt="900x500" src="/img/secondSlide.jpg" />
            <div className="carousel-caption">
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </CarouselItem>
          <CarouselItem className={styles.carouselItem}>
            <img width="100%" height="500px" alt="900x500" src="/img/thirdSlide.jpg" />
            <div className="carousel-caption">
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </div>
          </CarouselItem>
        </Carousel>
        <Row >
          <Col md={12}>
            <div className={styles.whatIsSection}>
            <div className="text-center"><h2 className={styles.whatIsH2}>What is Qurator?</h2></div>
            <p className={styles.whatIsP}>Our goal is to make the process of purchasing high-quality, affordable,<br />
and ready-to-hang art as simple and seamless as possible and to connect <br />
up and coming artists with people who love their art. </p>
              <Grid>
                <Row>
                  <Col md={4}>
                    <div className={styles.firstBlock}>
                    <i className="fa fa-picture-o" aria-hidden="true"></i>
                    <h3>Qurate</h3>
                    <p>Start by taking the Qurator Quiz<br />
to determine your unique art preferences.<br />
Our algorithm will suggest pieces of art<br />
from our collection that best fit your style. </p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className={styles.secondBlock}>
                    <i className="fa fa-star" aria-hidden="true"></i>
                      <h3>Unique</h3>
                      <p>Our photos come from some of the most<br />
talented, up-and-coming photographers out there.<br />
Your purchases help support independent<br />
 artists who are passionate about their work<br />
 and whose art is not yet commercialized.  </p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className={styles.thirdBlock}>
                    <i className="fa fa-rocket" aria-hidden="true"></i>
                      <h3>Seamless</h3>
                      <p>The art you purchase will arrive right<br />
 to your door, ready-to-hang.<br />
And shipping is free! Its' that simple.</p>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className={styles.btnStart}>
                    <Button bsStyle="primary" className={styles.btnBlack}>Start Here</Button>
                  </Col>
                </Row>
              </Grid>
              </div>
          </Col>
        </Row>
        <Row>
          // Images
        </Row>
      </Grid>
    )
  }
}

export default Home
