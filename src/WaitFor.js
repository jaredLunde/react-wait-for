import React from 'react'
import PropTypes from 'prop-types'
import Promise from 'cancelable-promise'


export default class WaitFor extends React.Component {
  static propTypes = {
    img: PropTypes.string,
    promise: PropTypes.any,
    loading: PropTypes.element
  }

  static defaultProps = {
    loading: null
  }

  state = {ready: typeof window === 'undefined'}

  constructor (props) {
    super(props)
    this.promise = props.promise

    if (typeof document !== 'undefined' && props.img) {
      const img = new Image()
      img.src = props.img

      this.promise = new Promise(
        (resolve, reject) => {
          if (img.complete) {
            resolve()
          }
          else {
            img.onload = resolve
          }
        }
      )
    }
  }

  componentDidMount () {
    if (this.promise !== null && this.promise !== void 0) {
      this.promise.then(() => this.setState({ready: true}))
    }
  }

  componentWillUnmount () {
    if (this.promise && this.promise.cancel !== void 0) {
      this.promise.cancel()
    }
  }

  render () {
    return this.state.ready ? this.props.children : this.props.loading
  }
}
