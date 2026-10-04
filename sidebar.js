const vscode = require('vscode');

class SidebarProvider {
  constructor(extensionUri) {
    this.extensionUri = extensionUri;
  }

  resolveWebviewView(webviewView) {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionUri]
    };

    webviewView.webview.html = this.getHtml();

    webviewView.webview.onDidReceiveMessage(async (message) => {
      if (message.command === 'open') {
        const tool = message.tool || '';
        const baseUrl = tool
          ? `https://traffictorch.net/${tool}/`
          : 'https://traffictorch.net/';

        const editor = vscode.window.activeTextEditor;
        let content = '';

        if (editor) {
          content = !editor.selection.isEmpty
            ? editor.document.getText(editor.selection)
            : editor.document.getText();
        }

        const trimmed = content.trim();

        // NUSA tool (home) is URL-only – open clean page and show a short tip
        if (!tool) {
          vscode.window.showInformationMessage(
            'NUSA Tool accepts a URL only. Paste your page URL into the tool.',
            { modal: false }
          );
          vscode.env.openExternal(vscode.Uri.parse(baseUrl));
          return;
        }

        if (trimmed.length > 8000) {
          await vscode.env.clipboard.writeText(trimmed);

          vscode.window.showInformationMessage(
            '✅ Large HTML copied to clipboard!',
            {
              modal: true,
              detail: 'Click "Continue". Then paste (Cmd/Ctrl + V) into the textarea and click Analyze.'
            },
            'Continue'
          ).then(selection => {
            if (selection === 'Continue') {
              vscode.env.openExternal(vscode.Uri.parse(baseUrl));
            }
          });
        }
        else if (trimmed.length > 0) {
          const encoded = encodeURIComponent(trimmed);
          const finalUrl = baseUrl + `?input=${encoded}`;
          vscode.env.openExternal(vscode.Uri.parse(finalUrl));
        } else {
          // No content – just open the tool
          vscode.env.openExternal(vscode.Uri.parse(baseUrl));
        }
      }
    });
  }

  getHtml() {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: var(--vscode-font-family, system-ui, sans-serif);
            padding: 16px;
            margin: 0;
            color: var(--vscode-foreground);
            background-color: var(--vscode-sideBar-background);
          }
          h2 { margin: 0 0 12px 0; color: var(--vscode-foreground); font-size: 18px; }
          .tagline {
            font-size: 13px;
            color: var(--vscode-descriptionForeground);
            margin-bottom: 20px;
            line-height: 1.4;
          }
          ul { list-style: none; padding: 0; margin: 0; }
          li { margin-bottom: 9px; }
          button, a.button-link {
            display: block; width: 100%; padding: 12px 14px; font-size: 14px;
            text-align: left; cursor: pointer; border: none; border-radius: 6px;
            font-weight: 500; transition: all 0.1s ease;
          }
          button { background: var(--vscode-button-background); color: var(--vscode-button-foreground); }
          button:hover { background: var(--vscode-button-hoverBackground); }
          .plain-link {
            background: transparent;
            color: var(--vscode-textLink-foreground);
            border: 1px solid var(--vscode-button-background);
          }
          .plain-link:hover {
            background: var(--vscode-button-hoverBackground);
            color: var(--vscode-button-foreground);
          }
        </style>
      </head>
      <body>
        <h2>🚥 Traffic Torch Audit Tools</h2>
        <p class="tagline">
          Instant SEO • GEO • AEO • UX Health Analysis &amp; Audits<br>
          <strong>How it works:</strong><br>
          • Select text or small files → auto-fills &amp; runs<br>
          • Large files → copied to clipboard + clear instructions<br>
          • NUSA Tool (home) is URL-only
        </p>

        <ul>
          <li><button onclick="openTool('')">📈 NUSA Tool (Home)</button></li>
          <li><button onclick="openTool('lighthouse-plus-tool')">🗼 Lighthouse Plus</button></li>
          <li><button onclick="openTool('aeo-performance-tool')">🚀 AEO Performance</button></li>
          <li><button onclick="openTool('seo-ux-tool')">⚖️ SEO + UX</button></li>
          <li><button onclick="openTool('topical-authority-audit-tool')">⚜️ Topical Authority Audit</button></li>
          <li><button onclick="openTool('seo-entity-extractor-tool')">🧬 SEO Entity Extractor Tool</button></li>
          <li><button onclick="openTool('seo-intent-tool')">🎯 SEO Intent Tool</button></li>
          <li><button onclick="openTool('local-seo-tool')">📍 Local SEO Tool</button></li>
          <li><button onclick="openTool('product-seo-tool')">🛒 Product SEO Tool</button></li>
          <li><button onclick="openTool('ai-search-optimization-tool')">🔍 AI Search Optimization Tool</button></li>
          <li><button onclick="openTool('ai-voice-search-tool')">🎙️ AI Voice Search Tool</button></li>
          <li><button onclick="openTool('ai-audit-tool')">🤖 AI Content Audit Tool</button></li>
          <li><button onclick="openTool('quit-risk-tool')">⛔ Quit Risk UX Tool</button></li>
          <li><button onclick="openTool('keyword-research-tool')">🔑 Keyword Research Tool</button></li>
          <li><button onclick="openTool('keyword-tool')">🗝️ Keyword Placement Tool</button></li>
          <li><button onclick="openTool('keyword-vs-tool')">🆚 Keyword vs Tool</button></li>
          <li><button onclick="openTool('schema-generator')">⚙️ Schema Generator</button></li>
        </ul>

        <script>
          const vscode = acquireVsCodeApi();
          function openTool(tool) {
            vscode.postMessage({ command: "open", tool: tool });
          }
        </script>
      </body>
      </html>
    `;
  }
}

module.exports = SidebarProvider;