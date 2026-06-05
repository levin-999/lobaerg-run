import type { ReactNode } from "react";

const links = {
  registration: "https://trackmaxx.ch/registration/?race=LBR26",
  startList: "https://trackmaxx.ch/entrylist/?race=LBR26",
  rules: "https://scersigen.ch/wp-content/uploads/Reglement_Lobaergrun_Ersigen_20231204.pdf",
  flyerRun: "http://scersigen.ch/wp-content/uploads/Flyer_lobaerg-run_2026.jpg",
  flyerWalk: "http://scersigen.ch/wp-content/uploads/Flyer_lobaerg-walk_2026-1.jpg",
  longRoute: "http://scersigen.ch/wp-content/uploads/Strecke-2026-lang-scaled.jpg",
  shortRoute: "http://scersigen.ch/wp-content/uploads/Strecke-2026-kurz-scaled.jpg",
  results2025: "https://trackmaxx.ch/results/?race=LBR25",
  sbb: "https://www.sbb.ch/de/",
  instagram: "https://www.instagram.com/scersigen/",
  impressum: "http://scersigen.ch/impressum",
};

const facts = [
  ["Start", "Fr, 19. Juni 2026", "ab 16:00 Uhr"],
  ["Zielschluss", "So, 28. Juni 2026", "14:00 Uhr"],
  ["Startfenster", "10 Tage", "06:00-22:00 Uhr"],
  ["Ort", "Ersigen", "Sportplatz Moos"],
];

const routes = [
  {
    title: "Langstrecke",
    distance: "13.5 km",
    image: "/lobaerg-assets/route-long.jpg",
    href: links.longRoute,
    text: "Abwechslungsreiche Route durch Felder, Wiesen und den Ersiger Wald.",
  },
  {
    title: "Kurzstrecke",
    distance: "8.6 km",
    image: "/lobaerg-assets/route-short.jpg",
    href: links.shortRoute,
    text: "Kompakter Rundkurs fuer Running, Walking, Nordic Walking und Spazieren.",
  },
];

const sponsorGroups = [
  {
    title: "Start-Ziel-Sponsor",
    names: ["Bernerland Bank"],
  },
  {
    title: "Zeitmess- und Diplom-Sponsoring",
    names: ["Mobiliar", "Faes Bau", "BSB + Partner", "Moser Maler", "Ypsomed", "MK Finanzpartner", "Laserteam"],
  },
  {
    title: "Newsletter- und Flyer-Sponsoren",
    names: ["Gate Swiss", "Wyss Immobilien", "Immo-Lounge", "Immopartner58", "Spatia", "Tomco Personal"],
  },
  {
    title: "Unterstuetzung",
    names: ["Feldschloesschen", "Migros Kulturprozent", "Sportfonds Kanton Bern"],
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
      <path
        d="M5 12h13m-5-5 5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
      <path
        d="M12 21s7-6.1 7-12A7 7 0 0 0 5 9c0 5.9 7 12 7 12Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <circle cx="12" cy="9" r="2.4" fill="currentColor" />
    </svg>
  );
}

