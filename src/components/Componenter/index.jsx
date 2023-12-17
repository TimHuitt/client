import { useState, useEffect } from 'react';
import beautify from 'js-beautify';
import projects from '../../assets/projects.js'

const Componenter = ({ exclusions }) => {
  const [html, setHtml] = useState('');
  const [styles, setStyles] = useState('');

  // get the html for the current page and set state
  const htmlContent = () => {
    const body = document.querySelector('body');

    const htmlContent = body ? body.innerHTML : '';
    const cssStyles = document.documentElement.innerHTML;

    const cleanedHtml = cleanHtml(htmlContent, exclusions);

    setHtml(cleanedHtml);
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

  // remove any element that has the className 'exclude'
  const cleanHtml = (html) => {
    const regexExcludeClass = /<[^>]*\sclass\s*=\s*['"]([^'"]*exclude[^'"]*)['"][^>]*>[\s\S]*?<\/[^>]*>/g;
    const cleanedHtml = html.replace(regexExcludeClass, '');
    const scriptIndex = cleanedHtml.lastIndexOf('<script');

    return formatHtml(cleanedHtml.substring(0, scriptIndex));
  };


  useEffect(() => {
    htmlContent();
  }, []);

  const baseRequest = {
    Task: `Create an element/component to replace the pre element with id 'content-creator'. Your returned code will be placed within a React component's return() statement. Follow the guidelines EXTREMELY STRICTLY`,
    Requirement: `Find the pre element with id in the baseHtml 'content-creator' and provide ONLY the element that fits within it's place`,
    Guidelines: [
      `ONLY respond with the CODE you create. Do not provide any additional details or notes about your code, decision making, final product, etc., before OR after the code statement.`,
      `ONLY respond with code that belongs inside the React fragment.`,
      `Do not include anything other than the necessary elements. This means NO comments, NO opening/closing text explaining the element, etc.`,
      `NEVER include top-level elements like root or App. All elements should fit within the jsx fragments.`,
      `Ensure seamless integration into the existing code and only use react-based styling, i.e., style={{display:'flex'}}.`,
      `Adhere STRICTLY to the provided guidelines and constraints.`,
      `If using colors, guarantee visibility of font colors with selected background colors.`,
      `In case of inability to meet constraints or need to provide data that does not fit within the return() statement, ALWAYS respond with an error message.`,
    ],
  }

  const baseHtml = {html: `
    <div id="root">
      <div class="App">
        <header style="height: 360px; overflow: hidden;">
          <nav class="Nav"><a href="/"><img
                src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"></a>
            <div class="text-amber-900">People App</div>
          </nav><img
            src="https://media.istockphoto.com/photos/group-portrait-of-a-creative-business-team-standing-outdoors-three-picture-id1146473249?b=1&amp;k=20&amp;m=1146473249&amp;s=612x612&amp;w=0&amp;h=-q1guVCuei7X3BFKwWC2bLUOX8BeIaC04pG5s_xfn_c="
            style="width: 100%;">
        </header>
        <main class="container">
          <section>
            <pre id="content-creator" style="text-align: left;"></pre>
      </div>
      <div id="not-secret-element">included</div>
      <div class="people-list"><a href="/people/657b3190c1c17837b37b433c">
          <div>
            <h3>shimmy shaq edit 4</h3><img class="profile-image"
              src="https://i.giphy.com/l3q2RJBdaqJY2SV3O.webp"
              alt="Image of shimmy shaq edit 4">
            <p>destroyer of worlds (and lunches)</p>
          </div>
        </a><a href="/people/657b5479f812f41134cc87b5">
          <div>
            <h3>Shimmy?</h3><img class="profile-image"
              src="https://i.pinimg.com/originals/12/c8/00/12c800aaca044f40c1402d24b5dabfd8.gif"
              alt="Image of Shimmy?">
            <p></p>
          </div>
        </a></div>
      </section>
      </main>
    </div>
  `};
  
  const request = `create a card component that will take data from a variable called 'projects' and display the data in a nicely displayed format, there should be no overflow of elements, and has the following structure: {
    "title": "Cats, Bats, and Owls",
    "description": "Spooky twist on the class Rock, Paper, Scissors game. Features animated pieces with result based reactions and persistent score keeping.",
    "images": ["https://i.imgur.com/LflnR9g.png", "https://i.imgur.com/L6JeBny.png", "https://i.imgur.com/PkorTRn.png"],
    "gitLink": "https://github.com/TimHuitt/battleship",
    "deployLink": "https://timhuitt.github.io/battleship/"
  },`

  return (
    <>
    <pre id="content-creator" style={{ textAlign: 'left' }}>
      {html ? html : ''}
    </pre>
    
    {/* {projects.map((project, index) => (
      <div key={index} style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          {project.images.map((image, imgIndex) => (
            <img key={imgIndex} src={image} alt={`Project Image ${imgIndex + 1}`} style={{ width: '100%', maxWidth: '150px', marginBottom: '8px' }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <a href={project.gitLink} style={{ color: 'blue' }}>GitHub</a>
          <a href={project.deployLink} style={{ color: 'green' }}>Deployed</a>
        </div>
      </div>
    ))} */}


    </>
  );
};

export default Componenter;
