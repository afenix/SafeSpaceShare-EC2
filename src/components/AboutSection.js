import React from 'react'
import ScrollArrow from './ScrollArrow'
import '../App.css'

const AboutSection = () => {
  return (
    <div className="background-container">
      <div className='content'>
      <h1 id='about-header'>What is <br/>SafeSpaceShare?</h1>
      <p>
        We all navigate public spaces in our unique ways, influenced by who we
        are and how others see us. These experiences shape our sense of safety,
        well-being, and belonging, yet they often go unseen, especially as a
        collective.
      </p>
      <br/>
      <p>
        SafeSpaceShare (S3) is here to change that. Anonymously share your
        stories, explore how your identity influences your experiences, and
        connect with the diverse perspectives of others. With S3's interactive
        map, you can uncover patterns and similarities across different
        communities, helping us all gain deeper insights into our shared and
        diverse worlds.
      </p>
      <h2 id='about-subtitle'>
        Let's get started!
      </h2>
      </div>
    </div>
  )
}

export default AboutSection
