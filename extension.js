const vscode = require('vscode');
const SidebarProvider = require('./sidebar');

function activate(context) {
  console.log('🚀 Traffic Torch extension activating...');

  // Sidebar registration
  const provider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'trafficTorch.sidebar',
      provider,
      { webviewOptions: { retainContextWhenHidden: true } }
    )
  );

  // Right-click context menu command with tool selector + selection handling
  const auditHtmlCommand = vscode.commands.registerCommand('trafficTorch.auditHtml', async (uri) => {
    let content = '';

    const editor = vscode.window.activeTextEditor;

    if (editor && !editor.selection.isEmpty) {
      content = editor.document.getText(editor.selection);
    }
    else if (uri) {
      const document = await vscode.workspace.openTextDocument(uri);
      content = document.getText();
    }
    else if (editor) {
      content = editor.document.getText();
    }

    if (!content.trim()) {
      vscode.window.showWarningMessage('No HTML content found.');
      return;
    }

    // Updated tool list (Oct 2026)
    const tools = [
      { label: "📈 NUSA Tool (Home – URL only)",          tool: "" },
      { label: "🗼 Lighthouse Plus",                      tool: "lighthouse-plus-tool" },
      { label: "🚀 AEO Performance",                      tool: "aeo-performance-tool" },
      { label: "⚖️ SEO + UX",                             tool: "seo-ux-tool" },
      { label: "⚜️ Topical Authority Audit",              tool: "topical-authority-audit-tool" },
      { label: "🧬 SEO Entity Extractor Tool",            tool: "seo-entity-extractor-tool" },
      { label: "🎯 SEO Intent Tool",                      tool: "seo-intent-tool" },
      { label: "📍 Local SEO Tool",                       tool: "local-seo-tool" },
      { label: "🛒 Product SEO Tool",                     tool: "product-seo-tool" },
      { label: "🔍 AI Search Optimization Tool",          tool: "ai-search-optimization-tool" },
      { label: "🎙️ AI Voice Search Tool",                tool: "ai-voice-search-tool" },
      { label: "🤖 AI Content Audit Tool",                tool: "ai-audit-tool" },
      { label: "⛔ Quit Risk UX Tool",                    tool: "quit-risk-tool" },
      { label: "🔑 Keyword Research Tool",                tool: "keyword-research-tool" },
      { label: "🗝️ Keyword Placement Tool",               tool: "keyword-tool" },
      { label: "🆚 Keyword vs Tool",                      tool: "keyword-vs-tool" },
      { label: "⚙️ Schema Generator",                     tool: "schema-generator" }
    ];

    const selected = await vscode.window.showQuickPick(tools, {
      placeHolder: "Choose Traffic Torch tool to audit with",
      matchOnDescription: true
    });

    if (!selected) return;

    const baseUrl = selected.tool
      ? `https://traffictorch.net/${selected.tool}/`
      : 'https://traffictorch.net/';

    const trimmed = content.trim();

    // NUSA is URL-only
    if (!selected.tool) {
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
    }
  });

  context.subscriptions.push(auditHtmlCommand);
  console.log('✅ Traffic Torch context menu with updated tools registered');
}

exports.activate = activate;