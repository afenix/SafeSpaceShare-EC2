import React from 'react'
import '../App.css'

const AboutSection = () => {
  return (
    <div className="background-container">
      <div className='content'>
      <h1 id='about-header'>Share your experiences,<br /> Shape our understanding.</h1>
        <p>
        We all navigate public spaces in our own unique ways, influenced by who we are and how others see us.
        These experiences shape our sense of safety, well-being, and belonging, yet they often go unseen,
        especially as a collective.
        Safe Space Share lets you anonymously share your personal experiences in different places—whether
        positive or negative—and discover our collective emotional landscape through an interactive map.<br />
        We are all different, but our feelings are shared. Add your voice to our collective story.
        </p>
        {/* <h2 id='about-subtitle'>
          Let's get started!
        </h2> */}
        <div className="navigation-buttons">
          <button onClick={() => document.getElementById('contribute').scrollIntoView({ behavior: 'smooth' })}>
            Share Your Experience
          </button>
          <button onClick={() => document.getElementById('explore').scrollIntoView({ behavior: 'smooth' })}>
            Explore Experiences
          </button>
        </div>
      </div>
    </div>
  )
}

export default AboutSection
