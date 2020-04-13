import React from 'react'
import { Behance } from 'components/icons/socials/Behance'
import { Dribble } from 'components/icons/socials/Dribble'
import { Insta } from 'components/icons/socials/Insta'
import { Facebook } from 'components/icons/socials/Facebook'
import { LinkedIn } from 'components/icons/socials/LinkedIn'
import { LanpLogo } from 'components/icons/LanpLogo'

const Footer = () => (
  <footer className="footer">
    <div className="container aic jcsb">
      <div className="footer__info aic">
        <a href="#" className="footer__logo link aic">
          <LanpLogo />
        </a>
        <span className="c3 fw-medium footer__text ">© 2020 Cryptofolio</span>
      </div>
      <div className="footer__social aic">
        <span className="c3 fw-medium footer__text">Follow socials:</span>
        <div className="footer__links aic link">
          <a href="#" target="_blank" className="footer__link">
            <Behance />
          </a>
          <a href="#" target="_blank" className="footer__link">
            <Dribble />
          </a>
          <a href="#" target="_blank" className="footer__link">
            <Insta />
          </a>
          <a href="#" target="_blank" className="footer__link">
            <Facebook hovered />
          </a>
          <a href="#" target="_blank" className="footer__link">
            <LinkedIn />
          </a>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
