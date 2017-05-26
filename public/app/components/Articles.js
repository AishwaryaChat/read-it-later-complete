import React from 'react'
import {connect} from 'react-redux'
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize.js'

import '../../views/styles/main.css'

export class Articles extends React.Component {

  constructor (props) {
    super(props)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal (e) {
    const modal = this.refs.articleModal
    modal.style.display = 'block'
  }

  closeModal () {
    this.refs.articleModal.style.display = 'none'
  }

  render () {
    let {articles} = this.props
    return (
      <div className='row'>
        <ul className='collection with-header'>
          <li className='collection-header'><h4>Top Articles</h4></li>
          {
            articles.map((art) => {
              return (
                <div key={art.title}>
                  <li className='collection-item avtar waves-effect waves-light' onClick={e => this.openModal(e)}>{art.title}
                    <div ref='articleModal' className='modal'>
                      <div className='modal-content'>
                        <h4>{art.title}</h4>
                        <p>{art.description}</p>
                        <a target='_blank' href={art.url}>Read the whole article here</a>
                        <button className='close' onClick={this.closeModal}>&times;</button>
                      </div>
                    </div>
                  </li>
                </div>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    articles: state.articles
  }
})(Articles)
