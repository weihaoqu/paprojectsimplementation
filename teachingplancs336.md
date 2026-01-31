# CS336: Program Analysis for Security & Privacy - Teaching Plan

## Module 1: Static Taint Analysis for Web Vulnerabilities

### Overview
This module introduces students to the fundamental concepts of static taint analysis, focusing on its application to identify common web vulnerabilities like SQL Injection and Cross-Site Scripting (XSS). The goal is to provide a solid theoretical foundation, moving from motivating examples to the underlying program analysis techniques.

### Lesson Plan

*   **Lesson 1: The "Why" - A Motivating Example**
    *   **Objective:** Students will understand the real-world problem taint analysis solves.
    *   **Content:**
        *   Introduction to common web vulnerabilities (e.g., SQL Injection, XSS).
        *   Demonstrate a simple, concrete code example of a vulnerability where untrusted user input directly leads to an exploit.
        *   Manually trace the flow of malicious data from a web form (source) to a critical operation (sink).
    *   **Key Takeaways:** Vulnerabilities arise from uncontrolled data flow.

*   **Lesson 2: The "What" - Introduction to Taint Analysis**
    *   **Objective:** Students will define and identify core concepts of taint analysis.
    *   **Content:**
        *   Formal definitions of:
            *   **Tainted Data:** Data originating from untrusted sources.
            *   **Sources:** Entry points for untrusted input (e.g., HTTP request parameters, user input fields).
            *   **Sinks:** Critical operations that, if fed tainted data, can lead to vulnerabilities (e.g., database queries, `eval()` functions, DOM manipulation).
            *   **Sanitizers:** Functions or operations that transform tainted data into safe data (e.g., input validation, encoding functions).
        *   Revisit the motivating example, explicitly labeling the sources, sinks, and sanitizers.
    *   **Key Takeaways:** Taint analysis tracks the flow of untrusted data from sources to sinks, considering sanitization.

*   **Lesson 3: The "How" (Part 1) - Modeling Code with Control-Flow Graphs (CFGs)**
    *   **Objective:** Students will understand CFGs as a program representation for static analysis.
    *   **Content:**
        *   Explanation of why a structured program representation is necessary for automated analysis.
        *   Definition of a **Control-Flow Graph (CFG)**:
            *   Nodes represent basic blocks (sequences of instructions with a single entry and exit point).
            *   Edges represent possible transfers of control between basic blocks.
        *   Walkthrough: Constructing a simple CFG from example code containing `if/else` statements, loops, and function calls.
    *   **Key Takeaways:** CFGs provide a map of all possible execution paths in a program, essential for data flow tracking.

