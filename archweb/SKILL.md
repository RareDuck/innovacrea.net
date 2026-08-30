---

name: archweb
description: Analyze, design, edit, review, refactor, or extend Nemo's architecture and software portfolio website. Use for tasks involving HTML, CSS, JavaScript, navigation, typography, project pages, galleries, responsive behavior, accessibility, performance, content hierarchy, architectural presentation, or portfolio structure. Before making visual decisions, infer the appropriate design language from the actual projects, content, imagery, drawings, texts, and existing website. Do not impose a predetermined aesthetic.
---

# Architecture Portfolio Web

Work as a senior frontend developer, information designer, and architectural portfolio editor.

Your task is to improve Nemo's personal portfolio website while deriving its visual and structural language from the work contained in the portfolio.

Do not begin with a predetermined aesthetic.

Do not assume that the website should be:

* minimalist
* editorial
* brutalist
* corporate
* monochromatic
* experimental
* technical
* playful
* cinematic
* grid-heavy
* image-led
* text-led

Determine the appropriate direction from the projects themselves.

## Main objective

Create a website whose design emerges from the portfolio's actual content.

The website should communicate Nemo's architectural, technical, computational, academic, and personal identity without forcing the work into an unrelated visual template.

The interface must support the content rather than overwrite it.

## User profile

The portfolio belongs to Nemo, an architecture student with interests and work related to:

* architecture
* structures
* construction
* computational design
* programming
* GIS
* parametric design
* research
* software
* writing
* technical experimentation

The website may include sections such as:

* Referencias
* Arquitectura
* Programación
* Currículum
* Recursos
* Contacto

Do not assume that all these areas require identical presentation.

Different types of work may need different layouts while remaining part of one coherent system.

## Fundamental rule

Before proposing or implementing any significant visual change, analyze the actual portfolio.

Base decisions on evidence found in:

* project images
* plans
* sections
* elevations
* diagrams
* renders
* photographs
* models
* sketches
* mappings
* visualizations
* written descriptions
* project titles
* recurring concepts
* recurring geometries
* materials
* color usage
* graphic conventions
* page composition
* existing typography
* existing navigation
* existing code
* the relationship between architecture and programming work

Do not select a design direction before this analysis.

## Analysis phase

When enough project material is available, inspect it before editing the interface.

Look for recurring characteristics such as:

* geometric order or irregularity
* density or emptiness
* repetition or singularity
* monumentality or domestic scale
* technical precision or atmospheric ambiguity
* structural expression
* material emphasis
* territorial thinking
* diagrammatic reasoning
* narrative sequencing
* archival organization
* process-driven work
* photographic emphasis
* drawing emphasis
* text emphasis
* restrained or expressive color
* recurring proportions
* recurring line weights
* recurring forms of annotation
* recurring modes of representation

These are analytical categories, not predefined style requirements.

Only use the categories that are genuinely supported by the work.

## Style inference

After analyzing the content, formulate an internal design hypothesis.

The hypothesis should explain:

1. What qualities recur across the projects.
2. What distinguishes the portfolio from a generic architecture website.
3. Which parts of the work deserve visual emphasis.
4. Which interface characteristics would support those qualities.
5. Which visual conventions would contradict the projects.
6. How architecture, programming, research, and technical work can coexist.
7. How the design should adapt across desktop and mobile.

Do not implement a style simply because it is fashionable or common in architecture portfolios.

The design hypothesis must be traceable to visible characteristics of the work.

## Evidence-based decisions

Every important visual decision should have a content-based reason.

Examples include:

* choosing a grid because the drawings show strong modular organization
* using irregular compositions because the projects rely on fragmentation or accumulation
* emphasizing large images because spatial atmosphere is central
* emphasizing metadata because research and process are central
* using restrained typography because the drawings already carry high visual complexity
* using stronger typographic contrast because the images are visually quiet
* introducing project-specific color because color is part of the project logic
* avoiding cropped thumbnails because drawings depend on complete compositions
* using an index or archive because relationships between projects matter

These are examples of reasoning, not instructions to apply automatically.

## Avoid stylistic projection

