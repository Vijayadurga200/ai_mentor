// AI GATE Mentor – GATE CSE 2027 Prototype Controller
// Handles local state, navigation, rendering, gamification, mock tests, and AI Chat

// -----------------------------------------------------------------
// DUMMY DATABASE (Embedded for local file:// execution compatibility)
// -----------------------------------------------------------------
const GATE_DB = {
  subjects: [
    {
      id: "algorithms",
      name: "Algorithms",
      icon: "fa-project-diagram",
      color: "from-blue-500 to-indigo-600",
      weightage: "6-8%",
      topics: [
        { id: "algo_asymptotic", name: "Asymptotic Analysis & Recurrences", difficulty: "Medium", priority: "High", weightage: "High", estimatedTime: 6, status: "Completed", isWeak: false, revisionCount: 2 },
        { id: "algo_divide", name: "Divide and Conquer Algorithms", difficulty: "Medium", priority: "High", weightage: "High", estimatedTime: 8, status: "In Progress", isWeak: false, revisionCount: 1 },
        { id: "algo_greedy", name: "Greedy Algorithms", difficulty: "Easy", priority: "Medium", weightage: "Medium", estimatedTime: 6, status: "Not Started", isWeak: false, revisionCount: 0 },
        { id: "algo_dp", name: "Dynamic Programming", difficulty: "Hard", priority: "High", weightage: "High", estimatedTime: 12, status: "Not Started", isWeak: true, revisionCount: 0 },
        { id: "algo_graphs", name: "Graph Traversal (BFS, DFS, Shortest Paths)", difficulty: "Hard", priority: "High", weightage: "High", estimatedTime: 10, status: "Not Started", isWeak: false, revisionCount: 0 },
        { id: "algo_sorting", name: "Sorting and Searching", difficulty: "Easy", priority: "High", weightage: "Medium", estimatedTime: 6, status: "Completed", isWeak: false, revisionCount: 2 }
      ]
    },
    {
      id: "os",
      name: "Operating Systems",
      icon: "fa-desktop",
      color: "from-teal-400 to-emerald-600",
      weightage: "8-10%",
      topics: [
        { id: "os_cpu", name: "CPU Scheduling Algorithms", difficulty: "Easy", priority: "High", weightage: "High", estimatedTime: 6, status: "Completed", isWeak: false, revisionCount: 3 },
        { id: "os_sync", name: "Process Synchronization & Semaphores", difficulty: "Hard", priority: "High", weightage: "High", estimatedTime: 10, status: "In Progress", isWeak: true, revisionCount: 1 },
        { id: "os_deadlocks", name: "Deadlocks (Prevention, Avoidance, Detection)", difficulty: "Medium", priority: "Medium", weightage: "Medium", estimatedTime: 6, status: "Not Started", isWeak: false, revisionCount: 0 },
        { id: "os_memory", name: "Memory Management & Paging", difficulty: "Hard", priority: "High", weightage: "High", estimatedTime: 12, status: "Not Started", isWeak: false, revisionCount: 0 },
        { id: "os_virtual", name: "Virtual Memory & Page Replacement", difficulty: "Medium", priority: "High", weightage: "High", estimatedTime: 8, status: "Not Started", isWeak: false, revisionCount: 0 },
        { id: "os_file", name: "File Systems & Disk Scheduling", difficulty: "Easy", priority: "Low", weightage: "Medium", estimatedTime: 6, status: "Not Started", isWeak: false, revisionCount: 0 }
      ]
    },
    {
      id: "dbms",
      name: "Database Management Systems",
      icon: "fa-database",
      color: "from-purple-500 to-indigo-700",
      weightage: "6-8%",
      topics: [
        { id: "db_er", name: "ER Model and Relational Algebra", "difficulty": "Medium", "priority": "High", "weightage": "High", "estimatedTime": 8, "status": "Completed", "isWeak": false, "revisionCount": 2 },
        { "id": "db_sql", "name": "SQL Queries (Nested, Joins, Aggregations)", "difficulty": "Medium", "priority": "High", "weightage": "High", "estimatedTime": 10, "status": "Completed", "isWeak": false, "revisionCount": 1 },
        { "id": "db_norm", "name": "Normalization & Functional Dependencies", "difficulty": "Hard", "priority": "High", "weightage": "High", "estimatedTime": 12, "status": "In Progress", "isWeak": true, "revisionCount": 1 },
        { "id": "db_trans", "name": "Transactions and Concurrency Control", "difficulty": "Hard", "priority": "High", "weightage": "High", "estimatedTime": 8, "status": "Not Started", "isWeak": false, "revisionCount": 0 },
        { "id": "db_indexing", "name": "File Organization & B/B+ Tree Indexing", "difficulty": "Medium", "priority": "Medium", "weightage": "Medium", "estimatedTime": 6, "status": "Not Started", "isWeak": false, "revisionCount": 0 }
      ]
    },
    {
      id: "cn",
      name: "Computer Networks",
      icon: "fa-network-wired",
      color: "from-pink-500 to-rose-600",
      weightage: "8-10%",
      topics: [
        { id: "cn_layers", name: "OSI & TCP/IP Protocol Architectures", difficulty: "Easy", priority: "Medium", weightage: "Medium", estimatedTime: 4, status: "Completed", isWeak: false, revisionCount: 1 },
        { id: "cn_flow", name: "Flow Control & Error Control (sliding window)", difficulty: "Medium", priority: "High", weightage: "High", estimatedTime: 8, status: "Not Started", isWeak: false, revisionCount: 0 },
        { id: "cn_routing", name: "IP Routing Algorithms (OSPF, BGP, RIP)", difficulty: "Hard", priority: "High", weightage: "High", estimatedTime: 10, status: "Not Started", isWeak: false, revisionCount: 0 },
        { id: "cn_subnets", name: "IP Addressing, Subnetting & CIDR", difficulty: "Hard", priority: "High", weightage: "High", estimatedTime: 12, status: "In Progress", isWeak: true, revisionCount: 0 },
        { id: "cn_transport", name: "TCP & UDP Protocols, Congestion Control", difficulty: "Hard", priority: "High", weightage: "High", estimatedTime: 10, status: "Not Started", isWeak: false, revisionCount: 0 },
        { id: "cn_application", name: "Application Layer Protocols (DNS, SMTP, HTTP)", difficulty: "Easy", priority: "Low", weightage: "Low", estimatedTime: 6, status: "Not Started", isWeak: false, revisionCount: 0 }
      ]
    },
    {
      id: "toc",
      name: "Theory of Computation",
      icon: "fa-square-root-alt",
      color: "from-cyan-500 to-blue-600",
      weightage: "7-9%",
      topics: [
        { id: "toc_dfa", name: "Finite Automata (DFA, NFA) & Regular Expressions", difficulty: "Medium", priority: "High", weightage: "High", estimatedTime: 10, status: "Completed", isWeak: false, revisionCount: 2 },
        { id: "toc_cfl", name: "Context-Free Grammars, Pushdown Automata (PDA)", difficulty: "Hard", priority: "High", weightage: "High", estimatedTime: 12, status: "In Progress", isWeak: false, revisionCount: 1 },
        { id: "toc_turing", name: "Turing Machines and Undecidability", difficulty: "Hard", priority: "High", weightage: "High", estimatedTime: 14, status: "Not Started", isWeak: false, revisionCount: 0 }
      ]
    },
    {
      id: "compiler",
      name: "Compiler Design",
      icon: "fa-terminal",
      color: "from-amber-500 to-orange-600",
      weightage: "4-6%",
      topics: [
        { id: "comp_lexical", name: "Lexical Analysis", difficulty: "Easy", priority: "Medium", weightage: "Medium", estimatedTime: 4, status: "Completed", isWeak: false, revisionCount: 1 },
        { id: "comp_syntax", name: "Syntax Analysis (LL, LR Parsers)", difficulty: "Hard", priority: "High", weightage: "High", estimatedTime: 12, status: "Not Started", isWeak: true, revisionCount: 0 },
        { id: "comp_sdt", name: "Syntax Directed Translation (SDT)", difficulty: "Medium", priority: "Medium", weightage: "Medium", estimatedTime: 6, status: "Not Started", isWeak: false, revisionCount: 0 },
        { id: "comp_codegen", name: "Intermediate Code & Code Optimization", difficulty: "Hard", priority: "High", weightage: "Medium", estimatedTime: 8, status: "Not Started", isWeak: false, revisionCount: 0 }
      ]
    },
    {
      id: "programming",
      name: "Programming & Data Structures",
      icon: "fa-code",
      color: "from-emerald-500 to-teal-600",
      weightage: "10-12%",
      topics: [
        { id: "prog_c", name: "C Programming (Pointers, Recursion)", difficulty: "Medium", priority: "High", weightage: "High", estimatedTime: 10, status: "Completed", isWeak: false, revisionCount: 3 },
        { id: "prog_stacks", name: "Stacks, Queues, and Linked Lists", difficulty: "Easy", priority: "High", weightage: "Medium", estimatedTime: 6, status: "Completed", isWeak: false, revisionCount: 2 },
        { id: "prog_trees", name: "Trees and Binary Search Trees (BST)", difficulty: "Medium", priority: "High", weightage: "High", estimatedTime: 8, status: "Completed", isWeak: false, revisionCount: 1 },
        { id: "prog_graphs_ds", name: "Graphs & Hashing Representation", difficulty: "Medium", priority: "Medium", weightage: "Medium", estimatedTime: 6, status: "Not Started", isWeak: false, revisionCount: 0 }
      ]
    },
    {
      id: "coa",
      name: "Computer Organization & Architecture",
      icon: "fa-microchip",
      color: "from-red-500 to-pink-600",
      weightage: "6-8%",
      topics: [
        { id: "coa_instructions", name: "Machine Instructions and Addressing Modes", difficulty: "Medium", priority: "High", weightage: "High", estimatedTime: 8, status: "Completed", isWeak: false, revisionCount: 2 },
        { id: "coa_alu", name: "ALU, Data Path & Control Unit Design", difficulty: "Hard", priority: "Medium", weightage: "Medium", estimatedTime: 8, status: "Not Started", isWeak: false, revisionCount: 0 },
        { id: "coa_memory", name: "Memory Hierarchy & Cache Memory Design", difficulty: "Hard", priority: "High", weightage: "High", estimatedTime: 12, status: "In Progress", isWeak: true, revisionCount: 1 },
        { id: "coa_pipeline", name: "Instruction Pipelining and Hazards", difficulty: "Hard", priority: "High", weightage: "High", estimatedTime: 10, status: "Not Started", isWeak: false, revisionCount: 0 },
        { id: "coa_io", name: "I/O Interface (Interrupts, DMA)", difficulty: "Easy", priority: "Low", weightage: "Low", estimatedTime: 4, status: "Not Started", isWeak: false, revisionCount: 0 }
      ]
    },
    {
      id: "digital",
      name: "Digital Logic",
      icon: "fa-toggle-on",
      color: "from-violet-500 to-fuchsia-600",
      weightage: "4-6%",
      topics: [
        { id: "dig_boolean", name: "Boolean Algebra & Minimization (K-Maps)", difficulty: "Easy", priority: "High", weightage: "High", estimatedTime: 6, status: "Completed", isWeak: false, revisionCount: 2 },
        { id: "dig_combinational", name: "Combinational Circuits (Mux, Decoders, Adders)", difficulty: "Medium", priority: "High", weightage: "High", estimatedTime: 8, status: "Completed", isWeak: false, revisionCount: 1 },
        { id: "dig_sequential", name: "Sequential Circuits (Latches, Flip-Flops, Registers)", difficulty: "Hard", priority: "High", weightage: "High", estimatedTime: 10, status: "In Progress", isWeak: false, revisionCount: 1 },
        { id: "dig_counters", name: "Counters and Finite State Machines (FSM)", difficulty: "Hard", priority: "High", weightage: "High", estimatedTime: 8, status: "Not Started", isWeak: false, revisionCount: 0 }
      ]
    },
    {
      id: "discrete",
      name: "Discrete Mathematics",
      icon: "fa-calculator",
      color: "from-yellow-500 to-amber-600",
      weightage: "7-9%",
      topics: [
        { id: "disc_logic", name: "Propositional & First-Order Logic", difficulty: "Medium", priority: "High", weightage: "High", estimatedTime: 8, status: "Completed", isWeak: false, revisionCount: 1 },
        { id: "disc_sets", name: "Sets, Relations, Functions & Partially Ordered Sets", difficulty: "Medium", priority: "High", weightage: "High", estimatedTime: 8, status: "Completed", isWeak: false, revisionCount: 2 },
        { id: "disc_graphs", name: "Graph Theory (Connectivity, Colorings)", difficulty: "Hard", priority: "High", weightage: "High", estimatedTime: 10, status: "In Progress", isWeak: false, revisionCount: 0 },
        { id: "disc_groups", name: "Group Theory & Combinatorics", difficulty: "Hard", priority: "Medium", weightage: "Medium", estimatedTime: 8, status: "Not Started", isWeak: false, revisionCount: 0 }
      ]
    },
    {
      id: "maths",
      name: "Engineering Mathematics",
      icon: "fa-chart-line",
      color: "from-blue-600 to-cyan-600",
      weightage: "5-7%",
      topics: [
        { id: "math_la", name: "Linear Algebra (Matrices, Eigenvalues)", difficulty: "Medium", priority: "High", weightage: "High", estimatedTime: 8, status: "Completed", isWeak: false, revisionCount: 2 },
        { id: "math_calculus", name: "Calculus (Limits, Integrals, Maxima/Minima)", difficulty: "Medium", priority: "Medium", weightage: "Medium", estimatedTime: 8, status: "Not Started", isWeak: false, revisionCount: 0 },
        { id: "math_prob", name: "Probability & Statistics (Bayes, Random Variables)", difficulty: "Hard", priority: "High", weightage: "High", estimatedTime: 10, status: "In Progress", isWeak: true, revisionCount: 1 }
      ]
    },
    {
      id: "aptitude",
      name: "General Aptitude",
      icon: "fa-brain",
      color: "from-orange-500 to-red-600",
      weightage: "15%",
      topics: [
        { id: "apt_verbal", name: "Verbal Ability (Grammar, Vocabulary)", difficulty: "Easy", priority: "Medium", weightage: "Medium", estimatedTime: 6, status: "Completed", isWeak: false, revisionCount: 1 },
        { id: "apt_quant", name: "Quantitative Aptitude (Ratio, Percentage, Speed)", difficulty: "Medium", priority: "High", weightage: "High", estimatedTime: 12, status: "In Progress", isWeak: false, revisionCount: 1 },
        { id: "apt_analytical", name: "Analytical & Spatial Reasoning", difficulty: "Medium", priority: "Medium", weightage: "Medium", estimatedTime: 8, status: "Not Started", isWeak: false, revisionCount: 0 }
      ]
    }
  ],
  pyqs: [
    {
      id: "pyq_1",
      subjectId: "algorithms",
      topicId: "algo_asymptotic",
      year: 2024,
      difficulty: "Medium",
      marks: 2,
      question: "What is the time complexity of the function defined by the recurrence relation T(n) = 3T(n/4) + n log n?",
      options: [
        "A) Θ(n)",
        "B) Θ(n log n)",
        "C) Θ(n log² n)",
        "D) Θ(n^1.5)"
      ],
      correctOption: "B",
      solution: "Apply Master Theorem. a = 3, b = 4, f(n) = n log n. Since log_b(a) = log_4(3) ≈ 0.79, and f(n) is asymptotically larger than n^0.79, we fall into Case 3 (or extension). Specifically, T(n) = Θ(f(n)) = Θ(n log n).",
      explanation: "Master theorem comparison: n^(log_4(3)) = n^0.792. f(n) = n log n dominates n^0.792. Applying Master Theorem Case 3 criteria yield Θ(n log n)."
    },
    {
      id: "pyq_2",
      subjectId: "os",
      topicId: "os_sync",
      year: 2023,
      difficulty: "Hard",
      marks: 2,
      question: "Two processes, P1 and P2, share a binary semaphore S initialized to 1. P1 runs: wait(S); critical_section(); signal(S);. P2 runs: wait(S); critical_section(); signal(S);. If wait and signal are non-atomic, which of the following is true?",
      options: [
        "A) Mutual exclusion is still guaranteed.",
        "B) Mutual exclusion might be violated.",
        "C) A deadlock is guaranteed to occur.",
        "D) Starvation is eliminated."
      ],
      correctOption: "B",
      solution: "If wait/signal operations are non-atomic, context switching can happen in the middle of executing a wait instruction, which allows both processes to find S > 0 and enter the critical section simultaneously, violating mutual exclusion.",
      explanation: "Wait contains reading and decrementing. If process 1 reads S=1, gets switched out before decrementing, process 2 also reads S=1. Both enter critical section, violating mutual exclusion."
    },
    {
      id: "pyq_3",
      subjectId: "dbms",
      topicId: "db_norm",
      year: 2022,
      difficulty: "Hard",
      marks: 2,
      question: "Given a relation schema R(A, B, C, D, E, G) and functional dependencies F = {A -> B, BC -> DE, AE -> G}. What is the primary key of relation R?",
      options: [
        "A) AC",
        "B) ACD",
        "C) ACE",
        "D) ACG"
      ],
      correctOption: "A",
      solution: "Compute closure of AC. (AC)+ = {A, C}. Since A -> B, we get {A, B, C}. Since BC -> DE, we get {A, B, C, D, E}. Since AE -> G, we get {A, B, C, D, E, G}. Thus (AC)+ contains all attributes, making AC a superkey. No smaller subset of AC is a superkey, so AC is the primary key.",
      explanation: "Calculate closures: (AC)+ = AC -> ABC (A->B) -> ABCDE (BC->DE) -> ABCDEG (AE->G). Hence AC is the candidate key."
    },
    {
      id: "pyq_4",
      subjectId: "cn",
      topicId: "cn_subnets",
      year: 2024,
      difficulty: "Medium",
      marks: 1,
      question: "An IP subnet has mask 255.255.255.240. What is the maximum number of assignable host IP addresses in this subnet?",
      options: [
        "A) 16",
        "B) 14",
        "C) 30",
        "D) 32"
      ],
      correctOption: "B",
      solution: "The last octet has 240, which is 11110000 in binary. This leaves 4 bits for host addresses. Total host combinations = 2^4 = 16. Subtracting 2 (one for network address and one for broadcast address) leaves 14 assignable host IPs.",
      explanation: "Assignable IPs = 2^(32 - mask_bits) - 2. For 240, mask is /28. Host bits = 4. 2^4 - 2 = 14."
    }
  ],
  mockTests: [
    {
      id: "mock_mini_1",
      "name": "Algorithms Mini Mock Test 01",
      type: "Mini",
      duration: 30,
      totalMarks: 15,
      questionsCount: 5,
      completed: true,
      score: 12,
      accuracy: 80,
      negativeMarks: 1,
      timeTaken: 24,
      questions: [
        { id: "mq_1", question: "What is the worst-case time complexity of QuickSort?", options: ["A) O(n log n)", "B) O(n²)", "C) O(n³)", "D) O(2^n)"], correctOption: "B", marks: 3 },
        { id: "mq_2", question: "Which algorithm design strategy is used in Kruskal's MST algorithm?", options: ["A) Dynamic Programming", "B) Divide and Conquer", "C) Greedy", "D) Backtracking"], correctOption: "C", marks: 3 }
      ]
    },
    {
      id: "mock_subject_1",
      "name": "Operating Systems Subject Test",
      type: "Subject",
      duration: 45,
      totalMarks: 25,
      questionsCount: 5,
      completed: false,
      score: 0,
      accuracy: 0,
      negativeMarks: 0,
      timeTaken: 0,
      questions: [
        { id: "mq_3", question: "In paging, what is stored in the Page Table?", options: ["A) Base address of page in hard drive", "B) Page offset", "C) Frame number in physical memory", "D) Cache address"], correctOption: "C", marks: 5 },
        { id: "mq_4", question: "Which page replacement algorithm suffers from Belady's Anomaly?", options: ["A) LRU", "B) Optimal", "C) FIFO", "D) LFU"], correctOption: "C", marks: 5 }
      ]
    },
    {
      id: "mock_full_1",
      "name": "GATE CSE 2027 Full Length Mock 01",
      type: "Full",
      duration: 180,
      totalMarks: 100,
      questionsCount: 65,
      completed: false,
      score: 0,
      accuracy: 0,
      negativeMarks: 0,
      timeTaken: 0,
      questions: [
        { id: "mq_5", question: "Which of the following problems is undecidable?", options: ["A) Halting problem of Turing Machines", "B) Finiteness of DFA", "C) Equivalence of two regular languages", "D) Parsing context-free grammars"], correctOption: "A", marks: 10 }
      ]
    }
  ],
  formulaSheets: [
    {
      subjectId: "algorithms",
      title: "Algorithms Cheat Sheet",
      formulas: [
        { name: "Master Theorem", formula: "T(n) = aT(n/b) + f(n). Compare f(n) with n^(log_b(a)). Case 1: T(n) = Θ(n^(log_b(a))). Case 2: T(n) = Θ(n^(log_b(a)) * log n). Case 3: T(n) = Θ(f(n)).", trick: "Think of it as tree depth weight vs. leaf weight." },
        { name: "Huffman Coding Complexity", formula: "O(n log n) using Min-Heap.", trick: "Always extract two minimum values recursively." }
      ]
    },
    {
      subjectId: "os",
      title: "OS Process Sync Formulas",
      formulas: [
        { name: "Effective Access Time (Paging)", formula: "EAT = Hit Ratio * (TLB access + Memory access) + Miss Ratio * (TLB access + 2 * Memory access)", trick: "TLB is checked first. Miss causes double memory lookup." },
        { name: "Disk Head Movement (SSTF)", formula: "Sum of absolute differences |current - request| sorted by proximity.", trick: "Always greedily choose the closest cylinder next. Watch out for starvation!" }
      ]
    }
  ],
  achievements: [
    { id: "ach_streak_3", title: "Consistency Champion", description: "Maintain a 3-day study streak", icon: "fa-fire", unlocked: true, xpReward: 150 },
    { id: "ach_streak_7", title: "Unstoppable Force", description: "Maintain a 7-day study streak", icon: "fa-bolt", unlocked: true, xpReward: 500 },
    { id: "ach_hours_50", title: "Scholar Spirit", description: "Log 50 total study hours", icon: "fa-hourglass-half", unlocked: false, xpReward: 400 },
    { id: "ach_pyq_10", title: "GATE Cracker", description: "Solve 10 GATE PYQs correctly", icon: "fa-trophy", unlocked: false, xpReward: 300 }
  ],
  resources: [
    {
      title: "NPTEL & Video Lectures",
      items: [
        { name: "NPTEL Algorithms - Prof. Naveen Garg (IIT Delhi)", url: "https://nptel.ac.in/", type: "video" },
        { name: "Gate Smashers - OS & DBMS Playlists", url: "https://www.youtube.com/@GateSmashers", type: "video" },
        { name: "Knowledge Gate - GATE CSE Prep", url: "https://www.youtube.com/@KnowledgeGate", type: "video" }
      ]
    },
    {
      title: "Standard Reference Books",
      items: [
        { name: "Introduction to Algorithms - Cormen, Leiserson, Rivest, Stein (CLRS)", url: "#", type: "book" },
        { name: "Operating System Concepts - Silberschatz, Galvin, Gagne", url: "#", type: "book" },
        { name: "Database System Concepts - Korth, Sudarshan", url: "#", type: "book" }
      ]
    }
  ]
};

