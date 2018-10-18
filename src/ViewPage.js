import React, { Component } from 'react'
import SiteNav from './SiteNav'
import StoryList from './StoryList'
// import PropTypes from 'prop-types'

class ViewPage extends Component {
  static propTypes = {
    // title: PropTypes.object.isRequired,
    // stories: PropTypes.array.isRequired
  }

  state = {
    storyTitle: '',
    author: '',
    genre: '',
    story: ''
  }

  async componentDidMount() {
    console.log('comp started')
    try {
      const r = await fetch('http://localhost:2018/stories', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      console.log('called fetch')
      const stories = await r.json()
      console.log(stories)
      this.setState({ stories })
    } catch (error) {
      return this.setState({ error: error.message })
    }
  }

  async postData() {
    try {
      const r = await fetch('http://localhost:2018/stories', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: this.state.titleInProgress,
          author: this.state.authorInProgress,
          genre: this.state.genreInProgress,
          story: this.state.storyInProgress
        })
      })
      const stories = await r.json()
      if (stories.isJoi) {
        this.setState({ message: stories.details[0].context.label })
        console.log(stories)
      } else {
        console.log(stories)
        this.setState({ stories })
      }
    } catch (error) {
      return this.setState({ error: error.message })
    }
  }

  renderStories = () => {
    console.log(this.state.stories)
    if (this.state.stories) {
      return this.state.stories.map((stories, i) => {
        return (
          <StoryList key={i} title={stories.title}
          selectHandler={() => this.setState({
            title: stories.title,
          author: stories.author,
          genre: stories.genre,
          story: stories.story
          })}
           />
        )
      })
    }
  }

  render() {
    console.log(this.state)
    return (
      <div className="main-body">
        <div className="listings">
          <section id="story-listing">
            <div className="story-listing-header">
              <h1>Stories</h1>
            </div>
            <div className="button-listing">{this.renderStories()}</div>
          </section>
          <div className="rightBlock">
            <SiteNav />
            <section className="viewer">
              <h2>{this.state.title}</h2>
              <div id="author">
                  Author: {this.state.author}
                </div>
                <div id="genre">
                  Genre: {this.state.genre}
                </div>
                <div dangerouslySetInnerHTML={{
                  __html: this.state.story
                }} id="story" />
            </section>
          </div>
        </div>
      </div>
    )
  }
}

export default ViewPage
