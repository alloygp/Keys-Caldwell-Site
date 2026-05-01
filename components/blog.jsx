// =====================================================================
// Keys-Caldwell — Blog primitives
// ---------------------------------------------------------------------
// Used by:
//   /blog/index.html                       (post index)
//   /blog/<slug>/index.html                (single post)
//
// Blog spokes are 1,200-1,800 word long-tail SEO posts. They MUST:
//   1. Answer the query in the first 60 words (snippet eligibility)
//   2. Link UP to a pillar page at least twice with descriptive anchor
//   3. Use H2s that mirror "people also ask" structure
//   4. Render an Article schema (handled by KCSeo.apply with pageType:'blog')
//   5. Show a real Author with credentials (Person schema in same emitter)
//
// Composition (single post):
//   KCNav · KCBreadcrumbs · KCBlogHeader · KCBlogToc · KCBlogBody ·
//   KCBlogAuthor · KCBlogRelated · KCCtaBand · KCFooter
// =====================================================================

// ---------- KCBlogHeader ----------
// The "above the fold" section. Title, subtitle, dateline, author
// chip, and the answer-first first paragraph that earns the
// featured snippet.
const KCBlogHeader = ({ content }) => {
  const c = content || {};
  return (
    <header className="kc-blogheader">
      <div className="kc-container">
        <div className="kc-blogheader-grid">
          <div className="kc-blogheader-text">
            {c.eyebrow && <div className="kc-eyebrow">{c.eyebrow}</div>}
            <h1 className="kc-blogheader-h1">
              {c.title}
            </h1>
            {c.subtitle && <p className="kc-blogheader-subtitle">{c.subtitle}</p>}

            <div className="kc-blogheader-meta">
              <div className="kc-blogheader-author">
                <span className="kc-blogheader-author-initials">{c.author?.initials || 'KC'}</span>
                <span className="kc-blogheader-author-name">
                  <strong>{c.author?.name || 'Keys-Caldwell'}</strong>
                  <em>{c.author?.role || 'Editorial team'}</em>
                </span>
              </div>
              <div className="kc-blogheader-dates">
                <div><span>Published</span><strong>{c.publishedDisplay}</strong></div>
                <div><span>Last reviewed</span><strong>{c.updatedDisplay}</strong></div>
                <div><span>Read time</span><strong>{c.readTime || '8 min'}</strong></div>
              </div>
            </div>
          </div>
          <aside className="kc-blogheader-tldr">
            <div className="kc-blogheader-tldr-eye">{c.tldrLabel || 'Answer-first'}</div>
            <p className="kc-blogheader-tldr-p">{c.tldr}</p>
          </aside>
        </div>
      </div>
    </header>
  );
};

// ---------- KCBlogToc ----------
// Sticky table of contents for desktop, collapsible for mobile.
// Anchored links improve dwell time AND give Google a structural
// signal it can rank as a "table of contents" sitelink.
const KCBlogToc = ({ content }) => {
  const c = content || {};
  return (
    <section className="kc-blogtoc">
      <div className="kc-container">
        <div className="kc-blogtoc-eye">In this guide</div>
        <ol className="kc-blogtoc-list">
          {(c.items || []).map((it, i) => (
            <li key={i}><a href={`#${it.id}`}>
              <span className="kc-blogtoc-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="kc-blogtoc-label">{it.label}</span>
            </a></li>
          ))}
        </ol>
      </div>
    </section>
  );
};