// -----------------------------------------------------------------
// GEMINI API INTEGRATION & CHAT CONFIGURATION
// -----------------------------------------------------------------
const GEMINI_API_KEY = "AQ.Ab8RN6LQf5" + "PhzOJ41yZduWT-RRFW-zpAk0WNo0aDVWv_S4jg0g"; // User provided API Key
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

// -----------------------------------------------------------------
// GLOBAL APP STATE (Offline AsyncStorage model using LocalStorage)
// -----------------------------------------------------------------
let STATE = {
  isLoggedIn: false,
  user: {
    name: "Gate Devotee",
    email: "aspirant@gate2027.com",
    xp: 3400,
    level: 4,
    streak: 12,
    studyHours: 48.5,
    completedTopics: ["algo_asymptotic", "os_cpu", "db_er", "db_sql", "cn_layers", "comp_lexical", "coa_instructions", "dig_boolean", "dig_combinational", "disc_logic", "disc_sets", "math_la", "apt_verbal"],
    weakTopics: ["algo_dp", "os_sync", "db_norm", "cn_subnets", "comp_syntax", "coa_memory", "math_prob"],
    solvedPyqIds: { "pyq_1": "correct", "pyq_2": "wrong" },
    bookmarkedPyqs: [],
    customNotes: [
      { id: "note_1", title: "Master Theorem Summary", text: "Cases:\n1. f(n) = O(n^(log_b(a) - e)) => T(n) = Θ(n^(log_b(a)))\n2. f(n) = Θ(n^(log_b(a))) => T(n) = Θ(n^(log_b(a)) * log n)\n3. f(n) = Ω(n^(log_b(a) + e)) => T(n) = Θ(f(n))", pinned: true, date: "2026-07-02" },
      { id: "note_2", title: "Semaphore Definition", text: "A semaphore is a tool to manage processes in synchronization. It has wait() and signal() which are atomic functions.", pinned: false, date: "2026-06-30" }
    ],
    dailyProgress: {
      "morning": true,
      "afternoon": true,
      "evening": false,
      "night": false,
      "revision": true,
      "pyq": false
    },
    studyLogs: [
      { date: "2026-07-02", hours: 6 },
      { date: "2026-07-01", hours: 4.5 },
      { date: "2026-06-30", hours: 8 },
      { date: "2026-06-29", hours: 5 },
      { date: "2026-06-28", hours: 7.5 },
      { date: "2026-06-27", hours: 3 }
    ],
    mockScores: [
      { testId: "mock_mini_1", score: 12, accuracy: 80, date: "2026-07-01" }
    ],
    settings: {
      darkmode: true,
      reminders: true
    }
  }
};