*   **Lesson 4: The "How" (Part 2) - Tracking Data with Data-Flow Analysis**
    *   **Objective:** Students will grasp how data-flow analysis tracks properties across a CFG.
    *   **Content:**
        *   Introduction to Data-Flow Analysis as a technique for computing information about the possible states of a program.
        *   **Transfer Functions:** Rules defining how a specific property (e.g., "taintedness") changes as execution progresses through a basic block. Illustrate with examples (e.g., `y = x` copies taint from `x` to `y`; `y = "constant"` makes `y` untainted).
        *   Handling control flow merges: Explaining how information from different paths converging at a CFG node is combined (e.g., a variable is considered tainted if it's tainted on *any* incoming path). This introduces the need for join operations.
    *   **Key Takeaways:** Data-flow analysis uses transfer functions to propagate information along the CFG, combining information at merge points.

*   **Lesson 5: The "How" (Part 3) - Reaching a Conclusion with Fixed-Point Iteration**
    *   **Objective:** Students will understand the iterative nature of data-flow analysis and the concept of a fixed-point.
    *   **Content:**
        *   Explanation that data-flow analysis is typically iterative: information is propagated repeatedly until no more changes occur.
        *   Introduction to the **Fixed-Point Algorithm**: How the analysis "converges" on a stable solution.
        *   Analogy: Spreading ink through a system of pipes (CFG). The algorithm runs until the ink has spread everywhere it can possibly go. This final state is the "fixed point."
    *   **Key Takeaways:** Fixed-point iteration ensures the data-flow analysis considers all possible paths and reaches a sound conclusion about program properties.

*   **Lesson 6: Tying It All Together: A Complete Taint Analysis Workflow**
    *   **Objective:** Students will synthesize the learned concepts into a complete understanding of static taint analysis.
    *   **Content:**
        *   Review of the entire analysis workflow:
            1.  Code parsing and CFG construction.
            2.  Initialization of taint state.
            3.  Iterative data-flow analysis using transfer functions and join operations.
            4.  Fixed-point convergence.
            5.  Reporting: Identifying if tainted data reaches any defined sinks without proper sanitization.
        *   Walkthrough of the complete analysis process on a slightly more complex example.
    *   **Key Takeaways:** A holistic view of how static taint analysis tools work from code input to vulnerability reporting.

## Module 2: Type-Based Information Flow Control

### Overview
This module delves into Type-Based Information Flow Control (IFC), a compile-time technique to prevent unauthorized information leakage. Students will learn how to design and reason about security-typed languages that guarantee non-interference.

### Lesson Plan

*   **Lesson 1: Recap of Type System Fundamentals**
    *   **Objective:** Ensure students have the foundational knowledge of type systems.
    *   **Content:**
        *   What is a Type? (Intuitive idea: a label for data).
        *   Static vs. Dynamic Typing: Compile-time vs. Runtime checks, examples (Java/OCaml vs. Python/JavaScript).
        *   The Goal of a Type System: Preventing errors, improving reliability, readability.
        *   Typing Judgements (A Formal Glimpse): Introduction to `Γ ⊢ e : τ` notation.
    *   **Key Takeaways:** Type systems provide structural safety and enable early error detection.

*   **Lesson 2: The Problem of Information Leaks**
    *   **Objective:** Students will understand both explicit and implicit information flows.
    *   **Content:**
        *   Introduction to Information Flow Control (IFC).
        *   **Explicit Flow:** Direct assignment of secret data to public data (e.g., `public_var = secret_var;`).
        *   **Implicit Flow:** Information leakage through control flow (e.g., `if (secret_key > 10) { public_var = 1; }`). Explain how an observer of `public_var` can infer information about `secret_key`.
    *   **Key Takeaways:** Information can leak subtly through program logic, not just direct assignment.

*   **Lesson 3: Security Policies as Lattices**
    *   **Objective:** Students will understand lattices as a formal way to define security policies and combine security levels.
    *   **Content:**
        *   Introduce security labels: **`L`** (Low/Public) and **`H`** (High/Secret).
        *   Define a **Lattice**: A mathematical structure consisting of a set of elements and a partial order relation (`⊑`).
        *   **Key Properties of a Lattice:**
            *   **Partial Order (`⊑`):** Defines allowed information flow (e.g., `L ⊑ H` means information can flow from Low to High).
            *   **Join Operation (`⊔`, Least Upper Bound):** How to combine security levels. The result is the "most restrictive" level (e.g., `L ⊔ H = H`). Crucial for handling control flow merges (e.g., `if/else` branches) where information from different levels might converge.
            *   **Meet Operation (`⊓`, Greatest Lower Bound):** The "least restrictive" level (e.g., `L ⊓ H = L`).
        *   **Examples of Security Lattices:**
            *   **The Simple Two-Point Lattice:** The basic `L/H` model.
            *   **Multi-Level Lattices:** Hierarchical levels (e.g., `Public ⊑ Confidential ⊑ Secret`).
            *   **Lattices with Compartments:** More complex structures for fine-grained access control (e.g., data related to `Project A` and `Project B` might be incomparable, but both higher than `Public`).
    **Key Takeaways:** Lattices provide a robust mathematical framework for defining security policies and ensure safe information combination.

*   **Lesson 4: The Security Guarantee - Non-Interference**
    *   **Objective:** Students will understand the formal security property guaranteed by IFC type systems.
    *   **Content:**
        *   Define **Non-Interference**: "A program is non-interfering if changing the value of a secret input has no observable effect on the public outputs."
        *   Explain its significance as a strong, provable security property.
    *   **Key Takeaways:** Non-interference is the formal proof that a system prevents information leaks.

*   **Lesson 5: The "How" - A Security Type System**
    *   **Objective:** Students will learn and apply typing rules to enforce information flow policies.
    *   **Content:**
        *   Combine types and labels: Types become `τ_L` (e.g., `int_H`, `bool_L`).
        *   Introduce formal **typing rules** using `Γ ⊢ e : τ_l` notation for:
            *   **Variable access:** Looking up a variable's security-typed type.
            *   **Assignment (`x := e`):** Rule: `Γ ⊢ e : τ_{l_e}` and `x` has type `τ_{l_x}`. Assignment is valid only if `l_e ⊑ l_x`. (No downgrading of information).
            *   **Conditionals (`if`):** Key rule to prevent implicit flows. The security level of the program counter (PC) must be considered. If an `if` condition depends on a High variable, then any variables assigned within the `then` or `else` branches must also be High (or higher).
    **Key Takeaways:** A security type system uses static analysis to enforce information flow policies at compile-time.

*   **Lesson 6: Tying It All Together**
    *   **Objective:** Students will apply the security type system to a complete example and understand its practical implications.
    *   **Content:**
        *   Walk through a small program with both explicit and implicit flow attempts.
        *   Apply the security typing rules step-by-step to demonstrate how the type checker identifies and rejects security violations.
        *   Briefly compare Type-Based IFC (compile-time, sound, secure-by-construction) with Taint Analysis (runtime or static, potentially unsound, dynamic detection).
    *   **Key Takeaways:** Type-Based IFC provides strong, provable security guarantees by preventing leaks at the earliest stage.

## Module 3: Cache Side-Channel Detection via Abstract Interpretation

### Overview
This module explores how to statically detect potential cache side-channel vulnerabilities. The focus is on the theory of Abstract Interpretation, a powerful program analysis technique for approximating program behavior to identify complex, state-dependent security leaks.

### Lesson Plan

*   **Lesson 1: The Threat - An Introduction to Side-Channel Attacks**
    *   **Objective:** Students will understand the concept of a timing side-channel attack.
    *   **Content:**
        *   Introduction to side-channel attacks as a class of threats that exploit physical effects of computation (e.g., timing, power consumption).
        *   Minimal necessary background on caches: Explain that memory accesses have different speeds (fast "hit" vs. slow "miss") and that an attacker can measure this timing difference.
        *   Conceptual example: `if (secret_bit == 1) { access_array_A; } else { access_array_B; }`. Explain how an attacker can deduce `secret_bit` by timing which array access is faster.
    *   **Key Takeaways:** Attackers can learn secrets from a program's observable behavior, not just its output.

*   **Lesson 2: The Analytical Framework - Introduction to Abstract Interpretation**
    *   **Objective:** Students will grasp the core theory of Abstract Interpretation.
    *   **Content:**
        *   Motivation: Analyzing every concrete execution path of a program is infeasible.
        *   Definition: Abstract Interpretation is a theory for creating a sound "abstract" execution that over-approximates all possible concrete behaviors.
        *   Analogy: The "rule of signs" in multiplication (e.g., `(+) * (-) = (-)`). The sign is an *abstraction* of a real number, allowing us to determine the sign of the result without knowing the concrete numbers.
    *   **Key Takeaways:** Abstract Interpretation allows us to reason about program properties by executing the program with abstract values instead of concrete ones.

*   **Lesson 3: The "How" (Part 1) - Designing an Abstract Domain for Caches**
    *   **Objective:** Students will learn how to design an abstract domain for a specific security property.
    *   **Content:**
        *   Central Question: "What information must we capture to detect cache leaks?" Answer: Whether the memory addresses being accessed are influenced by secret values.
        *   Propose an **Abstract Domain** that captures this. The abstract state could map program variables to abstract values, including:
            *   **Security Labels:** `{L, H}`.
            *   **Cache State:** A simplified model of the cache, perhaps just tracking the set of memory locations that *might* be in the cache and whether that set is dependent on a High-security variable.
    *   **Key Takeaways:** An abstract domain is a simplified model of program state, tailored to capture properties relevant to the analysis.

*   **Lesson 4: The "How" (Part 2) - Abstract Execution and Static Leak Detection**
    *   **Objective:** Students will understand how to use abstract transfer functions to find potential leaks.
    *   **Content:**
        *   **Abstract Transfer Functions:** Rules that update the abstract state for each program statement.
        *   Examples:
            *   `if (secret > 10) { ... }`: The analysis proceeds into the `if` block with the "program counter" having an abstract value of `H`.
            *   `memory_access(address);`: If the abstract value of `address` is `H`, a potential leak is flagged. This is the **static leak detection** step.
    **Key Takeaways:** The analysis uses abstract transfer functions iteratively, and a leak is reported if the final abstract state violates the security policy.

*   **Lesson 5: Tying It All Together**
    *   **Objective:** Students will see a complete, end-to-end analysis of a program.
    *   **Content:**
        *   Walk through the analysis of the `if (secret_bit == 1) ...` example from Lesson 1.
        *   Show the initial abstract state and how it is updated by the transfer functions for each statement.
        *   Demonstrate how the analysis determines that the memory access pattern depends on `secret_bit`.
        *   Briefly contrast this approach with Taint Analysis and Type-Based IFC.
    *   **Key Takeaways:** Abstract Interpretation provides a powerful, formal way to find complex vulnerabilities that depend on the history of program execution.

## Module 4: Privacy-Policy Compliance Checker

### Overview
This module explores how to automatically check code for compliance with privacy policies. It integrates concepts from data-flow analysis, graph theory, and formal logic to ensure sensitive data is handled according to specified rules.

### Lesson Plan

*   **Lesson 1: Activating the Foundations**
    *   **Objective:** To refresh and frame prerequisite knowledge for policy compliance.
    *   **Content:**
        *   **Data-Flow Analysis (Recap):** Briefly review sources, sinks, and taint tracking from Module 1. Frame it as our tool for tracking *what* sensitive data is moving.
        *   **Graph Theory (Recap):** Revisit Control-Flow Graphs and the core idea of **reachability**. Frame it as our tool for understanding *where* the data can possibly go.
        *   **Formal Logic & Set Theory (Recap):** Re-introduce simple predicates and set operations. Frame them as our tools for *describing* the rules the data must follow (e.g., `IsSensitive(data, "Location")`, `IsAllowed(destination)`).
    *   **Key Takeaways:** Combining data-flow analysis, graph theory, and logic enables us to ask complex questions about program behavior.

*   **Lesson 2: The Problem - From Taint to Policy**
    *   **Objective:** Students will learn how to translate human-readable policies into machine-checkable specifications.
    *   **Content:**
        *   Start with a limitation of basic taint analysis: it doesn't distinguish between *allowed* and *disallowed* flows.
        *   Introduce **Policy as Code**: The process of formalizing privacy policies.
        *   **Example:** Translate "Location data may only be sent to `api.weather.com`" into a formal rule: "For any data `d` and sink call `sink(d, dest)`, if `IsSensitive(d, "Location")`, then `dest ∈ {"api.weather.com"}`."
    *   **Key Takeaways:** Automated compliance requires transforming ambiguous natural language into precise, logical rules.

*   **Lesson 3: The "How" (Part 1) - Policy-Aware Reachability**
    *   **Objective:** Students will understand how to combine taint tracking with policy rules using graph reachability.
    *   **Content:**
        *   Analysis as a two-stage process:
            1.  **Taint Analysis:** Identify all flows of sensitive data (e.g., "Location" data) to potential network sinks.
            2.  **Policy Check via Graph Reachability:** For each flow, analyze the sink's parameters. If a parameter (e.g., `destination`) is a variable, use **Graph Reachability** to find all possible values it could hold.
        *   Flag a violation if any possible value for `destination` is not in the policy's allowed set.
    *   **Key Takeaways:** Compliance checking extends beyond simple taint analysis; it involves verifying properties of the sinks that tainted data reaches.

*   **Lesson 4: The "How" (Part 2) - Relational Reasoning**
    *   **Objective:** Students will understand how to analyze policies that depend on the relationship between different program variables.
    *   **Content:**
        *   Introduce policies that simple taint analysis cannot handle.
        *   **Example Policy:** "A user's contact list can only be uploaded if `user.has_given_consent` is true."
        *   Explain **Relational Reasoning**: The analysis must track the *relationship* between `user.has_given_consent` and the call to `upload(contact_list)`.
        *   This introduces path-sensitive analysis, where the analysis tracks conditions true along each execution path.
    *   **Key Takeaways:** Some policies require **Relational Reasoning** to analyze connections between data and the broader program state.

*   **Lesson 5: Tying It All Together - An Integrated Analysis**
    *   **Objective:** Students will see how all components combine into a unified analysis.
    *   **Content:**
        *   Present a unified workflow:
            1.  Parse code into a graph.
            2.  Formalize the privacy policy.
            3.  Run a **policy-aware, relational data-flow analysis**. The abstract state for variables might include logical formulas representing their origins and path conditions.
            4.  At each sink, check if the incoming data's state violates the formalized policy.
        *   Walk through an example (e.g., "Location" data or "Consent" policy) from start to finish.
    *   **Key Takeaways:** Advanced compliance checkers integrate data-flow, graph reachability, policy formalization, and relational reasoning into powerful analyses.

## Module 5: Symbolic Execution Engine

### Overview
This module introduces Symbolic Execution, a powerful technique for program analysis that explores all possible execution paths using symbolic inputs. It's particularly effective for finding bugs and verifying assertions by leveraging constraint solvers.

### Lesson Plan

*   **Lesson 1: The Challenge of Testing & The Idea of Symbolic Execution**
    *   **Objective:** Students will understand the limitations of traditional testing and the fundamental concept of symbolic execution.
    *   **Content:**
        *   Discuss limitations of traditional testing (e.g., achieving high code coverage, path coverage issues).
        *   Introduce **Symbolic Execution**: Executing a program with *symbolic variables* instead of concrete inputs (e.g., `x = A`, where `A` is an unknown integer).
        *   Illustrate how a program executes with symbols: `y = x + 1; z = y * 2;` becomes `y = A + 1; z = (A + 1) * 2;`.
    *   **Key Takeaways:** Symbolic execution allows exploration of many concrete inputs via a single symbolic execution, significantly improving test coverage.

*   **Lesson 2: Exploring Paths with Path Conditions**
    *   **Objective:** Students will learn how symbolic execution manages control flow and tracks execution paths.
    *   **Content:**
        *   **Control-Flow Graphs (CFGs, Prerequisite Recap):** Briefly recap how CFGs model program structure.
        *   Explain how symbolic execution handles branching statements (`if (symbolic_condition) ...`). When a symbolic condition is encountered, the execution typically *forks*, creating new symbolic states for each branch.
        *   Introduce **Path Conditions**: For each explored path, a conjunction of logical constraints is collected. This conjunction precisely describes the conditions that must hold for that specific path to be executed.
        *   Example: For `if (A > 0)`, one path gets `A > 0` added to its path condition, and the other gets `A <= 0`.
    *   **Key Takeaways:** Path conditions are crucial for representing the feasibility of executing specific program paths.

*   **Lesson 3: The Power of Solvers - Satisfiability Modulo Theories (SMT)**
    *   **Objective:** Students will understand the role and functionality of SMT solvers in symbolic execution.
    *   **Content:**
        *   **Logic and Satisfiability (Prerequisite Recap):** Briefly review logical formulas and the concept of satisfiability.
        *   Introduce **Constraint Solvers (SMT Solvers)**: Explain that SMT solvers are specialized tools that determine the satisfiability of complex logical formulas involving various theories (e.g., arithmetic, arrays).
        *   Explain their critical role:
            *   **Path Feasibility:** An SMT solver checks if a given path condition is *satisfiable*. If not, that path is infeasible.
            *   **Model Generation:** If satisfiable, the SMT solver can provide a *model* (a concrete assignment of values to symbols) to trigger that path.
    *   **Key Takeaways:** SMT solvers are essential for checking path feasibility and generating concrete test cases from symbolic path conditions.

*   **Lesson 4: Finding the Bugs - Detecting Errors and Violations**
    *   **Objective:** Learn how symbolic execution uses path conditions and SMT solvers to find bugs and verify assertions.
    *   **Content:**
        *   **Bug Detection and Assertion Checking:**
        *   **Error Modeling:** How runtime errors (division by zero, array out-of-bounds) can be represented as symbolic constraints.
        *   **Assertion Violation:** How user-defined assertions (`assert(x > 0)`) are translated into symbolic queries.
        *   When an error state is reached or an assertion is encountered, an additional constraint representing the error condition is added to the current path condition.
        *   The combined formula (Path Condition AND Error Condition) is then passed to the SMT solver. If **satisfiable**, a bug or assertion violation has been found, and the solver provides the concrete input.
    *   **Key Takeaways:** Symbolic execution can systematically find bugs and verify assertions by transforming potential error states into satisfiability queries for SMT solvers.

*   **Lesson 5: Tying It All Together - Building a Basic Symbolic Execution Engine**
    *   **Objective:** Synthesize all concepts into a complete symbolic execution workflow.
    *   **Content:**
        *   Walk through a simple example program demonstrating:
            1.  Initial symbolic state for inputs.
            2.  Path exploration and dynamic forking.
            3.  Accumulation of path conditions.
            4.  Encountering an error condition.
            5.  Invoking the SMT solver for feasibility and counterexample generation.
    *   **Key Takeaways:** A holistic understanding of how a symbolic execution engine works from program input to bug discovery.

## Module 6: AST-Based Secret & Misconfiguration Scanner

### Overview
This module explores the creation of static analysis tools ("linters") to identify hardcoded secrets (e.g., API keys, passwords) and insecure configurations within source code. It focuses on leveraging Abstract Syntax Trees (ASTs) for precise and context-aware detection.

### Lesson Plan

*   **Lesson 1: The Problem - Why Hardcoded Secrets and Misconfigurations are Dangerous**
    *   **Objective:** Students will understand the critical security risks associated with hardcoded credentials and insecure settings.
    *   **Content:**
        *   **Security Best Practices (Prerequisite Recap):** Review fundamental secure coding principles related to handling sensitive data and configuring applications.
        *   Discuss real-world examples of data breaches or exploits directly resulting from exposed API keys, default passwords, or misconfigured security flags.
        *   Introduce the concept of "software supply chain" vulnerabilities where such weaknesses can be weaponized.
    *   **Key Takeaways:** Hardcoded secrets and insecure configurations are common, high-impact vulnerabilities that static analysis can help detect.

*   **Lesson 2: Representing Code - Abstract Syntax Trees (ASTs)**
    *   **Objective:** Students will understand what Abstract Syntax Trees (ASTs) are and how they represent the structural elements of source code.
    *   **Content:**
        *   **Programming Language Concepts (Prerequisite Recap):** Briefly revisit how programming languages are structured (variables, assignments, literals, function calls).
        *   Explain the role of compilers/interpreters in converting source code into an AST.
        *   Illustrate with a simple code snippet and visually map it to its corresponding AST structure (nodes for declarations, identifiers, string literals, boolean literals, etc.).
        *   Introduce the concept of AST traversal (e.g., depth-first search) as the primary method for programmatically inspecting code.
    *   **Key Takeaways:** ASTs provide a canonical, structured representation of code, making it machine-readable and enabling precise static analysis.

*   **Lesson 3: Finding the Obvious - Detecting Hardcoded Secrets**
    *   **Objective:** Students will learn techniques for identifying sensitive information directly embedded in source code.
    *   **Content:**
        *   Focus on detecting string literals or constants that are likely to be secrets.
        *   Discuss common heuristics:
            *   **Keywords:** Presence of "key", "token", "password", "secret" in variable names or identifiers associated with string literals.
            *   **Pattern Matching:** Identifying patterns like Base64 encoding, UUIDs, or specific API key formats within string literals.
            *   **String Length/Entropy:** Heuristics based on unusual string lengths or high randomness.
        *   Show examples of code that would trigger these basic detection rules in an AST.
    *   **Key Takeaways:** Initial secret detection involves traversing the AST and applying pattern matching and heuristics to string literals and identifiers.

*   **Lesson 4: Finding the Dangerous - Identifying Insecure Configurations**
    *   **Objective:** Students will learn methods for scanning for common security misconfigurations.
    *   **Content:**
        *   Focus on specific assignments or function calls within the AST that indicate insecure settings.
        *   Examples:
            *   Boolean flags: `debug = true`, `ssl_verify = false`, `allow_insecure_ssl = true`.
            *   Numeric values: Small `timeout` values, weak cryptographic key lengths.
            *   Specific function calls: Usage of known-weak cryptographic algorithms (e.g., `MD5` for hashing passwords), calls to deprecated or insecure APIs.
        *   Explain how to combine AST traversal with checks for specific identifier-value pairs or function signatures.
    *   **Key Takeaways:** Insecure configurations are often detected by analyzing specific assignments, literal values, or function/method calls within the AST.

*   **Lesson 5: Improving Accuracy - Contextual Analysis to Reduce False Positives**
    *   **Objective:** Students will understand advanced techniques for reducing false positives by considering the semantic context of potential findings.
    *   **Content:**
        *   **The Challenge of False Positives:** Illustrate how naive scanners can flag harmless strings (e.g., `password = "changeme"` in a test file, `API_KEY = "YOUR_API_KEY_HERE"` as a placeholder).
        *   **Contextual Analysis Techniques:**
            *   **File Path/Type:** Ignoring known test directories (`test/`, `example/`), documentation files, or placeholder files.
            *   **Semantic Role:** Is the string actually used as a credential, or is it a comment/documentation? This might involve simple data-flow.
            *   **Literal Value Heuristics:** Ignoring generic strings like "TODO", "FIXME", "password", or common placeholders.
            *   **Configuration File Awareness:** Parsing specific configuration file formats (`.env`, `config.json`, `web.xml`) to apply more targeted rules.
    *   **Key Takeaways:** Effective static scanners require sophisticated contextual analysis to differentiate genuine vulnerabilities from benign code patterns, minimizing noise for developers.

## Module 7: Control-Flow Integrity (CFI) Auditor

### Overview
This module delves into Control-Flow Integrity (CFI), a crucial security property that aims to prevent control-flow hijacking attacks like Return-Oriented Programming (ROP) and Jump-Oriented Programming (JOP). Students will learn the principles of CFI and how to statically audit programs for compliance.

### Lesson Plan

*   **Lesson 1: The Threat - Hijacking Control Flow**
    *   **Objective:** Students will understand how memory corruption vulnerabilities can be exploited to hijack a program's execution path.
    *   **Content:**
        *   **OS Security & Low-Level Concepts (Prerequisite Recap):** Briefly review stack-based buffer overflows, demonstrating how overwriting a saved return address can divert execution.
        *   **Control-Flow Hijacking:**
            *   Explain why "return-to-shellcode" attacks are often prevented by Data Execution Prevention (DEP/NX).
            *   Introduce **Return-Oriented Programming (ROP)**: how attackers chain together existing small code snippets ("gadgets") from the program's own code to perform malicious actions, circumventing DEP/NX.
    *   **Key Takeaways:** Attackers can hijack program control flow by corrupting pointers, leading to arbitrary code execution using existing code.

*   **Lesson 2: The Defense - The Principle of Control-Flow Integrity (CFI)**
    *   **Objective:** Students will understand the CFI security property as a fundamental defense against control-flow hijacking.
    *   **Content:**
        *   **Control-Flow Integrity (CFI) Principle:** The program's execution must always follow a pre-determined, valid control-flow graph (CFG). Any deviation is a security violation.
        *   Analogy: Program execution is a train that must stay on its tracks. CFI ensures the train does not "derail" to an invalid destination.
        *   Types of CFI protection: **Forward-Edge CFI** (for indirect calls) and **Backward-Edge CFI** (for returns).
    **Key Takeaways:** CFI enforces a strict policy on valid control transfers, mitigating attacks that attempt to divert execution to arbitrary locations.

*   **Lesson 3: The "How" - Building the Valid Control-Flow Graph**
    *   **Objective:** Students will understand the challenges and techniques for constructing a precise CFG for CFI.
    *   **Content:**
        *   **CFGs (Prerequisite Recap):** Review how CFGs model direct jumps and calls.
        *   **Challenge of Indirect Branches:** The main difficulty for CFI is that targets of indirect calls (e.g., function pointers, virtual calls) are not known at compile time.
        *   **Static CFG Construction for CFI:** The goal is to statically determine the set of all *possible valid targets* for each indirect branch.
        *   Technique: **Address-Taken Analysis**. Scan the program to find all functions whose addresses are "taken" (i.e., stored in a variable or passed as an argument). This set forms the potential legitimate targets for indirect calls.
    *   **Key Takeaways:** Building a precise CFG for CFI requires sophisticated analysis to resolve the targets of indirect control transfers.

*   **Lesson 4: Tying It All Together - Auditing for CFI**
    *   **Objective:** Students will understand how to use the constructed CFG and target sets to perform a static CFI audit.
    *   **Content:**
        *   **CFI Audit Workflow:**
            1.  Parse the program to build an initial CFG, identifying all direct and indirect branches.
            2.  Perform **Address-Taken Analysis** to compute the set of all valid indirect call targets.
            3.  **Audit Step:** For each indirect call site, check if its potential target could fall *outside* the set of valid targets identified by the analysis.
            4.  Flag any such potential deviation as a CFI violation.
        *   Example: Illustrate with a C example containing a function pointer. Show how the auditor would approve calls to valid, address-taken functions but flag potential jumps to invalid, non-address-taken locations.
    *   **Key Takeaways:** A CFI auditor works by modeling the legitimate control flow and then flagging any code path that could potentially violate this model via indirect branches.

## Module 8: Memory Safety (Use-After-Free) Detector

### Overview
This module delves into the critical area of memory safety, specifically focusing on the detection of Use-After-Free (UAF) vulnerabilities. Students will learn advanced program analysis techniques, including path-sensitive analysis, abstract heap modeling, and interprocedural analysis, to statically identify these dangerous heap-based exploits.

### Lesson Plan

*   **Lesson 1: The Threat - Heap-Based Memory Corruption**
    *   **Objective:** Students will understand the mechanics and severe security implications of Use-After-Free (UAF) and other heap-related vulnerabilities.
    *   **Content:**
        *   **C/C++ Memory Model (Prerequisite Recap):** Review dynamic memory allocation with `malloc`/`free` (or `new`/`delete` in C++), focusing on how pointers relate to memory regions on the heap.
        *   **Memory Management Errors:**
            *   Provide a clear, step-by-step code example of a **Use-After-Free**: 1) allocate a pointer `p`, 2) free `p`, 3) use `p` again.
            *   Explain the security risk: after `free(p)`, the memory might be re-allocated by a subsequent `malloc`. If an attacker can control this re-allocation, they can manipulate the data and type of the object that the dangling pointer `p` now points to, leading to type confusion, data corruption, and potentially arbitrary code execution.
            *   Briefly introduce other related vulnerabilities like Double-Free and Invalid Free.
    *   **Key Takeaways:** Heap management errors break fundamental memory safety assumptions, creating powerful primitives for exploitation.

