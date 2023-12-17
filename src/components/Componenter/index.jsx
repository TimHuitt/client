import { useState, useEffect } from 'react';
import beautify from 'js-beautify';
import projects from '../../assets/projects.js'

const Componenter = ({ exclusions }) => {
  const [html, setHtml] = useState('');
  const [styles, setStyles] = useState('');

  // get the html/style for the current page and set state
  const htmlContent = () => {
    const body = document.querySelector('body');
    const htmlContent = body ? body.innerHTML : '';
    const cssStyles = document.documentElement.innerHTML;

    const cleanedHtml = cleanHtml(htmlContent, exclusions);
    const cleanedStyles = cleanStyles(cssStyles)
    
    setHtml(cleanedStyles);
    setStyles(cssStyles);
  };

  // format html for display (breaks/indentation)
  const formatHtml = (html) => {
    return beautify.html(html, {
      indent_size: 2,
      wrap_line_length: 80,
      max_preserve_newlines: 1,
    });
  };

  // exclusions:
  // if an element className includes 'exclude'
  // the element and it's content are excluded from output
  const cleanHtml = (html) => {
    const regexExcludeClass = /<[^>]*\sclass\s*=\s*['"]([^'"]*exclude[^'"]*)['"][^>]*>[\s\S]*?<\/[^>]*>/g;
    const cleanedHtml = html.replace(regexExcludeClass, '');
    const scriptIndex = cleanedHtml.lastIndexOf('<script');

    return formatHtml(cleanedHtml.substring(0, scriptIndex));
  };

  // remove non-style data from source
  const cleanStyles = (css) => {
    const styleRegex = /<style\b[^>]*>(.*?)<\/style>/gs;
    const matches = css.match(styleRegex);
    return matches
  }

  // base instruction for AI
  const baseRequest = {
    Task: `Create an element/component to replace the pre element with id 'content-creator'. Your returned code will be placed within a React component's return() statement. Follow the guidelines EXTREMELY STRICTLY`,
    Requirement: `Find the pre element with id'content-creator' in the baseHtml and provide ONLY the element that fits within it's place`,
    Guidelines: [
      `ONLY respond with the CODE you create. Do not provide any additional details or notes about your code, decision making, final product, etc., before OR after the code statement.`,
      `ONLY respond with code that belongs inside the React fragment.`,
      `Do not include anything other than the necessary elements. This means NO comments, NO opening/closing text explaining the element, etc.`,
      `NEVER include top-level elements like root or App. All elements should fit within the jsx fragments.`,
      `Ensure seamless integration into the existing code and only use react-based styling, i.e., style={{display:'flex'}}.`,
      `If using colors, guarantee visibility of font colors with selected background colors.`,
      `In case of inability to meet constraints or need to provide data that does not fit within the return() statement, ALWAYS respond with an error message.`,
      `ALWAYS Adhere STRICTLY to the provided guidelines and constraints.`,
    ],
  }

  // user instruction for AI
  const userRequest = ``


  useEffect(() => {
    htmlContent();
    handleRequest(baseRequest, userRequest, html)
  }, []);


  const handleRequest = (base, request, html) => {

  }


  return (
    <>
    <pre id="content-creator" style={{ textAlign: 'left' }}>
      {html ? html : ''}
    </pre>
    
    </>
  );
};

export default Componenter;