function ExternalLink({
  href,
  children,
  variant = "dark",
}: {
  href: string;
  children: ReactNode;
  variant?: "dark" | "light" | "outline";
}) {
  const classes = {
    dark: "bg-ink text-white hover:bg-moss",
    light: "bg-white text-ink hover:bg-lime",
    outline: "border border-ink/20 bg-white/70 text-ink hover:border-moss hover:text-moss",
  };

  return (
    <a className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${classes[variant]}`} href={href}>
      {children}
      <ArrowIcon />
    </a>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/88 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8">
          <a className="flex items-center gap-3" href="#top" aria-label="Lobaerg-Run Start">
            <img src="/lobaerg-assets/logo-run.png" alt="" className="size-10 object-contain" />
            <span className="text-sm font-black uppercase">Lobaerg-Run</span>
          </a>
          <div className="hidden items-center gap-6 text-sm font-semibold text-ink/70 md:flex">
            <a href="#strecken">Strecken</a>
            <a href="#team">Team</a>
            <a href="#info">Info</a>
            <a href="#sponsoren">Sponsoren</a>
          </div>
          <a className="rounded-full bg-lime px-4 py-2 text-sm font-bold text-ink transition hover:bg-moss hover:text-white" href={links.registration}>
            Anmelden
          </a>
        </nav>
      </header>

      <section id="top" className="relative min-h-[680px] overflow-hidden">
        <img
          src="/lobaerg-assets/run-panorama.jpg"
          alt="Landschaft und Laufstrecke beim Lobaerg-Run in Ersigen"
          className="absolute inset-0 h-full w-full scale-110 object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,33,24,.94),rgba(22,33,24,.70)_43%,rgba(22,33,24,.22))]" />
        <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-[1.05fr_.95fr] md:px-8">
          <div className="pt-10 text-white">
            <p className="text-sm font-bold uppercase text-lime">6. Ausgabe / Ersigen / 19.-28. Juni 2026</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[.98] md:text-7xl">
              Lobaerg-Run 2026
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/88 md:text-xl">
              Der Lauf- und Bewegungsevent in Ersigen: zwei markierte, naturnahe Strecken durch Felder, Wiesen und den kuehlen Ersiger Wald. Du startest innerhalb von zehn Tagen dann, wenn Wetter und Motivation passen.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ExternalLink href={links.registration} variant="light">Online-Anmeldung</ExternalLink>
              <ExternalLink href="#strecken" variant="outline">Strecken ansehen</ExternalLink>
            </div>
          </div>

          <div className="grid gap-3 md:justify-self-end">
            <div className="grid grid-cols-2 gap-3">
              {facts.map(([label, value, detail]) => (
                <div key={label} className="rounded-lg border border-white/20 bg-white/92 p-4 shadow-xl shadow-ink/20 backdrop-blur">
                  <p className="text-xs font-bold uppercase text-moss">{label}</p>
                  <p className="mt-2 text-xl font-black">{value}</p>
                  <p className="mt-1 text-sm text-ink/65">{detail}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-white/20 bg-lime p-5 text-ink shadow-xl shadow-ink/20">
              <p className="text-sm font-bold uppercase">Disziplinen</p>
              <p className="mt-2 text-2xl font-black">Running / Walking / Nordic Walking / Spazieren / Teamwettbewerbe</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 md:grid-cols-3 md:px-8">
          <p className="text-lg font-bold">TrackMaxx uebernimmt Anmeldung, Zeitmessung und Ranglisten.</p>
          <p className="leading-7 text-ink/70">Die Zeitmessung erfolgt per Chip auf der Startnummer. Dein Resultat erscheint nach dem Zieleinlauf direkt online.</p>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <ExternalLink href={links.startList} variant="outline">Startliste</ExternalLink>
            <ExternalLink href={links.rules} variant="outline">Reglement</ExternalLink>
          </div>
        </div>
      </section>

      <section id="strecken" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-8 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="section-kicker">Strecken</p>
            <h2 className="section-title">Zwei Routen, ein flexibles Startfenster.</h2>
            <p className="mt-5 leading-8 text-ink/68">
              Beide Strecken sind markiert und stehen vom 19. Juni um 16:00 Uhr bis zum 28. Juni um 14:00 Uhr zur Verfuegung. Gestartet wird selbststaendig zwischen 06:00 und 22:00 Uhr.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {routes.map((route) => (
              <article key={route.title} className="overflow-hidden rounded-lg border border-ink/10 bg-white shadow-sm">
                <a href={route.href}>
                  <img src={route.image} alt={`${route.title} ${route.distance}`} className="h-64 w-full object-cover" />
                </a>
                <div className="p-5">
                  <p className="text-sm font-bold uppercase text-moss">{route.title}</p>
                  <h3 className="mt-1 text-4xl font-black">{route.distance}</h3>
                  <p className="mt-3 min-h-16 leading-7 text-ink/66">{route.text}</p>
                  <a href={route.href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-moss">
                    Streckenplan oeffnen <ArrowIcon />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="bg-forest text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1fr_1fr] md:px-8 md:py-24">
          <div>
            <p className="section-kicker text-lime">Team-Trophy</p>
            <h2 className="section-title">Einzelstart anmelden, Teamnamen eintragen, Kilometer sammeln.</h2>
            <p className="mt-5 leading-8 text-white/76">
              Wer bei der Einzelanmeldung einen Teamnamen vermerkt, nimmt kostenlos an der lobaerg-team-trophy teil. Ein Team ist komplett, sobald mindestens 5 bis maximal 8 Personen denselben Teamnamen verwenden.
            </p>
            <p className="mt-4 leading-8 text-white/76">
              Neu ab 2026: verguenstigter Startpreis bei Mehrfachstarts. Der 6. bis 10. Lauf pro Person sind kostenlos.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              ["Lobaerg-team-trophy", "Wertung nach absolvierten Team-Kilometern; Mehrfachstarts zaehlen mit."],
              ["Lobaerg-highspeed-team", "Durchschnittstempo der 5 schnellsten Teammitglieder in der Disziplin Running."],
              ["Nachtragen moeglich", "Teamnamen koennen ueber den persoenlichen Aenderungslink oder im TrackMaxx-Konto ergaenzt werden."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-lg border border-white/14 bg-white/8 p-5">
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-2 leading-7 text-white/72">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="info" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="section-kicker">Teilnahme</p>
            <h2 className="section-title">Alles Wichtige vor dem Start.</h2>
            <div className="mt-7 flex flex-wrap gap-3">
              <ExternalLink href={links.registration}>Zur Anmeldung</ExternalLink>
              <ExternalLink href={links.flyerRun} variant="outline">Flyer Run</ExternalLink>
              <ExternalLink href={links.flyerWalk} variant="outline">Flyer Walk</ExternalLink>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Startnummer", "Personifizierte Startnummer mit Vorname bei Anmeldung bis Sonntag, 1. Juni 2026, 23:59 Uhr."],
              ["Versand", "Startnummer-Versand ab 15. Juni bis Freitag, 26. Juni 2026, taeglich per A-Post."],
              ["Mehrfachstarts", "Weitere Starts koennen fuer CHF 10.- ueber den Aenderungslink oder im TrackMaxx-Konto nachgebucht werden."],
              ["Infrastruktur", "Keine Garderoben, Duschen oder Wertsachen-Depot. Eine Toilette ist vorhanden."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-lg border border-ink/10 bg-white p-5 shadow-sm">
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-ink/66">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:grid-cols-[1fr_.9fr] md:px-8 md:py-20">
          <div>
            <p className="section-kicker">Preise</p>
            <h2 className="section-title">Finisher:innen, Verlosung und Teampreise.</h2>
            <p className="mt-5 leading-8 text-ink/68">
              Alle Finisher:innen erhalten ein Lobaergerli von Baeckerei Fischer, ein Sommertee oder Suessmost sowie eine Medaille fuer Kinder bis und mit 6. Klasse. Die Naturalpreise koennen bis Samstag, 4. Juli 2026 bei Baeckerei Fischer oder im Cafe Fischer abgeholt werden.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {["Coop-Gutscheine", "Sportmassage", "Team-Erlebnisse"].map((item) => (
                <div key={item} className="rounded-lg bg-lime/55 p-4 text-sm font-bold">{item}</div>
              ))}
            </div>
          </div>
          <img src="/lobaerg-assets/finisher.jpg" alt="Finisherpreise des Lobaerg-Run" className="h-full min-h-72 w-full rounded-lg object-cover shadow-sm" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-lime text-ink"><PinIcon /></span>
              <h2 className="text-3xl font-black">Anreise und Start/Ziel</h2>
            </div>
            <p className="mt-5 leading-8 text-ink/68">
              Das Start- und Zielgelaende liegt nahe beim Fussballplatz Moos in Ersigen und ist gut ausgeschildert. Grosser Parkplatz beim Schuetzenhaus Ersigen, Toepfereistrasse 24, 3423 Ersigen.
            </p>
            <p className="mt-4 leading-8 text-ink/68">
              Mit dem OeV: Bus Nr. 466 ab Bahnhof Burgdorf Richtung Koppigen. Ab Haltestelle Oberdorf, Ersigen sind es 5-7 Gehminuten.
            </p>
            <div className="mt-6">
              <ExternalLink href={links.sbb} variant="outline">SBB Verbindung</ExternalLink>
            </div>
          </article>

          <article className="overflow-hidden rounded-lg border border-ink/10 bg-white shadow-sm">
            <img src="/lobaerg-assets/program.jpg" alt="Rahmenprogramm Lobaerg-Run 2026" className="h-80 w-full object-cover object-top" />
            <div className="p-6">
              <h2 className="text-3xl font-black">Unterhaltung</h2>
              <p className="mt-3 leading-8 text-ink/68">
                Das Rahmenprogramm 2026 ist auf dem offiziellen Eventbild publiziert.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-forest text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:grid-cols-[.8fr_1.2fr] md:px-8 md:py-20">
          <div>
            <p className="section-kicker text-lime">Resultate</p>
            <h2 className="section-title">Ranglisten und Leaderboard.</h2>
            <p className="mt-5 leading-8 text-white/72">
              Die Ranglisten 2025 sowie die historischen Resultate der bisherigen Austragungen sind bei TrackMaxx verfuegbar.
            </p>
            <div className="mt-7">
              <ExternalLink href={links.results2025} variant="light">Ranglisten 2025</ExternalLink>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Frauen 13.5 km", "Gertrud Wiedemann / 1:00:05"],
              ["Maenner 13.5 km", "Cedric Lehmann / 46:41"],
              ["Frauen 8.6 km", "Marie-Claire Hofstetter / 39:08"],
              ["Maenner 8.6 km", "Christof Kohler / 30:45"],
            ].map(([title, record]) => (
              <div key={title} className="rounded-lg border border-white/14 bg-white/8 p-5">
                <p className="text-sm font-bold uppercase text-lime">{title}</p>
                <p className="mt-2 text-xl font-black">{record}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sponsoren" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-8 md:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="section-kicker">Sponsoren 2026</p>
            <h2 className="section-title">Lokale Partner machen den Run moeglich.</h2>
            <p className="mt-5 leading-8 text-ink/68">
              Interesse am Sponsoring oder Fragen zum Laufevent? Kontakt: <a className="font-bold text-moss" href="mailto:lobaerg-run@scersigen.ch">lobaerg-run@scersigen.ch</a>
            </p>
          </div>
          <div className="grid gap-4">
            {sponsorGroups.map((group) => (
              <article key={group.title} className="rounded-lg border border-ink/10 bg-white p-5 shadow-sm">
                <h3 className="font-black">{group.title}</h3>
                <p className="mt-3 leading-7 text-ink/66">{group.names.join(" / ")}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-ink/65 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="font-semibold text-ink">Sportclub Ersigen / Lobaerg-Run 2026</p>
          <div className="flex flex-wrap gap-5">
            <a href={links.instagram}>Instagram</a>
            <a href={links.impressum}>Impressum</a>
            <a href="mailto:lobaerg-run@scersigen.ch">Kontakt</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
