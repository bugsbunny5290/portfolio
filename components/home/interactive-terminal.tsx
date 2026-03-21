"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language-context";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface DisplayCommand {
  type: "display";
  description: string;
  response: string;
}

interface TagsCommand {
  type: "tags";
  description: string;
  response: string[];
}

interface NavigateCommand {
  type: "navigate";
  description: string;
  href: string;
}

interface LinkCommand {
  type: "link";
  description: string;
  href: string;
  response: string;
}

interface JokeCommand {
  type: "display";
  description: string;
  responses: string[];
  response?: undefined;
}

type Command = DisplayCommand | TagsCommand | NavigateCommand | LinkCommand | JokeCommand;

interface HistoryEntry {
  id: string;
  command: string;
  output: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/* Commands                                                            */
/* ------------------------------------------------------------------ */

function getCommands(): Record<string, Command> {
  return {
    "--help": {
      type: "display",
      description: "Show available commands",
      response:
        "Available commands: --skills, --about, --experience, --contact, --cv, --status, --joke, --sudo, --hire, --coffee, --help",
    },
    "--skills": {
      type: "tags",
      description: "Show tech stack",
      response: [
        "GCP",
        "Kubernetes",
        "TypeScript",
        "Next.js",
        "NestJS",
        "Pulumi",
        "GitOps",
        "Gravitee",
      ],
    },
    "--about": {
      type: "navigate",
      description: "Go to about page",
      href: "/about",
    },
    "--experience": {
      type: "navigate",
      description: "View experience timeline",
      href: "/about",
    },
    "--contact": {
      type: "display",
      description: "Show contact info",
      response: "pranav.gautam.pro@gmail.com | github.com/bugsbunny5290 | Heidelberg, Germany",
    },
    "--cv": {
      type: "link",
      description: "Download CV",
      href: "/api/cv?lang=en&format=pdf",
      response: "Downloading CV...",
    },
    "--status": {
      type: "display",
      description: "Current availability",
      response: "\u25CF Open to opportunities",
    },
    "--joke": {
      type: "display",
      description: "Tell a dev joke",
      responses: [
        "Why do programmers prefer dark mode? Because light attracts bugs.",
        "There are only 10 types of people: those who understand binary and those who don't.",
        "A SQL query walks into a bar, sees two tables, and asks... 'Can I JOIN you?'",
        "!false \u2014 it's funny because it's true.",
        "To understand recursion, you must first understand recursion.",
      ],
    },
    "--sudo": {
      type: "display",
      description: "???",
      response: "Nice try. Permission denied. \uD83D\uDD12",
    },
    "--hire": {
      type: "navigate",
      description: "Let's work together",
      href: "/contact",
    },
    "--coffee": {
      type: "display",
      description: "Coffee status",
      response: "",
    },
  };
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function renderStatus(text: string): React.ReactNode {
  if (text.startsWith("\u25CF")) {
    return (
      <span>
        <span style={{ color: "#22c55e" }}>{"\u25CF"}</span>
        {text.slice(1)}
      </span>
    );
  }
  return text;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

const SUGGESTED_COMMANDS = ["--skills", "--about", "--contact", "--cv", "--help"];

export function InteractiveTerminal(): React.ReactElement {
  const router = useRouter();
  const { content } = useLanguage();
  const { personalInfo } = content;

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [autoPlayPhase, setAutoPlayPhase] = useState<"typing1" | "typing2" | "response2" | "done">(
    "typing1",
  );
  const [autoText1, setAutoText1] = useState("");
  const [autoText2, setAutoText2] = useState("");
  const [showResponse2, setShowResponse2] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const historyIdRef = useRef(0);

  // Tab autocomplete state
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteIndex, setAutocompleteIndex] = useState(0);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  const commands = useRef(getCommands()).current;
  const commandKeys = Object.keys(commands);

  const fullText1 = `pranav --location="${personalInfo.location}"`;
  const fullText2 = "pranav --status";

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  });

  // Auto-play sequence
  useEffect(() => {
    if (!isAutoPlaying) return;

    if (autoPlayPhase === "typing1") {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setAutoText1(fullText1.slice(0, i));
        if (i >= fullText1.length) {
          clearInterval(interval);
          setTimeout(() => setAutoPlayPhase("typing2"), 600);
        }
      }, 50);
      return () => clearInterval(interval);
    }

