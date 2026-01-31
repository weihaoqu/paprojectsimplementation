# Delivery Plan: CS336 Interactive Analysis Portal

## Goal
To build a high-quality, web-based educational portal that provides interactive visualizations and playgrounds for the core concepts of Program Analysis for Security & Privacy.

## 1. Recommended Tech Stack
*   **Framework:** [Next.js](https://nextjs.org/) (React) for an integrated documentation and app experience.
*   **Graphs/CFGs:** [React Flow](https://reactflow.dev/) or [D3.js](https://d3js.org/) for highly interactive program graphs.
*   **Analysis Engine:** [js_of_ocaml](https://ocsigen.org/js_of_ocaml/latest/manual/overview) to compile OCaml logic to WebAssembly, enabling client-side static analysis.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) for a clean, professional "Material Design" aesthetic.

## 2. Key Interactive Assets
*   **Interactive CFG Builder:** Allows students to write small OCaml snippets and see the resulting Control-Flow Graph generated in real-time.
*   **Security Lattice Sandbox:** A tool to define custom lattices and visualize the flow of information between different security levels.
*   **Symbolic Execution Debugger:** A step-by-step visualizer that shows the "forking" of paths and the growth of path conditions during symbolic execution.
*   **Taint Flow Highlighter:** Highlights the path from a source to a sink in source code based on the analyzer's output.

## 3. Development Roadmap

### Phase 1: Foundation & Static Content
*   Initialize the Next.js project and set up the layout.
*   Port the curriculum content from `teachingplancs336.md` into high-quality MDX (Markdown with React) pages.
*   Deploy a baseline version to a hosting provider (e.g., Vercel).

### Phase 2: Visualization Components
*   Develop the **CFG Visualizer** component using React Flow.
*   Develop the **Lattice Explorer** component for the Information Flow Control module.
*   Integrate a web-based code editor (Monaco Editor).

### Phase 3: The Analysis Pipeline
*   Set up the `js_of_ocaml` pipeline to bridge the OCaml analysis logic with the React frontend.
*   Implement the "Static Taint Analysis" (Module 1) visualization as the first fully functional tool.
*   Implement the "Symbolic Execution" (Module 5) trace viewer.

### Phase 4: Active Learning & Refinement
*   Create interactive lab exercises for each module (e.g., "Fix the Use-After-Free in this snippet").
*   Add automated "hints" and "solutions" based on the static analysis results.
*   Final UI/UX polishing and performance optimization.
