import { useState, useEffect } from 'react'

const Componenter = ({ exclusions }) => {
  const [ html, setHtml ] = useState('')
  const [ styles, setStyles ] = useState('')

  const htmlContent = () => {

    const body = document.querySelector('body');
    const htmlContent = body ? body.innerHTML : ''
    const cssStyles = document.documentElement.innerHTML;
    const cleanedHtml = cleanHtml(htmlContent, exclusions)

    setHtml(htmlContent);
    setStyles(cssStyles)
  }

  const cleanHtml = (html, exclusions) => {
    
    const regexExcludeClass = /<[^>]*\sclass\s*=\s*['"]([^'"]*exclude[^'"]*)['"][^>]*>[\s\S]*?<\/[^>]*>/g;
    html = html.replace(regexExcludeClass, '');

    return html;
  }


  useEffect(() => {
    htmlContent()
  },[])

  return (
    <pre id="content-creator">
        {html ? html : ''}
    </pre>
  )

}

export default Componenter