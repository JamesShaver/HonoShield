export const contactPage = () => `
  <section class="container pt-3">
    <h1>Contact Us</h1>
        <p>If you have any questions, need assistance, or would like to contribute to our project, please visit our GitHub page.</p>
        <p>We welcome you to:</p>
        <ul>
            <li><strong>Submit Issues:</strong> Report bugs or suggest new features by opening an issue.</li>
            <li><strong>Make Pull Requests:</strong> Contribute directly to the project by submitting a pull request.</li>
            <li><strong>Ask Questions:</strong> Engage with the community by participating in discussions.</li>
        </ul>

        <div class="d-flex align-items-center">
          <div class="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"></path>
            </svg>
          </div>
          <div class="flex-grow-1 ms-3">
            <p>Visit our GitHub repository here: <a href="https://github.com/YourRepositoryName" target="_blank">GitHub Repository</a></p>
                <p>We appreciate your feedback and contributions to make our project better!</p>
          </div>
        </div>
  </section>
`;

export const javaScript = (nonce) => `<script nonce="${nonce}"></script>`;