// History navigation tracking
let activeScreen = "screen-splash";
let currentSubjectView = null; // Subject currently viewing details
let currentMockExam = null; // Active mock test object
let currentMockQIndex = 0;
let currentMockAnswers = {};

// Load/Save State in LocalStorage
function saveState() {
  localStorage.setItem("ai_gate_mentor_user_state", JSON.stringify(STATE));
}

function loadState() {
  const cached = localStorage.getItem("ai_gate_mentor_user_state");
  if (cached) {
    try {
      STATE = JSON.parse(cached);
    } catch (e) {
      console.error("Failed parsing cache", e);
    }
  }
}

// -----------------------------------------------------------------
// INITIALIZATION
// -----------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  initTime();
  initTheme();
  setupEventListeners();
  renderDashboard();
  renderPlanner();
  renderSubjectsGrid();
  renderPYQs();
  renderFormulas();
  renderNotes();
  renderWeakTopics();
  renderMockCenter();
  renderAnalytics();
  renderCalendar();
  renderAchievements();
  renderResources();
  renderSettings();
  renderProfile();

  // Hide splash start button spinner if active
  document.getElementById("splash-start-btn").addEventListener("click", () => {
    navigateTo("screen-login");
  });
});

// Update Simulated Status Bar Time
function initTime() {
  const timeSpan = document.getElementById("status-time");
  if (!timeSpan) return; // Exit if phone status bar is not present on desktop
  const updateSimulatedTime = () => {
    const d = new Date();
    let hours = d.getHours();
    let mins = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    mins = mins < 10 ? '0' + mins : mins;
    timeSpan.innerText = `${hours}:${mins} ${ampm}`;
  };
  updateSimulatedTime();
  setInterval(updateSimulatedTime, 60000);
}

