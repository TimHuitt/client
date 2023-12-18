import { useState, useEffect } from 'react'
import beautify from 'js-beautify'
import projects from '../../assets/projects.js'
import './Componenter.css'

const Componenter = ({ exclusions }) => {
  const [currentHtml, setHtml] = useState('')
  const [currentStyle, setStyles] = useState('')
  const [ currentRequest, setRequest ] = useState('')
  // get the html/style for the current page and set state
  const htmlContent = () => {
    const body = document.querySelector('body')
    const htmlContent = body ? body.innerHTML : ''
    const cssStyles = document.documentElement.innerHTML

    const cleanedHtml = cleanHtml(htmlContent, exclusions)
    const cleanedStyles = cleanStyles(cssStyles)
    
    setHtml(cleanedHtml)
    setStyles(cleanedStyles)
  }

  // format html for display (breaks/indentation)
  const formatHtml = (html) => {
    return beautify.html(html, {
      indent_size: 2,
      wrap_line_length: 80,
      max_preserve_newlines: 1,
    })
  }

  // clean html of exclusions exclusions:
  // if an element className includes 'exclude'
  // the element and it's content are excluded from output

  // partial exclusion
  const cleanHtml = (html) => {
    const regexExcludeClass = /(<[^>]*\sclass\s*=\s*['"]([^'"]*exclude[^'"]*)['"][^>]*>)[\s\S]*?(<\/[^>]*>)/g;
    const cleanedHtml = html.replace(regexExcludeClass, '$1$3');
    const scriptIndex = cleanedHtml.lastIndexOf('<script');

    return formatHtml(cleanedHtml.substring(0, scriptIndex));
  };

  // completely exclusion
  // const cleanHtml = (html) => {
  //   const regexExcludeClass = /<[^>]*\sclass\s*=\s*['"]([^'"]*exclude[^'"]*)['"][^>]*>[\s\S]*?<\/[^>]*>/g
  //   const cleanedHtml = html.replace(regexExcludeClass, '')
  //   const scriptIndex = cleanedHtml.lastIndexOf('<script')
  //   
  //   return formatHtml(cleanedHtml.substring(0, scriptIndex))
  // }

  // exclude non <style> data and remove comments
  const cleanStyles = (css) => {
    const styleRegex = /<style\b[^>]*>(.*?)<\/style>/gs
    const matches = css.match(styleRegex)
  
    if (matches) {
      const cleanedMatches = matches.map(match => match.replace(/\/\*[\s\S]*?\*\//g, ''))
      return cleanedMatches
    }
  
    return null
  }

  // make api request with updated state data
  const handleRequest = () => {
    console.log(baseRequest, currentRequest, currentHtml)
  }

  useEffect(() => {
    htmlContent()
  }, [])

  const handleChange = (e) => {
    e.preventDefault()
    setRequest(e.target.value)
  }

  const handleClick = (e) => {
    handleRequest()
  }

  return (
    <>
      {/* create the display window */}
      <div id="content-creator">
        <div>
          <input type="text" value={currentRequest} onChange={handleChange} placeholder="Enter a request for a custom element or component"></input>
          <button onClick={handleClick}>Generate</button>
        </div>
        <pre>
          {currentHtml ? `Review the details below for accuracy and privacy concerns.
If the contents of an element should be excluded, add the 'exclude' class to the element.
Click Generate to send the request and receive the auto component AI generated code.

User Request:\n    ` 
              + currentRequest 
              + "\n\nUser HTML:\n" 
              + currentHtml : ''
            }
          {/* {currentStyle ? currentStyle : ''} */}
        </pre>
      </div>

  

    </>
  )
}

export default Componenter