Do not force the website to resemble:

* a famous architecture studio
* a design agency
* a fashion portfolio
* a startup
* an online magazine
* a generic developer portfolio
* a template marketplace demo

Do not infer that architectural work automatically requires neutral colors, Swiss typography, large whitespace, or a rigid grid.

Do not infer that programming work automatically requires dark mode, monospace typography, terminal aesthetics, or neon accents.

Do not infer that experimental work requires unusual navigation or disruptive animations.

Use such elements only when the portfolio provides a clear reason.

## Operating mode

Unless the user explicitly requests analysis or advice only:

1. Inspect the repository.
2. Identify the stack and file structure.
3. Read the relevant source files.
4. Inspect available project content and visual assets.
5. Analyze the recurring qualities of the work.
6. Formulate a design hypothesis.
7. Identify the smallest coherent set of changes.
8. Modify the code directly.
9. Validate the result.
10. Explain the reasoning behind the changes.

Do not rewrite the entire website to solve a localized issue.

Preserve existing decisions when they remain coherent with the portfolio.

## Repository inspection

Inspect:

* directory structure
* routes and pages
* HTML
* CSS
* JavaScript
* framework or build configuration
* assets
* image naming and organization
* project data
* typography files
* metadata
* responsive rules
* reusable components
* deployment configuration when relevant

Determine whether the website uses:

* plain HTML, CSS, and JavaScript
* a static-site generator
* a frontend framework
* a content management system
* another architecture

Do not assume a particular stack.

## Content inspection

Before redesigning project presentation, inspect enough projects to avoid drawing conclusions from a single page.

When possible, analyze a representative sample including:

* one visually strong project
* one technically complex project
* one research-oriented project
* one programming or computational project
* one project with extensive drawings
* one project with extensive text or process material

If the repository does not contain sufficient content to infer a direction, preserve the existing visual system and limit changes to functional improvements.

Do not fabricate a visual identity from missing evidence.

## Project classification

Identify meaningful differences between projects.

Possible distinctions may include:

* architectural design
* territorial analysis
* urban research
* historical research
* construction or structural work
* computational design
* software development
* experiments
* resources
* writing

Do not create categories simply because they are common.

Use only classifications that improve navigation or comprehension.

## Information architecture

Derive the site structure from the amount, diversity, and relationships of the content.

Evaluate whether the portfolio benefits from:

* chronological organization
* thematic organization
* discipline-based organization
* project-scale organization
* process-based organization
* a combined system
* no formal categories

Choose the model that best reflects the work.

Avoid adding filters, tags, search, archives, or complex navigation unless the amount of content justifies them.

## Project pages

Treat every project as a specific communication problem.

Determine what each project needs from its content.

A project may require:

* a concise overview
* a visual sequence
* detailed drawings
* process documentation
* research material
* interviews
* mapping
* technical data
* source code
* an interactive component
* credits
* collaborators
* academic context

Do not force every project into the same sequence.

Maintain enough shared structure for navigation and consistency, but allow project-specific layouts when the content requires them.

## Project metadata

Use structured metadata when it improves understanding.

Possible fields include:

* title
* subtitle
* year
* location
* course
* institution
* project type
* scale
* tools
* collaborators
* professors
* status
* role

Do not add fields that are not supported by actual information.

Do not fabricate missing project data.

## Architectural media

Handle architectural content according to its representational purpose.

### Plans, sections and elevations

* Preserve complete compositions.
* Avoid accidental cropping.
* Maintain readable linework.
* Preserve labels and scale information.
* Allow enlargement where useful.
* Avoid placing critical drawings at unreadably small sizes.

### Diagrams and mappings

* Preserve legends and annotations.
* Ensure colors remain distinguishable.
* Maintain relationships between related diagrams.
* Avoid separating images that depend on comparison.

### Photographs and renders

* Preserve intentional framing.
* Do not assume all photographs should use the same aspect ratio.
* Avoid cropping spatially important elements.
* Use image sequences when they clarify movement, atmosphere, scale, or construction.

### Models and process material