// Apply Dark/Light theme class
function initTheme() {
  if (STATE.user.settings.darkmode) {
    document.body.classList.remove("light-theme");
  } else {
    document.body.classList.add("light-theme");
  }
  const toggle = document.getElementById("settings-darkmode-toggle");
  if (toggle) {
    toggle.checked = STATE.user.settings.darkmode;
  }
}

// -----------------------------------------------------------------
// NAVIGATION ROUTER
// -----------------------------------------------------------------
function navigateTo(screenId) {
  const loginWrapper = document.getElementById("login-layout-wrapper");
  const mainWrapper = document.getElementById("main-layout-wrapper");
  
  if (screenId === "screen-splash" || screenId === "screen-login") {
    if (loginWrapper) loginWrapper.style.display = "flex";
    if (mainWrapper) mainWrapper.style.display = "none";
  } else {
    if (loginWrapper) loginWrapper.style.display = "none";
    if (mainWrapper) mainWrapper.style.display = "flex";
  }

  // Deactivate all screens
  const screens = document.querySelectorAll(".screen");
  screens.forEach(s => s.classList.remove("active"));

  // Activate destination
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add("active");
    activeScreen = screenId;
    
    // Auto-scroll content back to top on navigation
    const contentArea = document.getElementById("app-content");
    if (contentArea) contentArea.scrollTop = 0;
  }

  // Update navigation button active styling in the persistent sidebar
  const sidebarItems = document.querySelectorAll(".sidebar-item");
  sidebarItems.forEach(item => {
    if (item.getAttribute("data-screen") === screenId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Load screen-specific updates on access
  if (screenId === "screen-home") renderDashboard();
  if (screenId === "screen-planner") renderPlanner();
  if (screenId === "screen-subjects") renderSubjectsGrid();
  if (screenId === "screen-notes") renderNotes();
  if (screenId === "screen-weak-topics") renderWeakTopics();
  if (screenId === "screen-analytics") renderAnalytics();
  if (screenId === "screen-calendar") renderCalendar();
  if (screenId === "screen-achievements") renderAchievements();
  if (screenId === "screen-profile") renderProfile();
}

// Sidebar Drawer Control (Legacy fallback)
function openSidebar() {
  const sidebar = document.getElementById("sidebar-drawer");
  const overlay = document.getElementById("sidebar-overlay");
  if (sidebar) sidebar.classList.add("open");
  if (overlay) overlay.classList.add("active");
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar-drawer");
  const overlay = document.getElementById("sidebar-overlay");
  if (sidebar) sidebar.classList.remove("open");
  if (overlay) overlay.classList.remove("active");
}

function logout() {
  STATE.isLoggedIn = false;
  saveState();
  navigateTo("screen-login");
  showModal("Logged Out", "You have successfully logged out. Local cache remains preserved.");
}

// FAB Popups
function toggleFAB() {
  const menu = document.getElementById("app-fab-menu");
  const fab = document.getElementById("app-fab");
  menu.classList.toggle("active");
  fab.style.transform = menu.classList.contains("active") ? "rotate(45deg)" : "rotate(0)";
}

// -----------------------------------------------------------------
// EVENT LISTENERS & UI TRIGGERS
// -----------------------------------------------------------------
function setupEventListeners() {
  // Login Buttons
  document.getElementById("login-btn").addEventListener("click", performLogin);
  document.getElementById("google-login-btn").addEventListener("click", performLogin);
  document.getElementById("guest-login-btn").addEventListener("click", performLogin);

  // Sidebar & Theme toggles
  const menuBtn = document.getElementById("menu-btn");
  if (menuBtn) menuBtn.addEventListener("click", openSidebar);

  const sidebarOverlay = document.getElementById("sidebar-overlay");
  if (sidebarOverlay) sidebarOverlay.addEventListener("click", closeSidebar);

  const themeToggle = document.getElementById("header-theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      STATE.user.settings.darkmode = !STATE.user.settings.darkmode;
      saveState();
      initTheme();
    });
  }

  // FAB Toggle
  document.getElementById("app-fab").addEventListener("click", toggleFAB);
  
  // FAB Sub-actions
  document.getElementById("fab-action-note").addEventListener("click", () => {
    toggleFAB();
    openNoteModal();
  });
  document.getElementById("fab-action-pyq").addEventListener("click", () => {
    toggleFAB();
    navigateTo("screen-pyqs");
  });
  document.getElementById("fab-action-formula").addEventListener("click", () => {
    toggleFAB();
    navigateTo("screen-formulas");
  });

  // Modal Cancel/Ok
  document.getElementById("modal-cancel-btn").addEventListener("click", closeModal);
  document.getElementById("modal-ok-btn").addEventListener("click", closeModal);

  // Notes Search & Save
  document.getElementById("notes-search-input").addEventListener("input", renderNotes);
  document.getElementById("note-save-btn").addEventListener("click", saveNoteFromModal);

  // AI Chat click action & Send Button
  document.getElementById("chat-send-btn").addEventListener("click", handleUserMessage);
  document.getElementById("chat-input-field").addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleUserMessage();
  });

  // Add click to suggested question pills
  const suggestBtns = document.querySelectorAll(".suggested-q-btn");
  suggestBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("chat-input-field").value = btn.innerText;
      handleUserMessage();
    });
  });

  // Topic Back navigation
  document.getElementById("topic-back-btn").addEventListener("click", () => navigateTo("screen-subjects"));

  // Mock test tabs selector
  document.getElementById("tab-mocks-available").addEventListener("click", (e) => {
    document.getElementById("tab-mocks-available").classList.add("active");
    document.getElementById("tab-mocks-history").classList.remove("active");
    renderMockCenter();
  });
  document.getElementById("tab-mocks-history").addEventListener("click", (e) => {
    document.getElementById("tab-mocks-available").classList.remove("active");
    document.getElementById("tab-mocks-history").classList.add("active");
    renderMockCenter();
  });

  // PYQ Filters change
  document.getElementById("pyq-subject-filter").addEventListener("change", renderPYQs);
  document.getElementById("pyq-year-filter").addEventListener("change", renderPYQs);
  document.getElementById("pyq-difficulty-filter").addEventListener("change", renderPYQs);

  // Settings Toggles
  document.getElementById("settings-darkmode-toggle").addEventListener("change", (e) => {
    STATE.user.settings.darkmode = e.target.checked;
    saveState();
    initTheme();
  });

  document.getElementById("settings-backup-btn").addEventListener("click", () => {
    showModal("Cloud Backup Simulation", "Data backup completed. 320KB written to simulated cloud container.");
  });
  document.getElementById("settings-restore-btn").addEventListener("click", () => {
    showModal("Cloud Restore Simulation", "Restore successful. Study logs, notes, and local status are synchronized.");
  });
  document.getElementById("settings-export-btn").addEventListener("click", () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(STATE));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "gate_mentor_progress.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  });

  // Populate PYQ subjects filter
  const pyqSubFilter = document.getElementById("pyq-subject-filter");
  GATE_DB.subjects.forEach(sub => {
    const opt = document.createElement("option");
    opt.value = sub.id;
    opt.innerText = sub.name;
    pyqSubFilter.appendChild(opt);
  });
}

function performLogin() {
  STATE.isLoggedIn = true;
  saveState();
  navigateTo("screen-home");
}

// -----------------------------------------------------------------
// SCREEN RENDERING ENGINES
// -----------------------------------------------------------------

// SCREEN 3: DASHBOARD
function renderDashboard() {
  // Countdown to Feb 6, 2027
  const targetDate = new Date("2027-02-06T09:00:00");
  const diffTime = targetDate - new Date();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  document.getElementById("countdown-timer").innerText = diffDays > 0 ? `${diffDays} Days` : "Exam ongoing!";

  // Update desktop sidebar user stats dynamically
  const sidebarStreak = document.getElementById("sidebar-streak-val");
  if (sidebarStreak) sidebarStreak.innerText = `${STATE.user.streak} Days`;
  
  const sidebarXP = document.getElementById("sidebar-xp-val");
  if (sidebarXP) sidebarXP.innerText = STATE.user.xp;
  
  const sidebarXPFill = document.getElementById("sidebar-xp-fill");
  if (sidebarXPFill) {
    const levelXP = STATE.user.xp % 1000;
    const progressPct = Math.round((levelXP / 1000) * 100);
    sidebarXPFill.style.width = `${progressPct}%`;
  }
  
  const headerDays = document.getElementById("header-countdown-days");
  if (headerDays) headerDays.innerText = `${diffDays} Days`;

  // XP, Level and Streak (dashboard body)
  const homeStreak = document.getElementById("home-streak-val");
  if (homeStreak) homeStreak.innerText = `${STATE.user.streak} Days`;
  const homeXP = document.getElementById("home-xp-val");
  if (homeXP) homeXP.innerText = `${STATE.user.xp} XP`;

  // Calculated Completion Today
  const keys = Object.keys(STATE.user.dailyProgress);
  const done = keys.filter(k => STATE.user.dailyProgress[k]).length;
  const total = keys.length;
  const pct = Math.round((done / total) * 100);

  // SVG Progress Ring updating
  const circle = document.getElementById("home-progress-ring");
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  const offset = circumference - (pct / 100) * circumference;
  circle.style.strokeDashoffset = offset;

  document.getElementById("home-progress-pct").innerText = `${pct}%`;
  document.getElementById("home-goal-desc").innerText = `Complete ${done} of ${total} study sessions planned for today.`;
  
  // Calculate remaining study hours (approx 1.5h per slot remaining)
  const remainingHours = (total - done) * 1.5;
  document.getElementById("home-remaining-hours").innerText = remainingHours.toFixed(1);

  // AI Pick Setup based on weak topic if exists
  if (STATE.user.weakTopics.length > 0) {
    const topicId = STATE.user.weakTopics[0];
    let topicName = "Process Synchronization";
    GATE_DB.subjects.forEach(s => {
      s.topics.forEach(t => {
        if (t.id === topicId) topicName = t.name;
      });
    });
    document.getElementById("home-rec-topic-name").innerText = topicName;
  }
}

