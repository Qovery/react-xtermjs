import { type ITerminalAddon, type ITerminalInitOnlyOptions, type ITerminalOptions, Terminal } from '@xterm/xterm'
import '@xterm/xterm/css/xterm.css'
import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from 'react'

export interface UseXTermProps {
  addons?: ITerminalAddon[]
  options?: ITerminalOptions & ITerminalInitOnlyOptions
  listeners?: {
    onBinary?(data: string): void
    onCursorMove?(): void
    onData?(data: string): void
    onKey?: (event: { key: string; domEvent: KeyboardEvent }) => void
    onLineFeed?(): void
    onScroll?(newPosition: number): void
    onSelectionChange?(): void
    onRender?(event: { start: number; end: number }): void
    onResize?(event: { cols: number; rows: number }): void
    onTitleChange?(newTitle: string): void
    customKeyEventHandler?(event: KeyboardEvent): boolean
  }
}

export function useXTerm({ options, addons, listeners }: UseXTermProps = {}) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const listenersRef = useRef<UseXTermProps['listeners']>(listeners)
  const [terminalInstance, setTerminalInstance] = useState<Terminal | null>(null)

  // Keep the latest version of listeners without retriggering the effect
  useEffect(() => {
    listenersRef.current = listeners
  }, [listeners])

  useEffect(() => {
    const instance = new Terminal({
      fontFamily: 'operator mono,SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace',
      fontSize: 14,
      theme: { background: '#101420' },
      cursorStyle: 'underline',
      cursorBlink: false,
      ...options,
    })

    // Load optional addons
    addons?.forEach((addon) => instance.loadAddon(addon))

    // Register event listeners from the ref
    const l = listenersRef.current
    l?.onBinary && instance.onBinary(l.onBinary)
    l?.onCursorMove && instance.onCursorMove(l.onCursorMove)
    l?.onLineFeed && instance.onLineFeed(l.onLineFeed)
    l?.onScroll && instance.onScroll(l.onScroll)
    l?.onSelectionChange && instance.onSelectionChange(l.onSelectionChange)
    l?.onRender && instance.onRender(l.onRender)
    l?.onResize && instance.onResize(l.onResize)
    l?.onTitleChange && instance.onTitleChange(l.onTitleChange)
    l?.onKey && instance.onKey(l.onKey)
    l?.onData && instance.onData(l.onData)
    l?.customKeyEventHandler && instance.attachCustomKeyEventHandler(l.customKeyEventHandler)

    if (terminalRef.current) {
      instance.open(terminalRef.current)
      instance.focus()
    }

    setTerminalInstance(instance)

    return () => {
      instance.dispose()
      setTerminalInstance(null)
    }
  }, [options, addons])

  return {
    ref: terminalRef,
    instance: terminalInstance,
  }
}

export interface XTermProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onResize' | 'onScroll'>, UseXTermProps {}

export function XTerm({ className = '', options, addons, listeners, ...props }: XTermProps) {
  const { ref } = useXTerm({
    options,
    addons,
    listeners,
  })

  return <div className={className} ref={ref} {...props} />
}

export default XTerm