    if (autoPlayPhase === "typing2") {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setAutoText2(fullText2.slice(0, i));
        if (i >= fullText2.length) {
          clearInterval(interval);
          setTimeout(() => setAutoPlayPhase("response2"), 400);
        }
      }, 50);
      return () => clearInterval(interval);
    }

    if (autoPlayPhase === "response2") {
      setShowResponse2(true);
      setTimeout(() => {
        setAutoPlayPhase("done");
        setIsAutoPlaying(false);
      }, 500);
    }
  }, [isAutoPlaying, autoPlayPhase, fullText1]);

  // Focus input when auto-play finishes
  useEffect(() => {
    if (!isAutoPlaying) {
      inputRef.current?.focus();
    }
  }, [isAutoPlaying]);

  // Filtered autocomplete options
  const filteredCommands = commandKeys.filter((cmd) => {
    if (!input) return false;
    return cmd.startsWith(input) && cmd !== input;
  });

  // Execute a command
  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      if (!trimmed) return;

      const command = commands[trimmed];

      if (!command) {
        const id = `hist-${++historyIdRef.current}`;
        setHistory((prev) => [
          ...prev,
          {
            id,
            command: trimmed,
            output: (
              <span style={{ color: "var(--fg-muted)" }}>
                Command not found: {trimmed}. Type --help for available commands.
              </span>
            ),
          },
        ]);
        return;
      }

      let output: React.ReactNode;

      switch (command.type) {
        case "tags":
          output = (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {command.response.map((tag) => (
                <span key={tag} className="tag-brutal">
                  {tag}
                </span>
              ))}
            </div>
          );
          break;

        case "navigate":
          output = (
            <span style={{ color: "var(--fg-muted)" }}>Navigating to {command.href}...</span>
          );
          setHistory((prev) => [
            ...prev,
            { id: `hist-${++historyIdRef.current}`, command: trimmed, output },
          ]);
          setTimeout(() => router.push(command.href), 500);
          return;

        case "link":
          output = <span style={{ color: "var(--fg-muted)" }}>{command.response}</span>;
          setHistory((prev) => [
            ...prev,
            { id: `hist-${++historyIdRef.current}`, command: trimmed, output },
          ]);
          // Trigger download
          setTimeout(() => {
            window.open(command.href, "_blank");
          }, 300);
          return;

        default: {
          let text: string;
          if ("responses" in command && command.responses) {
            text = command.responses[Math.floor(Math.random() * command.responses.length)];
          } else if (trimmed === "--coffee") {
            const hours = new Date().getHours();
            text = `\u2615 Current coffee count today: ${hours} cups (approximately)`;
          } else {
            text = command.response ?? "";
          }

          if (trimmed === "--status") {
            output = renderStatus(text);
          } else {
            output = <span>{text}</span>;
          }
          break;
        }
      }

      setHistory((prev) => [
        ...prev,
        { id: `hist-${++historyIdRef.current}`, command: trimmed, output },
      ]);
    },
    [commands, router],
  );

  const handleSubmit = useCallback(() => {
    if (showAutocomplete && filteredCommands.length > 0) {
      setInput(filteredCommands[autocompleteIndex]);
      setShowAutocomplete(false);
      return;
    }
    executeCommand(input);
    setInput("");
    setShowAutocomplete(false);
  }, [input, executeCommand, showAutocomplete, filteredCommands, autocompleteIndex]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        if (showAutocomplete && filteredCommands.length > 0) {
          setInput(filteredCommands[autocompleteIndex]);
          setShowAutocomplete(false);
        } else if (input.startsWith("--") && filteredCommands.length > 0) {
          setShowAutocomplete(true);
          setAutocompleteIndex(0);
        }
        return;
      }

      if (e.key === "Escape") {
        setShowAutocomplete(false);
        return;
      }

      if (showAutocomplete) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setAutocompleteIndex((prev) => (prev + 1) % filteredCommands.length);
          return;
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setAutocompleteIndex(
            (prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length,
          );
          return;
        }
      }

      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    },
    [showAutocomplete, filteredCommands, autocompleteIndex, input, handleSubmit],
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    if (val.startsWith("--") && val.length > 2) {
      setShowAutocomplete(true);
      setAutocompleteIndex(0);
    } else {
      setShowAutocomplete(false);
    }
  }, []);

  const handleSuggestionClick = useCallback(
    (cmd: string) => {
      executeCommand(cmd);
      setInput("");
      setShowAutocomplete(false);
      inputRef.current?.focus();
    },
    [executeCommand],
  );

  const focusInput = useCallback(() => {
    if (!isAutoPlaying) {
      inputRef.current?.focus();
    }
  }, [isAutoPlaying]);

  return (
    <div className="mt-6">
      {/* Terminal card */}
      <div ref={containerRef} className="card-brutal overflow-hidden" style={{ maxWidth: "640px" }}>
        {/* Window chrome */}
        <div className="window-chrome">
          <div className="window-dot" style={{ background: "#ef4444" }} />
          <div className="window-dot" style={{ background: "#eab308" }} />
          <div className="window-dot" style={{ background: "#22c55e" }} />
          <span
            className="text-xs ml-2 truncate"
            style={{ color: "var(--fg-subtle)", fontFamily: "var(--font-mono)" }}
          >
            terminal.ts
          </span>
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          className="p-4 no-scrollbar"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8125rem",
            lineHeight: "1.6",
            maxHeight: "300px",
            overflowY: "auto",
            color: "var(--fg)",
            cursor: "text",
          }}
          onClick={focusInput}
          onKeyDown={focusInput}
          role="log"
          aria-label="Interactive terminal"
          aria-live="polite"
        >
          {/* Auto-play: line 1 */}
          <div>
            <span style={{ color: "var(--color-purple)", fontWeight: 600 }}>$</span>{" "}
            <span>{autoText1}</span>
            {autoPlayPhase === "typing1" && <span className="terminal-cursor" />}
          </div>

          {/* Auto-play: line 2 */}
          {(autoPlayPhase === "typing2" ||
            autoPlayPhase === "response2" ||
            autoPlayPhase === "done") && (
            <div className="mt-1">
              <span style={{ color: "var(--color-purple)", fontWeight: 600 }}>$</span>{" "}
              <span>{autoText2}</span>
              {autoPlayPhase === "typing2" && <span className="terminal-cursor" />}
            </div>
          )}

          {/* Auto-play: status response */}
          {(showResponse2 || autoPlayPhase === "done") && (
            <div className="mt-0.5" style={{ color: "var(--fg)" }}>
              <span style={{ color: "#22c55e" }}>{"\u25CF"}</span> Open to opportunities
            </div>
          )}

          {/* Command history */}
          {history.map((entry) => (
            <div key={entry.id} className="mt-2">
              <div>
                <span style={{ color: "var(--color-purple)", fontWeight: 600 }}>$</span>{" "}
                <span style={{ color: "var(--fg-muted)" }}>{entry.command}</span>
              </div>
              <div className="mt-0.5">{entry.output}</div>
            </div>
          ))}

          {/* Active input line */}
          {!isAutoPlaying && (
            <div className="mt-2 relative">
              <div className="flex items-center">
                <span style={{ color: "var(--color-purple)", fontWeight: 600 }}>$</span>
                <span style={{ marginLeft: "0.5ch" }} />
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="flex-1 outline-none"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--fg)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8125rem",
                    lineHeight: "1.6",
                    padding: 0,
                    caretColor: "var(--color-purple)",
                  }}
                  aria-label="Terminal input"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>

              {/* Autocomplete dropdown */}
              {showAutocomplete && filteredCommands.length > 0 && (
                <div
                  ref={autocompleteRef}
                  className="absolute left-0 bottom-full mb-1 card-brutal overflow-hidden z-10"
                  style={{
                    minWidth: "240px",
                    maxWidth: "100%",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                  }}
                >
                  {filteredCommands.map((cmd, i) => (
                    <button
                      key={cmd}
                      type="button"
                      className="w-full text-left px-3 py-1.5 flex items-center justify-between gap-4"
                      style={{
                        background: i === autocompleteIndex ? "var(--color-purple)" : "transparent",
                        color: i === autocompleteIndex ? "white" : "var(--fg)",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setInput(cmd);
                        setShowAutocomplete(false);
                        inputRef.current?.focus();
                      }}
                      onMouseEnter={() => setAutocompleteIndex(i)}
                    >
                      <span style={{ fontWeight: 600 }}>{cmd}</span>
                      <span
                        style={{
                          color:
                            i === autocompleteIndex ? "rgba(255,255,255,0.7)" : "var(--fg-subtle)",
                          fontSize: "0.6875rem",
                        }}
                      >
                        {commands[cmd].description}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Suggested command buttons */}
      {!isAutoPlaying && (
        <div className="flex flex-wrap gap-1.5 mt-3" style={{ maxWidth: "640px" }}>
          {SUGGESTED_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              className="tag-brutal"
              style={{
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
              }}
              onClick={() => handleSuggestionClick(cmd)}
            >
              {cmd}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
