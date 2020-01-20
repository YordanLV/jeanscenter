<p align="center">
    <img alt="Gatsby" src="https://res.cloudinary.com/jeanscentre/image/fetch/f_auto,q_auto:good/https://jeanscentre-static.joggroup.net/sys-master/images/h7c/h9b/8796166258718/jcc_logo.png" width="100" />
</p>
<h1 align="center">
  Jeans Center Belgium Webshop
</h1>

Project stack:

- Gatsby (React).
- Mobx (for state).
- Emotion (for CSS).
- Bootstrap
- Prismic SDK (for headless CMS).
- Commercetools SDK
- Eslint
- Proptypes


## 🚀 Quick start
1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```sh
    npm i
    npm start
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

## 🧐 What's inside?

A quick look at the important top-level files and directories you'll see in a Gatsby project.

1.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

2.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/).

3.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. Many different plug-ins configurations and settings can be found here.

4.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process. This is the place where all GraphQL/Rest queries are done, before filled in the interernal GraphQL storage.

5. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t be changing this file directly).**

6. **`.babelrc`**: Babel additional settings, presets and plug-ins.

7. **`.env.development / .env.production`**: Development / production enviroment settings for API, SDKs and plug-ins.

8. **`.eslintrc.js`**: Custom eslint rules for common code style.

9. **`buildspec.yml / cf-template.yml`**: Related files to the deployment on AWS Codebuild / S3.

10. **`mobx-provider.js`**: Inserts mobx provider to all pages and access to the stores.

11. **`buildspec.yml / cf-template.yml`**:

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-default)