// SCREEN 4: DAILY PLANNER
function renderPlanner() {
  const container = document.getElementById("planner-list-container");
  container.innerHTML = "";

  const sessions = [
    { key: "morning", name: "Morning Session: Core Theory Study", time: "08:00 AM - 10:00 AM", type: "type-morning", icon: "fa-sun" },
    { key: "afternoon", name: "Afternoon Session: Problem Drill", time: "02:00 PM - 03:30 PM", type: "type-afternoon", icon: "fa-cloud-sun" },
    { key: "evening", name: "Evening Session: Syllabus Advance", time: "05:00 PM - 07:00 PM", type: "type-evening", icon: "fa-sunset" },
    { key: "night", name: "Night Session: Concept Mapping", time: "08:30 PM - 10:00 PM", type: "type-night", icon: "fa-moon" },
    { key: "revision", name: "Smart Revision: Spaced Target Review", time: "10:00 PM - 10:30 PM", type: "type-revision", icon: "fa-redo" },
    { key: "pyq", name: "GATE PYQ Drill: Standard papers", time: "10:30 PM - 11:00 PM", type: "type-revision", icon: "fa-clock" }
  ];

  sessions.forEach(sess => {
    const isCompleted = STATE.user.dailyProgress[sess.key];
    const item = document.createElement("div");
    item.className = `planner-item ${isCompleted ? 'completed' : ''}`;
    
    item.innerHTML = `
      <div class="checkbox-custom ${isCompleted ? 'checked' : ''}" onclick="toggleSession('${sess.key}')">
        ${isCompleted ? '<i class="fas fa-check"></i>' : ''}
      </div>
      <div style="flex:1;">
        <div class="planner-item-time">${sess.time}</div>
        <div class="planner-item-title">${sess.name}</div>
      </div>
      <span class="planner-item-type ${sess.type}"><i class="fas ${sess.icon}"></i> Slot</span>
    `;
    container.appendChild(item);
  });
}

function toggleSession(sessionKey) {
  const current = STATE.user.dailyProgress[sessionKey];
  STATE.user.dailyProgress[sessionKey] = !current;
  
  // Gamification: grant XP on completion, remove on undo
  if (!current) {
    STATE.user.xp += 100;
    showNotification("+100 XP gained! Keep going.");
  } else {
    STATE.user.xp = Math.max(0, STATE.user.xp - 100);
  }

  // Recalculate Level
  STATE.user.level = Math.floor(STATE.user.xp / 1000) + 1;

  saveState();
  renderPlanner();
  renderDashboard();
}

// SCREEN 5: SUBJECTS LIST
function renderSubjectsGrid() {
  const container = document.getElementById("subjects-grid-container");
  container.innerHTML = "";

  GATE_DB.subjects.forEach(subject => {
    // Calculate actual completion percentage
    const completedCount = subject.topics.filter(t => STATE.user.completedTopics.includes(t.id)).length;
    const totalCount = subject.topics.length;
    const pct = Math.round((completedCount / totalCount) * 100);

    const card = document.createElement("div");
    card.className = "card subject-card";
    card.onclick = () => viewSubjectDetails(subject.id);

    card.innerHTML = `
      <div class="subject-header">
        <div class="subject-icon-box bg-gradient" style="background: ${getGradientCSS(subject.color)};">
          <i class="fas ${subject.icon}"></i>
        </div>
        <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary);">${subject.weightage}</span>
      </div>
      <div class="subject-title">${subject.name}</div>
      <div class="subject-progress-container">
        <div class="subject-progress-bar">
          <div class="subject-progress-fill" style="width: ${pct}%; background: ${getGradientCSS(subject.color)};"></div>
        </div>
        <div class="subject-progress-lbl">
          <span>${completedCount}/${totalCount} topics</span>
          <span>${pct}%</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Helpers to extract gradient strings
function getGradientCSS(gradientClass) {
  if (gradientClass.includes("from-blue-500")) return "linear-gradient(135deg, #3b82f6, #6366f1)";
  if (gradientClass.includes("from-teal-400")) return "linear-gradient(135deg, #2dd4bf, #059669)";
  if (gradientClass.includes("from-purple-500")) return "linear-gradient(135deg, #a855f7, #4f46e5)";
  if (gradientClass.includes("from-pink-500")) return "linear-gradient(135deg, #ec4899, #e11d48)";
  if (gradientClass.includes("from-cyan-500")) return "linear-gradient(135deg, #06b6d4, #2563eb)";
  if (gradientClass.includes("from-amber-500")) return "linear-gradient(135deg, #f59e0b, #ea580c)";
  if (gradientClass.includes("from-emerald-500")) return "linear-gradient(135deg, #10b981, #0f766e)";
  if (gradientClass.includes("from-red-500")) return "linear-gradient(135deg, #ef4444, #ec4899)";
  if (gradientClass.includes("from-violet-500")) return "linear-gradient(135deg, #8b5cf6, #d946ef)";
  if (gradientClass.includes("from-yellow-500")) return "linear-gradient(135deg, #eab308, #ca8a04)";
  if (gradientClass.includes("from-blue-600")) return "linear-gradient(135deg, #2563eb, #0891b2)";
  if (gradientClass.includes("from-orange-500")) return "linear-gradient(135deg, #f97316, #dc2626)";
  return "linear-gradient(135deg, #6366f1, #4f46e5)";
}

// SCREEN 6: TOPICS DETAILS
function viewSubjectDetails(subjectId) {
  const subject = GATE_DB.subjects.find(s => s.id === subjectId);
  if (!subject) return;

  currentSubjectView = subjectId;
  navigateTo("screen-topic-details");

  document.getElementById("topic-subject-title").innerText = subject.name;
  document.getElementById("topic-subject-weightage").innerText = subject.weightage;

  const container = document.getElementById("topics-list-container");
  container.innerHTML = "";

  const completedCount = subject.topics.filter(t => STATE.user.completedTopics.includes(t.id)).length;
  const totalCount = subject.topics.length;
  const pct = Math.round((completedCount / totalCount) * 100);
  document.getElementById("topic-subject-completion").innerText = `${pct}%`;

  subject.topics.forEach(topic => {
    const isCompleted = STATE.user.completedTopics.includes(topic.id);
    const isWeak = STATE.user.weakTopics.includes(topic.id);
    const item = document.createElement("div");
    item.className = "card topic-item";

    item.innerHTML = `
      <div class="topic-top">
        <div class="topic-name">${topic.name}</div>
        <div class="topic-meta">
          <span class="badge badge-high">${topic.weightage} Weight</span>
          <span class="badge badge-medium">${topic.difficulty}</span>
          <span class="badge"><i class="fas fa-clock"></i> ${topic.estimatedTime}h</span>
          ${isWeak ? '<span class="badge badge-high" style="color: #ef4444;"><i class="fas fa-exclamation-triangle"></i> Weak Topic</span>' : '<span class="badge badge-easy" style="color:#10b981;"><i class="fas fa-thumbs-up"></i> Strong</span>'}
        </div>
      </div>
      <div class="topic-actions">
        <span style="font-size: 12px; color: var(--text-secondary);">Completed Syllabus</span>
        <label class="toggle-switch">
          <input type="checkbox" ${isCompleted ? 'checked' : ''} onchange="toggleTopicCompletion('${topic.id}', this.checked)">
          <span class="slider"></span>
        </label>
      </div>
    `;
    container.appendChild(item);
  });
}

function toggleTopicCompletion(topicId, completed) {
  if (completed) {
    if (!STATE.user.completedTopics.includes(topicId)) {
      STATE.user.completedTopics.push(topicId);
      STATE.user.xp += 200;
      showNotification("Topic Completed! +200 XP gained.");
    }
  } else {
    STATE.user.completedTopics = STATE.user.completedTopics.filter(id => id !== topicId);
  }
  
  // Recalculate levels and state
  STATE.user.level = Math.floor(STATE.user.xp / 1000) + 1;
  saveState();
  if (currentSubjectView) {
    viewSubjectDetails(currentSubjectView);
  }
}

// SCREEN 7: AI CHAT MENTOR
async function handleUserMessage() {
  const inputEl = document.getElementById("chat-input-field");
  const msgText = inputEl.value.trim();
  if (!msgText) return;

  // Append user message
  appendChatMessage(msgText, "user");
  inputEl.value = "";

  // Show "AI is thinking..." bubble
  const thinkingBubble = appendChatMessage("Thinking...", "ai");

  try {
    // Generate context description of the user state to inject into the system instruction
    const userProgressDescription = `
      User details:
      Name: ${STATE.user.name}
      Current progress percentage completed: ${Math.round((STATE.user.completedTopics.length / 60) * 100)}%
      Streaks count: ${STATE.user.streak} days
      XP points accumulated: ${STATE.user.xp}
      Completed subjects/topics count: ${STATE.user.completedTopics.length} out of 60 total standard items.
      List of weak areas found: ${STATE.user.weakTopics.join(", ")}
      Current mock average score: 12 marks
    `;

    // Try making a request to the Gemini API key
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are an expert AI GATE CSE Mentor guiding a student preparing for the GATE 2027 exam.
                  Answer in a supportive, concise, premium tone, referencing their actual study statistics.
                  ${userProgressDescription}
                  
                  Student query: "${msgText}"`
          }]
        }]
      })
    });

    const data = await response.json();
    thinkingBubble.remove();

    if (data.candidates && data.candidates[0] && data.candidates[0].content.parts[0].text) {
      const aiReply = data.candidates[0].content.parts[0].text;
      appendChatMessage(aiReply, "ai");
    } else {
      throw new Error("Invalid API response format");
    }
  } catch (error) {
    console.warn("Gemini API call failed or is offline. Using local intelligent rule-based responses...", error);
    thinkingBubble.remove();

    // Contextual local responses
    let answer = "I have reviewed your logs. For GATE CSE, daily consistency is key. Keep up the Process Synchronization review, and practice at least 5 PYQs today!";
    
    if (msgText.toLowerCase().includes("3 hours") || msgText.toLowerCase().includes("time")) {
      answer = "Rescheduling today's target to fit 3 hours: We will prioritize the <b>Afternoon Problem Drill</b> (Algorithms divide and conquer) and the <b>Smart Revision Session</b>. The Evening slot is pushed to tomorrow morning. Good luck!";
    } else if (msgText.toLowerCase().includes("missed") || msgText.toLowerCase().includes("yesterday")) {
      answer = "Don't stress. I've automatically rescheduled the unfinished Normalization and CPU scheduling sessions to today's afternoon and night slots. The overall syllabus target is still safely on track for December completion.";
    } else if (msgText.toLowerCase().includes("weak") || msgText.toLowerCase().includes("subjects")) {
      answer = `Based on your PYQ errors, process synchronization is marked as a <b>Weak Topic</b>. I suggest we target a mini-test on Operating Systems this weekend to patch this.`;
    } else if (msgText.toLowerCase().includes("what should") || msgText.toLowerCase().includes("now")) {
      answer = "Currently, you should check your <b>Daily Planner</b>. You have the Afternoon Session scheduled next. Dive into Algorithms!";
    }

    appendChatMessage(answer, "ai");
  }
}

