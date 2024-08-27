import React from 'react'
import '../App.css'

const AboutSection = () => {
  return (
    <div className="background-container">
      <div className='content'>
      <h1 id='about-header'>Share your experiences,<br /> Shape our understanding.</h1>
        <p className='text-content'>
        We all navigate public spaces in our own unique ways, influenced by who we are and how others see us.
        These experiences shape our sense of safety, well-being, and belonging, yet they often go unseen,
        especially as a collective.
        Safe Space Share lets you anonymously share your personal experiences in different places—whether
        positive or negative—and discover our collective emotional landscape through our interactive map.<br /><br />
        By sharing your stories, we can build a world where everyone feels safe, seen, and valued. Join us in creating a future where we all belong.
        </p>
        <div className="navigation-buttons">
          <button id='share-button' onClick={() => document.getElementById('contribute').scrollIntoView({ behavior: 'smooth' })}>
            Share Your Experience
          </button>
          <button id='explore-button' onClick={() => document.getElementById('explore').scrollIntoView({ behavior: 'smooth' })}>
            Explore Experiences
          </button>
        </div>
      </div>
    </div>
  )
}

export default AboutSection
