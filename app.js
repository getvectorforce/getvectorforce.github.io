/* ==========================================================================
   VectorForce Official Website — Interactive Controller
   Pure Vanilla JS | Zero External Runtime Dependencies | GitHub Pages Ready
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Theme Toggle (Dark / Light Mode)
     ------------------------------------------------------------------------ */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      htmlEl.classList.toggle('light');
      const isLight = htmlEl.classList.contains('light');
      themeToggleBtn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
      themeToggleBtn.innerHTML = isLight
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    });
  }

  /* ------------------------------------------------------------------------
     2. Copy-to-Clipboard Handler
     ------------------------------------------------------------------------ */
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy');
      if (!text) return;
      const originalHtml = btn.innerHTML;
      try {
        await navigator.clipboard.writeText(text);
        btn.innerHTML = '✓ Copied!';
        btn.style.borderColor = '#10b981';
        btn.style.color = '#34d399';
      } catch (_) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        btn.innerHTML = '✓ Copied!';
      }
      setTimeout(() => {
        btn.innerHTML = originalHtml;
        btn.style.borderColor = '';
        btn.style.color = '';
      }, 1800);
    });
  });

  /* ------------------------------------------------------------------------
     3. Demo Video Placeholder & Interactive Chapter Walkthrough
     ------------------------------------------------------------------------ */
  const videoChapters = [
    {
      time: '00:00',
      title: '1. The Problem: Coding Agent Amnesia',
      output: `<span style="color:#fb7185"># Without VectorForce: Switching from Antigravity to Command Code</span>
$ claude / command-code
> "Continue working on the OAuth PKCE task"
<span style="color:#f59e0b">⚠️ Agent has zero memory of prior session:</span>
  ✗ Forgot invariant constraint: "Zero external runtime dependencies"
  ✗ Unaware that src/policy/authorizer.js was modified 10 mins ago
  ✗ Re-introduces npm package violating ADR-002 security boundary`
    },
    {
      time: '00:45',
      title: '2. Initialize VectorForce & Capture Checkpoint',
      output: `<span style="color:#34d399">$ vf init && vf task auth-module "Implement PKCE OAuth"</span>
✔ Initialized local SQLite WAL store (.vectorforce/vectorforce.db)

<span style="color:#34d399">$ vf checkpoint --task auth-module \\</span>
  --summary "Completed PKCE handshake & SHA-256 verifier" \\
  --constraint "Zero external backend runtime dependencies" \\
  --decision "DEC-AUTH-01:PKCE:Use native node:crypto SHA-256" \\
  --doc "AGENTS.md"
<span style="color:#818cf8">✔ Checkpoint committed [status: "committed", sha256: "e8a9c4...71b2"]</span>`
    },
    {
      time: '01:30',
      title: '3. Automatic Workspace Drift Detection',
      output: `<span style="color:#34d399">$ vf drift --task auth-module</span>
<span style="color:#fbbf24">⚠️ WORKSPACE DRIFT DETECTED:</span>
  • Git HEAD drifted: f49b312 → aa38b09 (branch: main)
  • Allowlisted doc AGENTS.md: <span style="color:#34d399">VERIFIED (SHA-256 unchanged)</span>
  • Modified symbol: authorizeDocumentRequest() in src/policy/authorizer.js`
    },
    {
      time: '02:15',
      title: '4. Cross-Harness Resume & AI Memory Reasoning',
      output: `<span style="color:#34d399">$ vf reason --task auth-module</span>
<span style="color:#c084fc">🧠 VectorForce AI Memory (Meta Muse / Llama Reasoning):</span>
  • <strong>Where You Left Off:</strong> PKCE challenge verified in commit aa38b09.
  • <strong>Invariant Constraints:</strong> MUST keep zero external runtime dependencies.
  • <strong>Ranked Next Action #1:</strong> Implement refresh token rotation in src/operations/
  • <strong>Evidence Fence:</strong> Claims separated from cryptographic Git/Doc hashes.`
    },
    {
      time: '03:10',
      title: '5. VectorForce Studio & Safe Team Handoff',
      output: `<span style="color:#34d399">$ vf studio</span>
<span style="color:#22d3ee">🚀 VectorForce Studio running at http://127.0.0.1:3210</span>
  • Project Health Score: <span style="color:#34d399">98/100 (Optimal)</span>
  • Interactive Topology Graph: 6 core modules indexed, 0 policy violations
  • Safe Handoff Bundle exported for teammate without leaking .env or keys`
    }
  ];

  const simScreen = document.getElementById('video-sim-screen');
  const simTitle = document.getElementById('video-sim-title');
  const chapterBtns = document.querySelectorAll('.chapter-btn');
  const playDemoBtn = document.getElementById('play-demo-btn');
  let activeChapterIndex = 0;
  let autoPlayTimer = null;

  function renderVideoChapter(index) {
    activeChapterIndex = index;
    const item = videoChapters[index];
    if (simTitle) simTitle.textContent = item.title;
    if (simScreen) simScreen.innerHTML = item.output;
    chapterBtns.forEach((b, i) => {
      b.classList.toggle('active', i === index);
    });
  }

  chapterBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
      renderVideoChapter(idx);
    });
  });

  if (playDemoBtn) {
    playDemoBtn.addEventListener('click', () => {
      const nativeVideo = document.getElementById('vf-demo-video');
      if (nativeVideo && nativeVideo.querySelector('source') && nativeVideo.querySelector('source').getAttribute('src')) {
        nativeVideo.style.display = 'block';
        nativeVideo.play();
        return;
      }

      // Interactive auto-walkthrough across chapters when placeholder is active
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
        playDemoBtn.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>';
        return;
      }

      playDemoBtn.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
      renderVideoChapter((activeChapterIndex + 1) % videoChapters.length);
      autoPlayTimer = setInterval(() => {
        const next = (activeChapterIndex + 1) % videoChapters.length;
        renderVideoChapter(next);
      }, 3200);
    });
  }

  /* ------------------------------------------------------------------------
     4. Interactive VectorForce Studio Topology & Inspector
     ------------------------------------------------------------------------ */
  const topologyNodes = {
    mcp: {
      name: 'src/mcp/mcp-server.js',
      layer: 'Harness Bridge Layer (JSON-RPC stdio)',
      status: 'VERIFIED • ZERO DRIFT',
      statusColor: '#34d399',
      blastRadius: 'High (4 AI Harnesses: Antigravity, Command Code, Muse, Codex)',
      adr: 'ADR-004 & ADR-012: Multi-Harness MCP Protocol',
      details: 'Exposes 9 deterministic tools over JSON-RPC stdio. Enforces destination harness authorization before serving briefings.'
    },
    reasoning: {
      name: 'src/operations/reasoning-service.js',
      layer: 'AI Memory & Reasoning Layer',
      status: 'ACTIVE • META MUSE / LLAMA READY',
      statusColor: '#c084fc',
      blastRadius: 'Medium (Briefing & Studio AI Console)',
      adr: 'ADR-013: AI Reasoning & Provider Authorization',
      details: 'Synthesizes where work left off, what changed since the last checkpoint, architectural risks, and ranked next actions. Gracefully degrades when offline.'
    },
    authorizer: {
      name: 'src/policy/authorizer.js',
      layer: 'Security & Zero-Leak Policy Boundary',
      status: 'ENFORCED • STRICT ALLOWLIST',
      statusColor: '#34d399',
      blastRadius: 'Critical (All Document & Handoff Operations)',
      adr: 'ADR-002 & ADR-011: Disclosure Boundaries',
      details: 'Blocks path traversal (..), symlinks, binary NUL files, and non-allowlisted files. Ensures receipts never contain raw document contents or secrets.'
    },
    sqlite: {
      name: 'src/storage/sqlite-store.js',
      layer: 'Immutable Local Persistence',
      status: 'WAL MODE • ACID VERIFIED',
      statusColor: '#38bdf8',
      blastRadius: 'Critical (Checkpoints, Tasks, Receipts, Policies)',
      adr: 'ADR-010: Local Prototype Foundation (node:sqlite)',
      details: 'Uses native Node.js 22+ SQLite in Write-Ahead Logging (WAL) mode. Zero external npm database dependencies.'
    },
    handoff: {
      name: 'src/operations/handoff-service.js',
      layer: 'Cross-Harness & Team Handoff Engine',
      status: 'VERIFIED • SHA-256 MANIFEST',
      statusColor: '#fbbf24',
      blastRadius: 'Medium (Export / Import Bundles)',
      adr: 'ADR-006: Handoff Packages & Context Reconciliation',
      details: 'Exports selective, tamper-evident context bundles with preview mode and cryptographic manifest verification on import.'
    }
  };

  const topoNodeEls = document.querySelectorAll('[data-node]');
  const inspectorName = document.getElementById('inspector-name');
  const inspectorLayer = document.getElementById('inspector-layer');
  const inspectorStatus = document.getElementById('inspector-status');
  const inspectorBlast = document.getElementById('inspector-blast');
  const inspectorAdr = document.getElementById('inspector-adr');
  const inspectorDesc = document.getElementById('inspector-desc');

  topoNodeEls.forEach((nodeEl) => {
    nodeEl.addEventListener('click', () => {
      const key = nodeEl.getAttribute('data-node');
      const data = topologyNodes[key];
      if (!data) return;

      topoNodeEls.forEach((el) => el.classList.remove('selected'));
      nodeEl.classList.add('selected');

      if (inspectorName) inspectorName.textContent = data.name;
      if (inspectorLayer) inspectorLayer.textContent = data.layer;
      if (inspectorStatus) {
        inspectorStatus.textContent = data.status;
        inspectorStatus.style.color = data.statusColor;
      }
      if (inspectorBlast) inspectorBlast.textContent = data.blastRadius;
      if (inspectorAdr) inspectorAdr.textContent = data.adr;
      if (inspectorDesc) inspectorDesc.textContent = data.details;
    });
  });

  /* ------------------------------------------------------------------------
     5. Installation Guide — Harness Config Switcher
     ------------------------------------------------------------------------ */
  const harnessConfigs = {
    all: {
      label: 'Auto-Configure All Harnesses + Verify with vf status',
      code: `# 1. Auto-configure Antigravity, Claude Code, Command Code, Meta Muse & Codex:
npx vectorforce config install all

# 2. Check which MCP config files were created and verify readiness:
npx vectorforce status

# Note: You do NOT need to run "vf mcp" manually!
# Each AI tool reads its config file below and spawns the MCP server automatically.`
    },
    antigravity: {
      label: 'Google Antigravity (.agents/mcp_config.json + ~/.gemini/antigravity/mcp_config.json)',
      code: `# 1-Command Auto-Setup for Google Antigravity:
npx vectorforce config install antigravity

# What this creates/updates automatically:
#  • Workspace: .agents/mcp_config.json
#  • Global IDE: ~/.gemini/antigravity/mcp_config.json
{
  "mcpServers": {
    "vectorforce": {
      "command": "node",
      "args": ["/path/to/bin/vf.js", "mcp", "--workspace", "/your/project"]
    }
  }
}`
    },
    'command-code': {
      label: 'Claude Code & Command Code (.mcp.json)',
      code: `# 1-Command Auto-Setup for Claude Code & Command Code:
npx vectorforce config install command-code

# What this creates automatically in your project root:
#  • .mcp.json (Natively auto-detected by both Claude Code & Command Code!)
#  • commandcode.json

# Or register via CLI directly:
claude mcp add vectorforce -- npx -y vectorforce mcp
cmd mcp add --transport stdio vectorforce -- npx -y vectorforce mcp`
    },
    muse: {
      label: 'Meta Muse (.muse/mcp_config.json + ~/.config/muse/settings.json)',
      code: `# 1-Command Auto-Setup for Meta Muse:
npx vectorforce config install muse

# What this creates/updates automatically:
#  • Global Muse Settings: ~/.config/muse/settings.json (mcp_servers.vectorforce)
#  • Workspace Config:     .muse/mcp_config.json

# Optional: Enable Meta Muse AI Reasoning for "vf reason":
npx vectorforce config muse <YOUR_META_MUSE_API_KEY>`
    },
    codex: {
      label: 'OpenAI Codex (.codex/config.toml + ~/.codex/config.toml)',
      code: `# 1-Command Auto-Setup for OpenAI Codex CLI:
npx vectorforce config install codex

# What this creates/updates automatically:
#  • Workspace: .codex/config.toml
#  • Global:    ~/.codex/config.toml
[mcp_servers.vectorforce]
command = "node"
args = ["/path/to/bin/vf.js", "mcp"]
[mcp_servers.vectorforce.env]
VF_HARNESS = "codex"`
    },
    cursor: {
      label: 'Cursor IDE (.cursor/mcp.json + .cursorrules)',
      code: `# 1-Command Auto-Setup for Cursor IDE:
npx vectorforce config install cursor

# What this creates/updates automatically:
#  • Workspace: .cursor/mcp.json
#  • Rules:     .cursorrules (Agent continuity steering protocol)
{
  "mcpServers": {
    "vectorforce": {
      "command": "node",
      "args": ["/path/to/bin/vf.js", "mcp", "--workspace", "/your/project"]
    }
  }
}`
    },
    windsurf: {
      label: 'Windsurf Cascade (.windsurf/mcp_config.json + .windsurfrules)',
      code: `# 1-Command Auto-Setup for Windsurf Cascade:
npx vectorforce config install windsurf

# What this creates/updates automatically:
#  • Workspace: .windsurf/mcp_config.json
#  • Rules:     .windsurfrules (Cascade continuity instructions)
{
  "mcpServers": {
    "vectorforce": {
      "command": "node",
      "args": ["/path/to/bin/vf.js", "mcp", "--workspace", "/your/project"]
    }
  }
}`
    },
    copilot: {
      label: 'GitHub Copilot in VS Code (.vscode/mcp.json + .github/copilot-instructions.md)',
      code: `# 1-Command Auto-Setup for GitHub Copilot in VS Code:
npx vectorforce config install copilot

# What this creates/updates automatically:
#  • Workspace:    .vscode/mcp.json (Uses official 'servers' key)
#  • Instructions: .github/copilot-instructions.md
{
  "servers": {
    "vectorforce": {
      "command": "node",
      "args": ["/path/to/bin/vf.js", "mcp", "--workspace", "/your/project"]
    }
  }
}`
    },
    kiro: {
      label: 'Kiro IDE (.kiro/settings/mcp.json + kiro.json)',
      code: `# 1-Command Auto-Setup for Kiro IDE:
npx vectorforce config install kiro

# What this creates/updates automatically:
#  • Workspace: .kiro/settings/mcp.json
#  • Steering:  kiro.json
# Note: Automatically migrates any legacy .kiro/mcp.json entry.
{
  "mcpServers": {
    "vectorforce": {
      "command": "node",
      "args": ["/path/to/bin/vf.js", "mcp", "--workspace", "/your/project"]
    }
  }
}`
    }
  };

  const harnessTabBtns = document.querySelectorAll('[data-harness-tab]');
  const harnessCodeTitle = document.getElementById('harness-code-title');
  const harnessCodePre = document.getElementById('harness-code-pre');
  const harnessCopyBtn = document.getElementById('harness-copy-btn');

  harnessTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-harness-tab');
      const item = harnessConfigs[key];
      if (!item) return;

      harnessTabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      if (harnessCodeTitle) harnessCodeTitle.textContent = item.label;
      if (harnessCodePre) harnessCodePre.textContent = item.code;
      if (harnessCopyBtn) harnessCopyBtn.setAttribute('data-copy', item.code);
    });
  });

  /* ------------------------------------------------------------------------
     6. Installation Guide Step 5 — External Model Provider Switcher
        (Meta Muse 1st Priority, Fireworks AI muse-spark-open, OpenRouter, Ollama, OpenAI, Anthropic, BYOK)
     ------------------------------------------------------------------------ */
  const llmProviderConfigs = {
    muse: {
      label: 'Meta Muse Direct API + Open-Source Muse Spark Open (1st Priority Default)',
      code: `# Option A: Configure Meta Muse Direct API (api.meta.ai/v1 • muse-spark-1.3)
vf config muse <YOUR_API_KEY>
vf reason --task auth-module

# Option B: Use Open-Weights "Muse Spark Open" (1M Context) via Fireworks AI:
vf config fireworks <YOUR_FIREWORKS_API_KEY> accounts/fireworks/models/muse-spark-open
vf reason --task auth-module

# Option C: Use "Muse Spark Open" via OpenRouter:
vf config openrouter <YOUR_OPENROUTER_API_KEY> meta/muse-spark-open

# Launch VectorForce Studio Web Control Center on http://127.0.0.1:3210
vf studio`
    },
    fireworks: {
      label: 'Fireworks AI — Native Open-Weights Meta "Muse Spark Open" (1M Token Context)',
      code: `# 1. Configure Fireworks AI (defaults to accounts/fireworks/models/muse-spark-open)
vf config fireworks <YOUR_FIREWORKS_API_KEY>

# Or explicitly specify Meta Muse Spark Open or Llama 3.3 70B on Fireworks:
vf config fireworks <YOUR_FIREWORKS_API_KEY> accounts/fireworks/models/muse-spark-open
vf config fireworks <YOUR_FIREWORKS_API_KEY> accounts/fireworks/models/llama-v3p3-70b-instruct

# 2. Reason over active task memory + 1M token codebase context
vf reason --task auth-module

# 3. Launch VectorForce Studio Web Control Center on http://127.0.0.1:3210
vf studio`
    },
    openrouter: {
      label: 'OpenRouter — Meta Muse Spark Open (meta/muse-spark-open), DeepSeek, Claude & 200+ Models',
      code: `# 1. Use Open-Source Meta Muse Spark Open on OpenRouter (1M token context):
vf config openrouter <YOUR_OPENROUTER_API_KEY> meta/muse-spark-open

# Or use DeepSeek v4.1 Flash / Llama 3.3 70B / Claude 3.7 Sonnet:
vf config openrouter <YOUR_OPENROUTER_API_KEY> deepseek/deepseek-v4.1-flash-1017
vf config openrouter <YOUR_OPENROUTER_API_KEY> meta-llama/llama-3.3-70b-instruct

# 2. Run AI Memory Reasoning (or override model per-run with --model)
vf reason --task auth-module --model meta/muse-spark-open

# 3. Launch VectorForce Studio Web Control Center on http://127.0.0.1:3210
vf studio`
    },
    ollama: {
      label: 'Local Ollama — 100% Offline & Zero API Key Required',
      code: `# 1. Pull any local open-weights model in Ollama (llama3.1:8b, qwen2.5-coder, deepseek-r1)
ollama pull llama3.1:8b

# 2. Configure VectorForce to use Local Ollama (http://127.0.0.1:11434)
vf config ollama llama3.1:8b

# 3. Synthesize AI Engineering Memory narrative for your active task
vf reason --task auth-module

# 4. Launch VectorForce Studio Web Control Center on http://127.0.0.1:3210
vf studio`
    },
    openai: {
      label: 'OpenAI & Codex API (o3-mini, gpt-4.1, gpt-4o)',
      code: `# 1. Configure OpenAI API key and model (saved in .vectorforce/config.json)
vf config openai <YOUR_OPENAI_API_KEY> o3-mini

# Or use gpt-4.1 / gpt-4o:
vf config openai <YOUR_OPENAI_API_KEY> gpt-4.1

# 2. Reason over active task memory + workspace drift
vf reason --task auth-module

# 3. Launch VectorForce Studio Web Control Center on http://127.0.0.1:3210
vf studio`
    },
    anthropic: {
      label: 'Anthropic Claude API (claude-sonnet-4-20250514, claude-3-7-sonnet-latest)',
      code: `# 1. Configure Anthropic API key and Claude model
vf config anthropic <YOUR_ANTHROPIC_API_KEY> claude-sonnet-4-20250514

# Or configure via OpenRouter for unified billing:
vf config openrouter <YOUR_OPENROUTER_KEY> anthropic/claude-sonnet-4

# 2. Reason over active task memory + workspace drift
vf reason --task auth-module

# 3. Launch VectorForce Studio Web Control Center on http://127.0.0.1:3210
vf studio`
    },
    byok: {
      label: 'Custom BYOK — Fireworks, Groq, Together AI, LM Studio, vLLM, Azure',
      code: `# 1. Connect ANY OpenAI-compatible endpoint (Fireworks, Groq, Together, LM Studio, vLLM):
# Syntax: vf config byok <BASE_URL> <API_KEY> <MODEL>

# Example A — Fireworks AI (Meta Muse Spark Open):
vf config byok https://api.fireworks.ai/inference/v1 <FIREWORKS_KEY> accounts/fireworks/models/muse-spark-open

# Example B — Groq Cloud (Ultra-fast Llama 3.3 70B):
vf config byok https://api.groq.com/openai/v1 <GROQ_API_KEY> llama-3.3-70b-versatile

# Example C — Local LM Studio / vLLM Server:
vf config byok http://127.0.0.1:1234/v1 lm-studio qwen2.5-coder-14b

# 2. Run reasoning & launch VectorForce Studio on http://127.0.0.1:3210
vf reason --task auth-module
vf studio`
    }
  };

  const llmTabBtns = document.querySelectorAll('[data-llm-tab]');
  const llmCodeTitle = document.getElementById('llm-code-title');
  const llmCodePre = document.getElementById('llm-code-pre');
  const llmCopyBtn = document.getElementById('llm-copy-btn');

  llmTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-llm-tab');
      const item = llmProviderConfigs[key];
      if (!item) return;

      llmTabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      if (llmCodeTitle) llmCodeTitle.textContent = item.label;
      if (llmCodePre) llmCodePre.textContent = item.code;
      if (llmCopyBtn) llmCopyBtn.setAttribute('data-copy', item.code);
    });
  });

  /* ------------------------------------------------------------------------
     7. VectorForce Cloud Edition (Post-Diwali Nov 15 Launch) Preview & Interest Poll
     ------------------------------------------------------------------------ */
  const cloudPreviewConfigs = {
    mcp: {
      label: 'Zero-Install Cloud Subscription MCP (.mcp.json / Antigravity / Muse)',
      code: `{
  "mcpServers": {
    "vectorforce-cloud": {
      "serverUrl": "https://mcp.vectorforce.ai/v1/sse",
      "headers": {
        "Authorization": "Bearer vf_live_sub_98a7bc65...",
        "X-VF-Project-Id": "proj_bistroforce_prod",
        "X-VF-Developer": "rahul@company.com"
      }
    }
  }
}`
    },
    sync: {
      label: 'Two-Machine Context Sync & Developer Task Differentiation',
      code: `# Machine 1 (Office Workstation — Google Antigravity):
vf task assign pos-billing --dev rahul@company.com --role Backend
vf checkpoint --task pos-billing --summary "Completed GST engine & API"
vf push --cloud

# Machine 2 (Home Laptop or Teammate — Claude Code / Meta Muse):
vf pull --cloud
# ✔ Pulled latest checkpoint from Machine 1 + reconciled decisions automatically!`
    },
    deploy: {
      label: 'One-Command Cloud / Self-Hosted Service Deployment (vf deploy)',
      code: `# Deploy the entire VectorForce Multi-Project Hub + PM Interpreter Portal
# as a live service in 1 command (Docker / Railway / Render / Cloud VPC):
npx @vectorforce/cloud deploy --target docker --port 443

# ✔ Multi-Project Hub Online: https://vf.yourcompany.com
# ✔ PM & Customer Interpreter Portal Enabled (Web Login + Jira/Slack Upload)`
    }
  };

  const cloudTabBtns = document.querySelectorAll('[data-cloud-tab]');
  const cloudCodeTitle = document.getElementById('cloud-code-title');
  const cloudCodePre = document.getElementById('cloud-code-pre');
  const cloudCopyBtn = document.getElementById('cloud-copy-btn');

  cloudTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-cloud-tab');
      const item = cloudPreviewConfigs[key];
      if (!item) return;

      cloudTabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      if (cloudCodeTitle) cloudCodeTitle.textContent = item.label;
      if (cloudCodePre) cloudCodePre.textContent = item.code;
      if (cloudCopyBtn) cloudCopyBtn.setAttribute('data-copy', item.code);
    });
  });

  // Interest Level Radio Buttons
  const interestVoteBtns = document.querySelectorAll('#interest-level-group .vote-option-btn');
  let selectedInterestLevel = 'Yes - Ready to subscribe on Nov 15 launch';

  interestVoteBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      interestVoteBtns.forEach((b) => {
        b.classList.remove('selected');
        const radio = b.querySelector('.vote-radio');
        if (radio) radio.textContent = '';
      });
      btn.classList.add('selected');
      const activeRadio = btn.querySelector('.vote-radio');
      if (activeRadio) activeRadio.textContent = '✓';
      selectedInterestLevel = btn.getAttribute('data-interest-val') || selectedInterestLevel;
    });
  });

  // Feature Check Pills
  const featurePills = document.querySelectorAll('#cloud-feature-pills .feature-check-pill');
  featurePills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('active');
    });
  });

  // Interest Counter initialization
  const interestCounterEl = document.getElementById('cloud-interest-counter');
  let savedCount = parseInt(localStorage.getItem('vf_cloud_interest_count') || '48', 10);
  if (interestCounterEl) {
    interestCounterEl.textContent = `🔥 ${savedCount} Teams Interested`;
  }

  // Form Submission
  const cloudForm = document.getElementById('cloud-interest-form');
  const cloudSuccessBox = document.getElementById('cloud-interest-success');
  const cloudSubmitBtn = document.getElementById('cloud-submit-btn');
  const githubConfirmLink = document.getElementById('cloud-github-confirm');
  const mailtoConfirmLink = document.getElementById('cloud-mailto-confirm');

  if (cloudForm) {
    cloudForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = (document.getElementById('cloud-user-name')?.value || '').trim();
      const email = (document.getElementById('cloud-user-email')?.value || '').trim();
      const role = document.getElementById('cloud-user-role')?.value || 'Developer';
      const teamSize = document.getElementById('cloud-team-size')?.value || 'Solo Dev';
      const notes = (document.getElementById('cloud-user-notes')?.value || '').trim();

      const chosenFeatures = Array.from(
        document.querySelectorAll('#cloud-feature-pills .feature-check-pill.active')
      ).map((el) => el.getAttribute('data-feature-pill'));

      const payload = {
        _subject: `[VectorForce Cloud Nov 15 Interest] ${name} (${role})`,
        launch_window: 'Post-Diwali (After 15 November 2026)',
        interest_level: selectedInterestLevel,
        requested_features: chosenFeatures.join(', ') || 'All Cloud Features',
        role,
        team_size: teamSize,
        name_and_company: name,
        email,
        notes: notes || 'N/A',
        submitted_at: new Date().toISOString()
      };

      if (cloudSubmitBtn) {
        cloudSubmitBtn.disabled = true;
        cloudSubmitBtn.innerHTML = '<span>Recording Your Interest...</span>';
      }

      // Save locally & increment counter
      savedCount += 1;
      localStorage.setItem('vf_cloud_interest_count', String(savedCount));
      localStorage.setItem('vf_cloud_last_submission', JSON.stringify(payload));
      if (interestCounterEl) {
        interestCounterEl.textContent = `🔥 ${savedCount} Teams Interested`;
      }

      // Prepare GitHub Issue & mailto links for 100% guaranteed delivery
      const issueTitle = encodeURIComponent(`[Cloud Launch Interest - Nov 15] ${name} (${role})`);
      const issueBody = encodeURIComponent(
        `### VectorForce Cloud & Team Subscription — Customer Interest\n` +
        `- **Launch Target:** Post-Diwali (After 15 November 2026)\n` +
        `- **Interest Level:** ${payload.interest_level}\n` +
        `- **Name / Company:** ${payload.name_and_company}\n` +
        `- **Email:** ${payload.email}\n` +
        `- **Role:** ${payload.role}\n` +
        `- **Team / Machines:** ${payload.team_size}\n` +
        `- **Top Requested Cloud Features:** ${payload.requested_features}\n` +
        `- **Additional Notes:** ${payload.notes}\n`
      );
      if (githubConfirmLink) {
        githubConfirmLink.href = `https://github.com/getvectorforce/VectorForce/issues/new?title=${issueTitle}&body=${issueBody}`;
      }
      if (mailtoConfirmLink) {
        mailtoConfirmLink.href = `mailto:omprakash@arkainformations.com?subject=${issueTitle}&body=${issueBody}`;
      }

      // Send via FormSubmit AJAX endpoint in background
      try {
        await fetch('https://formsubmit.co/ajax/omprakash@arkainformations.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(payload)
        });
      } catch (_) {
        // Fallback links are shown below
      }

      if (cloudSubmitBtn) {
        cloudSubmitBtn.innerHTML = '<span>✓ Reserved for Post-Diwali Launch (After 15 Nov)!</span>';
        cloudSubmitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      }
      if (cloudSuccessBox) {
        cloudSuccessBox.style.display = 'block';
      }
    });
  }

  /* ------------------------------------------------------------------------
     Mobile Navigation Drawer Controller
     ------------------------------------------------------------------------ */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileBackdrop = document.getElementById('mobile-backdrop');

  function openMobileDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (mobileBackdrop) mobileBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileDrawer);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileDrawer);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileDrawer();
  });

  document.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', closeMobileDrawer);
  });
})();

