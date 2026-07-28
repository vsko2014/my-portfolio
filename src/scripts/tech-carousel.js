// Ícones disponíveis em: https://devicon.dev/
const DEVICON = (icon) =>
    `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}.svg`;

// Permite especificar uma cor (ex: 'white') quando necessário
const SIMPLE_ICON = (slug, color) =>
    `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ''}`;

const TECHS = [
    // Languages
    { name: 'C', url: DEVICON('c/c-original') },
    { name: 'C++', url: DEVICON('cplusplus/cplusplus-original') },
    { name: 'HTML5', url: DEVICON('html5/html5-original') },
    { name: 'CSS3', url: DEVICON('css3/css3-original') },
    { name: 'JavaScript', url: DEVICON('javascript/javascript-original') },
    { name: 'Markdown', url: SIMPLE_ICON('markdown', 'white') },

    // Frontend
    { name: 'React', url: DEVICON('react/react-original') },
    { name: 'Vite', url: DEVICON('vitejs/vitejs-original') },
    { name: 'Bootstrap', url: DEVICON('bootstrap/bootstrap-original') },

    // Backend
    { name: 'Node.js', url: DEVICON('nodejs/nodejs-original') },
    { name: 'Express.js', url: SIMPLE_ICON('express', 'white') },

    // Mobile
    { name: 'Flutter', url: DEVICON('flutter/flutter-original') },
    { name: 'Dart', url: DEVICON('dart/dart-original') },

    // DBMS
    { name: 'Microsoft SQL Server', url: DEVICON('microsoftsqlserver/microsoftsqlserver-plain') },
    { name: 'PostgreSQL', url: DEVICON('postgresql/postgresql-original') },
    { name: 'MongoDB', url: DEVICON('mongodb/mongodb-original') },

    // ORM
    { name: 'Sequelize', url: SIMPLE_ICON('sequelize') },

    // Hosting
    { name: 'Render', url: SIMPLE_ICON('render', 'white') },
    { name: 'Firebase', url: DEVICON('firebase/firebase-plain') },

    // Frameworks / Platforms / Libraries
    { name: 'NPM', url: DEVICON('npm/npm-original-wordmark') },
    { name: 'Nodemon', url: SIMPLE_ICON('nodemon') },
    { name: 'JWT', url: SIMPLE_ICON('jsonwebtokens', 'white') },
    { name: 'React Router', url: SIMPLE_ICON('reactrouter') },

    // IDEs / Editors
    { name: 'Visual Studio 2022', url: DEVICON('visualstudio/visualstudio-plain') },
    { name: 'Visual Studio Code', url: DEVICON('vscode/vscode-original') },
    { name: 'Android Studio', url: DEVICON('androidstudio/androidstudio-original') },
    { name: 'Arduino IDE', url: DEVICON('arduino/arduino-original') },
    { name: 'Doxygen', url: SIMPLE_ICON('doxygen', 'white') },

    // DevOps
    { name: 'Jira', url: DEVICON('jira/jira-original') },

    // Networking
    { name: 'Cisco', url: SIMPLE_ICON('cisco', 'white') },
];

export function initTechCarousel() {
    const track = document.querySelector('.tech-carousel__track');
    if (!track) return;

    const iconsHtml = TECHS.map(
        (t) =>
            `<img src="${t.url}" alt="${t.name}" title="${t.name}" class="tech-carousel__icon" loading="lazy" onerror="this.style.display='none'" />`
    ).join('');

    // Duplica a lista para o loop infinito ficar contínuo
    track.innerHTML = iconsHtml + iconsHtml;
}