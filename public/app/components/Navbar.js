import React from 'react'
import {connect} from 'react-redux'
import fetch from 'isomorphic-fetch'
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize.js'

const actions = require('../actions')

class Navbar extends React.Component {

  constructor (props) {
    super(props)
    this.handleCategory = this.handleCategory.bind(this)
  }

  componentWillMount () {
    const {dispatch, categories} = this.props
    fetch('/categories')
    .then((data) => data.json())
    .then((data) => dispatch(actions.categories.setCategories(data)))
    .catch((err) => dispatch(actions.categories.setCategories(categories)))
  }

  handleCategory (e) {
    const cat = e.target.innerHTML
    const {dispatch, sources} = this.props
    fetch(`/fetchSources/${cat}`)
    .then((data) => data.json())
    .then((data) => {
      dispatch(actions.articles.setArticles([]))
      dispatch(actions.sources.setSources(data))
      dispatch(actions.category.setCategory(cat))
    })
    .catch((err) => dispatch(actions.sources.setSources(sources)))
  }

  render () {
    const {categories} = this.props
    return (
      <nav>
        <div className='nav-wrapper grey darken-3'>
          <a href='#' className='brand-logo'>Read-It-Later</a>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li>
              <span className='btn dropdown-button' data-activates='dropdown'>Categories</span>
              <ul id='dropdown' className='dropdown-content'>
                {
                  categories.map((cat) => {
                    return (
                      <li onClick={e => { this.handleCategory(e) }} key={cat}>
                        <span>{cat}</span>
                      </li>
                    )
                  })
                }
              </ul>
            </li>
            <li><a href='#'>Saved Articles</a></li>
            <li><a href='#'>Settings</a></li>
            <li><a href='/logout'>Logout</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default connect((state) => {
  return {
    categories: state.categories
  }
})(Navbar)
