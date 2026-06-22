"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  actions?: Action[];
  isLoading?: boolean;
};

type Action = {
  label: string;
  type: "email" | "note" | "task" | "document";
  payload: string;
};

const SUGGESTIONS = [
  "Résume la situation de mon dernier client",
  "Quels clients n'ont pas été contactés depuis 90 jours ?",
  "Génère un email de relance pour un prospect assurance emprunteur",
  "Quels clients ont un contrat prévoyance mais pas de mutuelle ?",
  "Prépare-moi pour mon prochain rendez-vous",
  "Analyse les opportunités de cross-selling ce mois-ci",
];

export function CopilotChat({ userName }: { userName: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Bonjour ${userName} 👋 Je suis **IaGO**, votre Copilot cabinet.\n\nJe peux analyser vos données CRM, synthétiser des fiches clients, rédiger des emails ou identifier des opportunités commerciales.\n\nQue puis-je faire pour vous aujourd'hui ?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState<"global" | "client">("global");
  const [clientSearch, setClientSearch] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const userText = text || input.trim();
    if (!userText || isLoading) return;
    setInput("");

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userText,
      timestamp: new Date(),
    };
    const loadingMsg: Message = {
      id: "loading",
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isLoading: true,
    };
    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/ia/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, context, clientSearch }),
      });
      const data = await res.json();
      const assistantMsg: Message = {
        id: Date.now().toString() + "_a",
        role: "assistant",
        content: data.response || "Je n'ai pas pu traiter votre demande.",
        timestamp: new Date(),
        actions: data.actions,
      };
      setMessages((prev) => prev.filter((m) => m.id !== "loading").concat(assistantMsg));
    } catch {
      setMessages((prev) =>
        prev.filter((m) => m.id !== "loading").concat({
          id: Date.now().toString() + "_err",
          role: "assistant",
          content: "Une erreur est survenue. Vérifiez que la clé API OpenAI est configurée sur Vercel.",
          timestamp: new Date(),
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderContent = (content: string) => {
    // Simple markdown-like rendering
    return content
      .split("\n")
      .map((line, i) => {
        if (line.startsWith("**") && line.endsWith("**")) {
          return <strong key={i} className="ia-chat-bold">{line.slice(2, -2)}</strong>;
        }
        if (line.startsWith("- ")) {
          return <li key={i} className="ia-chat-li">{line.slice(2)}</li>;
        }
        if (line.startsWith("## ")) {
          return <h3 key={i} className="ia-chat-h3">{line.slice(3)}</h3>;
        }
        if (line === "") return <br key={i} />;
        // Inline bold
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} className="ia-chat-p">
            {parts.map((part, j) =>
              part.startsWith("**") && part.endsWith("**")
                ? <strong key={j}>{part.slice(2, -2)}</strong>
                : part
            )}
          </p>
        );
      });
  };

  return (
    <div className="ia-copilot-layout">
      {/* Sidebar context */}
      <aside className="ia-copilot-sidebar">
        <div className="ia-copilot-sidebar-section">
          <div className="ia-copilot-sidebar-title">Contexte</div>
          <div className="ia-copilot-context-btns">
            <button
              className={`ia-copilot-ctx-btn${context === "global" ? " active" : ""}`}
              onClick={() => setContext("global")}
            >
              🌐 Cabinet global
            </button>
            <button
              className={`ia-copilot-ctx-btn${context === "client" ? " active" : ""}`}
              onClick={() => setContext("client")}
            >
              👤 Client spécifique
            </button>
          </div>
          {context === "client" && (
            <input
              className="ia-copilot-client-search"
              placeholder="Nom du client..."
              value={clientSearch}
              onChange={(e) => setClientSearch(e.target.value)}
            />
          )}
        </div>

        <div className="ia-copilot-sidebar-section">
          <div className="ia-copilot-sidebar-title">Suggestions rapides</div>
          <div className="ia-copilot-suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} className="ia-copilot-suggestion" onClick={() => sendMessage(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="ia-copilot-sidebar-section">
          <div className="ia-copilot-sidebar-title">Capacités IaGO</div>
          <ul className="ia-copilot-caps">
            {[
              { icon: "🔍", label: "Recherche CRM" },
              { icon: "📊", label: "Analyse portefeuille" },
              { icon: "✉️", label: "Rédaction emails" },
              { icon: "📋", label: "Synthèse clients" },
              { icon: "🎯", label: "Cross-selling" },
              { icon: "⏰", label: "Relances" },
            ].map((c) => (
              <li key={c.label} className="ia-copilot-cap">
                <span>{c.icon}</span> {c.label}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Chat main */}
      <div className="ia-copilot-chat">
        <div className="ia-copilot-chat-header">
          <div className="ia-copilot-chat-header-left">
            <div className="ia-copilot-avatar">
              <span>🤖</span>
              <span className="ia-copilot-avatar-dot" />
            </div>
            <div>
              <div className="ia-copilot-chat-name">IaGO</div>
              <div className="ia-copilot-chat-status">En ligne — GPT-4o</div>
            </div>
          </div>
          <button
            className="ia-copilot-clear-btn"
            onClick={() =>
              setMessages([{
                id: "welcome2",
                role: "assistant",
                content: `Nouvelle conversation démarrée. Comment puis-je vous aider ?`,
                timestamp: new Date(),
              }])
            }
          >
            Nouvelle conversation
          </button>
        </div>

        <div className="ia-copilot-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`ia-chat-msg ia-chat-msg--${msg.role}`}>
              {msg.role === "assistant" && (
                <div className="ia-chat-msg-avatar">🤖</div>
              )}
              <div className="ia-chat-msg-bubble">
                {msg.isLoading ? (
                  <div className="ia-chat-typing">
                    <span /><span /><span />
                  </div>
                ) : (
                  <>
                    <div className="ia-chat-msg-content">
                      {renderContent(msg.content)}
                    </div>
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="ia-chat-actions">
                        <div className="ia-chat-actions-title">Actions suggérées :</div>
                        <div className="ia-chat-actions-list">
                          {msg.actions.map((action, i) => (
                            <button key={i} className={`ia-chat-action-btn ia-chat-action-btn--${action.type}`}>
                              {action.type === "email" && "✉️"}
                              {action.type === "note" && "📝"}
                              {action.type === "task" && "✅"}
                              {action.type === "document" && "📄"}
                              {action.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="ia-chat-msg-time">
                      {msg.timestamp.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </>
                )}
              </div>
              {msg.role === "user" && (
                <div className="ia-chat-msg-avatar ia-chat-msg-avatar--user">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="ia-copilot-input-area">
          <textarea
            ref={inputRef}
            className="ia-copilot-input"
            placeholder="Posez une question à IaGO... (Entrée pour envoyer, Maj+Entrée pour nouvelle ligne)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            disabled={isLoading}
          />
          <button
            className={`ia-copilot-send-btn${isLoading ? " loading" : ""}`}
            onClick={() => sendMessage()}
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ia-spin"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"/></svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
