// TravelPlan AI Chatbot
(function () {

    const html = `
        <!-- Toggle FAB -->
        <button id="chatbot-toggle" title="Chat with your AI Travel Assistant">✈</button>

        <!-- Chat Window -->
        <div id="chatbot-window">
            <div id="chatbot-header">
                <h3>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    AI Travel Assistant <span>Gemini AI</span>
                </h3>
                <button id="chatbot-close" title="Close">✕</button>
            </div>

            <div id="chatbot-messages">
                <div class="bot-message">
                    <strong>✈ Travel Assistant</strong>
                    <p>Hi! I'm your AI travel assistant. Ask me about:<br>
                    • Destinations &amp; best times to visit<br>
                    • Transport routes &amp; tips<br>
                    • Local food &amp; culture<br>
                    • Budget planning &amp; packing</p>
                </div>
            </div>

            <div class="chatbot-input-container">
                <input type="text" id="chatbot-input" placeholder="Ask me anything about travel…">
                <button id="chatbot-send" title="Send">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                </button>
            </div>
        </div>

        <style>
            .typing-indicator {
                display: flex;
                align-items: center;
                gap: 4px;
                padding: 12px 14px;
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 14px 14px 14px 4px;
                align-self: flex-start;
                width: fit-content;
            }
            .typing-indicator span {
                width: 7px; height: 7px;
                border-radius: 50%;
                background: #0ea5e9;
                animation: typingDot 1.2s infinite;
            }
            .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
            .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
            @keyframes typingDot {
                0%, 60%, 100% { opacity: 0.25; transform: scale(0.8); }
                30% { opacity: 1; transform: scale(1.1); }
            }
        </style>
    `;

    function init() {
        const container = document.getElementById('chatbot');
        if (!container) return;
        container.innerHTML = html;
        setup();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function setup() {
        const toggle = document.getElementById('chatbot-toggle');
        const win = document.getElementById('chatbot-window');
        const closeBtn = document.getElementById('chatbot-close');
        const input = document.getElementById('chatbot-input');
        const sendBtn = document.getElementById('chatbot-send');
        const messages = document.getElementById('chatbot-messages');

        toggle.addEventListener('click', () => {
            win.classList.toggle('open');
            if (win.classList.contains('open')) input.focus();
        });

        closeBtn.addEventListener('click', () => win.classList.remove('open'));

        function send() {
            const text = input.value.trim();
            if (!text) return;
            addMsg(text, 'user');
            input.value = '';
            const tid = showTyping();
            fetch('/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            })
                .then(r => r.json())
                .then(d => { removeTyping(tid); addMsg(d.response || 'Sorry, something went wrong.', 'bot'); })
                .catch(() => { removeTyping(tid); addMsg('Connection error. Please try again.', 'bot'); });
        }

        sendBtn.addEventListener('click', send);
        input.addEventListener('keypress', e => { if (e.key === 'Enter') send(); });

        function addMsg(text, who) {
            const d = document.createElement('div');
            d.className = who === 'user' ? 'user-message' : 'bot-message';
            if (who === 'user') {
                d.innerHTML = `<p>${esc(text)}</p>`;
            } else {
                d.innerHTML = `<strong>✈ Travel Assistant</strong><p>${fmt(text)}</p>`;
            }
            messages.appendChild(d);
            messages.scrollTop = messages.scrollHeight;
        }

        function showTyping() {
            const d = document.createElement('div');
            d.className = 'typing-indicator';
            d.id = 'typ-' + Date.now();
            d.innerHTML = '<span></span><span></span><span></span>';
            messages.appendChild(d);
            messages.scrollTop = messages.scrollHeight;
            return d.id;
        }

        function removeTyping(id) {
            const el = document.getElementById(id); if (el) el.remove();
        }

        function esc(t) {
            const d = document.createElement('div'); d.textContent = t; return d.innerHTML;
        }

        function fmt(t) {
            t = esc(t);
            t = t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            t = t.replace(/\*(.*?)\*/g, '<em>$1</em>');
            t = t.replace(/\n/g, '<br>');
            return t;
        }
    }
})();
