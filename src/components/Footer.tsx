import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="about" className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              Cloud<span className="accent">Cad</span>AI
            </div>
            <p className="footer__tagline">
              AI-powered PLM platform for rapid prototyping and accelerated product development.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="#" className="footer__social-link" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="footer__social-link" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="footer__social-link" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div className="footer__links">
            <h4 className="footer__links-title">Product</h4>
            <a href="#features" className="footer__link">Features</a>
            <a href="#demo" className="footer__link">Demo</a>
            <a href="#" className="footer__link">Changelog</a>
            <a href="#" className="footer__link">Roadmap</a>
          </div>

          <div className="footer__links">
            <h4 className="footer__links-title">Resources</h4>
            <a href="#" className="footer__link">Documentation</a>
            <a href="#" className="footer__link">API Reference</a>
            <a href="#" className="footer__link">Tutorials</a>
            <a href="#" className="footer__link">Blog</a>
          </div>

          <div className="footer__links">
            <h4 className="footer__links-title">Company</h4>
            <a href="#" className="footer__link">About</a>
            <a href="#" className="footer__link">Careers</a>
            <a href="#" className="footer__link">Contact</a>
            <a href="#" className="footer__link">Privacy</a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} CloudCadAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