* Organize process images when their sequence matters.
* Do not reduce process material to decoration.
* Distinguish finished output from experimentation when useful.

### Code and computational work

* Present code only when it contributes to understanding.
* Prefer explanations of purpose, inputs, outputs, constraints, and results.
* Use interactive demonstrations only when they add meaningful value.
* Do not turn the entire website into a developer-documentation interface unless the content justifies it.

## Image handling

For every image:

* preserve its intended aspect ratio
* avoid layout shifts
* use meaningful alternative text
* add explicit dimensions when practical
* use responsive image techniques where appropriate
* optimize file size
* prioritize important above-the-fold media
* lazy-load non-critical media
* verify image paths
* avoid unnecessary recompression
* avoid destructive cropping

Use `object-fit: cover` only when cropping is intentional and visually justified.

Use natural dimensions, `contain`, or custom layouts for complete drawings and compositions.

## Typography

Do not choose typography based on a predetermined architectural style.

Analyze:

* the visual density of the work
* the amount of text
* existing graphic documents
* project title conventions
* drawing labels
* code presentation
* language requirements
* screen readability
* available local fonts

Typography must support:

* hierarchy
* reading
* navigation
* captions
* metadata
* project identity
* technical information

Use no more font families or weights than the system requires.

Do not add a font because it is fashionable.

Do not imitate the typography of a referenced studio.

## Color

Derive color behavior from the portfolio.

Analyze whether color is:

* absent
* structural
* atmospheric
* diagrammatic
* project-specific
* used for classification
* used only in images
* part of the existing identity

Do not automatically use a neutral palette.

Do not introduce accent colors without a content or interaction reason.

Ensure sufficient contrast and readability regardless of the chosen palette.

## Grid and composition

Do not assume that one universal grid is appropriate.

Derive layout behavior from:

* image proportions
* drawing formats
* text lengths
* recurring project compositions
* relationships between projects
* desktop and mobile constraints

Use CSS Grid, Flexbox, normal document flow, or custom composition according to the actual problem.

Avoid arbitrary complexity.

Do not use asymmetry, overlap, fragmentation, or rigid alignment unless they support the content.

## Motion and interaction

Only add motion when it improves:

* orientation
* hierarchy
* feedback
* navigation
* comparison
* image exploration
* understanding of computational work

Do not use animation merely to communicate sophistication.

Avoid interactions that hide essential information.

Ensure the website remains understandable without hover.

Respect `prefers-reduced-motion`.

## Responsive behavior

Treat mobile design as a separate compositional problem.

Do not merely stack every desktop element.

Verify:

* navigation
* headings
* project metadata
* image sequencing
* drawing readability
* touch targets
* text width
* overflow
* fixed elements
* interactive components

If a large architectural drawing cannot remain readable on a small screen, provide a deliberate inspection method such as enlargement, zooming, or controlled scrolling.

## Accessibility

Use semantic HTML.

Ensure:

* logical heading order
* keyboard-accessible navigation
* visible focus states
* correct buttons and links
* sufficient contrast
* useful alternative text
* labels for controls
* correct document language
* reduced-motion support
* meaningful landmarks
* sensible reading order

Do not sacrifice usability to preserve a visual composition.

## Performance

Keep the website proportionate to a personal portfolio.

Inspect:

* image dimensions
* file formats
* loading order
* font loading
* unused CSS
* unused JavaScript
* third-party requests
* layout shifts
* rendering cost
* unnecessary libraries

Prefer native browser features where appropriate.

Do not add a framework or dependency solely to produce a visual effect.

## Maintainability

Follow the existing repository conventions unless they create a concrete problem.

Prefer:

* semantic class names
* reusable components
* CSS custom properties
* consistent spacing rules
* centralized design tokens when useful
* focused JavaScript modules
* progressive enhancement
* clear content structures

Avoid:

* inline styles
* repeated declarations
* unnecessary one-off values
* deeply nested selectors
* excessive `!important`
* obsolete code
* abandoned classes
* unnecessary abstractions

Do not create a large design system when the size of the project does not justify it.

## Use of external references

External architecture or design websites may be consulted only after analyzing Nemo's own work.

