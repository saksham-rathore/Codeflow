import { StateEffect, StateField } from "@codemirror/state";
import { EditorView, lineNumbers, ViewPlugin, WidgetType } from "@codemirror/view";

// StateEffect: A way to send "messages" to update state.
// We define one effect type for setting the suggestion text.
const setSuggestionEffect = StateEffect.define<string | null>();


// StateField: Holds our suggestion state in the editor.
// - create(): Returns the initial value when the editor loads
// - update(): Called on every transaction (keystroke, etc.) to potentially update the value
const SuggestionState = StateField.define<string | null>({
    create() {
        return null;
    },
    update(value, transaction) {
        // Check each effect in this transaction
        // If we find our setSuggestionEffect, return its new value
        // Otherwise, keep the current value unchanged
        for (const effect of transaction.effects) {
            if (effect.is(setSuggestionEffect)) {
                return effect.value;
            }
        }
        return value;
    },
});

// WidgetType: Creates custom DOM elements to display in the editor.
// toDOM() is called by CodeMirror to create the actual HTML element.
class SuggestionWidget extends WidgetType {
    constructor(readonly text: string) {
        super();
    }

    toDOM() {
        const span = document.createElement("span");
        span.textContent = this.text;
        span.style.opacity = "0.4"; // Ghost text appearance
        span.style.pointerEvents = "none"; // Don't interfere with clicks
        return span;
    }
}

let DebounceTimer: number | null = null;
let isWaitingForSuggestion = false;
const DEBOUNCE_DELAY = 300;
let currentAbortController: AbortController | null = null;

const generatePayload = (view: EditorView, fileName: string) => {
    const code = view.state.doc.toString();
    if (!code || code.trim().length === 0) return null;

    const cursorPosition = view.state.selection.main.head;
    const currentLine = view.state.doc.lineAt(cursorPosition)
    const cursorInLine = cursorPosition - currentLine.from;

    const previousLines: string[] = [];
    const previousLinesToFetch = Math.min(5, currentLine.number - 1);
    for (let i = previousLinesToFetch; i >= 1; i--) {
        previousLines.push(view.state.doc.line(currentLine.number - i).text);
    }

    const nextLines: string[] = [];
    const totalLines = view.state.doc.lines;
    const linesToFetch = Math.min(5, totalLines - currentLine.number);
    for (let i = 1; i <= linesToFetch; i++) {
        nextLines.push(view.state.doc.line(currentLine.number + i).text);
    }

    return {
        fileName,
        code,
        currentLine: currentLine.text,
        previousLines: previousLines.join("\n"),
        textBeforeCursor: currentLine.text.slice(0, cursorInLine),
        nextLines: nextLines.join("\n"),
        lineNumber: currentLine.number,
    }
}

const createDebouncePlugin = (fileName: string) => {
    return ViewPlugin.fromClass(
        class {
            constructor(view: EditorView) {
                this.triggerSuggestion(view);
            }
        }
    )
}