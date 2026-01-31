export interface Lesson {
  title: string;
  objective: string;
  content: string[];
  keyTakeaways: string;
  deepDive?: {
    explanation: string;
    example?: string; // Optional code or text example
    analogy?: string; // Optional analogy
  };
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export const modules: Module[] = [
  {
    id: "1",
    title: "Static Taint Analysis for Web Vulnerabilities",
    description: "Build a tool that identifies 'source-to-sink' flows to prevent injections.",
    lessons: [
      {
        title: "The 'Why' - A Motivating Example",
        objective: "Understand the real-world problem taint analysis solves.",
        content: [
          "Introduction to common web vulnerabilities (SQLi, XSS).",
          "Demonstrate a concrete code example where untrusted input leads to an exploit.",
          "Manually trace the flow of malicious data from source to sink."
        ],
        keyTakeaways: "Vulnerabilities arise from uncontrolled data flow.",
        deepDive: {
          explanation: "Security vulnerabilities often stem from 'uncontrolled data flow,' which occurs when data entering an application from an untrusted source (a 'source') travels through the program and reaches a sensitive operation (a 'sink') without being properly validated or sanitized. The program effectively 'trusts' malicious input, allowing attackers to manipulate its behavior.",
          example: "SQL Injection: An attacker inputs `' OR '1'='1` into a login field. If this flows directly into a database query, it can bypass authentication."
        }
      },
      {
        title: "The 'What' - Introduction to Taint Analysis",
        objective: "Define and identify core concepts: Tainted Data, Sources, Sinks, Sanitizers.",
        content: [
          "Formal definitions of Tainted Data, Sources, Sinks, and Sanitizers.",
          "Labeling these components in a motivating code example."
        ],
        keyTakeaways: "Taint analysis tracks the flow of untrusted data from sources to sinks, considering sanitization.",
        deepDive: {
          explanation: "Static taint analysis is a technique that automates the discovery of these flows. It labels data as either 'tainted' (untrusted) or 'untainted' (trusted/safe). Propagation rules determine how taint spreads (e.g., if x is tainted, y = x + 1 is also tainted)."
        }
      },
      {
        title: "The 'How' (Part 1) - Modeling Code with Control-Flow Graphs (CFGs)",
        objective: "Understand CFGs as a program representation for static analysis.",
        content: [
          "Explanation of why structured program representation is necessary.",
          "Definition of Basic Blocks and Control Flow edges.",
          "Walkthrough of constructing a simple CFG from example code."
        ],
        keyTakeaways: "CFGs provide a map of all possible execution paths in a program, essential for data flow tracking.",
        deepDive: {
          explanation: "A Control-Flow Graph (CFG) is a directed graph where nodes represent 'basic blocks' (sequences of linear code) and edges represent jumps or branches (like if, while). It is the map the analyzer uses to navigate the code.",
          analogy: "Think of a CFG as a subway map. The basic blocks are the stations, and the edges are the tracks. The analyzer traces potential routes (execution paths) a 'train' (the program) might take."
        }
      },
      {
        title: "The 'How' (Part 2) - Tracking Data with Data-Flow Analysis",
        objective: "Grasp how data-flow analysis tracks properties across a CFG.",
        content: [
          "Introduction to Data-Flow Analysis techniques.",
          "Transfer Functions: Rules defining how 'taintedness' changes.",
          "Handling control flow merges: Combining information from different paths."
        ],
        keyTakeaways: "Data-flow analysis uses transfer functions to propagate information along the CFG, combining information at merge points.",
        deepDive: {
          explanation: "A transfer function is a mathematical rule that describes how the state of the analysis changes as it moves through a specific line of code. When two paths converge (e.g., after an if/else), the analyzer uses a 'join' operation to combine the information.",
          example: "For x = source(), the transfer function might be: OutState = InState ∪ {x is tainted}."
        }
      },
      {
        title: "The 'How' (Part 3) - Reaching a Conclusion with Fixed-Point Iteration",
        objective: "Understand the iterative nature of data-flow analysis and the fixed-point concept.",
        content: [
          "Explanation of iterative propagation.",
          "Introduction to the Fixed-Point Algorithm: Convergence on a stable solution.",
          "Analogy: Spreading ink through a pipe system."
        ],
        keyTakeaways: "Fixed-point iteration ensures the data-flow analysis considers all possible paths and reaches a sound conclusion.",
        deepDive: {
          explanation: "Since programs have loops, the analysis must run repeatedly over the CFG until the results stabilize and stop changing. This stable state is called the 'fixed point.' It guarantees that the analysis has considered all possible iterations of a loop."
        }
      },
      {
        title: "Tying It All Together: A Complete Taint Analysis Workflow",
        objective: "Synthesize concepts into a complete understanding of static taint analysis.",
        content: [
          "Review of the entire workflow: Parsing -> CFG -> Data-Flow -> Fixed-Point -> Reporting.",
          "Walkthrough of the complete process on a complex example."
        ],
        keyTakeaways: "A holistic view of how static taint analysis tools work from code input to vulnerability reporting."
      }
    ]
  },
  {
    id: "2",
    title: "Type-Based Information Flow Control",
    description: "Implement a security-typed language to prevent information leaks.",
    lessons: [
      {
        title: "Recap of Type System Fundamentals",
        objective: "Ensure foundational knowledge of type systems.",
        content: [
          "What is a Type? Static vs. Dynamic typing.",
          "Goal of a Type System: Safety and reliability.",
          "Typing Judgements notation: Γ ⊢ e : τ."
        ],
        keyTakeaways: "Type systems provide structural safety and enable early error detection.",
        deepDive: {
          explanation: "Traditional type systems prevent errors like adding an integer to a string. Security type systems extend this to prevent 'adding' secret data to public outputs. They enforce safety properties at compile-time."
        }
      },
      {
        title: "The Problem of Information Leaks",
        objective: "Understand explicit and implicit information flows.",
        content: [
          "Introduction to Information Flow Control (IFC).",
          "Explicit Flow: Direct assignment of secret data to public variables.",
          "Implicit Flow: Leaks through control flow (e.g., conditional branches)."
        ],
        keyTakeaways: "Information can leak subtly through program logic, not just direct assignment.",
        deepDive: {
          explanation: "Explicit flows are easy to spot (public = secret). Implicit flows are subtler: 'if (secret > 0) { public = 1 } else { public = 0 }'. Here, the value of 'public' reveals information about 'secret' through the control flow itself."
        }
      },
      {
        title: "Security Policies as Lattices",
        objective: "Understand lattices as a formal way to define security policies.",
        content: [
          "Security labels (L, H).",
          "Definition of a Lattice: Partial Order, Join, Meet.",
          "Examples: Two-Point Lattice, Multi-Level Lattices."
        ],
        keyTakeaways: "Lattices provide a robust mathematical framework for defining security policies and ensure safe information combination.",
        deepDive: {
          explanation: "A lattice defines the hierarchy of security levels. The 'Can Flow To' relation (⊑) dictates allowed flows (e.g., L ⊑ H). The Join operation (⊔) defines how to combine secrets (e.g., Secret ⊔ TopSecret = TopSecret)."
        }
      },
      {
        title: "The Security Guarantee - Non-Interference",
        objective: "Understand the formal security property guaranteed by IFC type systems.",
        content: [
          "Definition of Non-Interference: Secret inputs don't affect public outputs.",
          "Significance as a strong, provable security property."
        ],
        keyTakeaways: "Non-interference is the formal proof that a system prevents information leaks.",
        deepDive: {
          explanation: "Non-interference states that high-security inputs have no effect on low-security outputs. If a program satisfies this, an attacker observing public outputs can learn nothing about the secret inputs."
        }
      },
      {
        title: "The 'How' - A Security Type System",
        objective: "Learn and apply typing rules to enforce information flow policies.",
        content: [
          "Combining types and labels (e.g., int_H).",
          "Typing rules for variables, assignment, and conditionals.",
          "Preventing implicit flows via PC label tracking."
        ],
        keyTakeaways: "A security type system uses static analysis to enforce information flow policies at compile-time.",
        deepDive: {
          explanation: "The type checker assigns security labels to variables and uses typing rules to check every operation. For 'if' statements, it tracks a 'Program Counter (PC) label' to ensure that branches conditioned on secrets don't write to public variables."
        }
      },
      {
        title: "Tying It All Together",
        objective: "Apply the security type system to a complete example.",
        content: [
          "Walkthrough of a program with explicit and implicit flow attempts.",
          "Step-by-step application of security typing rules.",
          "Comparison with Taint Analysis."
        ],
        keyTakeaways: "Type-Based IFC provides strong, provable security guarantees by preventing leaks at the earliest stage."
      }
    ]
  },
  {
    id: "3",
    title: "Cache Side-Channel Detection via Abstract Interpretation",
    description: "Detect timing attacks by analyzing memory access patterns.",
    lessons: [
      {
        title: "The Threat - An Introduction to Side-Channel Attacks",
        objective: "Understand the concept of a timing side-channel attack.",
        content: [
          "Introduction to side-channels (timing, power).",
          "Cache mechanics: Hit vs. Miss timing differences.",
          "Conceptual example of deducing secrets from access times."
        ],
        keyTakeaways: "Attackers can learn secrets from a program's observable behavior, not just its output.",
        deepDive: {
          explanation: "Side-channels exploit physical implementation details. A timing attack might infer a password by measuring how long a check takes; if it returns 'Fail' instantly on the first wrong character, an attacker can guess character-by-character."
        }
      },
      {
        title: "The Analytical Framework - Introduction to Abstract Interpretation",
        objective: "Grasp the core theory of Abstract Interpretation.",
        content: [
          "Motivation: Infeasibility of analyzing all concrete paths.",
          "Definition: Sound 'abstract' execution over-approximating behaviors.",
          "Analogy: Rule of signs in multiplication."
        ],
        keyTakeaways: "Abstract Interpretation allows reasoning about program properties by executing with abstract values.",
        deepDive: {
          explanation: "Instead of running the program with real data (Concrete Execution: x=5), we run it with 'abstract values' (Abstract: x=[Positive]). This allows proving properties about every possible run at once."
        }
      },
      {
        title: "The 'How' (Part 1) - Designing an Abstract Domain for Caches",
        objective: "Learn how to design an abstract domain for a specific security property.",
        content: [
          "Identifying necessary information: Dependency of memory addresses on secrets.",
          "Proposing an Abstract Domain: Security Labels + Abstract Cache State."
        ],
        keyTakeaways: "An abstract domain is a simplified model of program state, tailored to capture relevant properties.",
        deepDive: {
          explanation: "To detect cache leaks, we map every variable to a value like {Secret, Public}. If x is Secret and we see load_from_memory(x), we flag a potential leak because the memory address depends on a secret."
        }
      },
      {
        title: "The 'How' (Part 2) - Abstract Execution and Static Leak Detection",
        objective: "Understand how to use abstract transfer functions to find potential leaks.",
        content: [
          "Abstract Transfer Functions: Updating abstract state.",
          "Static Leak Detection: Flagging memory accesses with 'High' abstract addresses."
        ],
        keyTakeaways: "The analysis uses abstract transfer functions iteratively, reporting leaks if the final state violates security.",
        deepDive: {
          explanation: "The analysis updates the abstract state step-by-step. If x is Secret and y = x + 1, y becomes Secret. If load(arr[y]) occurs, the analyzer sees the index y is Secret and raises an alarm."
        }
      },
      {
        title: "Tying It All Together",
        objective: "See a complete, end-to-end analysis of a program.",
        content: [
          "Walkthrough of analyzing a side-channel vulnerable snippet.",
          "Demonstrating abstract state updates and leak detection.",
          "Contrast with Taint Analysis and IFC."
        ],
        keyTakeaways: "Abstract Interpretation provides a powerful, formal way to find complex vulnerabilities dependent on execution history."
      }
    ]
  },
  {
    id: "4",
    title: "Privacy-Policy Compliance Checker",
    description: "Analyze code to ensure compliance with privacy policies.",
    lessons: [
      {
        title: "Activating the Foundations",
        objective: "Refresh and frame prerequisite knowledge for policy compliance.",
        content: [
          "Recap: Data-Flow Analysis (Sources/Sinks).",
          "Recap: Graph Theory (Reachability).",
          "Recap: Formal Logic & Set Theory (Predicates)."
        ],
        keyTakeaways: "Combining data-flow, graph theory, and logic enables complex behavioral questions."
      },
      {
        title: "The Problem - From Taint to Policy",
        objective: "Learn to translate human-readable policies into machine-checkable specs.",
        content: [
          "Limitation of basic taint analysis.",
          "Policy as Code: Formalizing 'Location data only to X'.",
          "Example translations."
        ],
        keyTakeaways: "Automated compliance requires transforming ambiguous natural language into precise, logical rules."
      },
      {
        title: "The 'How' (Part 1) - Policy-Aware Reachability",
        objective: "Understand combining taint tracking with policy rules using graph reachability.",
        content: [
          "Two-stage analysis: Taint Analysis + Policy Check.",
          "Using Graph Reachability to find possible sink parameter values.",
          "Flagging violations."
        ],
        keyTakeaways: "Compliance checking verifies properties of the sinks that tainted data reaches."
      },
      {
        title: "The 'How' (Part 2) - Relational Reasoning",
        objective: "Understand analyzing policies dependent on variable relationships.",
        content: [
          "Policies involving conditions (e.g., 'if consent given').",
          "Relational Reasoning: Tracking relationships between variables.",
          "Path-sensitive analysis intro."
        ],
        keyTakeaways: "Relational Reasoning is required to analyze connections between data and broader program state."
      },
      {
        title: "Tying It All Together - An Integrated Analysis",
        objective: "See how all components combine into a unified analysis.",
        content: [
          "Unified workflow: Parse -> Formalize -> Policy-Aware Data-Flow -> Check.",
          "Walkthrough of a 'Location' or 'Consent' policy example."
        ],
        keyTakeaways: "Advanced checkers integrate data-flow, reachability, and logic for powerful analysis."
      }
    ]
  },
  {
    id: "5",
    title: "Symbolic Execution Engine",
    description: "Build an engine that explores execution paths using symbolic inputs.",
    lessons: [
      {
        title: "The Challenge of Testing & The Idea of Symbolic Execution",
        objective: "Understand limitations of traditional testing and the concept of symbolic execution.",
        content: [
          "Limitations of traditional testing coverage.",
          "Introduction to Symbolic Execution: Symbols vs. Concrete inputs.",
          "Illustration of symbolic state."
        ],
        keyTakeaways: "Symbolic execution explores many concrete inputs via a single symbolic run."
      },
      {
        title: "Exploring Paths with Path Conditions",
        objective: "Learn how symbolic execution manages control flow and tracks paths.",
        content: [
          "CFG recap.",
          "Handling branching: Forking execution states.",
          "Path Conditions: Logical constraints defining path feasibility."
        ],
        keyTakeaways: "Path conditions are crucial for representing the feasibility of specific program paths."
      },
      {
        title: "The Power of Solvers - Satisfiability Modulo Theories (SMT)",
        objective: "Understand the role of SMT solvers.",
        content: [
          "Logic and Satisfiability recap.",
          "Constraint Solvers (SMT): Tools for checking formula satisfiability.",
          "Role: Checking path feasibility and generating models."
        ],
        keyTakeaways: "SMT solvers are essential for checking feasibility and generating test cases."
      },
      {
        title: "Finding the Bugs - Detecting Errors and Violations",
        objective: "Learn how to find bugs and verify assertions.",
        content: [
          "Error Modeling: Runtime errors as constraints.",
          "Assertion Violation: User assertions as symbolic queries.",
          "Checking satisfiability of (Path Condition AND Error)."
        ],
        keyTakeaways: "Symbolic execution systematically finds bugs by transforming error states into SMT queries."
      },
      {
        title: "Tying It All Together - Building a Basic Engine",
        objective: "Synthesize concepts into a complete symbolic execution workflow.",
        content: [
          "Walkthrough of a simple program analysis.",
          "Steps: Symbolic state, Path exploration, Path Conditions, Error detection, SMT solving."
        ],
        keyTakeaways: "A holistic understanding of the symbolic execution engine workflow."
      }
    ]
  },
  {
    id: "6",
    title: "AST-Based Secret & Misconfiguration Scanner",
    description: "Create a 'linting' tool to identify hardcoded secrets and insecure settings.",
    lessons: [
      {
        title: "The Problem - Hardcoded Secrets & Misconfigurations",
        objective: "Understand security risks of hardcoded credentials and insecure settings.",
        content: [
          "Security Best Practices recap.",
          "Real-world examples of breaches from exposed keys.",
          "Software supply chain vulnerabilities."
        ],
        keyTakeaways: "Hardcoded secrets and insecure configs are high-impact vulnerabilities suitable for static analysis."
      },
      {
        title: "Representing Code - Abstract Syntax Trees (ASTs)",
        objective: "Understand ASTs as a structural representation of code.",
        content: [
          "Compiler concepts recap.",
          "What is an AST? Nodes, identifiers, literals.",
          "AST Traversal."
        ],
        keyTakeaways: "ASTs provide a machine-readable, structural representation for precise analysis."
      },
      {
        title: "Finding the Obvious - Detecting Hardcoded Secrets",
        objective: "Learn techniques for identifying embedded secrets.",
        content: [
          "Detecting string literals/constants.",
          "Heuristics: Keywords, Pattern Matching, Entropy.",
          "Example triggers."
        ],
        keyTakeaways: "Secret detection involves AST traversal with pattern matching and heuristics."
      },
      {
        title: "Finding the Dangerous - Identifying Insecure Configurations",
        objective: "Learn methods for scanning for security misconfigurations.",
        content: [
          "Scanning assignments and function calls.",
          "Examples: Debug flags, weak crypto, insecure timeouts.",
          "AST traversal for specific signatures."
        ],
        keyTakeaways: "Insecure configurations are detected by analyzing specific AST structures like assignments and calls."
      },
      {
        title: "Improving Accuracy - Contextual Analysis",
        objective: "Understand techniques to reduce false positives.",
        content: [
          "The challenge of False Positives.",
          "Contextual Analysis: File paths, Semantic roles, Literal value checks.",
          "Config file awareness."
        ],
        keyTakeaways: "Effective scanners use contextual analysis to differentiate vulnerabilities from benign code."
      }
    ]
  },
  {
    id: "7",
    title: "Control-Flow Integrity (CFI) Auditor",
    description: "Detect 'illegal' jumps by auditing the CFG to mitigate ROP attacks.",
    lessons: [
      {
        title: "The Threat - Hijacking Control Flow",
        objective: "Understand exploitation of memory corruption to hijack execution.",
        content: [
          "Buffer overflows recap.",
          "Control-Flow Hijacking mechanics.",
          "Return-Oriented Programming (ROP) introduction."
        ],
        keyTakeaways: "Attackers hijack control flow by corrupting pointers to execute arbitrary code."
      },
      {
        title: "The Defense - Control-Flow Integrity (CFI)",
        objective: "Understand CFI as a defense mechanism.",
        content: [
          "CFI Principle: Execution must follow the valid CFG.",
          "Analogy: Train on tracks.",
          "Forward-Edge vs. Backward-Edge CFI."
        ],
        keyTakeaways: "CFI enforces valid control transfers, mitigating diversion attacks."
      },
      {
        title: "The 'How' - Building the Valid Control-Flow Graph",
        objective: "Understand constructing a precise CFG for CFI.",
        content: [
          "CFG recap.",
          "Challenge of Indirect Branches.",
          "Static CFG Construction: Address-Taken Analysis."
        ],
        keyTakeaways: "Building a CFI-ready CFG requires resolving indirect branch targets."
      },
      {
        title: "Tying It All Together - Auditing for CFI",
        objective: "Understand the static CFI audit process.",
        content: [
          "CFI Audit Workflow: Parse -> Address-Taken Analysis -> Audit.",
          "Checking indirect call sites against valid targets.",
          "Flagging deviations."
        ],
        keyTakeaways: "A CFI auditor models legitimate flow and flags potential violations at indirect branches."
      }
    ]
  },
  {
    id: "8",
    title: "Memory Safety (Use-After-Free) Detector",
    description: "Build a state-machine analyzer to detect lifecycle errors of pointers.",
    lessons: [
      {
        title: "The Threat - Heap-Based Memory Corruption",
        objective: "Understand UAF and heap vulnerabilities.",
        content: [
          "Memory Model recap.",
          "Use-After-Free mechanics and exploitation risks.",
          "Double-Free and Invalid Free."
        ],
        keyTakeaways: "Heap errors break memory safety assumptions and enable exploitation."
      },
      {
        title: "The Challenge - The Need for Path-Sensitive Analysis",
        objective: "Understand why path sensitivity is crucial for memory errors.",
        content: [
          "Limitations of path-insensitive analysis.",
          "Code example showing false positives/negatives.",
          "Introduction to Path-Sensitive Analysis."
        ],
        keyTakeaways: "Accurate memory error detection requires tracking states per path."
      },
      {
        title: "The 'How' (Part 1) - Abstract Heap Modeling",
        objective: "Learn to abstractly model the heap.",
        content: [
          " distinguishing memory allocations.",
          "Abstract Heap Modeling.",
          "Allocation-Site Abstraction technique."
        ],
        keyTakeaways: "Reasoning about pointers requires modeling the heap objects they point to."
      },
      {
        title: "The 'How' (Part 2) - Crossing Function Boundaries",
        objective: "Understand interprocedural tracking.",
        content: [
          "Tracking state across calls.",
          "Interprocedural Analysis and Function Summaries.",
          "Applying summaries at call sites."
        ],
        keyTakeaways: "Practical detectors use function summaries for efficient interprocedural analysis."
      },
      {
        title: "Tying it All Together - A Path-Sensitive UAF Detector",
        objective: "Synthesize concepts into a UAF detector workflow.",
        content: [
          "Walkthrough of a complete example.",
          "Workflow: CFG -> Summaries -> Path-Sensitive Data-Flow -> Checks.",
          "Flagging UAFs."
        ],
        keyTakeaways: "Robust UAF detection integrates CFGs, path-sensitivity, heap modeling, and interprocedural analysis."
      }
    ]
  },
  {
    id: "9",
    title: "Privacy Leakage via 'Taint Lite'",
    description: "Simplified taint analysis to detect unintentional PII exposure.",
    lessons: [
      {
        title: "The Problem - Unintentional PII Exposure",
        objective: "Understand PII and exposure risks.",
        content: [
          "Defining PII.",
          "Real-world exposure scenarios.",
          "Need for automated detection."
        ],
        keyTakeaways: "PII exposure is a significant risk addressable by automated analysis."
      },
      {
        title: "The 'Lite' Approach - Simplified Taint Model",
        objective: "Grasp the simplified taint propagation model.",
        content: [
          "Basic concepts recap.",
          "Simplified Taint Model: Taint sources, propagation via assignment.",
          "Non-propagation rules."
        ],
        keyTakeaways: "A simplified model focuses on sensitive data spread via direct operations."
      },
      {
        title: "Identifying Danger Zones - Sources and Sinks",
        objective: "Identify PII sources and sinks.",
        content: [
          "Common Sources: User input, DB queries.",
          "Common Sinks: Logging, insecure storage, network.",
          "Importance of domain knowledge."
        ],
        keyTakeaways: "Accurate sources and sinks are fundamental."
      },
      {
        title: "Tracking Taint - Variable Tracking with Set Operations",
        objective: "Understand data structures for tracking taint.",
        content: [
          "Set Theory recap.",
          "Tracking tainted variables as sets.",
          "Union operations at control flow merges."
        ],
        keyTakeaways: "Set operations efficiently represent and propagate taint info."
      },
      {
        title: "Putting it Together - Reaching Definitions for Taint Propagation",
        objective: "Apply data-flow analysis to 'Taint Lite'.",
        content: [
          "Data-Flow recap.",
          "Reaching Definitions & Uses.",
          "Implementing the propagation algorithm."
        ],
        keyTakeaways: "Data-flow analysis forms the backbone of the detector."
      },
      {
        title: "Tying It All Together & Practical Considerations",
        objective: "Synthesize the workflow and understand trade-offs.",
        content: [
          "End-to-end example walkthrough.",
          "Workflow: Source ID -> Propagation -> Sink Check -> Alert.",
          "Limitations and Trade-offs vs. full analysis."
        ],
        keyTakeaways: "'Taint Lite' is a valuable first line of defense, despite limitations."
      }
    ]
  }
];

export function getModule(id: string): Module | undefined {
  return modules.find(m => m.id === id);
}