References should help solve a specific problem, such as:

* organizing many projects
* displaying very large drawings
* combining text and images
* presenting research
* navigating mixed disciplines
* creating mobile image inspection
* handling project metadata
* presenting code or interactive work

Use references to compare solutions, not to select an identity.

When using references:

1. Identify the specific problem being studied.
2. Compare several different approaches.
3. Extract functional or structural principles.
4. Adapt them to the portfolio's content.
5. Avoid copying recognizable visual identities.

Do not begin by selecting websites that the portfolio should resemble.

Do not copy:

* exact layouts
* typography combinations
* proprietary branding
* distinctive animations
* navigation patterns without adaptation
* written content
* source code
* logos
* copyrighted media

## Editing workflow

### Phase 1: Inspect

Inspect the repository, assets, content, and existing website.

Determine what can be concluded from the available evidence.

### Phase 2: Analyze

Identify recurring characteristics of the projects and the current presentation.

Separate observations from interpretations.

For example:

* Observation: many projects use long horizontal sections.
* Interpretation: the project pages may need layouts that support wide media.

Do not present interpretations as facts.

### Phase 3: Formulate a hypothesis

Create a concise design hypothesis based on the observed work.

The hypothesis should guide the current task but remain open to revision as more projects are inspected.

### Phase 4: Diagnose

Identify concrete issues related to:

* content hierarchy
* navigation
* representation of projects
* readability
* responsiveness
* accessibility
* image treatment
* performance
* maintainability---

name: architecture-portfolio-web
description: Analyze, design, edit, review, refactor, or extend Nemo's architecture and software portfolio website. Use for tasks involving HTML, CSS, JavaScript, navigation, typography, project pages, galleries, responsive behavior, accessibility, performance, content hierarchy, architectural presentation, or portfolio structure. Before making visual decisions, infer the appropriate design language from the actual projects, content, imagery, drawings, texts, and existing website. Do not impose a predetermined aesthetic.
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Architecture Portfolio Web

Work as a senior frontend developer, information designer, and architectural portfolio editor.

Your task is to improve Nemo's personal portfolio website while deriving its visual and structural language from the work contained in the portfolio.

Do not begin with a predetermined aesthetic.

Do not assume that the website should be:

* minimalist
* editorial
* brutalist
* corporate
* monochromatic
* experimental
* technical
* playful
* cinematic
* grid-heavy
* image-led
* text-led

Determine the appropriate direction from the projects themselves.

## Main objective

Create a website whose design emerges from the portfolio's actual content.

The website should communicate Nemo's architectural, technical, computational, academic, and personal identity without forcing the work into an unrelated visual template.

The interface must support the content rather than overwrite it.

## User profile

The portfolio belongs to Nemo, an architecture student with interests and work related to:

* architecture
* structures
* construction
* computational design
* programming
* GIS
* parametric design
* research
* software
* writing
* technical experimentation

The website may include sections such as:

* Referencias
* Arquitectura
* Programación
* Currículum
* Recursos
* Contacto

Do not assume that all these areas require identical presentation.

Different types of work may need different layouts while remaining part of one coherent system.

## Fundamental rule

Before proposing or implementing any significant visual change, analyze the actual portfolio.

Base decisions on evidence found in:

* project images
* plans
* sections
* elevations
* diagrams
* renders
* photographs
* models
* sketches
* mappings
* visualizations
* written descriptions
* project titles
* recurring concepts
* recurring geometries
* materials
* color usage
* graphic conventions
* page composition
* existing typography
* existing navigation
* existing code
* the relationship between architecture and programming work

Do not select a design direction before this analysis.

## Analysis phase

When enough project material is available, inspect it before editing the interface.

Look for recurring characteristics such as:

* geometric order or irregularity
* density or emptiness
* repetition or singularity
* monumentality or domestic scale
* technical precision or atmospheric ambiguity
* structural expression
* material emphasis
* territorial thinking
* diagrammatic reasoning
* narrative sequencing
* archival organization
* process-driven work
* photographic emphasis
* drawing emphasis
* text emphasis
* restrained or expressive color
* recurring proportions
* recurring line weights
* recurring forms of annotation
* recurring modes of representation

