import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import type { Extension } from '@codemirror/state';
import { EditorView, scrollPastEnd } from '@codemirror/view';

type EditorLanguage = 'typescript' | 'javascript' | 'python' | 'sql' | 'bash';

const editorLayout = EditorView.theme({
  '&': {
    height: '100%',
    maxHeight: 'none',
  },
  '.cm-editor': {
    height: '100%',
    maxHeight: 'none',
  },
  '.cm-scroller': {
    overflow: 'auto',
    minHeight: '100%',
  },
  '.cm-content, .cm-gutter': {
    minHeight: '100%',
  },
});

export default function LazyCodeEditor({
  value,
  language,
  editable,
  height = '360px',
  onChange,
}: {
  value: string;
  language: EditorLanguage;
  editable: boolean;
  height?: string;
  onChange: (value: string) => void;
}) {
  const [extensions, setExtensions] = useState<Extension[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function loadLanguage() {
      const baseExtensions: Extension[] = [editorLayout, scrollPastEnd()];
      if (language === 'python') {
        const mod = await import('@codemirror/lang-python');
        if (!cancelled) setExtensions([...baseExtensions, mod.python()]);
        return;
      }
      if (language === 'sql') {
        const mod = await import('@codemirror/lang-sql');
        if (!cancelled) setExtensions([...baseExtensions, mod.sql()]);
        return;
      }
      if (language === 'bash') {
        const [languageMod, shellMod] = await Promise.all([
          import('@codemirror/language'),
          import('@codemirror/legacy-modes/mode/shell'),
        ]);
        if (!cancelled) setExtensions([...baseExtensions, languageMod.StreamLanguage.define(shellMod.shell)]);
        return;
      }
      const mod = await import('@codemirror/lang-javascript');
      if (!cancelled) {
        setExtensions([
          ...baseExtensions,
          mod.javascript({ jsx: language === 'javascript', typescript: language === 'typescript' }),
        ]);
      }
    }
    void loadLanguage();
    return () => {
      cancelled = true;
    };
  }, [language]);

  return (
    <CodeMirror
      value={value}
      height={height}
      theme="dark"
      extensions={extensions}
      editable={editable}
      style={{ height: '100%' }}
      onChange={onChange}
      basicSetup={{ lineNumbers: true, foldGutter: true, autocompletion: true }}
    />
  );
}