*   **Lesson 2: The Challenge - The Need for Path-Sensitive Analysis**
    *   **Objective:** Students will understand why a simple, path-insensitive analysis is insufficient for detecting memory errors and why path sensitivity is crucial.
    *   **Content:**
        *   **Data-Flow Analysis (Prerequisite Recap):** Briefly recap how a standard, path-insensitive data-flow analysis merges information at control-flow joins (e.g., after an `if/else` block).
        *   Demonstrate where this fails for memory analysis with a code example:
            ```c
            if (condition) { free(p); }
            // A path-insensitive analysis would merge states here to "p is maybe freed"
            if (!condition) { use(p); } // This 'use(p)' is actually safe, but a path-insensitive analysis might flag it.
            ```
        *   Introduce **Path-Sensitive Analysis**: Explain that the analysis must maintain separate states for different execution paths. It needs to know that the `use(p)` is only reachable on the path where `condition` is false, and on *that specific path*, `p` was not freed.
    *   **Key Takeaways:** Accurately detecting memory errors requires path-sensitive analysis to avoid merging contradictory facts (like "pointer is freed" and "pointer is not freed"), which otherwise leads to high rates of false positives or negatives.

*   **Lesson 3: The "How" (Part 1) - Abstract Heap Modeling**
    *   **Objective:** Students will learn how an analyzer can abstractly model the heap to precisely distinguish between different memory allocations.
    *   **Content:**
        *   Pose the problem: How do we distinguish `p = malloc(4)` from `q = malloc(4)`? If `p` is freed, `q` must remain valid. A simple analysis that only tracks pointer states might get confused.
        *   Introduce **Abstract Heap Modeling**: Instead of modeling memory as a single undifferentiated block, the analysis creates abstract representations of heap objects.
        *   Explain a common technique: **Allocation-Site Abstraction**. Every call to `malloc` (or equivalent) in the source code is treated as a unique "allocation site". The analysis then tracks abstract heap objects based on where they were created. The state of the analysis now maps pointers to the abstract heap object(s) they might point to.
    *   **Key Takeaways:** To reason precisely about the lifecycle of pointers, the analysis must also model the heap objects they point to. Allocation-site abstraction is a standard and effective way to achieve this.