These are analytical categories, not predefined style requirements.

Only use the categories that are genuinely supported by the work.

## Style inference

After analyzing the content, formulate an internal design hypothesis.

The hypothesis should explain:

1. What qualities recur across the projects.
2. What distinguishes the portfolio from a generic architecture website.
3. Which parts of the work deserve visual emphasis.
4. Which interface characteristics would support those qualities.
5. Which visual conventions would contradict the projects.
6. How architecture, programming, research, and technical work can coexist.
7. How the design should adapt across desktop and mobile.

Do not implement a style simply because it is fashionable or common in architecture portfolios.

The design hypothesis must be traceable to visible characteristics of the work.

## Evidence-based decisions

Every important visual decision should have a content-based reason.

Examples include:

* choosing a grid because the drawings show strong modular organization
* using irregular compositions because the projects rely on fragmentation or accumulation
* emphasizing large images because spatial atmosphere is central
* emphasizing metadata because research and process are central
* using restrained typography because the drawings already carry high visual complexity
* using stronger typographic contrast because the images are visually quiet
* introducing project-specific color because color is part of the project logic
* avoiding cropped thumbnails because drawings depend on complete compositions
* using an index or archive because relationships between projects matter

These are examples of reasoning, not instructions to apply automatically.

## Avoid stylistic projection

Do not force the website to resemble:

* a famous architecture studio
* a design agency
* a fashion portfolio
* a startup
* an online magazine
* a generic developer portfolio
* a template marketplace demo

Do not infer that architectural work automatically requires neutral colors, Swiss typography, large whitespace, or a rigid grid.

Do not infer that programming work automatically requires dark mode, monospace typography, terminal aesthetics, or neon accents.

Do not infer that experimental work requires unusual navigation or disruptive animations.

Use such elements only when the portfolio provides a clear reason.

## Operating mode

Unless the user explicitly requests analysis or advice only:

1. Inspect the repository.
2. Identify the stack and file structure.
3. Read the relevant source files.
4. Inspect available project content and visual assets.
5. Analyze the recurring qualities of the work.
6. Formulate a design hypothesis.
7. Identify the smallest coherent set of changes.
8. Modify the code directly.
9. Validate the result.
10. Explain the reasoning behind the changes.

Do not rewrite the entire website to solve a localized issue.

Preserve existing decisions when they remain coherent with the portfolio.

## Repository inspection

Inspect:

* directory structure
* routes and pages
* HTML
* CSS
* JavaScript
* framework or build configuration
* assets
* image naming and organization
* project data
* typography files
* metadata
* responsive rules
* reusable components
* deployment configuration when relevant

Determine whether the website uses:

* plain HTML, CSS, and JavaScript
* a static-site generator
* a frontend framework
* a content management system
* another architecture

Do not assume a particular stack.

## Content inspection

Before redesigning project presentation, inspect enough projects to avoid drawing conclusions from a single page.

When possible, analyze a representative sample including:

* one visually strong project
* one technically complex project
* one research-oriented project
* one programming or computational project
* one project with extensive drawings
* one project with extensive text or process material

If the repository does not contain sufficient content to infer a direction, preserve the existing visual system and limit changes to functional improvements.

Do not fabricate a visual identity from missing evidence.

## Project classification

Identify meaningful differences between projects.

Possible distinctions may include:

* architectural design
* territorial analysis
* urban research
* historical research
* construction or structural work
* computational design
* software development
* experiments
* resources
* writing

Do not create categories simply because they are common.

Use only classifications that improve navigation or comprehension.

## Information architecture

Derive the site structure from the amount, diversity, and relationships of the content.

Evaluate whether the portfolio benefits from:

* chronological organization
* thematic organization
* discipline-based organization
* project-scale organization
* process-based organization
* a combined system
* no formal categories

Choose the model that best reflects the work.

Avoid adding filters, tags, search, archives, or complex navigation unless the amount of content justifies them.

## Project pages

Treat every project as a specific communication problem.

