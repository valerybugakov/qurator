import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { toArray } from 'lodash'
import { createStructuredSelector } from 'reselect'
import { Grid, Row, Col, Carousel, CarouselItem, Button } from 'react-bootstrap'
import { filterImagesByForm } from 'actions/images'
import ButtonsGroup from './ButtonsGroup'
import { addToCart } from 'actions/cart'
import FeaturedImages from './FeaturedImages'
import styles from './styles'

const selector = createStructuredSelector({
  images: state => toArray(state.entities.images).filter(img => img.featured),
})

@connect(selector, { addToCart, filterImagesByForm })
class Home extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    filterImagesByForm: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.filterImagesByForm()
  }

  render() {
    return (
      <Grid fluid className={styles.homeContainer}>
        <Carousel className={styles.carousel}>
          <CarouselItem className={styles.carouselItem}>
            <img width="100%" height="500px" alt="900x500" src="/img/firstSlide.jpg" />
            <div className={`carousel-caption ${styles.carouselCaption}`}>
              <p>For when you want art, but don’t know where to start.</p>
              <p className={styles.launchSale}>Launch Sale! For 20% off and free shipping,
              use the discount code:<span className={styles.yellow}> QURATORLAUNCH</span>
              </p>
              <ButtonsGroup />
            </div>
          </CarouselItem>
          <CarouselItem className={styles.carouselItem}>
            <img width="100%" height="500px" alt="900x500" src="/img/secondSlide.jpg" />
            <div className={`carousel-caption ${styles.carouselCaption}`}>
              <p className={styles.white}>For when you want art,
                <br /> but don&#39;t know where to start.
              </p>
              <p className={`white ${styles.launchSale}`}>Launch Sale! For 20% off and free
              shipping, use the discount code: QURATORLAUNCH
              </p>
              <ButtonsGroup />
            </div>
          </CarouselItem>
          <CarouselItem className={styles.carouselItem}>
            <img width="100%" height="500px" alt="900x500" src="/img/thirdSlide.jpg" />
            <div className={`carousel-caption ${styles.carouselCaption}`}>
              <p>
                For when you want art,<br /> but don&#39;t know where to start.
              </p>
              <p className={styles.launchSale}>Launch Sale! For 20% off and free shipping,
              use the discount code: QURATORLAUNCH
              </p>
              <ButtonsGroup />
            </div>
          </CarouselItem>
        </Carousel>
        <Row >
          <Col md={12}>
            <div className={styles.whatIsSection}>
            <div className="text-center"><h2 className={styles.whatIsH2}>What is Qurator?</h2></div>
            <p className={styles.whatIsP}>
              Our goal is to make the process of purchasing high-quality, affordable,<br />
              and ready-to-hang art as simple and seamless as possible. We want to connect<br />
              up-and-coming artists with customers just like you!
            </p>
            <Grid className={styles.redBlockMob}>
                <Row>
                  <Col md={4} xs={12}>
                    <div className={styles.firstBlock}>
                      <i className="fa fa-picture-o" aria-hidden="true"></i>
                      <h3>Qurate</h3>
                      <p>
                        Start by taking the <Link to="/qurate">Qurator Quiz</Link>
                        <br />
                        to determine your unique art preferences.
                        Our algorithm will suggest pieces of art
                        from our collection that best fit your style.
                      </p>
                    </div>
                  </Col>
                  <Col md={4} xs={12}>
                    <div className={styles.secondBlock}>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <h3>Unique</h3>
                      <p>
                        Our photos come from some of the most
                        talented, up-and-coming photographers out there.
                        Your purchases help support independent
                        artists who are passionate about their work
                        and whose art is not yet commercialized.
                      </p>
                    </div>
                  </Col>
                  <Col md={4} xs={12}>
                    <div className={styles.thirdBlock}>
                      <i className="fa fa-rocket" aria-hidden="true"></i>
                      <h3>Seamless</h3>
                      <p>
                        The art you purchase will arrive right<br />
                        to your door, ready-to-hang.<br />
                        And shipping is free! It's that simple.
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className={styles.btnStart}>
                    <Link to="/qurate">
                    <Button bsStyle="primary" className={styles.btnBlack}>Start Here</Button>
                    </Link>
                  </Col>
                </Row>
              </Grid>
              </div>
          </Col>
        </Row>
        <Row>
          <Col md={12} className={styles.feature}>
            <FeaturedImages
              images={this.props.images}
              addToCart={this.props.addToCart}
            />
          </Col>
        </Row>
         <Row>
          <Col md={12} className={styles.contactSection}>
            <div className={styles.contactSectionBackground}>
            <p>
              To become an artist, send an email to<br />
                <a href="mailto:artists@qurator-art.com">artists@qurator-art.com</a><br />
                with a link to your Instagram account and / or portfolio.<br />
                We’d love to hear from you!
            </p>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Home