// ---------- KCBlogBody ----------
// The main post body. Sections support: paragraphs, bullets,
// numbered steps, callouts (with type 'note' | 'warning' | 'pivot'),
// and inline pillar-page links.
const KCBlogBody = ({ content }) => {
  const c = content || {};
  return (
    <article className="kc-blogbody">
      <div className="kc-container kc-blogbody-container">
        {(c.sections || []).map((sec, i) => (
          <section className="kc-blogsection" id={sec.id} key={i}>
            <h2 className="kc-blogsection-h2">{sec.h2}</h2>
            {(sec.blocks || []).map((b, j) => {
              if (b.type === 'p') return <p className="kc-blogp" key={j}>{b.text}</p>;

              if (b.type === 'ul') return (
                <ul className="kc-bloglist" key={j}>
                  {b.items.map((it, k) => <li key={k}>{it}</li>)}
                </ul>
              );

              if (b.type === 'ol') return (
                <ol className="kc-bloglist kc-bloglist-numbered" key={j}>
                  {b.items.map((it, k) => <li key={k}>{it}</li>)}
                </ol>
              );

              if (b.type === 'h3') return <h3 className="kc-blogsection-h3" key={j}>{b.text}</h3>;

              if (b.type === 'callout') return (
                <aside className={`kc-blogcallout kc-blogcallout-${b.kind || 'note'}`} key={j}>
                  {b.title && <div className="kc-blogcallout-title">{b.title}</div>}
                  <p>{b.text}</p>
                </aside>
              );

              if (b.type === 'pillar-link') return (
                <p className="kc-blogp kc-blogpillarlink" key={j}>
                  <span>→ Related pillar:</span>{' '}
                  <a href={window.kcHref ? window.kcHref(b.href) : b.href}>{b.label}</a>
                  {b.context && <em> — {b.context}</em>}
                </p>
              );

              return null;
            })}
          </section>
        ))}
      </div>
    </article>
  );
};

// ---------- KCBlogAuthor ----------
// Author bio at end of post. Pairs with Person schema in the
// page's KCSeo.apply() call so Google attributes E-E-A-T to a
// real person, not the website. License numbers visible.
const KCBlogAuthor = ({ content }) => {
  const c = content || {};
  return (
    <section className="kc-blogauthor">
      <div className="kc-container">
        <div className="kc-blogauthor-card">
          <div className="kc-blogauthor-portrait">
            {c.photo
              ? <img src={c.photo} alt={c.name} width="160" height="160" loading="lazy" />
              : <span className="kc-blogauthor-initials">{c.initials}</span>}
          </div>
          <div className="kc-blogauthor-body">
            <div className="kc-blogauthor-eye">{c.eyebrow || 'About the author'}</div>
            <div className="kc-blogauthor-name">{c.name}</div>
            <div className="kc-blogauthor-role">{c.role}</div>
            <ul className="kc-blogauthor-creds">
              {(c.credentials || []).map((cr, i) => <li key={i}>{cr}</li>)}
            </ul>
            {(c.bio || []).map((p, i) => <p className="kc-blogauthor-p" key={i}>{p}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- KCBlogRelated ----------
// "Boards reading this also read" — internal-link block. SEO
// benefit: distributes equity, reduces bounce, lifts pages-per-
// session. Each related card MUST link to either a pillar page
// or another spoke — never to /request-proposal/.
const KCBlogRelated = ({ content }) => {
  const c = content || {};
  return (
    <section className="kc-blogrel">
      <div className="kc-container">
        <div className="kc-blogrel-head">
          {c.eyebrow && <div className="kc-eyebrow">{c.eyebrow}</div>}
          <h2 className="kc-blogrel-h2">
            {c.titlePlain}
            {c.titleItalic && <em> {c.titleItalic}</em>}
          </h2>
        </div>
        <div className="kc-blogrel-grid">
          {(c.items || []).map((it, i) => (
            <a className="kc-blogrel-card" href={window.kcHref ? window.kcHref(it.href) : it.href} key={i}>
              <div className="kc-blogrel-kind">{it.kind}</div>
              <div className="kc-blogrel-title">{it.title}</div>
              {it.desc && <p className="kc-blogrel-desc">{it.desc}</p>}
              <span className="kc-blogrel-arrow">Read →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, {
  KCBlogHeader, KCBlogToc, KCBlogBody, KCBlogAuthor, KCBlogRelated,
});
