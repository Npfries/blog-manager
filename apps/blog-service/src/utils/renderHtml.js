import dp from "isomorphic-dompurify";

const renderHtml = (id, post) => {
  const title = dp.sanitize(post.title);
  const content = dp.sanitize(post.content);

  return `
    <html>
      <head>
        <style>
          body {
            font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
          }
          .content {
            max-width: 800px;
            margin: auto;
          }
        </style>
      </head>
      <body>
        <div class="content">
          <h1>${title}</h1>
          ${content}
          <div id="comment-section"></div>
          <script>
            const html = '<iframe src="http://comment-mfe.localhost.com?id=${id}" frameBorder="0" loading="lazy" width="100%" height="90%"/>'
            document.getElementById('comment-section').innerHTML = html
          </script>
        </div>
      </body>
    </html>`;
};

export default renderHtml;