*   **Lesson 4: The "How" (Part 2) - Crossing Function Boundaries (Interprocedural Analysis)**
    *   **Objective:** Students will understand the challenges of tracking pointer states and heap modifications across function calls.
    *   **Content:**
        *   Introduce the problem with a simple example: A pointer `p` is passed to function `foo()`. If `foo()` frees `p`, how does the caller know `p` is now invalid?
        *   Introduce **Interprocedural Analysis**:
            *   **Function Summaries:** Explain how a key technique is to pre-compute a summary of what each function does to its parameters and the heap. For example, a summary for `my_free(void* ptr)` might state that it "invalidates its first argument."
            *   At each call site, the analyzer applies the callee's summary instead of re-analyzing the function body every time.
    *   **Key Takeaways:** A practical UAF detector must perform interprocedural analysis, typically using function summaries to efficiently and accurately track the effects of function calls on pointer states and the heap.

*   **Lesson 5: Tying it All Together - A Path-Sensitive, Interprocedural UAF Detector**
    *   **Objective:** Students will synthesize all the advanced concepts into a sophisticated memory safety analysis workflow.
    *   **Content:**
        *   Walk through a complete example involving multiple functions, conditional logic, and heap allocations/deallocations.
        *   Demonstrate the workflow:
            1.  Build the **CFG (Prerequisite Recap)** for all functions.
            2.  Create **function summaries** for relevant memory management functions.
            3.  Perform a **path-sensitive data-flow analysis** on the program, tracking pointer states and their corresponding abstract heap objects.
            4.  Apply the function summaries at call sites to propagate changes across function boundaries.
            5.  Show how the analysis flags a UAF vulnerability on one specific path while correctly identifying safe usages on others.
    *   **Key Takeaways:** A robust Use-After-Free detector is a complex system that integrates CFGs, path-sensitive data-flow, abstract heap modeling, and interprocedural analysis to precisely track the lifecycle of pointers throughout an entire program.

