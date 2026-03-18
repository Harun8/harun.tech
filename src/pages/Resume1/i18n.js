export const translations = {
  en: {
    role: 'Software Engineer',
    location: 'Denmark',
    summary:
      'Software engineer with experience building solutions for clients like Banedanmark and Landsbyggefonden. Background in startups and scale-ups.',

    // Section headings
    workExperience: 'Work Experience',
    skills: 'Skills',
    education: 'Education',
    languages: 'Languages',
    selectedProjects: 'Selected Projects',

    // UI
    visitProject: 'Visit project',
    moreInfo: 'More info',
    scrollToTop: 'Scroll to top',

    // Language levels
    native: 'native',
    fluent: 'fluent',

    // Education
    eduSchool0: 'Southern University of Denmark',
    eduDegree0: 'Software Technology',

    // Experience roles
    expRole0: 'Software Engineer',
    expRole1: 'Board Member & Volunteer',
    expRole2: 'Consultant (Software Engineer)',
    expRole3: 'Freelance Software Engineer',
    expRole4: 'Software Engineer',

    // Experience descriptions
    expDesc1:
      'Contributing to the creation of activities for children and young people, where they develop their technological courage and creativity through play and learning with programming and technology.',
    expDesc2:
      'Developed solutions for Landsbyggefonden at DCAB, supporting the review and reporting of operations and maintenance data.',

    // Experience bullets
    expBullet0_0:
      'Built an AI-powered Microsoft Teams bot that drafts UDRP domain dispute complaints end-to-end using RAG, WHOIS lookups, and legal formatting validation.',
    expBullet0_1:
      'Built a full-stack matching platform connecting Danish companies with certified marketing agencies using a hybrid RAG pipeline with contextual retrieval, combining vector search, BM25, and LLM scoring. Delivered accurate recommendations in under **15 seconds**.',
    expBullet3_0:
      'Sole developer on the web application, building a web alternative to the mobile app for **3,000+** users.',
    expBullet3_1:
      'Led a team of 2 interns and two developers, responsible for full-stack development, creating and integrating RAG systems.',
    expBullet4_0:
      'Developed a semi-automatic monitoring system that generates and sends PDFs automatically via email, saving the installation team up to **6 hours** of manual work weekly.',
    expBullet4_1:
      'Developed a device audit log for tracking metadata changes across **4,000+** devices.',
    expBullet4_2:
      "Participated in integrating sensor data through the Danish Environmental Portal's IoT platform, helping Banedanmark improve railway monitoring.",

    // Experience periods
    expPeriod0: 'Nov 2025\u2013Present',
    expPeriod1: 'Feb 2025\u2013Present',
    expPeriod2: 'Aug 2025 - Nov 2025',
    expPeriod3: 'Feb 2025\u2013Nov 2025',
    expPeriod4: 'Jun 2023\u2013Dec 2024',

    // Project descriptions
    projDesc0:
      'Financial document processing API. Brought an AI-powered invoice processing system to production readiness using OCR and LLM-based extraction.\n\nImproved extraction accuracy from ~60% to 95% on invoices with **1,000+** line items. Eliminated batch failures and built a chunked extraction pipeline for documents up to 45 pages.\n\nTook the system from "client rejected delivery" to production use within **3 weeks**',
    projDesc1:
      'An interactive platform allowing users to upload PDFs and chat with them using LLMs. Originally built during university, recently underwent a full architectural overhaul. Read more for details.',
    projDesc2:
      'An iOS app that displays discounted products in nearby Salling Group stores (Netto, Bilka, F\u00f8tex). Designed for people who struggle to make ends meet, offering a much cheaper alternative by allowing them to shop discounted grocery items first',
    projDesc3: 'Born from a real problem at work, packaged as an open-source NPM module. Manipulates EXIF data on images to correct orientation, and can be extended to strip GPS coordinates for privacy or remove other sensitive metadata',
    projDesc4:
      'A daily guessing game where you guess the country of the day. Built out of a personal interest in geography and a desire to create something simple, free, and quick to play ranging from a few seconds to a couple of minutes. The game has had over **2,000 visitors**',
    projDesc5:
      'AI-powered legal drafting platform for domain name dispute lawyers. Multi-stage LangGraph agent conducts structured interviews, performs WHOIS lookups, retrieves precedent cases via RAG, and generates court-ready DOCX complaints, delivered through a Microsoft Teams bot.\n\nBuilt with AES-256-GCM encryption at rest, full PostgreSQL audit trail, and a React admin dashboard for cost monitoring and document ingestion.',
    projDesc6: 'Referral Shopify plugin created for Cana Care, a multimillion DKK shop',
    projDesc7:
      'Developed a solution to enhance FTP security for legacy systems using inotify on Linux for secure, real-time file monitoring. [Wrote an article about the approach on Medium](https://medium.com/@harunabdi8/mitigating-ftp-security-vulnerabilities-with-inotify-on-linux-5bb186a3c358)',

    // Project details (modal)
    projDetails1:
      "PDF chat platform originally built during university with Next.js, Supabase, and basic OpenAI vector search. Recently underwent a full architectural overhaul.\n\n\u2022 **Separated architecture**: moved from a Next.js monolith to a Vite + React 19 frontend and Python 3.12 + FastAPI backend, enabling independent scaling and access to Python's superior AI/ML ecosystem\n\u2022 **Hybrid RAG pipeline**: replaced single-vector retrieval with dense search + BM25 keyword search (based on a technical paper I read) fused via Reciprocal Rank Fusion, followed by Cohere Rerank 3.5, improving retrieval quality by 20-48%\n\u2022 **Tiered PDF parsing**: auto-escalation from pymupdf4llm (fast path) to IBM Docling (complex layouts) to LlamaParse (scanned docs), replacing a single-parser approach\n\u2022 **Contextual chunking**: structure-aware splitting with LLM-generated context prefixes and parent-child indexing for better retrieval precision\n\u2022 **Multi-LLM support**: Claude, GPT, and open-source models via OpenRouter, replacing single-provider OpenAI lock-in\n\u2022 **Production infrastructure**: Inngest step-function job queue, Cloudflare R2 storage, Stripe metered billing, Better Auth, and Sentry + Axiom observability",
  },

  da: {
    role: 'Softwareingeni\u00f8r',
    location: 'Danmark',
    summary:
      'Softwareingeni\u00f8r med erfaring i at bygge l\u00f8sninger for kunder som Banedanmark og Landsbyggefonden. Baggrund i startups og scale-ups.',

    // Section headings
    workExperience: 'Erhvervserfaring',
    skills: 'Kompetencer',
    education: 'Uddannelse',
    languages: 'Sprog',
    selectedProjects: 'Udvalgte Projekter',

    // UI
    visitProject: 'Bes\u00f8g projekt',
    moreInfo: 'Mere info',
    scrollToTop: 'Rul til toppen',

    // Language levels
    native: 'modersm\u00e5l',
    fluent: 'flydende',

    // Education
    eduSchool0: 'Syddansk Universitet',
    eduDegree0: 'Softwareteknologi',

    // Experience roles
    expRole0: 'Softwareingeni\u00f8r',
    expRole1: 'Bestyrelsesmedlem & Frivillig',
    expRole2: 'Konsulent (Softwareingeni\u00f8r)',
    expRole3: 'Freelance Softwareingeni\u00f8r',
    expRole4: 'Softwareingeni\u00f8r',

    // Experience descriptions
    expDesc1:
      'Bidrager til at skabe aktiviteter for b\u00f8rn og unge, hvor de udvikler deres teknologiske mod og kreativitet gennem leg og l\u00e6ring med programmering og teknologi.',
    expDesc2:
      'Udviklede l\u00f8sninger for Landsbyggefonden hos DCAB, med fokus p\u00e5 gennemgang og rapportering af drifts- og vedligeholdelsesdata.',

    // Experience bullets
    expBullet0_0:
      'Byggede en AI-drevet Microsoft Teams-bot der udarbejder UDRP-dom\u00e6netvistklager fra ende til anden ved hj\u00e6lp af RAG, WHOIS-opslag og juridisk formateringsvalidering.',
    expBullet0_1:
      'Byggede en full-stack matchplatform der forbinder danske virksomheder med certificerede marketingbureauer ved hj\u00e6lp af en hybrid RAG-pipeline med kontekstuel retrieval, der kombinerer vektors\u00f8gning, BM25 og LLM-scoring. Leverede pr\u00e6cise anbefalinger p\u00e5 under **15 sekunder**.',
    expBullet3_0:
      'Eneste udvikler p\u00e5 webapplikationen, byggede et webalternativ til mobilappen for **3.000+** brugere.',
    expBullet3_1:
      'Ledte et team af 2 praktikanter og to udviklere, ansvarlig for full-stack-udvikling samt oprettelse og integration af RAG-systemer.',
    expBullet4_0:
      'Udviklede et semi-automatisk overv\u00e5gningssystem der genererer og sender PDF\u2019er automatisk via e-mail, hvilket sparer installationsteamet op til **6 timers** manuelt arbejde ugentligt.',
    expBullet4_1:
      'Udviklede en enheds-auditlog til sporing af metadata\u00e6ndringer p\u00e5 tv\u00e6rs af **4.000+** enheder.',
    expBullet4_2:
      'Deltog i integrationen af sensordata gennem Milj\u00f8portalen, den danske IoT-platform, for at hj\u00e6lpe Banedanmark med at forbedre jernbaneoverv\u00e5gningen.',

    // Experience periods
    expPeriod0: 'Nov 2025\u2013Nu',
    expPeriod1: 'Feb 2025\u2013Nu',
    expPeriod2: 'Aug 2025 - Nov 2025',
    expPeriod3: 'Feb 2025\u2013Nov 2025',
    expPeriod4: 'Jun 2023\u2013Dec 2024',

    // Project descriptions
    projDesc0:
      'API til behandling af finansielle dokumenter. Bragte et AI-drevet fakturabehandlingssystem til produktionsklarhed ved hj\u00e6lp af OCR og LLM-baseret udtr\u00e6kning.\n\nForbedrede udtr\u00e6kningsn\u00f8jagtighed fra ~60% til 95% p\u00e5 fakturaer med **1.000+** linjeposter. Eliminerede batchfejl og byggede en chunket udtr\u00e6kningspipeline til dokumenter p\u00e5 op til 45 sider.\n\nTog systemet fra "klienten afviste leverancen" til produktionsbrug inden for **3 uger**',
    projDesc1:
      'En interaktiv platform hvor brugere kan uploade PDF\u2019er og chatte med dem via LLM\u2019er. Oprindeligt bygget under studiet, gennemgik for nylig en fuld arkitektonisk omstrukturering. L\u00e6s mere for detaljer.',
    projDesc2:
      'En iOS-app der viser nedsatte produkter i n\u00e6rliggende Salling Group-butikker (Netto, Bilka, F\u00f8tex). Designet til folk der har sv\u00e6rt ved at f\u00e5 enderne til at m\u00f8des, og tilbyder et langt billigere alternativ ved at lade dem handle nedsatte dagligvarer f\u00f8rst',
    projDesc3: 'Udsprunget af et reelt problem p\u00e5 arbejdet, pakket som et open source NPM-modul. Manipulerer EXIF-data p\u00e5 billeder for at rette orientering, og kan udvides til at fjerne GPS-koordinater af hensyn til privatliv eller fjerne andre f\u00f8lsomme metadata',
    projDesc4:
      'Et dagligt g\u00e6ttespil hvor man g\u00e6tter dagens land. Bygget ud af en personlig interesse i geografi og et \u00f8nske om at skabe noget simpelt, gratis og hurtigt at spille, fra f\u00e5 sekunder til et par minutter. Spillet har haft over **2.000 bes\u00f8gende**',
    projDesc5:
      'AI-drevet juridisk udkastplatform til dom\u00e6netvistadvokater. Multi-stage LangGraph-agent udf\u00f8rer strukturerede interviews, WHOIS-opslag, henter pr\u00e6cedenssager via RAG og genererer retsklare DOCX-klager, leveret via en Microsoft Teams-bot.\n\nBygget med AES-256-GCM-kryptering, fuld PostgreSQL-auditlog og et React-admin-dashboard til omkostningsoverv\u00e5gning og dokumentindtagelse.',
    projDesc6: 'Referral Shopify-plugin lavet til Cana Care, en butik med millionomsætning i DKK',
    projDesc7:
      'Udviklede en l\u00f8sning til at forbedre FTP-sikkerheden for legacy-systemer ved hj\u00e6lp af inotify p\u00e5 Linux til sikker filovervågning i realtid. [Skrev en artikel om tilgangen p\u00e5 Medium](https://medium.com/@harunabdi8/mitigating-ftp-security-vulnerabilities-with-inotify-on-linux-5bb186a3c358)',

    // Project details (modal)
    projDetails1:
      'PDF-chatplatform oprindeligt bygget under studiet med Next.js, Supabase og simpel OpenAI-vektors\u00f8gning. Gennemgik for nylig en fuld arkitektonisk omstrukturering.\n\n\u2022 **Separeret arkitektur**: gik fra en Next.js-monolit til en Vite + React 19-frontend og Python 3.12 + FastAPI-backend, hvilket muligg\u00f8r uafh\u00e6ngig skalering og adgang til Pythons overlegne AI/ML-\u00f8kosystem\n\u2022 **Hybrid RAG-pipeline**: erstattede enkelt vektorhentning med t\u00e6t s\u00f8gning + BM25-n\u00f8gleordss\u00f8gning (baseret p\u00e5 en teknisk artikel jeg l\u00e6ste) fusioneret via Reciprocal Rank Fusion, efterfulgt af Cohere Rerank 3.5, hvilket forbedrede hentningskvaliteten med 20-48%\n\u2022 **Lagdelt PDF-parsing**: auto-eskalering fra pymupdf4llm (hurtig sti) til IBM Docling (komplekse layouts) til LlamaParse (scannede dokumenter), som erstatter en enkelt-parser-tilgang\n\u2022 **Kontekstuel chunking**: strukturbevidst opdeling med LLM-genererede kontekstpr\u00e6fikser og parent-child-indeksering for bedre hentningspr\u00e6cision\n\u2022 **Multi-LLM-support**: Claude, GPT og open source-modeller via OpenRouter, erstatter l\u00e5sning til \u00e9n udbyder (OpenAI)\n\u2022 **Produktionsinfrastruktur**: Inngest step-function jobk\u00f8, Cloudflare R2-lagring, Stripe forbrugsfakturering, Better Auth og Sentry + Axiom observability',
  },
}