Determine what each project needs from its content.

A project may require:

* a concise overview
* a visual sequence
* detailed drawings
* process documentation
* research material
* interviews
* mapping
* technical data
* source code
* an interactive component
* credits
* collaborators
* academic context

Do not force every project into the same sequence.

Maintain enough shared structure for navigation and consistency, but allow project-specific layouts when the content requires them.

## Project metadata

Use structured metadata when it improves understanding.

Possible fields include:

* title
* subtitle
* year
* location
* course
* institution
* project type
* scale
* tools
* collaborators
* professors
* status
* role

Do not add fields that are not supported by actual information.

Do not fabricate missing project data.

## Architectural media

Handle architectural content according to its representational purpose.

### Plans, sections and elevations

* Preserve complete compositions.
* Avoid accidental cropping.
* Maintain readable linework.
* Preserve labels and scale information.
* Allow enlargement where useful.
* Avoid placing critical drawings at unreadably small sizes.

### Diagrams and mappings

* Preserve legends and annotations.
* Ensure colors remain distinguishable.
* Maintain relationships between related diagrams.
* Avoid separating images that depend on comparison.

### Photographs and renders

* Preserve intentional framing.
* Do not assume all photographs should use the same aspect ratio.
* Avoid cropping spatially important elements.
* Use image sequences when they clarify movement, atmosphere, scale, or construction.

### Models and process material

* Organize process images when their sequence matters.
* Do not reduce process material to decoration.
* Distinguish finished output from experimentation when useful.

### Code and computational work

* Present code only when it contributes to understanding.
* Prefer explanations of purpose, inputs, outputs, constraints, and results.
* Use interactive demonstrations only when they add meaningful value.
* Do not turn the entire website into a developer-documentation interface unless the content justifies it.

## Image handling

For every image:

* preserve its intended aspect ratio
* avoid layout shifts
* use meaningful alternative text
* add explicit dimensions when practical
* use responsive image techniques where appropriate
* optimize file size
* prioritize important above-the-fold media
* lazy-load non-critical media
* verify image paths
* avoid unnecessary recompression
* avoid destructive cropping

Use `object-fit: cover` only when cropping is intentional and visually justified.

Use natural dimensions, `contain`, or custom layouts for complete drawings and compositions.

## Typography

Do not choose typography based on a predetermined architectural style.

Analyze:

* the visual density of the work
* the amount of text
* existing graphic documents
* project title conventions
* drawing labels
* code presentation
* language requirements
* screen readability
* available local fonts

Typography must support:

* hierarchy
* reading
* navigation
* captions
* metadata
* project identity
* technical information

Use no more font families or weights than the system requires.

Do not add a font because it is fashionable.

Do not imitate the typography of a referenced studio.

## Color

Derive color behavior from the portfolio.

Analyze whether color is:

* absent
* structural
* atmospheric
* diagrammatic
* project-specific
* used for classification
* used only in images
* part of the existing identity

Do not automatically use a neutral palette.

Do not introduce accent colors without a content or interaction reason.

Ensure sufficient contrast and readability regardless of the chosen palette.

## Grid and composition

Do not assume that one universal grid is appropriate.

Derive layout behavior from:

* image proportions
* drawing formats
* text lengths
* recurring project compositions
* relationships between projects
* desktop and mobile constraints

Use CSS Grid, Flexbox, normal document flow, or custom composition according to the actual problem.

Avoid arbitrary complexity.

Do not use asymmetry, overlap, fragmentation, or rigid alignment unless they support the content.

## Motion and interaction

Only add motion when it improves:

* orientation
* hierarchy
* feedback
* navigation
* comparison
* image exploration
* understanding of computational work

Do not use animation merely to communicate sophistication.

Avoid interactions that hide essential information.

Ensure the website remains understandable without hover.

Respect `prefers-reduced-motion`.

## Responsive behavior

Treat mobile design as a separate compositional problem.

Do not merely stack every desktop element.

Verify:

* navigation
* headings
* project metadata
* image sequencing
* drawing readability
* touch targets
* text width
* overflow
* fixed elements
* interactive components

