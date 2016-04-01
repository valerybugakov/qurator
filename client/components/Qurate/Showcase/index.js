import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { Grid, Row, Col } from 'react-bootstrap'
import { resetPicker } from 'actions/picker'
import ImageModal from 'components/ImageModal'
import styles from './styles'
import config from 'services/config'
import { createStructuredSelector } from 'reselect'
import _ from 'lodash'
const { image: { prefix } } = config

const selector = createStructuredSelector({
  images: state => _.toArray(state.entities.images),
})


@connect(
  selector,
  { resetPicker })
class Showcase extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
  }

  state = {
    image: {},
    showModal: false,
  }

  showModal(image) {
    this.setState({
      image,
      showModal: true,
    })
  }

  @autobind
  hideModal() {
    this.setState({ showModal: false })
  }

  render() {
    const { images } = this.props

    return (
      <Grid fluid >
        <Row>
          {images.map(image => (
            <Col
              xs={3}
              md={2}
              lg={1}
              key={image.id}
            >
              <img
                className={styles.image}
                src={`${prefix.tb}${image.url}`}
                onClick={this.showModal.bind(this, image)} // eslint-disable-line
              />
            </Col>
          ))}
          <ImageModal
            image={this.state.image}
            active={this.state.showModal}
            onClose={this.hideModal}
          />
        </Row>
      </Grid>
    )
  }
}

export default Showcase