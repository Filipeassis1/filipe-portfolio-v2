import { RevealItem } from "./Reveal.jsx";

/** Shared Tool/Item contract: project, experience, or education content. */
export default function ContentCard({ title, description, metadata, icon, iconClass = "", href }) {
  const hasLogo = Boolean(icon);

  return (
    <RevealItem as={href ? "a" : "article"} className={`content-card${hasLogo ? "" : " content-card--no-logo"}`} href={href}>
      <span className="content-card__row">
        {hasLogo && (
          <span className={`content-card__logo ${iconClass}`} aria-hidden="true">
            <img src={icon} alt="" />
          </span>
        )}
        <span className="content-card__content">
          <span className="content-card__title">{title}</span>
          {description && <span className="content-card__description">{description}</span>}
        </span>
      </span>
      {(metadata || href) && (
        <span className="content-card__footer">
          <span className="content-card__metadata">{metadata}</span>
          <span className="content-card__arrow" aria-hidden="true"><img src="/assets/content-card/arrow-up-right.svg" alt="" width="20" height="20" /></span>
        </span>
      )}
    </RevealItem>
  );
}