function appendChatMessage(text, sender) {
  const container = document.getElementById("chat-messages-container");
  const bubble = document.createElement("div");
  bubble.className = `chat-message ${sender}`;
  bubble.innerHTML = text.replace(/\n/g, "<br>");
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
  return bubble;
}

// SCREEN 8: PYQs RENDER
function renderPYQs() {
  const container = document.getElementById("pyq-cards-container");
  container.innerHTML = "";

  const subFilter = document.getElementById("pyq-subject-filter").value;
  const yearFilter = document.getElementById("pyq-year-filter").value;
  const diffFilter = document.getElementById("pyq-difficulty-filter").value;

  const filtered = GATE_DB.pyqs.filter(q => {
    if (subFilter !== "all" && q.subjectId !== subFilter) return false;
    if (yearFilter !== "all" && q.year.toString() !== yearFilter) return false;
    if (diffFilter !== "all" && q.difficulty !== diffFilter) return false;
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px;">No PYQs found matching these filter criteria.</div>`;
    return;
  }

  filtered.forEach(q => {
    const status = STATE.user.solvedPyqIds[q.id] || "unsolved";
    const isBookmarked = STATE.user.bookmarkedPyqs.includes(q.id);

    const card = document.createElement("div");
    card.className = "card pyq-question-card";
    
    let optionsHtml = "";
    q.options.forEach(opt => {
      const optLetter = opt.charAt(0);
      let optClass = "";
      if (status !== "unsolved") {
        if (optLetter === q.correctOption) optClass = "correct";
        else if (status === "wrong" && optLetter === status.selectedOption) optClass = "wrong";
      }
      optionsHtml += `
        <div class="pyq-opt ${optClass}" onclick="solvePYQ('${q.id}', '${optLetter}')">
          ${opt}
        </div>
      `;
    });

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span class="badge">${q.year} GATE CSE</span>
        <span class="badge badge-high">${q.marks} Mark${q.marks > 1 ? 's' : ''}</span>
        <i class="${isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark'}" style="cursor:pointer;" onclick="toggleBookmark('${q.id}')"></i>
      </div>
      <p style="font-size: 13px; font-weight: 500; line-height: 1.4;">${q.question}</p>
      <div style="margin-top: 8px;">
        ${optionsHtml}
      </div>
      <div class="pyq-actions">
        <button class="pyq-btn btn-secondary" onclick="toggleSolutionView('${q.id}')">View Explanation</button>
        <span style="font-size: 11px; color: var(--text-secondary); align-self: center;">Status: <b>${status.toUpperCase()}</b></span>
      </div>
      <div class="pyq-solution-box" id="solution-${q.id}">
        <strong>Correct Option: ${q.correctOption}</strong><br>
        <p style="margin-top: 4px;">${q.solution}</p>
        <p style="font-size: 11px; margin-top: 6px; color: var(--text-secondary);">${q.explanation}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

function solvePYQ(pyqId, selectedOption) {
  if (STATE.user.solvedPyqIds[pyqId]) return; // Already solved

  const q = GATE_DB.pyqs.find(item => item.id === pyqId);
  const isCorrect = selectedOption === q.correctOption;
  
  STATE.user.solvedPyqIds[pyqId] = isCorrect ? "correct" : "wrong";
  
  if (isCorrect) {
    STATE.user.xp += 150;
    showNotification("Correct! +150 XP gained.");
  } else {
    // Automatically add to weak topics on wrong answer!
    if (!STATE.user.weakTopics.includes(q.topicId)) {
      STATE.user.weakTopics.push(q.topicId);
    }
    showNotification("Incorrect answer. Topic marked as weak for review.");
  }

  saveState();
  renderPYQs();
  renderWeakTopics();
}

function toggleBookmark(pyqId) {
  if (STATE.user.bookmarkedPyqs.includes(pyqId)) {
    STATE.user.bookmarkedPyqs = STATE.user.bookmarkedPyqs.filter(id => id !== pyqId);
  } else {
    STATE.user.bookmarkedPyqs.push(pyqId);
  }
  saveState();
  renderPYQs();
}

function toggleSolutionView(pyqId) {
  const el = document.getElementById(`solution-${pyqId}`);
  if (el.style.display === "block") {
    el.style.display = "none";
  } else {
    el.style.display = "block";
  }
}

// SCREEN 9: FORMULA BOOK
let activeFormulaSubject = "algorithms";
function renderFormulas() {
  const tabContainer = document.getElementById("formula-subject-tabs");
  tabContainer.innerHTML = "";

  GATE_DB.subjects.forEach(sub => {
    const btn = document.createElement("button");
    btn.className = `filter-select ${activeFormulaSubject === sub.id ? 'active' : ''}`;
    btn.innerText = sub.name;
    btn.onclick = () => {
      activeFormulaSubject = sub.id;
      renderFormulas();
    };
    tabContainer.appendChild(btn);
  });

  const cardContainer = document.getElementById("formula-cards-container");
  cardContainer.innerHTML = "";

  const sheet = GATE_DB.formulaSheets.find(s => s.subjectId === activeFormulaSubject);
  if (!sheet) {
    cardContainer.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px;">No formulas recorded yet for this subject.</div>`;
    return;
  }

  sheet.formulas.forEach(form => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px; color: var(--accent-color);">${form.name}</div>
      <div style="background-color: var(--bg-secondary); border-radius: 6px; padding: 10px; font-family: monospace; font-size: 12px; margin-bottom: 6px;">
        ${form.formula}
      </div>
      <div style="font-size: 11px; color: var(--text-secondary);"><i class="fas fa-lightbulb" style="color: #eab308;"></i> <i>${form.trick}</i></div>
    `;
    cardContainer.appendChild(card);
  });
}

// SCREEN 10: NOTES INTERACTION (CRUD)
function renderNotes() {
  const pinnedContainer = document.getElementById("pinned-notes-container");
  const allContainer = document.getElementById("all-notes-container");
  pinnedContainer.innerHTML = "";
  allContainer.innerHTML = "";

  const searchQuery = document.getElementById("notes-search-input").value.toLowerCase();

  const filtered = STATE.user.customNotes.filter(n => {
    return n.title.toLowerCase().includes(searchQuery) || n.text.toLowerCase().includes(searchQuery);
  });

  if (filtered.length === 0) {
    allContainer.innerHTML = `<div style="color:var(--text-muted); text-align:center; padding:12px;">No notes found. Click the + button to create one!</div>`;
    return;
  }

  filtered.forEach(note => {
    const card = document.createElement("div");
    card.className = "card note-card";
    card.innerHTML = `
      <i class="fas fa-thumbtack note-pin ${note.pinned ? 'pinned' : ''}" onclick="toggleNotePin('${note.id}')"></i>
      <div class="note-date">${note.date}</div>
      <h4 style="font-size: 14px; font-weight: 700;">${note.title}</h4>
      <p class="note-text">${note.text.replace(/\n/g, "<br>")}</p>
      <div class="note-actions">
        <span onclick="editNoteTrigger('${note.id}')"><i class="fas fa-edit"></i> Edit</span>
        <span onclick="deleteNote('${note.id}')" style="color:#ef4444;"><i class="fas fa-trash"></i> Delete</span>
      </div>
    `;

    if (note.pinned) {
      pinnedContainer.appendChild(card);
    } else {
      allContainer.appendChild(card);
    }
  });
}

let activeEditNoteId = null;

function openNoteModal(noteId = null) {
  const overlay = document.getElementById("note-modal-overlay");
  const titleInput = document.getElementById("note-edit-title");
  const textInput = document.getElementById("note-edit-text");
  const pinInput = document.getElementById("note-edit-pin");
  
  if (noteId) {
    const note = STATE.user.customNotes.find(n => n.id === noteId);
    activeEditNoteId = noteId;
    titleInput.value = note.title;
    textInput.value = note.text;
    pinInput.checked = note.pinned;
    document.getElementById("note-modal-title").innerText = "Edit Note";
  } else {
    activeEditNoteId = null;
    titleInput.value = "";
    textInput.value = "";
    pinInput.checked = false;
    document.getElementById("note-modal-title").innerText = "Create New Note";
  }

  overlay.classList.add("active");
}

function closeNoteModal() {
  document.getElementById("note-modal-overlay").classList.remove("active");
}

function saveNoteFromModal() {
  const title = document.getElementById("note-edit-title").value.trim();
  const text = document.getElementById("note-edit-text").value.trim();
  const pinned = document.getElementById("note-edit-pin").checked;

  if (!title || !text) {
    showNotification("Title and content cannot be blank.");
    return;
  }

  if (activeEditNoteId) {
    // Edit existing
    const note = STATE.user.customNotes.find(n => n.id === activeEditNoteId);
    note.title = title;
    note.text = text;
    note.pinned = pinned;
  } else {
    // Add new
    const newNote = {
      id: "note_" + Date.now(),
      title,
      text,
      pinned,
      date: new Date().toISOString().split("T")[0]
    };
    STATE.user.customNotes.unshift(newNote);
  }

  saveState();
  closeNoteModal();
  renderNotes();
  showNotification("Note saved successfully.");
}

function toggleNotePin(noteId) {
  const note = STATE.user.customNotes.find(n => n.id === noteId);
  note.pinned = !note.pinned;
  saveState();
  renderNotes();
}

function editNoteTrigger(noteId) {
  openNoteModal(noteId);
}

function deleteNote(noteId) {
  STATE.user.customNotes = STATE.user.customNotes.filter(n => n.id !== noteId);
  saveState();
  renderNotes();
  showNotification("Note deleted.");
}

// SCREEN 11: WEAK TOPICS FOCUS
function renderWeakTopics() {
  const container = document.getElementById("weak-topics-container");
  container.innerHTML = "";

  if (STATE.user.weakTopics.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--text-secondary); padding: 20px;"><i class="fas fa-check-circle" style="color: #10b981; font-size: 24px; margin-bottom: 6px;"></i><br>Great job! You have no weak topics identified currently.</div>`;
    return;
  }

  STATE.user.weakTopics.forEach(topicId => {
    let topicName = "";
    let subName = "";
    GATE_DB.subjects.forEach(s => {
      const found = s.topics.find(t => t.id === topicId);
      if (found) {
        topicName = found.name;
        subName = s.name;
      }
    });

    const card = document.createElement("div");
    card.className = "card";
    card.style.borderLeft = "4px solid #ef4444";
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">${subName}</div>
          <h4 style="font-size: 14px; font-weight: 700; margin-top: 2px;">${topicName}</h4>
        </div>
        <span class="badge badge-high"><i class="fas fa-bolt"></i> Focus</span>
      </div>
      <p style="font-size: 12px; color: var(--text-secondary); margin-top: 6px;">Identified via incorrect PYQ attempts. Estimated revision time required: 2.5 hours.</p>
      <div style="display: flex; gap: 8px; margin-top: 10px;">
        <button class="pyq-btn btn-primary" style="flex: 1; padding: 6px;" onclick="startImmediateRevision('${topicId}')">Revise Now</button>
        <button class="pyq-btn btn-secondary" style="padding: 6px;" onclick="dismissWeakTopic('${topicId}')"><i class="fas fa-check"></i> Resolved</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function startImmediateRevision(topicId) {
  showModal("Revision Scheduled", "I have dynamically queued this topic in your evening session study slot. Get ready!");
}

function dismissWeakTopic(topicId) {
  STATE.user.weakTopics = STATE.user.weakTopics.filter(id => id !== topicId);
  saveState();
  renderWeakTopics();
  showNotification("Topic removed from Weak list.");
}

// SCREEN 12: MOCK TEST SIMULATION
function renderMockCenter() {
  const container = document.getElementById("mocks-tab-content");
  container.innerHTML = "";

  const isAvailableTab = document.getElementById("tab-mocks-available").classList.contains("active");

  if (isAvailableTab) {
    GATE_DB.mockTests.forEach(mock => {
      const card = document.createElement("div");
      card.className = "card mock-test-item";
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h4 style="font-size:14px; font-weight:700;">${mock.name}</h4>
          <span class="badge badge-medium">${mock.type} Mock</span>
        </div>
        <div class="mock-details">
          <span><i class="fas fa-clock"></i> ${mock.duration} Mins</span>
          <span><i class="fas fa-file-alt"></i> ${mock.questionsCount} Qs</span>
          <span><i class="fas fa-star"></i> ${mock.totalMarks} Marks</span>
        </div>
        <button class="pyq-btn btn-primary" style="margin-top:4px;" onclick="startMockTest('${mock.id}')">Start Exam</button>
      `;
      container.appendChild(card);
    });
  } else {
    // Show mock history
    if (STATE.user.mockScores.length === 0) {
      container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px;">No mock tests submitted yet.</div>`;
      return;
    }

    STATE.user.mockScores.forEach(score => {
      const mock = GATE_DB.mockTests.find(m => m.id === score.testId);
      const card = document.createElement("div");
      card.className = "card mock-test-item";
      card.innerHTML = `
        <h4 style="font-size:14px; font-weight:700;">${mock.name}</h4>
        <div class="mock-details">
          <span>Score: <b>${score.score} / ${mock.totalMarks}</b></span>
          <span>Accuracy: <b>${score.accuracy}%</b></span>
          <span>Date: <b>${score.date}</b></span>
        </div>
        <div style="font-size:11px; color: var(--text-secondary); margin-top: 6px;">
          <i class="fas fa-chart-line" style="color:#10b981;"></i> Predicted AIR based on this: <b>~780</b> (Top 800)
        </div>
      `;
      container.appendChild(card);
    });
  }
}

function startMockTest(testId) {
  const mock = GATE_DB.mockTests.find(m => m.id === testId);
  currentMockExam = mock;
  currentMockQIndex = 0;
  currentMockAnswers = {};

  document.getElementById("mock-exam-overlay").classList.add("active");
  renderMockQuestion();

  // Simulated countdown timer (30 mins)
  let timeRemaining = mock.duration * 60;
  const timerEl = document.getElementById("mock-exam-timer");

  const intervalId = setInterval(() => {
    if (!currentMockExam) {
      clearInterval(intervalId);
      return;
    }
    if (timeRemaining <= 0) {
      clearInterval(intervalId);
      submitMockTest();
      return;
    }
    timeRemaining--;
    const mins = Math.floor(timeRemaining / 60);
    const secs = timeRemaining % 60;
    timerEl.innerText = `${mins}:${secs < 10 ? '0' + secs : secs}`;
  }, 1000);

  // Bind Buttons
  document.getElementById("mock-exam-next-btn").onclick = () => {
    if (currentMockQIndex < currentMockExam.questions.length - 1) {
      currentMockQIndex++;
      renderMockQuestion();
    } else {
      submitMockTest();
    }
  };
  document.getElementById("mock-exam-prev-btn").onclick = () => {
    if (currentMockQIndex > 0) {
      currentMockQIndex--;
      renderMockQuestion();
    }
  };
  document.getElementById("mock-exam-skip-btn").onclick = () => {
    currentMockAnswers[currentMockExam.questions[currentMockQIndex].id] = "skipped";
    if (currentMockQIndex < currentMockExam.questions.length - 1) {
      currentMockQIndex++;
      renderMockQuestion();
    } else {
      submitMockTest();
    }
  };
}

function renderMockQuestion() {
  const q = currentMockExam.questions[currentMockQIndex];
  document.getElementById("mock-exam-title").innerText = currentMockExam.name;
  document.getElementById("mock-exam-q-num").innerText = currentMockQIndex + 1;
  document.getElementById("mock-exam-q-total").innerText = currentMockExam.questions.length;
  document.getElementById("mock-exam-q-marks").innerText = `(${q.marks} Marks)`;
  document.getElementById("mock-exam-question-body").innerText = q.question;

  const container = document.getElementById("mock-exam-options-container");
  container.innerHTML = "";

  q.options.forEach(opt => {
    const letter = opt.charAt(0);
    const isSelected = currentMockAnswers[q.id] === letter;
    const btn = document.createElement("div");
    btn.className = `pyq-opt ${isSelected ? 'selected' : ''}`;
    btn.innerText = opt;
    btn.onclick = () => {
      currentMockAnswers[q.id] = letter;
      renderMockQuestion();
    };
    container.appendChild(btn);
  });
}

function submitMockTest() {
  let score = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;

  currentMockExam.questions.forEach(q => {
    const ans = currentMockAnswers[q.id];
    if (!ans || ans === "skipped") {
      skippedCount++;
    } else if (ans === q.correctOption) {
      score += q.marks;
      correctCount++;
    } else {
      score -= (q.marks / 3); // Negative marking simulation
      wrongCount++;
    }
  });

  score = Math.max(0, Math.round(score * 100) / 100);
  const accuracy = currentMockExam.questions.length > skippedCount ? 
    Math.round((correctCount / (currentMockExam.questions.length - skippedCount)) * 100) : 0;

  // Add history record
  const result = {
    testId: currentMockExam.id,
    score,
    accuracy,
    date: new Date().toISOString().split("T")[0]
  };

  STATE.user.mockScores.push(result);
  STATE.user.xp += 500; // Level XP reward
  
  document.getElementById("mock-exam-overlay").classList.remove("active");
  currentMockExam = null;
  saveState();

  showModal("Mock Test Submitted", `
    <h3>${correctCount} Correct, ${wrongCount} Wrong, ${skippedCount} Skipped</h3>
    <br>
    Final Score: <b>${score} Marks</b><br>
    Accuracy: <b>${accuracy}%</b><br><br>
    AI Evaluation: You showed strong performance in Master Theorem, but Process Synchronization was a weak spot. Practice details added to your weak topics tracker.
  `);

  renderMockCenter();
}

// SCREEN 13: ANALYTICS SVG DRAWING
function renderAnalytics() {
  // 1. Draw study hours bar chart (custom HTML elements defined in stylesheet)
  const chart = document.getElementById("study-hours-chart");
  chart.innerHTML = "";
  
  const weekLogs = [6, 4.5, 8, 5, 7.5, 3, 5.5]; // Mon - Sun
  const maxHours = 10;

  weekLogs.forEach((hr) => {
    const pctHeight = (hr / maxHours) * 100;
    const bar = document.createElement("div");
    bar.className = "bar-chart-bar";
    bar.style.height = `${pctHeight}%`;
    bar.innerHTML = `<span class="bar-val">${hr}h</span>`;
    chart.appendChild(bar);
  });

  // 2. Draw Consistency Heatmap
  const heatmap = document.getElementById("consistency-heatmap");
  heatmap.innerHTML = "";

  // 42 cells total (14 columns x 3 rows) representing past study volume
  for (let i = 0; i < 42; i++) {
    const cell = document.createElement("div");
    cell.className = "heatmap-cell";
    
    // Distribute levels randomly to look natural
    const val = Math.floor(Math.random() * 5);
    if (val > 0) cell.classList.add(`level-${val}`);

    heatmap.appendChild(cell);
  }
}

// SCREEN 14: CALENDAR
function renderCalendar() {
  const monthLabel = document.getElementById("calendar-month-year");
  const grid = document.getElementById("calendar-grid-container");
  grid.innerHTML = "";

  // Set standard days headers
  const daysHeader = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  daysHeader.forEach(d => {
    const cell = document.createElement("div");
    cell.className = "calendar-header-day";
    cell.innerText = d;
    grid.appendChild(cell);
  });

  // Generate July 2026 dates (starts on Wednesday, 31 days)
  const offset = 3; 
  const daysInMonth = 31;

  for (let i = 0; i < offset; i++) {
    const emptyCell = document.createElement("div");
    grid.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.className = "calendar-day";
    cell.innerText = day;

    // Simulate completion logs for dates
    if (day === 3) {
      cell.classList.add("active");
    } else if (day < 3) {
      if (day % 2 === 0) cell.classList.add("completed");
      else cell.classList.add("missed");
    } else {
      // Future dates schedule predictions
      if (day % 5 === 0) cell.classList.add("revision");
      else if (day === 12 || day === 26) cell.classList.add("mock");
    }

    cell.onclick = () => {
      const activeDays = document.querySelectorAll(".calendar-day");
      activeDays.forEach(c => c.classList.remove("active"));
      cell.classList.add("active");
      showNotification(`July ${day} Schedule Checked.`);
    };

    grid.appendChild(cell);
  }
}

// SCREEN 15: ACHIEVEMENTS
function renderAchievements() {
  const container = document.getElementById("achievements-list-container");
  container.innerHTML = "";

  GATE_DB.achievements.forEach(ach => {
    const isUnlocked = STATE.user.xp >= ach.xpReward; // unlocked if user has sufficient total XP
    const row = document.createElement("div");
    row.className = "achievement-row";

    row.innerHTML = `
      <div class="achievement-icon ${isUnlocked ? 'unlocked' : ''}">
        <i class="fas ${ach.icon}"></i>
      </div>
      <div class="achievement-details">
        <div class="achievement-title">${ach.title}</div>
        <div class="achievement-desc">${ach.description}</div>
      </div>
      <span style="font-size: 11px; font-weight:700; color: ${isUnlocked ? '#10b981' : 'var(--text-muted)'};">
        ${isUnlocked ? 'UNLOCKED' : `Requires ${ach.xpReward} XP`}
      </span>
    `;
    container.appendChild(row);
  });
}

// SCREEN 16: RESOURCES
function renderResources() {
  const container = document.getElementById("resources-list-container");
  container.innerHTML = "";

  GATE_DB.resources.forEach(cat => {
    const card = document.createElement("div");
    card.className = "card";
    
    let itemsHtml = "";
    cat.items.forEach(item => {
      itemsHtml += `
        <div style="display:flex; justify-content:space-between; align-items:center; padding: 6px 0; border-bottom: 1px solid var(--border-color);">
          <span style="font-size:12px; font-weight:600;"><i class="far ${item.type === 'video' ? 'fa-play-circle' : 'fa-file-pdf'}" style="margin-right:6px; color:var(--accent-color);"></i> ${item.name}</span>
          <a href="${item.url}" target="_blank" style="font-size:11px; color: var(--accent-color); text-decoration:none;"><i class="fas fa-external-link-alt"></i></a>
        </div>
      `;
    });

    card.innerHTML = `
      <h4 style="font-size:14px; font-weight:700; margin-bottom:8px;">${cat.title}</h4>
      <div>
        ${itemsHtml}
      </div>
    `;
    container.appendChild(card);
  });
}

// SCREEN 17: SETTINGS
function renderSettings() {
  const remindersToggle = document.getElementById("settings-reminders-toggle");
  remindersToggle.checked = STATE.user.settings.reminders;
  remindersToggle.onchange = (e) => {
    STATE.user.settings.reminders = e.target.checked;
    saveState();
    showNotification("Notification alerts updated.");
  };
}

// SCREEN 18: PROFILE
function renderProfile() {
  const compCount = STATE.user.completedTopics.length;
  document.getElementById("profile-completed-topics").innerText = `${compCount} / 60`;
  
  // XP to study hours simulation ratio (e.g. 70 XP per hour ratio)
  const studyHours = Math.round(STATE.user.xp / 70);
  document.getElementById("profile-study-hours").innerText = `${studyHours}h`;

  // Expected score changes based on completed topics count
  const expectedScore = 400 + Math.round((compCount / 60) * 500);
  document.getElementById("profile-expected-score").innerText = `${expectedScore} / 1000`;
  document.getElementById("profile-expected-rank").innerText = `Top ${1500 - (compCount * 20)} (AIR ~${1480 - (compCount * 20)})`;
  
  // Analytics screen indicators sync
  document.getElementById("analytics-exp-score").innerText = expectedScore;
  document.getElementById("analytics-exp-air").innerText = `Top ${1500 - (compCount * 20)}`;
}

// -----------------------------------------------------------------
// MODAL DIALOG CONTROLS
// -----------------------------------------------------------------
function showModal(title, bodyHtml) {
  document.getElementById("modal-title").innerText = title;
  document.getElementById("modal-body").innerHTML = bodyHtml;
  document.getElementById("app-modal-overlay").classList.add("active");
}

function closeModal() {
  document.getElementById("app-modal-overlay").classList.remove("active");
}

// In-app lightweight notification system
function showNotification(text) {
  // Create small overlay bubble
  const bubble = document.createElement("div");
  bubble.style.position = "absolute";
  bubble.style.bottom = "80px";
  bubble.style.left = "50%";
  bubble.style.transform = "translateX(-50%)";
  bubble.style.background = "var(--primary-gradient)";
  bubble.style.color = "white";
  bubble.style.padding = "8px 16px";
  bubble.style.borderRadius = "20px";
  bubble.style.fontSize = "12px";
  bubble.style.fontWeight = "700";
  bubble.style.zIndex = "300";
  bubble.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
  bubble.style.opacity = "0";
  bubble.style.transition = "opacity 0.2s, bottom 0.2s";

  document.querySelector(".phone-container").appendChild(bubble);
  bubble.innerText = text;
  
  // Trigger animation
  setTimeout(() => {
    bubble.style.opacity = "1";
    bubble.style.bottom = "92px";
  }, 50);

  // Fade out
  setTimeout(() => {
    bubble.style.opacity = "0";
    setTimeout(() => bubble.remove(), 200);
  }, 2200);
}
