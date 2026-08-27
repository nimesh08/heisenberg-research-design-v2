import { useEffect, useState } from "react";
import { siteContent as content } from "./content.js";

function Brand({ light = false }) {
  return (
    <a className={`brand${light ? " brand--light" : ""}`} href="#top">
      <img
        className="brand__mark"
        src={light ? content.brand.marks.cream : content.brand.marks.espresso}
        alt=""
      />
      <span>{content.brand.name}</span>
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeOutside = (event) => {
      if (event.target instanceof Element && !event.target.closest(".site-header")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <Brand />
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span />
          <span />
        </button>
        <nav
          className={`primary-nav${menuOpen ? " primary-nav--open" : ""}`}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          {content.navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a
            className="primary-nav__mobile-cta"
            href={content.links.careers}
            onClick={() => setMenuOpen(false)}
          >
            Join the team
          </a>
        </nav>
        <a className="button button--nav" href={content.links.careers}>
          Join the team
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <img
        className="hero__ghost-mark hero__ghost-mark--right"
        src={content.brand.marks.orange}
        alt=""
      />
      <img
        className="hero__ghost-mark hero__ghost-mark--left"
        src={content.brand.marks.orange}
        alt=""
      />
      <div className="hero__content shell">
        <p className="eyebrow">{content.hero.eyebrow}</p>
        <h1>{content.hero.title}</h1>
        <p className="hero__description">{content.hero.description}</p>
        <div className="hero__actions">
          <a className="button button--primary" href="#research">
            {content.hero.primaryCta}
          </a>
          <a className="button button--secondary" href="#work">
            {content.hero.secondaryCta}
          </a>
        </div>
        <div className="backers" aria-label="Investors">
          <p className="backers__label">{content.hero.investorLabel}</p>
          <div className="backers__logos">
            {content.hero.investors.map((investor) => (
              <div className="backer-logo" key={investor.name}>
                <img src={investor.logo} alt={investor.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Thesis() {
  return (
    <section className="section section--compact" id="thesis">
      <div className="thesis shell">
        {[content.thesis.problem, content.thesis.answer].map((column) => (
          <article className="thesis__column" key={column.eyebrow}>
            <p className="eyebrow">{column.eyebrow}</p>
            <h2>{column.title}</h2>
            <p>{column.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ResearchCard({ pillar }) {
  const dark = pillar.tone === "espresso";
  return (
    <article className="research-card">
      <div className={`research-card__icon research-card__icon--${pillar.tone}`}>
        <img
          src={dark ? content.brand.marks.cream : content.brand.marks.espresso}
          alt=""
        />
      </div>
      <h3>{pillar.title}</h3>
      <p>{pillar.body}</p>
    </article>
  );
}

function Research() {
  return (
    <section className="section" id="research">
      <div className="shell">
        <div className="section-heading">
          <p className="eyebrow">{content.research.eyebrow}</p>
          <h2>{content.research.title}</h2>
          <p>{content.research.body}</p>
        </div>
        <div className="research-grid">
          {content.research.pillars.map((pillar) => (
            <ResearchCard pillar={pillar} key={pillar.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Applications() {
  return (
    <section className="section applications" id="applications">
      <div className="shell">
        <div className="section-heading section-heading--light">
          <p className="eyebrow">{content.applications.eyebrow}</p>
          <h2>{content.applications.title}</h2>
          <p>{content.applications.intro}</p>
        </div>
        <div className="application-list">
          {content.applications.items.map((item) => (
            <article className="application-row" key={item.number}>
              <span className="application-row__number">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ card }) {
  const mark =
    card.tone === "espresso"
      ? content.brand.marks.cream
      : card.tone === "white"
        ? content.brand.marks.orange
        : content.brand.marks.espresso;

  return (
    <article className="work-card">
      <div className={`work-card__visual work-card__visual--${card.tone}`}>
        <img src={mark} alt="" />
      </div>
      <h3 className="work-card__label">{card.title}</h3>
      <p className="work-card__body">{card.body}</p>
      {card.cta ? (
        <a className="text-link" href={content.links[card.hrefKey]}>
          {card.cta} <span aria-hidden="true">→</span>
        </a>
      ) : null}
    </article>
  );
}

function Work() {
  return (
    <section className="section" id="work">
      <div className="shell">
        <div className="section-heading section-heading--short">
          <p className="eyebrow">{content.work.eyebrow}</p>
          <h2>{content.work.title}</h2>
        </div>
        <div className="work-grid">
          {content.work.cards.map((card) => (
            <WorkCard card={card} key={card.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="team-section" aria-labelledby="team-heading">
      <div className="team shell">
        <h2 className="eyebrow eyebrow--muted" id="team-heading">
          {content.team.eyebrow}
        </h2>
        <div className="team-grid">
          {content.team.institutions.map((institution) => (
            <div
              className={`team-logo team-logo--${institution.id}${
                institution.tone === "dark" ? " team-logo--dark" : ""
              }`}
              key={institution.name}
            >
              <img src={institution.logo} alt={institution.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__inner shell">
        <div className="site-footer__brand">
          <Brand light />
          <p>{content.footer.copyright}</p>
        </div>
        <nav className="site-footer__nav" aria-label="Footer navigation">
          <a href="#research">Research</a>
          <a href="#work">Work with us</a>
          <a href={content.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </nav>
        <p className="site-footer__rights">
          {content.footer.rightsNotice}{" "}
          <a href={content.links.rights}>{content.footer.rightsLabel}</a>
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#research">
        Skip to research
      </a>
      <Header />
      <main>
        <Hero />
        <Thesis />
        <Research />
        <Applications />
        <Work />
        <Team />
      </main>
      <Footer />
    </>
  );
}
