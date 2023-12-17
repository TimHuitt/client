import { useState, useEffect } from 'react';
import beautify from 'js-beautify';

const Componenter = ({ exclusions }) => {
  const [html, setHtml] = useState('');
  const [styles, setStyles] = useState('');

  const htmlContent = () => {
    const body = document.querySelector('body');

    const htmlContent = body ? body.innerHTML : '';
    const cssStyles = document.documentElement.innerHTML;

    const cleanedHtml = cleanHtml(htmlContent, exclusions);

    setHtml(cleanedHtml);
    setStyles(cssStyles);
  };

  const formatHtml = (html) => {
    return beautify.html(html, {
      indent_size: 2,
      wrap_line_length: 80,
      max_preserve_newlines: 1,
    });
  };

  const cleanHtml = (html) => {
    const regexExcludeClass = /<[^>]*\sclass\s*=\s*['"]([^'"]*exclude[^'"]*)['"][^>]*>[\s\S]*?<\/[^>]*>/g;
    const cleanedHtml = html.replace(regexExcludeClass, '');
    const scriptIndex = cleanedHtml.lastIndexOf('<script');

    return formatHtml(cleanedHtml.substring(0, scriptIndex));
  };

  useEffect(() => {
    htmlContent();
  }, []);

  return (
    <>
    <pre id="content-creator" style={{ textAlign: 'left' }}>
      {html ? html : ''}
    </pre>
    <div dangerouslySetInnerHTML={{__html: html}} />
    </>
  );
};

export default Componenter;