## Module 9: Privacy Leakage via "Taint Lite"

### Overview
This module introduces a simplified approach to taint analysis for detecting unintentional Personally Identifiable Information (PII) exposure. It focuses on tracking the flow of sensitive data through direct assignments and basic operations, providing a quick and efficient first line of defense against privacy leaks.

### Lesson Plan

*   **Lesson 1: The Problem - Unintentional PII Exposure**
    *   **Objective:** Students will understand what Personally Identifiable Information (PII) is and the risks associated with its accidental exposure.
    *   **Content:**
        *   **Privacy Concepts (Prerequisite Recap):** Define PII with clear examples (names, email addresses, phone numbers, location data, IP addresses).
        *   Discuss real-world scenarios where PII is unintentionally exposed (e.g., logging sensitive user inputs, sending data to unapproved third-party analytics, insecure storage).
        *   Motivate the need for automated tools to detect these leaks.
    *   **Key Takeaways:** PII exposure is a significant privacy risk, and automated analysis can help identify potential leaks.

*   **Lesson 2: The "Lite" Approach - Simplified Taint Model**
    *   **Objective:** Students will grasp the basic principles of taint analysis tailored for a simplified propagation model.
    *   **Content:**
        *   **Basic Programming Concepts (Prerequisite Recap):** Briefly recap variables, assignments, and expressions.
        *   Introduce the **Simplified Taint Model**:
            *   Core Idea: Data originating from sensitive sources is "tainted."
            *   Basic Propagation Rule: If a tainted variable `x` is assigned to `y` (e.g., `y = x`, `y = x + z`), then `y` also becomes tainted.
            *   Non-Propagation: Operations that create new, untainted data (e.g., `y = 10`, `y = "constant_string"`) do not make `y` tainted.
    *   **Key Takeaways:** A simplified taint model focuses on tracking the spread of sensitive data through direct assignment and basic operations.

