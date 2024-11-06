export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  quiz: Quiz;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  lessons: Lesson[];
}

export const courses: Course[] = [
  {
    id: "html-fundamentals",
    title: "HTML Fundamentals",
    description: "Learn the basics of HTML and structure web content effectively",
    image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890",
    lessons: [
      {
        id: "html-intro",
        title: "Introduction to HTML",
        content: `
# Introduction to HTML

HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page semantically and originally included cues for the appearance of the document.

## Key Concepts

1. HTML elements are the building blocks of HTML pages
2. HTML elements are represented by tags
3. Tags label pieces of content such as "heading", "paragraph", "table", etc.
4. Browsers don't display the HTML tags, but use them to render the content

## Basic Structure

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
  </body>
</html>
\`\`\`
        `,
        quiz: {
          id: "html-intro-quiz",
          question: "What does HTML stand for?",
          options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language",
          ],
          correctAnswer: 0,
        },
      },
      // Add more lessons here
    ],
  },
  {
    id: "css-basics",
    title: "CSS Fundamentals",
    description: "Master the basics of styling web pages with CSS",
    image: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19",
    lessons: [
      {
        id: "css-intro",
        title: "Introduction to CSS",
        content: `
# Introduction to CSS

CSS (Cascading Style Sheets) is used to style and layout web pages. It can be used to alter the font, color, size, and spacing of your content, split it into multiple columns, or add animations and other decorative features.

## Key Concepts

1. CSS describes how HTML elements should be displayed
2. CSS can control the layout of multiple web pages at once
3. External stylesheets are stored in CSS files

## Basic Syntax

\`\`\`css
selector {
  property: value;
}
\`\`\`

## Example

\`\`\`css
body {
  background-color: white;
  color: black;
}

h1 {
  color: blue;
  font-size: 24px;
}
\`\`\`
        `,
        quiz: {
          id: "css-intro-quiz",
          question: "What does CSS stand for?",
          options: [
            "Cascading Style Sheets",
            "Creative Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets",
          ],
          correctAnswer: 0,
        },
      },
      // Add more lessons here
    ],
  },
];