export const readingTopicsData = {
    "reading-comprehension": {
      id: "reading-comprehension",
      title: "Reading Comprehension",
      description: "Learn to understand and analyze written passages effectively",
      iconName: "book-outline",
      color: "#4cc9f0",
      progress: 75,
      subtopics: [
        {
          id: "main-idea",
          title: "Main Idea & Purpose",
          description: "Identify the central theme and author's intent",
          content: `
            <h3>Learning Objective</h3>
            <p>By the end of this lesson, you'll be able to identify the main idea and author's purpose in SAT reading passages.</p>
            
            <h3>Finding the Main Idea</h3>
            <p>The main idea is the central point the author wants to communicate. Think of it as the "big picture" of the passage.</p>
            
            <h4>Where to Look</h4>
            <ul>
              <li>First and last paragraphs</li>
              <li>Topic sentences (often first sentence of paragraphs)</li>
              <li>Repeated concepts or themes</li>
            </ul>
            
            <h3>Practice Example</h3>
            <p>Read the following paragraph:</p>
            <blockquote>
              The decline of bee populations worldwide has alarmed scientists and environmentalists alike. These insects are responsible for pollinating approximately 75% of the fruits, nuts, and vegetables grown in the United States. Without bees, many crops would fail, threatening food security globally. Recent studies have linked this decline to pesticide use, habitat loss, and climate change, prompting calls for more sustainable agricultural practices and conservation efforts.
            </blockquote>
          `,
          completed: true,
        },
        {
          id: "supporting-details",
          title: "Supporting Details",
          description: "Recognize evidence that reinforces the main idea",
          content: `
            <h3>Learning Objective</h3>
            <p>Learn to identify and analyze supporting details that strengthen the main idea in SAT passages.</p>
            
            <h3>Identifying Supporting Details</h3>
            <p>Supporting details provide evidence, examples, statistics, or explanations that reinforce the main idea. They help readers understand why the main idea is valid or important.</p>
          `,
          completed: true,
        },
        {
          id: "inference",
          title: "Making Inferences",
          description: "Draw logical conclusions based on textual evidence",
          content: `
            <h3>What is an Inference?</h3>
            <p>An inference is a conclusion drawn from evidence rather than from explicit statements in the text. It's reading between the lines by combining textual evidence with your own knowledge.</p>
          `,
          completed: false,
        },
      ],
    },
    "vocabulary": {
      id: "vocabulary",
      title: "Vocabulary in Context",
      description: "Master understanding words as they're used in passages",
      iconName: "text-outline",
      color: "#7209b7",
      progress: 50,
      subtopics: [
        {
          id: "context-clues",
          title: "Using Context Clues",
          description: "Determine word meanings from surrounding text",
          content: "Detailed tutorial content about using context clues...",
          completed: true,
        },
        {
          id: "word-meanings",
          title: "Multiple Word Meanings",
          description: "Navigate words with several possible definitions",
          content: "Detailed tutorial content about multiple word meanings...",
          completed: false,
        },
      ],
    },
  };
  
  export const mathTopicsData = {
    "algebra": {
      id: "algebra",
      title: "Algebra",
      description: "Master equations, functions, and algebraic relationships",
      iconName: "calculator-outline",
      color: "#f72585",
      progress: 90,
      subtopics: [
        {
          id: "linear-equations",
          title: "Linear Equations",
          description: "Solve and graph equations in the form y = mx + b",
          content: `
            <h3>Learning Objective</h3>
            <p>Master solving and graphing linear equations in the form y = mx + b for SAT math questions.</p>
            
            <h3>Understanding Linear Equations</h3>
            <p>A linear equation is a first-degree equation that forms a straight line when graphed. The standard form is y = mx + b, where:</p>
          `,
          completed: true,
        },
        {
          id: "quadratic-equations",
          title: "Quadratic Equations",
          description: "Master equations in the form ax² + bx + c = 0",
          content: `
            <h3>Learning Objective</h3>
            <p>Learn to solve quadratic equations using multiple methods and understand their applications on the SAT.</p>
          `,
          completed: true,
        },
      ],
    },
  };
  
  export const allTopicsData = {
    reading: readingTopicsData,
    math: mathTopicsData,
  };