*   **Lesson 3: Identifying Danger Zones - Sources and Sinks**
    *   **Objective:** Students will learn to identify common PII sources and sinks in code.
    *   **Content:**
        *   **Sources of PII:** Discuss examples of program constructs, functions, or APIs that typically introduce PII into the program (e.g., functions reading user input from forms, database query results, network responses, GPS location APIs).
        *   **Sinks for PII Exposure:** Discuss examples of program constructs, functions, or contexts where PII should not be used or stored without proper handling (e.g., logging functions, writing to unsecured files, unencrypted network transmissions to third-parties).
        *   Emphasize the role of domain knowledge in defining these sources and sinks for a specific application.
    *   **Key Takeaways:** Accurate definition of sources and sinks is fundamental to any taint analysis.

*   **Lesson 4: Tracking Taint - Variable Tracking with Set Operations**
    *   **Objective:** Students will understand the data structures and operations used to track tainted variables throughout a program.
    *   **Content:**
        *   **Set Theory (Prerequisite Recap):** Recap basic set operations (union, intersection, membership).
        *   Introduce **Variable Tracking with Set Operations**:
            *   The analysis state at any point in the program can be represented as a set of currently tainted variables.
            *   Show how `union` operations are used to combine sets of tainted variables when control flow merges (e.g., after an `if/else` block).
            *   Illustrate how the set of tainted variables is updated based on assignment statements.
    *   **Key Takeaways:** Set operations provide an efficient and mathematically sound way to represent and propagate taint information.