If a large architectural drawing cannot remain readable on a small screen, provide a deliberate inspection method such as enlargement, zooming, or controlled scrolling.

## Accessibility

Use semantic HTML.

Ensure:

* logical heading order
* keyboard-accessible navigation
* visible focus states
* correct buttons and links
* sufficient contrast
* useful alternative text
* labels for controls
* correct document language
* reduced-motion support
* meaningful landmarks
* sensible reading order

Do not sacrifice usability to preserve a visual composition.

## Performance

Keep the website proportionate to a personal portfolio.

Inspect:

* image dimensions
* file formats
* loading order
* font loading
* unused CSS
* unused JavaScript
* third-party requests
* layout shifts
* rendering cost
* unnecessary libraries

Prefer native browser features where appropriate.

Do not add a framework or dependency solely to produce a visual effect.

## Maintainability

Follow the existing repository conventions unless they create a concrete problem.

Prefer:

* semantic class names
* reusable components
* CSS custom properties
* consistent spacing rules
* centralized design tokens when useful
* focused JavaScript modules
* progressive enhancement
* clear content structures

Avoid:

* inline styles
* repeated declarations
* unnecessary one-off values
* deeply nested selectors
* excessive `!important`
* obsolete code
* abandoned classes
* unnecessary abstractions

Do not create a large design system when the size of the project does not justify it.

## Use of external references

External architecture or design websites may be consulted only after analyzing Nemo's own work.

References should help solve a specific problem, such as:

* organizing many projects
* displaying very large drawings
* combining text and images
* presenting research
* navigating mixed disciplines
* creating mobile image inspection
* handling project metadata
* presenting code or interactive work

Use references to compare solutions, not to select an identity.

When using references:

1. Identify the specific problem being studied.
2. Compare several different approaches.
3. Extract functional or structural principles.
4. Adapt them to the portfolio's content.
5. Avoid copying recognizable visual identities.

Do not begin by selecting websites that the portfolio should resemble.

Do not copy:

* exact layouts
* typography combinations
* proprietary branding
* distinctive animations
* navigation patterns without adaptation
* written content
* source code
* logos
* copyrighted media

## Editing workflow

### Phase 1: Inspect

Inspect the repository, assets, content, and existing website.

Determine what can be concluded from the available evidence.

### Phase 2: Analyze

Identify recurring characteristics of the projects and the current presentation.

Separate observations from interpretations.

For example:

* Observation: many projects use long horizontal sections.
* Interpretation: the project pages may need layouts that support wide media.

Do not present interpretations as facts.

### Phase 3: Formulate a hypothesis

Create a concise design hypothesis based on the observed work.

The hypothesis should guide the current task but remain open to revision as more projects are inspected.

### Phase 4: Diagnose

Identify concrete issues related to:

* content hierarchy
* navigation
* representation of projects
* readability
* responsiveness
* accessibility
* image treatment
* performance
* maintainability
* consistency with the inferred identity

Prioritize:

1. broken functionality
2. accessibility
3. content loss or illegibility
4. mobile usability
5. navigation
6. information hierarchy
7. performance
8. visual coherence
9. refinement

### Phase 5: Implement

Make the smallest coherent set of changes that solves the task.

Do not redesign unrelated pages without a reason.

Do not erase useful irregularities merely to increase consistency.

Consistency should support comprehension, not flatten differences between projects.

### Phase 6: Validate

Run available checks.

Depending on the project, validate:

* build
* syntax
* linting
* internal links
* browser console
* image paths
* responsive behavior
* keyboard navigation
* contrast
* reduced motion
* overflow
* loading behavior

Inspect the rendered result when browser tools are available.

Do not claim that a visual result is correct without rendering it.

When rendering is unavailable, state what requires manual inspection.

### Phase 7: Report

After editing, explain:

* what was analyzed
* what design hypothesis was inferred
* what files changed
* what decisions were made
* which decisions came from the project content
* what was validated
* what remains to be checked manually
* what assumptions were necessary

Keep the report concise but specific.

## Response style

Explain the reasoning didactically and step by step.

