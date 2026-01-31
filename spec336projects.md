# Course Project Menu: Program Analysis for Security & Privacy

## Overview
In these projects, you will use **OCaml** to build tools that automatically reason about code behavior. Your goal is to identify security vulnerabilities or privacy leaks without actually running the code (**Static Analysis**). 

You are encouraged to choose a project that aligns with your interests in either formal verification, system security, or data privacy.

---

## Project Catalog

### 1. Static Taint Analysis for Web Vulnerabilities
* **The Goal:** Build a tool that identifies "source-to-sink" flows. It ensures untrusted user input never reaches a dangerous function (e.g., a SQL query) without passing through a sanitizer.
* **Security Focus:** SQL Injection and Cross-Site Scripting (XSS).
* **Core Concepts:** Data-flow analysis, Transfer functions, and Fixed-point iteration.

### 2. Type-Based Information Flow Control
* **The Goal:** Implement a security-typed language. You will extend a simple language so that every variable has a label: $L$ (Low/Public) or $H$ (High/Secret). The compiler should reject any program where secret data might leak to a public output.
* **Security Focus:** Preventing implicit leaks through control flow (e.g., `if (secret) then public_out = 1`).
* **Core Concepts:** Type systems, Non-interference, and Security lattices ($L \sqsubseteq H$).

### 3. Cache Side-Channel Detection
* **The Goal:** Develop an analyzer that checks if a program’s memory access pattern depends on secret data. If the memory address accessed changes based on a "High" variable, the program is vulnerable to timing attacks.
* **Security Focus:** Cryptographic side-channels (e.g., RSA/AES leaks).
* **Core Concepts:** Abstract Interpretation and Abstract Domains.

### 4. Privacy-Policy Compliance Checker
* **The Goal:** Analyze code to ensure it follows a specific privacy policy. For example: *"Location data may only be sent to api.myapp.com, never to ads.thirdparty.com."*
* **Privacy Focus:** GDPR compliance and unauthorized data harvesting.
* **Core Concepts:** Graph reachability and Relational reasoning.

### 5. Symbolic Execution Engine
* **The Goal:** Use "symbols" instead of concrete numbers to represent inputs. You will build an engine that explores all possible execution paths to find states where a program crashes or violates an assertion.
* **Security Focus:** Automated vulnerability discovery (e.g., Buffer Overflows).
* **Core Concepts:** Path constraints and SMT solving.

### 6. AST-Based Secret & Misconfiguration Scanner
* **The Goal:** Create a "linting" tool that parses source code and identifies hardcoded API keys, passwords, or insecure settings (like `allow_insecure_ssl = true`).
* **Security Focus:** Credential leakage and weak security posture.
* **Core Concepts:** Abstract Syntax Tree (AST) traversal and pattern recognition.

### 7. Control-Flow Integrity (CFI) Auditor
* **The Goal:** Generate a Control-Flow Graph (CFG) and identify "illegal" jumps. You will flag any indirect branch (like a function pointer call) that doesn't have a validated destination.
* **Security Focus:** Mitigating Return-Oriented Programming (ROP) attacks.
* **Core Concepts:** CFG construction and pointer analysis.

### 8. Memory Safety (Use-After-Free) Detector
* **The Goal:** Build a state-machine analyzer that tracks the lifecycle of pointers: $Allocated \rightarrow Freed \rightarrow Error$. The tool flags any attempt to use or free a pointer that has already been released.
* **Security Focus:** Heap-based exploitation.
* **Core Concepts:** Finite State Machines (FSM) and path-sensitive analysis.

### 9. Privacy Leakage via "Taint Lite"
* **The Goal:** A simplified version of taint analysis. Track a set of "tainted" variables as they move through assignments. If a tainted variable is used in a "sink" (like a log file), trigger an alert.
* **Privacy Focus:** Identifying unintentional PII (Personally Identifiable Information) exposure.
* **Core Concepts:** Variable tracking, Set operations, and reachability.

---

## Technical Tutorial: Core Pillars

### 1. The Frontend: Parsing & ASTs
Before you can analyze code, you must turn text into data. You will transform source code into an **Abstract Syntax Tree (AST)**. In OCaml, this is represented using nested `variant` types.

### 2. The Infrastructure: Control Flow Graphs (CFG)
Most analyses work on a graph of how the program moves. You will break code into **Basic Blocks** (sequences with no jumps) and connect them with edges representing program flow.

### 3. The Engine: Data-Flow & Fixed-Points
Define **Transfer Functions** to determine how information changes after each line. Use **Fixed-Point Iteration** to run the analysis until results stabilize.

### 4. The Logic: Lattices & Abstraction
Use a **Lattice** to represent "what we know." Use **Join operations ($\sqcup$)** to combine security information safely at control-flow merges.

---

## Recommended Tools & Ecosystem

| Tool | Purpose | Description |
| :--- | :--- | :--- |
| **Dune** | Build System | The standard for OCaml projects. Handles compilation and dependencies. |
| **Menhir** | Parser Generator | Used to turn your "toy language" into an AST. |
| **ocamlgraph** | Graph Library | Excellent for building and traversing CFGs. |
| **Z3 (z3-ocaml)** | SMT Solver | Necessary for Project 5 to solve path constraints. |
| **OCaml LSP** | IDE Support | Essential for VS Code integration (types, autocomplete). |
| **UTop** | Interactive REPL | Best for testing your logic and pattern matching quickly. |