*   **Lesson 5: Putting it Together - Reaching Definitions for Taint Propagation**
    *   **Objective:** Students will apply basic data-flow analysis to implement the simplified taint propagation.
    *   **Content:**
        *   **Data-Flow Analysis Fundamentals (Prerequisite Recap):** Briefly recap the concepts of Control-Flow Graphs (CFGs), transfer functions, and fixed-point iteration from Module 1.
        *   Introduce **Reaching Definitions & Uses**: Explain how this basic data-flow analysis can be adapted to track the definitions of variables and where those definitions might flow.
        *   Show how to combine the simplified taint model rules (Lesson 2) with the data-flow framework (CFGs, transfer functions) and set operations (Lesson 4) to implement the "Taint Lite" propagation algorithm.
        *   The algorithm would iteratively compute the set of potentially tainted variables at each program point until a fixed point is reached.
    *   **Key Takeaways:** Simplified data-flow analysis techniques form the algorithmic backbone of a "Taint Lite" detector.

*   **Lesson 6: Tying It All Together & Practical Considerations**
    *   **Objective:** Students will synthesize the concepts into a complete "Taint Lite" analysis workflow and understand its practical application and trade-offs.
    *   **Content:**
        *   Walk through a complete, end-to-end example: A program that reads PII, performs some operations, and potentially logs or transmits it.
        *   Demonstrate how the "Taint Lite" analysis would:
            1.  Identify the PII source.
            2.  Propagate taint through assignments.
            3.  Identify if tainted data reaches a sensitive sink.
            4.  Trigger an alert.
        *   Briefly discuss the **Limitations and Trade-offs**: Emphasize that "Taint Lite" might miss leaks through complex data structures, pointers, or interprocedural calls. It prioritizes simplicity and speed over absolute precision and completeness, making it a valuable first-pass tool.
    *   **Key Takeaways:** "Taint Lite" provides a valuable, lightweight approach to catching basic PII leaks, serving as a first line of defense, but its limitations should be understood.