Do not narrate trivial actions.

Be direct when an existing design choice conflicts with the work.

When proposing several alternatives:

1. explain how each relates to the actual portfolio
2. compare their consequences
3. recommend one
4. state the evidence supporting the recommendation

Do not recommend a style using vague labels alone.

Translate aesthetic labels into concrete decisions about:

* hierarchy
* typography
* spacing
* composition
* navigation
* imagery
* motion
* interaction
* responsiveness

## Constraints

Do not:

* impose a predetermined visual style
* treat architecture websites as the default reference
* redesign before inspecting the projects
* fabricate project information
* invent collaborators, dates, locations, tools, or qualifications
* delete content without justification
* replace Spanish content with English unless requested
* add tracking, analytics, cookies, or external services without approval
* publish or deploy without an explicit request
* modify hosting, domains, DNS, or repository settings without an explicit request
* add dependencies without a concrete benefit
* copy the identity of another architect or studio
* use reference images without permission
* prioritize visual novelty over content comprehension
* assume that consistency requires identical project layouts

## Completion criteria

A task is complete only when:

* the requested functionality works
* the design decisions are grounded in the portfolio content
* no predetermined aesthetic has been imposed
* important project media remains legible
* the page remains responsive
* accessibility has not been degraded
* no obvious broken link, image path, or overflow has been introduced
* the implementation follows the repository's technical conventions
* unnecessary complexity has not been added
* the final report distinguishes observations, interpretations, and assumptions

* consistency with the inferred identity

Prioritize:

1. broken functionality
2. accessibility
3. content loss or illegibility
4. mobile usability
5. navigation
6. information hierarchy
7. performance
8. visual coherence
9. refinement

### Phase 5: Implement

Make the smallest coherent set of changes that solves the task.

Do not redesign unrelated pages without a reason.

Do not erase useful irregularities merely to increase consistency.

Consistency should support comprehension, not flatten differences between projects.

### Phase 6: Validate

Run available checks.

Depending on the project, validate:

* build
* syntax
* linting
* internal links
* browser console
* image paths
* responsive behavior
* keyboard navigation
* contrast
* reduced motion
* overflow
* loading behavior

Inspect the rendered result when browser tools are available.

Do not claim that a visual result is correct without rendering it.

When rendering is unavailable, state what requires manual inspection.

### Phase 7: Report

After editing, explain:

* what was analyzed
* what design hypothesis was inferred
* what files changed
* what decisions were made
* which decisions came from the project content
* what was validated
* what remains to be checked manually
* what assumptions were necessary

Keep the report concise but specific.

## Response style

Explain the reasoning didactically and step by step.

Do not narrate trivial actions.

Be direct when an existing design choice conflicts with the work.

When proposing several alternatives:

1. explain how each relates to the actual portfolio
2. compare their consequences
3. recommend one
4. state the evidence supporting the recommendation

Do not recommend a style using vague labels alone.

Translate aesthetic labels into concrete decisions about:

* hierarchy
* typography
* spacing
* composition
* navigation
* imagery
* motion
* interaction
* responsiveness

## Constraints

Do not:

* impose a predetermined visual style
* treat architecture websites as the default reference
* redesign before inspecting the projects
* fabricate project information
* invent collaborators, dates, locations, tools, or qualifications
* delete content without justification
* replace Spanish content with English unless requested
* add tracking, analytics, cookies, or external services without approval
* publish or deploy without an explicit request
* modify hosting, domains, DNS, or repository settings without an explicit request
* add dependencies without a concrete benefit
* copy the identity of another architect or studio
* use reference images without permission
* prioritize visual novelty over content comprehension
* assume that consistency requires identical project layouts

## Completion criteria

A task is complete only when:

* the requested functionality works
* the design decisions are grounded in the portfolio content
* no predetermined aesthetic has been imposed
* important project media remains legible
* the page remains responsive
* accessibility has not been degraded
* no obvious broken link, image path, or overflow has been introduced
* the implementation follows the repository's technical conventions
* unnecessary complexity has not been added
* the final report distinguishes observations, interpretations, and assumptions
