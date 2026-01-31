# CS336 Interactive Analysis Portal

This is the official interactive learning portal for the **CS336: Program Analysis for Security & Privacy** course. It provides a hands-on environment for students to explore static analysis concepts, visualize algorithms, and experiment with security tools.

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)

## Features

*   **Curriculum Modules:** Detailed lesson plans, objectives, and key takeaways for 9 core modules.
*   **Deep Dive Content:** Extended explanations and analogies for complex topics.
*   **Interactive Labs:**
    *   **Taint Analysis:** Visual Control-Flow Graph (CFG) tracing.
    *   **Information Flow:** Interactive Security Lattice checker.
    *   **Side-Channels:** Prime+Probe cache attack simulator.
    *   **Secret Scanning:** Mock AST-based linter playground.
    *   **Taint Lite:** Step-by-step variable state propagation tracer.

## Tech Stack

*   **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Visualization:** [React Flow](https://reactflow.dev/) (for Graphs and Lattices)
*   **Code Editor:** [Monaco Editor](https://github.com/suren-atoyan/monaco-react)
*   **Icons:** [Lucide React](https://lucide.dev/)

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

3.  **Open the portal:**
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

*   `app/`: Next.js App Router pages and layouts.
*   `components/`: Reusable UI components.
    *   `visualizers/`: React Flow components for CFGs and Lattices.
    *   `labs/`: Interactive playground components for specific modules.
*   `lib/`: Data models and mock analysis services.

## License

MIT