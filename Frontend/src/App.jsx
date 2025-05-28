import { useState, useEffect } from 'react'
import "prismjs/themes/prism-okaidia.css"
import Editor from "react-simple-code-editor"
import prism from 'prismjs'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
import axios from 'axios'
import './App.css'

function App() {

  useEffect(() => {
    prism.highlightAll();
  }, []);

  const [code, setcode] = useState('function sum() {\n  return 1 + 1;\n}')
  const [review, setreview] = useState('')
  const [loading, setLoading] = useState(false);


  async function reviewCode() {
    setLoading(true);  // Start loading
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code });
      // Assuming it's a string content inside `response.data.response`
      setreview(response.data.response);
      console.log(response.data.response);
    }
    catch (error) {
      // console.error("Error fetching review:", error);
      setreview("Error fetching review. Check console.");
    }
    finally {
      setLoading(false);  // Stop loading
    }
  }

  return (
    <>
      <main>
        <div className='left'>
          <div className='code'>
            <Editor
              value={code}
              onValueChange={setcode}
              highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                border: '1px solid #ddd',
                borderRadius: '5px',
                backgroundColor: '#000000',
                height: '100%',
                width: '100%',
                // overflow: 'auto',
                color: '#abb2bf'
              }}
            />
          </div>
          <div className='review' onClick={reviewCode}>Review</div>
        </div>
        <div className='right'>
          {loading ? (
            <div className="loader">⏳ Loading review...</div>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          )}
        </div>

      </main>
    </>
  )
}

export default App
